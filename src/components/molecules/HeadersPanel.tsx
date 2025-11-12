import React from 'react';
import { Plus, X } from 'lucide-react';
import { Button, Input } from '../atoms';
import type { Header } from '../../types';

interface HeadersPanelProps {
  headers: Header[];
  onChange: (headers: Header[]) => void;
}

export const HeadersPanel: React.FC<HeadersPanelProps> = ({ headers, onChange }) => {
  const addHeader = () => {
    const newHeader: Header = {
      id: Date.now().toString(),
      key: '',
      value: '',
      enabled: true,
    };
    onChange([...headers, newHeader]);
  };

  const updateHeader = (id: string, field: 'key' | 'value' | 'enabled', value: string | boolean) => {
    onChange(
      headers.map((header) =>
        header.id === id ? { ...header, [field]: value } : header
      )
    );
  };

  const removeHeader = (id: string) => {
    onChange(headers.filter((header) => header.id !== id));
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="space-y-3">
        {headers.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500 mb-4 font-body">
              No headers added yet.
            </p>
            <Button size="sm" variant="ghost" onClick={addHeader} className="gap-1 border border-gray-700">
              <Plus size={14} />
              Add Header
            </Button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-12 gap-2 text-xs text-gray-500 px-2 mb-2">
              <div className="col-span-1"></div>
              <div className="col-span-5">Key</div>
              <div className="col-span-5">Value</div>
              <div className="col-span-1"></div>
            </div>
            {headers.map((header) => (
              <div key={header.id} className="grid grid-cols-12 gap-2 items-center">
                <div className="col-span-1 flex justify-center">
                  <input
                    type="checkbox"
                    checked={header.enabled}
                    onChange={(e) => updateHeader(header.id, 'enabled', e.target.checked)}
                    className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
                  />
                </div>
                <div className="col-span-5">
                  <Input
                    placeholder="Header name"
                    value={header.key}
                    onChange={(e) => updateHeader(header.id, 'key', e.target.value)}
                    disabled={!header.enabled}
                    className="font-mono text-sm bg-gray-800 border-gray-700 text-gray-300"
                  />
                </div>
                <div className="col-span-5">
                  <Input
                    placeholder="Header value"
                    value={header.value}
                    onChange={(e) => updateHeader(header.id, 'value', e.target.value)}
                    disabled={!header.enabled}
                    className="font-mono text-sm bg-gray-800 border-gray-700 text-gray-300"
                  />
                </div>
                <div className="col-span-1 flex justify-center">
                  <button
                    onClick={() => removeHeader(header.id)}
                    className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    title="Remove header"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ))}
            <button
              onClick={addHeader}
              className="text-sm text-gray-400 hover:text-white flex items-center gap-2 px-2 py-2"
            >
              <Plus size={14} />
              Add Header
            </button>
          </>
        )}
      </div>
    </div>
  );
};
