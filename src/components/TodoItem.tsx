import { useState } from "react";
import { Todo } from "../types/todo";
import { ApprovalModal } from "./ApprovalModal";

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: Todo["status"]) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

export const TodoItem = ({
  todo,
  onStatusChange,
  onDelete,
  onUpdate,
}: TodoItemProps) => {
  const [showApproval, setShowApproval] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Todo["status"] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

  const handleStatusChange = (newStatus: Todo["status"]) => {
    if (newStatus === "Done") {
      setShowApproval(true);
      setPendingStatus(newStatus);
    } else {
      onStatusChange(todo.id, newStatus);
    }
  };

  const handleApprove = () => {
    if (pendingStatus) {
      onStatusChange(todo.id, pendingStatus);
    }
    setShowApproval(false);
    setPendingStatus(null);
  };

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate({
        ...todo,
        title: editTitle,
        updatedAt: new Date(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  const getStatusColor = (status: Todo["status"]) => {
    const colors = {
      Todo: "bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-100",
      Doing: "bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100",
      Done: "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100"
    };
    return colors[status];
  };

  return (
    <>
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
        <div className="flex justify-between items-start gap-4">
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-primary-dark transition-colors duration-300"
                autoFocus
                aria-label="Edit todo title"
              />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-white transition-colors duration-300">
                  {todo.title}
                </h3>
                <div className="space-y-1 text-sm text-gray-500 dark:text-gray-400">
                  <p>Created: {new Date(todo.createdAt).toLocaleString()}</p>
                  {todo.createdAt.toString() !== todo.updatedAt.toString() && (
                    <p>Updated: {new Date(todo.updatedAt).toLocaleString()}</p>
                  )}
                </div>
              </>
            )}
          </div>

          <div className="flex items-center gap-3">
            <select
              value={todo.status}
              onChange={(e) => handleStatusChange(e.target.value as Todo["status"])}
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                todo.status
              )} border-0 cursor-pointer focus:outline-none focus:ring-ring-primary-dark transition-all duration-300`}
              aria-label="Change todo status"
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>

            <div className="flex gap-2">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="p-2 text-green-600 hover:bg-green-50 dark:hover:bg-green-900/30 rounded-full transition-colors duration-300"
                    aria-label="Save changes"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={handleCancel}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors duration-300"
                    aria-label="Cancel editing"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(true)}
                    className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-full transition-colors duration-300"
                    aria-label="Edit todo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => onDelete(todo.id)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-full transition-colors duration-300"
                    aria-label="Delete todo"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ApprovalModal
        open={showApproval}
        onClose={() => setShowApproval(false)}
        onApprove={handleApprove}
        title={todo.title}
      />
    </>
  );
};