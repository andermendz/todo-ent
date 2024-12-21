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
  const [pendingStatus, setPendingStatus] = useState<Todo["status"] | null>(
    null
  );
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
    switch (status) {
      case "Todo":
        return "bg-yellow-100 text-yellow-800";
      case "Doing":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-md p-6 mb-4 hover:shadow-lg transition-shadow">
        <div className="flex justify-between items-start gap-2">
          <div className="flex-grow">
            {isEditing ? (
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                autoFocus
              />
            ) : (
              <>
                <h3 className="text-lg font-semibold mb-2">{todo.title}</h3>
                <div className="space-y-1">
                  <p className="text-sm text-gray-500">
                    Created: {new Date(todo.createdAt).toLocaleString()}
                  </p>
                  {todo.createdAt.toString() !== todo.updatedAt.toString() && (
                    <p className="text-sm text-gray-500">
                      Updated: {new Date(todo.updatedAt).toLocaleString()}
                    </p>
                  )}
                </div>
              </>
            )}
          </div>
          <div className="flex items-center gap-3">
            <select
              value={todo.status}
              onChange={(e) =>
                handleStatusChange(e.target.value as Todo["status"])
              }
              className={`px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(
                todo.status
              )} border-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500`}
            >
              <option value="Todo">Todo</option>
              <option value="Doing">Doing</option>
              <option value="Done">Done</option>
            </select>
            {isEditing ? (
              <>
                <button
                  onClick={handleSave}
                  className="p-2 text-green-600 hover:bg-green-50 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
                <button
                  onClick={handleCancel}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={() => setIsEditing(true)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                  </svg>
                </button>
                <button
                  onClick={() => onDelete(todo.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-full"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </>
            )}
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
