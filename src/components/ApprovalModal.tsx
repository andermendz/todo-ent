import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

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
  const modalRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) {
      closeButtonRef.current?.focus();
    }
  }, [open]);

  if (!open) return null;

  const modalContent = (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center 
                 bg-black/30 backdrop-blur-sm"
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div 
        ref={modalRef}
        className="bg-white dark:bg-surface-dark rounded-2xl p-6
                  max-w-md w-full mx-4 shadow-premium dark:shadow-premium-dark
                  animate-scale overflow-hidden"
        role="document"
      >
        <h2 
          id="modal-title" 
          className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-4
                     break-words line-clamp-2"
        >
          {title}
        </h2>
        
        <p 
          id="modal-description" 
          className="text-slate-600 dark:text-slate-400 mb-6
                     break-words line-clamp-3"
        >
          {message}
        </p>
        
        <div className="flex justify-end gap-3">
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
          
          <button
            onClick={onApprove}
            className={`px-4 py-2 rounded-xl text-white
                     transition-all duration-200 transform hover:scale-105
                     focus:outline-none focus:ring-2 focus:ring-primary-light
                     whitespace-nowrap
                     ${confirmStyle === 'danger' 
                       ? 'bg-rose-500 hover:bg-rose-600' 
                       : 'bg-emerald-500 hover:bg-emerald-600'}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );

  return createPortal(
    modalContent,
    document.getElementById('modal-root') || document.body
  );
};