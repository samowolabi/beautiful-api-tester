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
        px-3 md:px-4 py-2 md:py-3 font-heading text-xs transition-all duration-200
        border-b-2 inline-flex items-center gap-1.5 md:gap-2
        ${isActive 
          ? 'border-indigo-500 text-white' 
          : 'border-transparent text-gray-400 hover:text-gray-300'
        }
      `}
    >
      {icon && <span className="w-3.5 h-3.5 md:w-4 md:h-4">{icon}</span>}
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
