import React from 'react';
import { Import, Share2 } from 'lucide-react';
import { Button, Input, MethodSelector } from '../atoms';
import type { HttpMethod } from '../../types';

interface RequestPanelProps {
  url: string;
  method: HttpMethod;
  onUrlChange: (url: string) => void;
  onMethodChange: (method: HttpMethod) => void;
  onSend: () => void;
  onImportCurl?: () => void;
  onShare?: () => void;
  isLoading?: boolean;
}

export const RequestPanel: React.FC<RequestPanelProps> = ({
  url,
  method,
  onUrlChange,
  onMethodChange,
  onSend,
  onImportCurl,
  onShare,
  isLoading = false,
}) => {
  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="flex items-center gap-3 px-6 py-4">
        <div className="shrink-0">
          <MethodSelector value={method} onChange={onMethodChange} />
        </div>
        <div className="grow">
          <Input
            type="url"
            placeholder="Enter request URL or import from cURL"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            className="font-mono text-sm bg-transparent border-none text-gray-400 focus:text-white"
          />
        </div>
        <div className="flex gap-1.5 shrink-0">
          <Button
            onClick={onSend}
            isLoading={isLoading}
            disabled={!url}
            className="bg-[#6760e3] hover:bg-[#5b54d2] px-8 py-2"
          >
            Send
          </Button>
          {onImportCurl && (
            <Button
              variant="secondary"
              onClick={onImportCurl}
              className="bg-transparent border-0 px-2 py-2 gap-2 text-gray-300 hover:text-white transition-all"
              title="Import cURL"
            >
              <Import size={18} color='#9CA3AF' />
              <span className="text-sm font-medium text-gray-400">Import</span>
            </Button>
          )}
          {onShare && (
            <Button
              variant="secondary"
              onClick={onShare}
              className="bg-transparent border-0 hover:bg-[#101727] px-2 py-2 gap-2 text-gray-300 hover:text-white transition-all"
              title="Share as Embed"
            >
              <Share2 size={18} color='#9CA3AF' />
              <span className="text-sm font-medium text-gray-400">Share</span>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};
