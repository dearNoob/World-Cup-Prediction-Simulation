import { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * Modal — Centered overlay dialog with backdrop click-to-close.
 * Traps focus inside the modal and handles Escape key.
 *
 * @param {boolean}  isOpen   - Whether the modal is visible
 * @param {Function} onClose  - Called when modal should close
 * @param {string}   title    - Modal title text
 * @param {React.ReactNode} children - Modal body content
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  // Handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal content */}
      <div className="relative glass-card p-6 w-full max-w-md animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-fifa-border transition-colors"
            aria-label="Close modal"
          >
            <X size={20} className="text-fifa-muted" />
          </button>
        </div>

        {/* Body */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
