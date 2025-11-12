import React from 'react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  maxWidth = '2xl',
}) => {
  if (!isOpen) return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl',
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4 overflow-y-auto">
        <div className={`bg-gray-900 rounded-lg shadow-2xl border border-gray-800 w-full ${maxWidthClasses[maxWidth]} my-8 max-h-[calc(100vh-2rem)]`}>
          {/* Header - Sticky */}
          <div className="flex items-center justify-between px-6 py-3 border-b border-gray-800 bg-gray-900 sticky top-0 z-10 rounded-t-lg">
            <div className="flex items-center gap-3">
              {icon && (
                <div className="p-2 bg-indigo-500/10 rounded-lg">
                  {icon}
                </div>
              )}
              <div>
                <h2 className="text-lg font-medium text-white">{title}</h2>
                {description && (
                  <p className="text-sm text-gray-400">{description}</p>
                )}
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content - Scrollable */}
          <div className="overflow-y-auto max-h-[calc(100vh-12rem)]">
            {children}
          </div>
        </div>
      </div>
    </>
  );
};
