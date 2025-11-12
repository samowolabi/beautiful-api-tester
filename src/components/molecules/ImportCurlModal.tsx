import React, { useState } from 'react';
import { FileCode, AlertCircle } from 'lucide-react';
import { Button, TextArea } from '../atoms';
import { Modal } from './Modal';
import { CurlParser } from '../../utils/curl-parser';
import type { ParsedCurlRequest } from '../../utils/curl-parser';

interface ImportCurlModalProps {
  isOpen: boolean;
  onClose: () => void;
  onImport: (parsed: ParsedCurlRequest) => void;
}

export const ImportCurlModal: React.FC<ImportCurlModalProps> = ({
  isOpen,
  onClose,
  onImport,
}) => {
  const [curlInput, setCurlInput] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    if (!curlInput.trim()) {
      setError('Please paste a cURL command');
      return;
    }

    if (!CurlParser.isValidCurl(curlInput)) {
      setError('Invalid cURL command. Please paste a valid cURL command.');
      return;
    }

    try {
      const parsed = CurlParser.parse(curlInput);
      
      if (!parsed.url) {
        setError('Could not extract URL from cURL command');
        return;
      }

      onImport(parsed);
      setCurlInput('');
      setError('');
      onClose();
    } catch (err) {
      setError('Failed to parse cURL command. Please check the format.');
    }
  };

  const handleClose = () => {
    setCurlInput('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      title="Import cURL"
      description="Paste your cURL command to import"
      icon={<FileCode className="w-5 h-5 text-indigo-400" />}
    >
      <div className="p-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              cURL Command
            </label>
            <TextArea
              value={curlInput}
              onChange={(e) => {
                setCurlInput(e.target.value);
                setError('');
              }}
              placeholder="curl -X POST https://api.example.com/endpoint \&#10;  -H 'Content-Type: application/json' \&#10;  -H 'Authorization: Bearer YOUR_TOKEN' \&#10;  -d '{&quot;key&quot;: &quot;value&quot;}'"
              rows={10}
              className="font-mono text-sm bg-gray-950 border-gray-700 text-gray-300 outline-0 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>

          {/* Error Message */}
          {error && (
            <div className="flex items-start gap-2">
              <AlertCircle className="w-4 h-4 text-orange-700 shrink-0" />
              <p className="text-xs text-orange-600">{error}</p>
            </div>
          )}

          {/* Info Box */}
          <div className="bg-gray-800/50">
            <p className="text-xs text-gray-400 leading-relaxed">
              <strong className="text-gray-300">Tip:</strong> You can copy cURL commands from browser DevTools (Network tab) 
              or API documentation. The parser will automatically extract the URL, method, headers, body, and authentication.
            </p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800">
        <Button
          variant="ghost"
          onClick={handleClose}
          className="px-4 py-2"
        >
          Cancel
        </Button>
        <Button
          onClick={handleImport}
          disabled={!curlInput.trim()}
          className="bg-indigo-600 hover:bg-indigo-700 px-6 py-2"
        >
          Import
        </Button>
      </div>
    </Modal>
  );
};
