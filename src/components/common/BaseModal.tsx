import React from 'react';

interface BaseModalProps {
  open?: boolean;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
  containerClassName?: string;
  contentClassName?: string;
}

export function BaseModal({
  open = true,
  title,
  subtitle,
  onClose,
  children,
  containerClassName = '',
  contentClassName = '',
}: BaseModalProps) {
  if (!open) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 ${containerClassName}`}
      onClick={(e) => {
        e.stopPropagation();
        onClose?.();
      }}
    >
      <div
        className={`bg-gradient-to-b from-primary-light/30 to-white rounded-3xl shadow-2xl max-w-md w-full p-8 text-center animate-in fade-in zoom-in duration-500 ${contentClassName}`}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || subtitle) && (
          <div className="mb-6">
            {title && (
              <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-primary mb-2">
                {title}
              </h2>
            )}
            {subtitle && <p className="text-gray-600">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
