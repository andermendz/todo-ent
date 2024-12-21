interface ApprovalModalProps {
    open: boolean;
    onClose: () => void;
    onApprove: () => void;
    title: string;
  }
  
  export const ApprovalModal = ({ open, onClose, onApprove, title }: ApprovalModalProps) => {
    if (!open) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl transform transition-all">
          <h2 className="text-xl font-bold mb-4">Confirm Status Change</h2>
          <p className="text-gray-600 mb-6">
            Are you sure you want to mark "{title}" as done?
          </p>
          <div className="flex justify-end gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={onApprove}
              className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
            >
              Approve
            </button>
          </div>
        </div>
      </div>
    );
  };
  