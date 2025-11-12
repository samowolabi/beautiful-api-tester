import React from 'react';
import { ChevronDown } from 'lucide-react';
import type { HttpMethod } from '../../types';

interface MethodSelectorProps {
  value: HttpMethod;
  onChange: (method: HttpMethod) => void;
}

const methods: HttpMethod[] = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'];

const methodColors: Record<HttpMethod, string> = {
  GET: 'text-green-500',
  POST: 'text-indigo-500',
  PUT: 'text-yellow-500',
  PATCH: 'text-orange-500',
  DELETE: 'text-red-500',
};

export const MethodSelector: React.FC<MethodSelectorProps> = ({ value, onChange }) => {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value as HttpMethod)}
        className={`
          appearance-none bg-gray-800 border border-gray-700 rounded px-4 py-2 pr-10
          font-heading font-bold text-sm cursor-pointer outline-0
          ${methodColors[value]}
        `}
      >
        {methods.map((method) => (
          <option key={method} value={method}>
            {method}
          </option>
        ))}
      </select>
      <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
    </div>
  );
};
