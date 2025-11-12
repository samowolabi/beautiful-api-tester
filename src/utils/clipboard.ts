import React from 'react';

/**
 * Copy text to clipboard with fallback support for iframes and restricted contexts
 * @param text - The text to copy to clipboard
 * @returns Promise that resolves to true if successful, false otherwise
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  try {
    // Try modern clipboard API first (may fail in iframes)
    if (navigator.clipboard && window.isSecureContext) {
      try {
        await navigator.clipboard.writeText(text);
        return true;
      } catch (clipboardError) {
        console.warn('Clipboard API failed, trying fallback:', clipboardError);
        // Fall through to execCommand fallback
      }
    }
    
    // Fallback using execCommand (works in more contexts including iframes)
    const textArea = document.createElement('textarea');
    textArea.value = text;
    
    // Make it invisible and non-interactive
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    textArea.style.opacity = '0';
    textArea.setAttribute('readonly', '');
    
    document.body.appendChild(textArea);
    
    // Select the text
    textArea.focus();
    textArea.select();
    
    // For iOS
    textArea.setSelectionRange(0, textArea.value.length);
    
    try {
      const successful = document.execCommand('copy');
      document.body.removeChild(textArea);
      return successful;
    } catch (execError) {
      console.error('execCommand copy failed:', execError);
      document.body.removeChild(textArea);
      return false;
    }
  } catch (err) {
    console.error('Failed to copy text:', err);
    return false;
  }
}

/**
 * Custom hook for copy to clipboard functionality with visual feedback
 * @param resetDelay - Time in milliseconds before resetting copied state (default: 2000)
 * @returns Object with copy function and copied state
 */
export function useCopyToClipboard(resetDelay: number = 2000) {
  const [copied, setCopied] = React.useState(false);
  const timeoutRef = React.useRef<number | null>(null);

  const copy = async (text: string): Promise<boolean> => {
    const success = await copyToClipboard(text);
    
    if (success) {
      setCopied(true);
      
      // Clear existing timeout
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      
      // Reset copied state after delay
      timeoutRef.current = window.setTimeout(() => {
        setCopied(false);
      }, resetDelay);
    }
    
    return success;
  };

  // Cleanup on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return { copy, copied };
}
