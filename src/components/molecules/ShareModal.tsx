import React, { useState } from 'react';
import { Share2, Copy, Check } from 'lucide-react';
import { Button, TextArea } from '../atoms';
import { Modal } from './Modal';
import { ApiClient } from '../../utils/api-client';
import { useCopyToClipboard } from '../../utils/clipboard';
import type { ApiRequest } from '../../types';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  request: ApiRequest;
  baseUrl?: string;
}

export const ShareModal: React.FC<ShareModalProps> = ({
  isOpen,
  onClose,
  request,
  baseUrl = window.location.origin,
}) => {
  const { copy: copyIframeCode, copied: iframeCopied } = useCopyToClipboard();
  const { copy: copyUrl, copied: urlCopied } = useCopyToClipboard();
  const [iframeWidth, setIframeWidth] = useState('100%');
  const [iframeHeight, setIframeHeight] = useState('600px');

  // Generate cURL command from current request
  const curlCommand = ApiClient.generateCurl(request);

  // Generate embed URL
  const generateEmbedUrl = (): string => {
    const encoded = btoa(curlCommand);
    return `${baseUrl}?curl=${encodeURIComponent(encoded)}`;
  };

  // Generate iframe code
  const generateIframeCode = (): string => {
    const embedUrl = generateEmbedUrl();
    return `<iframe 
  src="${embedUrl}" 
  width="${iframeWidth}" 
  height="${iframeHeight}"
  frameborder="0"
  style="border: 1px solid #e5e7eb; border-radius: 8px;"
  title="API Tester"
></iframe>`;
  };

  const iframeCode = generateIframeCode();
  const embedUrl = generateEmbedUrl();

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Share as Embed"
      description="Generate iframe code to embed this API request"
      icon={<Share2 className="w-5 h-5 text-indigo-400" />}
    >
      {/* Scrollable Content */}
      <div className="p-6">
        <div className="space-y-6">
          {/* Iframe Dimensions */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Width</label>
              <input
                type="text"
                value={iframeWidth}
                onChange={(e) => setIframeWidth(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="100%"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-2">Height</label>
              <input
                type="text"
                value={iframeHeight}
                onChange={(e) => setIframeHeight(e.target.value)}
                className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-gray-300 text-sm focus:ring-indigo-500 focus:border-indigo-500"
                placeholder="600px"
              />
            </div>
          </div>

          {/* Embed URL */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Embed URL</label>
            <div className="relative">
              <input
                type="text"
                value={embedUrl}
                readOnly
                className="w-full px-3 py-2 pr-10 bg-gray-950 border border-gray-700 rounded-lg text-gray-300 text-sm font-mono"
              />
              <button
                onClick={() => copyUrl(embedUrl)}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-white transition-colors"
                title="Copy URL"
              >
                {urlCopied ? <Check size={16} /> : <Copy size={16} />}
              </button>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Direct link to pre-loaded API tester
            </p>
          </div>

          {/* Iframe Code */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm text-gray-400">Iframe Embed Code</label>
              <Button
                onClick={() => copyIframeCode(iframeCode)}
                size="sm"
                variant="ghost"
                className="gap-2 text-gray-200 hover:text-white"
              >
                {iframeCopied ? (
                  <>
                    <Check size={14} />
                    <span className="text-xs">Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span className="text-xs">Copy Code</span>
                  </>
                )}
              </Button>
            </div>
            <TextArea
              value={iframeCode}
              readOnly
              rows={8}
              className="font-mono text-xs bg-gray-950 border-gray-700 text-gray-300 resize-none"
            />
          </div>

          {/* Preview Info */}
          <div className="bg-gray-800/50">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">How to use:</strong> Copy the iframe code above and paste it into your website, 
              documentation, or blog. The API request will be automatically loaded when the page loads.
            </p>
          </div>

          {/* cURL Preview */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">Current cURL Command</label>
            <TextArea
              value={curlCommand}
              readOnly
              rows={6}
              className="font-mono text-xs bg-gray-950 border-gray-700 text-gray-300"
            />
          </div>
        </div>
      </div>

      {/* Footer - Sticky */}
      <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-gray-800 bg-gray-900 sticky bottom-0 rounded-b-lg">
        <Button
          variant="ghost"
          onClick={onClose}
          className="px-4 py-2"
        >
          Close
        </Button>
        <Button
          onClick={() => copyIframeCode(iframeCode)}
          className="bg-indigo-600 hover:bg-indigo-700 text-sm px-2.5 py-1.5 gap-2"
        >
          {iframeCopied ? <Check size={16} /> : <Copy size={16} />}
          {iframeCopied ? 'Copied!' : 'Copy Embed Code'}
        </Button>
      </div>
    </Modal>
  );
};
