import React, { useState } from 'react';
import { Download, Copy, Check } from 'lucide-react';
import { Tab, Tabs } from '../atoms';
import type { ApiResponse } from '../../types';
import { useCopyToClipboard } from '../../utils/clipboard';

interface ResponsePanelProps {
  response: ApiResponse | null;
  isLoading?: boolean;
}

export const ResponsePanel: React.FC<ResponsePanelProps> = ({ response, isLoading }) => {
  const [activeTab, setActiveTab] = useState<'json' | 'raw' | 'headers' | 'tests'>('json');
  const { copied, copy } = useCopyToClipboard();

  const handleCopy = () => {
    if (!response) return;
    
    let textToCopy = '';
    if (activeTab === 'json') {
      textToCopy = JSON.stringify(response.data, null, 2);
    } else if (activeTab === 'raw') {
      textToCopy = JSON.stringify(response.data);
    } else if (activeTab === 'headers') {
      textToCopy = Object.entries(response.headers)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n');
    }
    
    copy(textToCopy);
  };

  if (isLoading) {
    return (
      <div className="bg-gray-900 p-4 md:p-8 flex items-center justify-center min-h-[250px] md:min-h-[400px]">
        <div className="flex flex-col items-center justify-center text-gray-400">
          <div className="animate-spin rounded-full h-8 w-8 md:h-12 md:w-12 border-b-2 border-indigo-500 mb-3 md:mb-4"></div>
          <p className="font-body text-xs md:text-sm">Sending request...</p>
        </div>
      </div>
    );
  }

  if (!response) {
    return (
      <div className="bg-gray-900 p-4 md:p-8 flex items-center justify-center min-h-[100px] md:min-h-[100px]">
        <div className="flex flex-col items-center justify-center text-gray-500">
          <p className="font-body text-xs md:text-sm">Send a request to see the response here</p>
        </div>
      </div>
    );
  }

  const isSuccess = response.status >= 200 && response.status < 300;
  const statusColor = isSuccess ? 'text-green-500' : 'text-red-500';

  return (
    <div className="bg-gray-900 flex flex-col h-full">
      {/* Response Status Bar */}
      <div className="px-4 md:px-6 py-2 md:py-3 border-b border-gray-800 flex flex-col md:flex-row md:items-center md:justify-between gap-1 md:gap-2">
        <div className="flex flex-wrap items-center gap-1.5 md:gap-2 text-xs md:text-sm">
          <span className='text-gray-500'>Status:</span>
          <span className={`font-medium ${statusColor}`}>
            {response.status} • {isSuccess ? 'Unauthorized' : response.statusText}
          </span>
          <span className="text-gray-500">Time: {response.time} ms</span>
          <span className="text-gray-500">Size: {formatBytes(response.size)}</span>
        </div>
      </div>

      {/* Response Tabs */}
      <Tabs className="px-4 md:px-6">
        <Tab label="JSON" isActive={activeTab === 'json'} onClick={() => setActiveTab('json')} />
        <Tab label="Raw" isActive={activeTab === 'raw'} onClick={() => setActiveTab('raw')} />
        <Tab label="Headers" badge={Object.keys(response.headers).length} isActive={activeTab === 'headers'} onClick={() => setActiveTab('headers')} />
        <Tab label="Test Results" isActive={activeTab === 'tests'} onClick={() => setActiveTab('tests')} />
      </Tabs>

      {/* Response Toolbar */}
      <div className="px-4 md:px-6 py-1.5 md:py-2 border-b border-gray-800 bg-gray-850">
        <div className="text-xs text-gray-500 mb-1.5 md:mb-2">Response Body</div>
        <div className="flex gap-1.5 md:gap-2 items-center">
          <button className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" title="Wrap">
            <Wand2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" title="Download">
            <Download className="w-3.5 h-3.5 md:w-4 md:h-4" />
          </button>
          <button 
            onClick={handleCopy}
            className="p-1 md:p-1.5 hover:bg-gray-800 rounded text-gray-400 hover:text-white" 
            title="Copy"
          >
            {copied ? <Check className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500" /> : <Copy className="w-3.5 h-3.5 md:w-4 md:h-4" />}
          </button>
        </div>
      </div>

      {/* Response Content */}
      <div className="flex-1 overflow-auto px-4 md:px-6 py-3 md:py-4">
        {activeTab === 'json' && (
          <pre className="bg-gray-950 rounded p-3 md:p-4 overflow-auto text-xs md:text-sm font-mono text-gray-300 border border-gray-800">
            {JSON.stringify(response.data, null, 2)}
          </pre>
        )}
        {activeTab === 'raw' && (
          <pre className="bg-gray-950 rounded p-3 md:p-4 overflow-auto text-xs md:text-sm font-mono text-gray-300 border border-gray-800">
            {JSON.stringify(response.data)}
          </pre>
        )}
        {activeTab === 'headers' && (
          <div className="bg-gray-950 rounded p-3 md:p-4 space-y-1 text-xs md:text-sm font-mono border border-gray-800">
            {Object.entries(response.headers).map(([key, value]) => (
              <div key={key} className="flex gap-2">
                <span className="text-gray-500 min-w-[120px] md:min-w-[200px]">{key}:</span>
                <span className="text-gray-300 break-all">{value}</span>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'tests' && (
          <div className="text-gray-500 text-xs md:text-sm">
            No test results available
          </div>
        )}
      </div>
    </div>
  );
};

// Helper function to format bytes
function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';
  const k = 1024;
  const sizes = ['B', 'KB', 'MB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
}

// Placeholder Wand2 icon
const Wand2: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 21l9-9m0 0l9-9m-9 9l9 9m-9-9L3 3" />
  </svg>
);
