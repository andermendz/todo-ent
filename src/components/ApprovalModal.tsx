import { useEffect, useRef } from 'react';

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  title: string;
  message?: string;
  confirmText?: string;
  confirmStyle?: 'primary' | 'danger';
}

export const ApprovalModal = ({ 
  open, 
  onClose, 
  onApprove, 
  title,
  message = 'Are you sure you want to mark this task as done?',
  confirmText = 'Approve',
  confirmStyle = 'primary'
}: ApprovalModalProps) => {
  // refs for focus management / referencias para gestión del foco
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  // handle keyboard events and focus / manejar eventos de teclado y foco
  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  // don't render if not open / no renderizar si no está abierto
  if (!open) return null;

  return (
    // modal backdrop / fondo del modal
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm
                flex items-center justify-center z-50
                animate-fade-in"
      onClick={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      {/* modal content / contenido del modal */}
      <div 
        ref={modalRef}
        className="bg-white dark:bg-surface-dark rounded-2xl p-6
                  max-w-md w-full mx-4 shadow-premium dark:shadow-premium-dark
                  animate-scale overflow-hidden"
        role="document"
      >
        {/* modal title / título del modal */}
        <h2 
          id="modal-title" 
          className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4
                     break-words line-clamp-2"
        >
          {title}
        </h2>
        
        {/* modal message / mensaje del modal */}
        <p 
          id="modal-description" 
          className="text-slate-600 dark:text-slate-400 mb-6
                     break-words line-clamp-3"
        >
          {message}
        </p>
        
        {/* modal actions / acciones del modal */}
        <div className="flex justify-end gap-3">
          {/* cancel button / botón de cancelar */}
          <button
            ref={closeButtonRef}
            onClick={onClose}
            className="px-4 py-2 rounded-xl border border-slate-200
                     dark:border-slate-700 hover:bg-slate-50
                     dark:hover:bg-slate-800 transition-all duration-200
                     text-slate-600 dark:text-slate-300
                     focus:outline-none focus:ring-2 focus:ring-primary-light
                     whitespace-nowrap"
          >
            Cancel
          </button>
          
          {/* confirm button / botón de confirmar */}
          <button
            onClick={onApprove}
            className={`px-4 py-2 rounded-xl text-white
                     transition-all duration-200 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-primary-light
                     whitespace-nowrap
                     ${confirmStyle === 'danger' 
                       ? 'bg-rose-500 hover:bg-rose-600' 
                       : 'bg-primary-light hover:bg-primary-dark'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};