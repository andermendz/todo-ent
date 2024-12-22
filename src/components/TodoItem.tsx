import { useState, useEffect } from "react";
import { TrashIcon, CheckCircleIcon, ClockIcon, ListBulletIcon, PencilIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { Todo } from "../types/todo";
import { ApprovalModal } from "./ApprovalModal";

// props for the todo item component / props para el componente de item todo
interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: Todo["status"]) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
  activeOptionsId: string | null;
  onOptionsClick: (id: string | null) => void;
  isBoardMode?: boolean;
}

export const TodoItem = ({ 
  todo, 
  onStatusChange, 
  onDelete, 
  onUpdate,
  activeOptionsId,
  onOptionsClick,
  isBoardMode
}: TodoItemProps) => {
  // modal and edit states / estados de modal y edición
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Todo["status"] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(todo.title);

  // status options with their icons and colors / opciones de estado con sus iconos y colores
  const statusOptions = [
    { value: 'To Do', icon: ListBulletIcon, color: 'text-blue-500' },
    { value: 'In Progress', icon: ClockIcon, color: 'text-amber-500' },
    { value: 'Done', icon: CheckCircleIcon, color: 'text-emerald-500' },
  ] as const;

  // handle status changes / manejar cambios de estado
  const handleStatusChange = (newStatus: Todo["status"]) => {
    if (newStatus === "Done") {
      setShowApprovalModal(true);
      setPendingStatus(newStatus);
    } else {
      onStatusChange(todo.id, newStatus);
    }
    onOptionsClick(null);
  };

  // approve status change / aprobar cambio de estado
  const handleApprove = () => {
    if (pendingStatus) {
      onStatusChange(todo.id, pendingStatus);
      setShowApprovalModal(false);
      setPendingStatus(null);
    }
  };

  // delete todo / eliminar todo
  const handleDelete = () => {
    setShowDeleteModal(false);
    onDelete(todo.id);
  };

  // get current status info / obtener información del estado actual
  const currentStatus = statusOptions.find(status => status.value === todo.status);
  const CurrentIcon = currentStatus?.icon;
  const isOptionsOpen = activeOptionsId === todo.id;

  // edit mode handlers / manejadores del modo de edición
  const handleEditClick = () => {
    setIsEditing(true);
    setEditedTitle(todo.title);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditedTitle(todo.title);
  };

  // title validation / validación del título
  const isValidTitle = (title: string) => {
    const trimmedTitle = title.trim();
    return trimmedTitle.length >= 3 && trimmedTitle.length <= 50;
  };

  // submit edit / enviar edición
  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isValidTitle(editedTitle) && editedTitle !== todo.title) {
      onUpdate({
        ...todo,
        title: editedTitle.trim(),
        updatedAt: new Date()
      });
    }
    setIsEditing(false);
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setIsExpanded(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // unique ids for accessibility / ids únicos para accesibilidad
  const statusButtonId = `status-button-${todo.id}`;
  const statusMenuId = `status-menu-${todo.id}`;

  return (
    <>
      <div 
        className={`group bg-white dark:bg-surface-dark rounded-xl shadow-md
                   ${isBoardMode ? 'p-3' : 'p-5'} 
                   hover:shadow-lg transition-all duration-300
                   animate-slide-in w-full`}
        role="listitem"
        aria-label={`Task: ${todo.title}`}
      >
        {isEditing ? (
          <form onSubmit={handleEditSubmit} className="flex flex-col gap-2">
            <div className="flex items-start gap-2">
              <input
                type="text"
                value={editedTitle}
                onChange={(e) => setEditedTitle(e.target.value.slice(0, 50))}
                className="flex-grow px-3 py-1.5 rounded-lg text-lg
                       bg-subtle-light dark:bg-slate-800
                       border border-slate-200 dark:border-slate-700
                       focus:outline-none focus:ring-2 focus:ring-primary-light/20
                       text-slate-800 dark:text-slate-200"
                autoFocus
              />
              <button
                type="submit"
                disabled={!isValidTitle(editedTitle)}
                className={`p-1.5 rounded-lg text-emerald-500
                       bg-emerald-50 dark:bg-emerald-500/10
                       transition-all duration-200
                       ${!isValidTitle(editedTitle)
                         ? 'opacity-50 cursor-not-allowed'
                         : 'hover:bg-emerald-100 dark:hover:bg-emerald-500/20'
                       }`}
              >
                <CheckCircleIcon className="w-5 h-5" />
              </button>
              <button
                type="button"
                onClick={handleEditCancel}
                className="p-1.5 rounded-lg text-slate-500
                       bg-slate-50 dark:bg-slate-800
                       hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                <XMarkIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-between items-center text-xs text-slate-500 dark:text-slate-400 px-1">
              <span>
                {editedTitle.trim().length < 3 
                  ? 'Title must be at least 3 characters' 
                  : editedTitle.length > 50 
                    ? 'Title is too long' 
                    : ' '}
              </span>
              <span>{editedTitle.length}/50</span>
            </div>
          </form>
        ) : (
          <div className={`flex ${isBoardMode ? 'flex-col gap-3' : 'flex-row gap-4'}`}>
            <div className="flex-grow min-w-0">
              <h3 className="text-lg text-slate-800 dark:text-slate-200 font-medium 
                           leading-tight break-words">
                {todo.title}
              </h3>
              <time 
                dateTime={todo.createdAt.toString()}
                className="text-sm text-slate-500 dark:text-slate-400 block mt-1"
              >
                {new Date(todo.createdAt).toLocaleDateString(undefined, {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
                {todo.updatedAt > todo.createdAt && (
                  <span className="ml-2 text-slate-400 dark:text-slate-500">
                    (edited)
                  </span>
                )}
              </time>
            </div>

            <div className={`flex ${isBoardMode ? 'justify-between' : 'items-center gap-1.5'} flex-shrink-0`}>
              <div className="relative">
                <button
                  id={`status-button-${todo.id}`}
                  onClick={() => onOptionsClick(isOptionsOpen ? null : todo.id)}
                  aria-expanded={isOptionsOpen}
                  aria-haspopup="true"
                  aria-controls={`status-menu-${todo.id}`}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm
                           transition-all duration-200 relative
                           border border-slate-200 dark:border-slate-700
                           hover:border-slate-300 dark:hover:border-slate-600
                           ${currentStatus?.color}
                           hover:bg-slate-50 dark:hover:bg-slate-800
                           font-medium`}
                >
                  {CurrentIcon && <CurrentIcon className="w-4 h-4" aria-hidden="true" />}
                  <span>{todo.status}</span>
                </button>

                {isOptionsOpen && (
                  <div 
                    id={statusMenuId}
                    role="menu"
                    aria-labelledby={statusButtonId}
                    className="absolute right-0 mt-2 bg-white dark:bg-surface-dark rounded-xl
                                shadow-premium dark:shadow-premium-dark p-1.5
                                transform origin-top-right transition-all duration-200
                                animate-scale z-10
                                border border-slate-200 dark:border-slate-700
                                min-w-[120px] max-h-[calc(100vh-100px)]
                                overflow-y-auto
                                [&::-webkit-scrollbar]:hidden">
                    <div className="relative">
                      {statusOptions.map((option) => {
                        const Icon = option.icon;
                        return (
                          <button
                            key={option.value}
                            onClick={() => handleStatusChange(option.value)}
                            role="menuitem"
                            className={`flex items-center gap-2 w-full px-3.5 py-2.5
                                      rounded-lg text-sm font-medium
                                      transition-all duration-200
                                      ${option.color}
                                      hover:bg-slate-50 dark:hover:bg-slate-800
                                      whitespace-nowrap`}
                          >
                            <Icon className="w-4 h-4 flex-shrink-0" aria-hidden="true" />
                            {option.value}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex gap-1">
                <button
                  onClick={handleEditClick}
                  className="p-1.5 rounded-lg text-blue-500
                           bg-blue-50 dark:bg-blue-500/10
                           hover:bg-blue-100 dark:hover:bg-blue-500/20"
                  aria-label={`Edit task: ${todo.title}`}
                >
                  <PencilIcon className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowDeleteModal(true)}
                  className="p-1.5 rounded-lg text-rose-500
                           bg-rose-50 dark:bg-rose-500/10
                           hover:bg-rose-100 dark:hover:bg-rose-500/20"
                  aria-label={`Delete task: ${todo.title}`}
                >
                  <TrashIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      <ApprovalModal
        open={showApprovalModal}
        onClose={() => setShowApprovalModal(false)}
        onApprove={handleApprove}
        title={todo.title}
      />

      <ApprovalModal
        open={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onApprove={handleDelete}
        title={todo.title}
        message="Are you sure you want to delete this task?"
        confirmText="Delete"
        confirmStyle="danger"
      />
    </>
  );
};