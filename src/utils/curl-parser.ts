import type { HttpMethod, Header, Authentication } from '../types';

export interface ParsedCurlRequest {
  url: string;
  method: HttpMethod;
  headers: Header[];
  body: string;
  authentication: Authentication;
}

/**
 * Parses a cURL command and extracts request details
 */
export class CurlParser {
  /**
   * Normalize cURL command - handle line continuations and whitespace
   * Preserves structure inside quoted strings
   */
  private static normalizeCurl(curlCommand: string): string {
    // First, handle backslash line continuations (outside of quotes)
    let normalized = curlCommand.replace(/\\\s*\n\s*/g, ' ');
    
    // Remove 'curl' prefix
    normalized = normalized.trim().replace(/^curl\s+/i, '');
    
    // Collapse multiple spaces but preserve the structure
    // Don't collapse spaces inside single or double quotes
    return normalized;
  }

  /**
   * Extract URL from cURL command
   */
  private static extractUrl(curl: string): string {
    // URL is usually the last argument or explicitly after flags
    // Look for http(s):// patterns
    const parts = curl.split(/\s+/);
    for (let i = parts.length - 1; i >= 0; i--) {
      const part = parts[i].replace(/^['"]|['"]$/g, '');
      if (part.startsWith('http://') || part.startsWith('https://')) {
        return part;
      }
    }
    return '';
  }

  /**
   * Extract HTTP method from cURL command
   */
  private static extractMethod(curl: string): HttpMethod {
    const methodMatch = curl.match(/(?:-X|--request)\s+['"]?(\w+)['"]?/i);
    if (methodMatch) {
      const method = methodMatch[1].toUpperCase();
      if (['GET', 'POST', 'PUT', 'PATCH', 'DELETE'].includes(method)) {
        return method as HttpMethod;
      }
    }
    return 'GET';
  }

  /**
   * Extract headers from cURL command
   */
  private static extractHeaders(curl: string): { headers: Header[]; authentication: Authentication } {
    const headers: Header[] = [];
    const authentication: Authentication = {
      type: 'None',
      token: '',
      enabled: false,
    };

    const headerRegex = /(?:-H|--header)\s+['"]([^'"]+)['"]/gi;
    let headerMatch;
    let headerId = 1;
    
    while ((headerMatch = headerRegex.exec(curl)) !== null) {
      const headerString = headerMatch[1];
      const colonIndex = headerString.indexOf(':');
      
      if (colonIndex > -1) {
        const key = headerString.substring(0, colonIndex).trim();
        const value = headerString.substring(colonIndex + 1).trim();
        
        // Check if it's an Authorization header
        if (key.toLowerCase() === 'authorization') {
          const bearerMatch = value.match(/^Bearer\s+(.+)$/i);
          if (bearerMatch) {
            authentication.type = 'Bearer';
            authentication.token = bearerMatch[1];
            authentication.enabled = true;
          }
        } else {
          headers.push({
            id: String(headerId++),
            key,
            value,
            enabled: true,
          });
        }
      }
    }

    return { headers, authentication };
  }

  /**
   * Extract body from cURL command
   * Handles single quotes, double quotes, and unquoted bodies
   * Preserves newlines and formatting inside quotes
   */
  private static extractBody(curl: string): string {
    console.log('[CurlParser] Attempting to extract body');
    
    // Strategy: Find -d flag and extract content between quotes
    // Use [\s\S] instead of . to match across newlines
    // Priority: single quotes > double quotes > no quotes
    
    // Try single-quoted body (most common for JSON)
    // Match -d ' ... ' where ... can be anything including newlines
    let bodyMatch = curl.match(/(?:-d|--data|--data-raw|--data-binary)\s+'([\s\S]*?)'/i);
    if (bodyMatch) {
      console.log('[CurlParser] Found single-quoted body');
      return bodyMatch[1];
    }
    
    // Try double-quoted body
    bodyMatch = curl.match(/(?:-d|--data|--data-raw|--data-binary)\s+"([\s\S]*?)"/i);
    if (bodyMatch) {
      console.log('[CurlParser] Found double-quoted body');
      return bodyMatch[1];
    }
    
    // Try unquoted body (least common)
    bodyMatch = curl.match(/(?:-d|--data|--data-raw|--data-binary)\s+(\S+)/i);
    if (bodyMatch) {
      console.log('[CurlParser] Found unquoted body');
      return bodyMatch[1];
    }
    
    console.log('[CurlParser] No body found');
    return '';
  }

  /**
   * Parse a cURL command string
   */
  static parse(curlCommand: string): ParsedCurlRequest {
    console.log('[CurlParser] Starting parse of cURL command');
    
    // Normalize the cURL command
    const curl = this.normalizeCurl(curlCommand);
    console.log('[CurlParser] Normalized:', curl.substring(0, 200));

    // Extract components
    const url = this.extractUrl(curl);
    const method = this.extractMethod(curl);
    const { headers, authentication } = this.extractHeaders(curl);
    const body = this.extractBody(curl);

    // Format JSON body if possible
    let formattedBody = body;
    if (body) {
      try {
        const parsed = JSON.parse(body);
        formattedBody = JSON.stringify(parsed, null, 2);
        console.log('[CurlParser] Formatted JSON body');
      } catch {
        console.log('[CurlParser] Body is not JSON, keeping as-is');
      }
    }

    const result: ParsedCurlRequest = {
      url,
      method: body && method === 'GET' ? 'POST' : method, // Default to POST if body exists
      headers,
      body: formattedBody,
      authentication,
    };

    console.log('[CurlParser] Final parsed result:', JSON.stringify(result, null, 2));
    return result;
  }

  /**
   * Validate if a string looks like a cURL command
   */
  static isValidCurl(input: string): boolean {
    const normalized = input.trim().toLowerCase();
    return normalized.startsWith('curl ') || normalized.includes('curl ');
  }
}
