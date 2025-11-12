import React, { useState } from 'react';
import { HelpCircle, Trash2, Eye, EyeOff } from 'lucide-react';
import { Input } from '../atoms';
import type { Authentication, AuthenticationType } from '../../types';

interface AuthorizationPanelProps {
  authentication: Authentication;
  onChange: (authentication: Authentication) => void;
}

export const AuthorizationPanel: React.FC<AuthorizationPanelProps> = ({
  authentication,
  onChange,
}) => {
  const [showToken, setShowToken] = useState(false);

  const handleTypeChange = (type: AuthenticationType) => {
    onChange({
      ...authentication,
      type,
      enabled: type !== 'None',
      token: type === 'None' ? '' : authentication.token,
    });
  };

  const handleTokenChange = (token: string) => {
    onChange({
      ...authentication,
      token,
    });
  };

  const handleEnabledChange = (enabled: boolean) => {
    onChange({
      ...authentication,
      enabled,
    });
  };

  const handleClear = () => {
    onChange({
      type: 'None',
      token: '',
      enabled: false,
    });
  };

  return (
    <div className="bg-gray-900 p-6">
      <div className="space-y-6">
        {/* Header with Enable toggle and Delete */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <label className="text-sm text-gray-400">Authorization Type</label>
            <select
              value={authentication.type}
              onChange={(e) => handleTypeChange(e.target.value as AuthenticationType)}
              className="bg-gray-800 border border-gray-700 text-gray-300 text-sm rounded-lg px-3 py-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="None">None</option>
              <option value="Bearer">Bearer Token</option>
            </select>
          </div>

          {authentication.type !== 'None' && (
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={authentication.enabled}
                  onChange={(e) => handleEnabledChange(e.target.checked)}
                  className="w-4 h-4 text-indigo-600 bg-gray-800 border-gray-700 rounded focus:ring-indigo-500"
                />
                <span className="text-sm text-gray-300">Enabled</span>
              </label>

              <button
                onClick={handleClear}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                title="Clear authorization"
              >
                <Trash2 size={16} />
              </button>

              <button
                className="p-2 text-gray-400 hover:text-indigo-400 transition-colors"
                title="Learn more"
              >
                <HelpCircle size={16} />
              </button>
            </div>
          )}
        </div>

        {/* Bearer Token Input */}
        {authentication.type === 'Bearer' && (
          <div className="space-y-3">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Token</label>
              <div className="relative">
                <Input
                  type={showToken ? "text" : "password"}
                  placeholder="YOUR_SECRET_KEY"
                  value={authentication.token}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  disabled={!authentication.enabled}
                  className="font-mono text-sm bg-gray-800 border-gray-700 text-gray-300 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowToken(!showToken)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-300 transition-colors"
                  title={showToken ? "Hide token" : "Show token"}
                  disabled={!authentication.enabled}
                >
                  {showToken ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-4">
              <p className="text-xs text-gray-400 leading-relaxed">
                The authorization header will be automatically generated when you send the request.
              </p>
              {authentication.enabled && authentication.token && (
                <div className="mt-3 pt-3 border-t border-gray-700">
                  <p className="text-xs text-gray-500 mb-1">Preview:</p>
                  <code className="text-xs text-indigo-400 font-mono">
                    Authorization: Bearer {authentication.token.substring(0, 20)}
                    {authentication.token.length > 20 && '...'}
                  </code>
                </div>
              )}
            </div>
          </div>
        )}

        {/* None State */}
        {authentication.type === 'None' && (
          <div className="text-center py-8">
            <p className="text-sm text-gray-500">
              No authentication configured. Select an authentication type to get started.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
