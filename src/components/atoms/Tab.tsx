import React from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
  badge?: string | number;
}

export const Tab: React.FC<TabProps> = ({ label, isActive, onClick, icon, badge }) => {
  return (
    <button
      onClick={onClick}
      className={`
        px-4 py-3 font-heading text-sm transition-all duration-200
        border-b-2 inline-flex items-center gap-2
        ${isActive 
          ? 'border-indigo-500 text-white' 
          : 'border-transparent text-gray-400 hover:text-gray-300'
        }
      `}
    >
      {icon && <span className="w-4 h-4">{icon}</span>}
      {label}
      {badge !== undefined && (
        <span className="text-xs text-gray-500">
          {badge}
        </span>
      )}
    </button>
  );
};

interface TabsProps {
  children: React.ReactNode;
  className?: string;
}

export const Tabs: React.FC<TabsProps> = ({ children, className = '' }) => {
  return (
    <div className={`flex gap-1 border-b border-gray-800 bg-gray-900 ${className}`}>
      {children}
    </div>
  );
};
