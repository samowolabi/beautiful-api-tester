import React, { useState, useEffect } from 'react';
import { TextArea } from '../atoms';
import { ChevronDown, Trash2, Wand2, Copy, Check } from 'lucide-react';
import { useCopyToClipboard } from '../../utils/clipboard';

interface BodyEditorProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
}

export const BodyEditor: React.FC<BodyEditorProps> = ({ value, onChange, disabled }) => {
  const [contentType, setContentType] = useState('application/json');
  const [localValue, setLocalValue] = useState(value);
  const { copied, copy } = useCopyToClipboard();
  
  // Sync external value changes to local state
  useEffect(() => {
    console.log('[BodyEditor] External value changed:', value);
    setLocalValue(value);
  }, [value]);

  const handleChange = (newValue: string) => {
    console.log('[BodyEditor] User typed, new value:', newValue);
    setLocalValue(newValue);
    onChange(newValue);
  };

  const handleBlur = () => {
    console.log('[BodyEditor] onBlur - attempting to format');
    if (contentType === 'application/json' && localValue.trim()) {
      try {
        const parsed = JSON.parse(localValue);
        const formatted = JSON.stringify(parsed, null, 2);
        if (formatted !== localValue) {
          console.log('[BodyEditor] Formatting JSON');
          setLocalValue(formatted);
          onChange(formatted);
        }
      } catch (error) {
        console.log('[BodyEditor] Invalid JSON, skipping format');
        // Invalid JSON, don't format
      }
    }
  };
  
  const formatJSON = () => {
    try {
      const parsed = JSON.parse(localValue);
      const formatted = JSON.stringify(parsed, null, 2);
      setLocalValue(formatted);
      onChange(formatted);
    } catch (error) {
      // Invalid JSON, do nothing
    }
  };

  return (
    <div className="bg-gray-900">
      <div className="px-4 md:px-6 py-2 md:py-3 border-b border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-2 md:gap-4">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="text-xs md:text-sm text-gray-400">Content Type</span>
          <div className="relative">
            <select 
              value={contentType}
              onChange={(e) => setContentType(e.target.value)}
              className="bg-gray-800 text-white text-xs md:text-sm px-2 md:px-3 py-1 md:py-1.5 pr-6 md:pr-8 rounded border border-gray-700 appearance-none cursor-pointer hover:bg-gray-750 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="application/json">application/json</option>
              <option value="application/xml">application/xml</option>
              <option value="text/plain">text/plain</option>
            </select>
            <ChevronDown className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 w-3 h-3 md:w-4 md:h-4 text-gray-400 pointer-events-none" />
          </div>
        </div>
      </div>
      
      <div className="px-4 md:px-6 py-1.5 md:py-2 border-b border-gray-800 bg-gray-850">
        <div className="text-xs text-gray-500 mb-1.5 md:mb-2">Raw Request Body</div>
        <div className="flex gap-1.5 md:gap-2 items-center">
          <button className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" title="Delete">
            <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button 
            onClick={formatJSON}
            className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" 
            title="Format"
          >
            <Wand2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button 
            onClick={() => copy(localValue)}
            className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" 
            title="Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" /> : <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </button>
        </div>
      </div>

      <div className="px-4 md:px-6 py-3 md:py-4">
        <TextArea
          value={localValue}
          onChange={(e) => handleChange(e.target.value)}
          onBlur={handleBlur}
          placeholder='Enter request body (JSON, XML, or plain text)'
          rows={8}
          disabled={disabled}
          className={`${disabled ? 'bg-gray-800 text-gray-500' : 'bg-gray-950 text-gray-300'} border-gray-800 font-mono text-xs md:text-sm focus:ring-indigo-500`}
        />
      </div>
    </div>
  );
};
