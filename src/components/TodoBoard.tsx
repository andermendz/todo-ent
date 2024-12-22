import { useState } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { useCallback } from 'react';
import { ListBulletIcon, ClockIcon, CheckCircleIcon } from '@heroicons/react/24/outline';
import { ApprovalModal } from './ApprovalModal';

interface TodoBoardProps {
  todos: Todo[];
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
  activeOptionsId: string | null;
  onOptionsClick: (id: string | null) => void;
}

export const TodoBoard = ({
  todos,
  onStatusChange,
  onDelete,
  onUpdate,
  activeOptionsId,
  onOptionsClick
}: TodoBoardProps) => {
  const [showApprovalModal, setShowApprovalModal] = useState(false);
  const [pendingDragAction, setPendingDragAction] = useState<{
    todoId: string;
    newStatus: Todo['status'];
  } | null>(null);

  const columns = [
    { 
      id: 'To Do', 
      title: 'To Do', 
      icon: ListBulletIcon, 
      color: 'bg-blue-100/80 dark:bg-blue-500/5' 
    },
    { 
      id: 'In Progress', 
      title: 'In Progress', 
      icon: ClockIcon, 
      color: 'bg-amber-100/80 dark:bg-amber-500/10' 
    },
    { 
      id: 'Done', 
      title: 'Done', 
      icon: CheckCircleIcon, 
      color: 'bg-emerald-100/80 dark:bg-emerald-500/5' 
    }
  ];

  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, draggableId } = result;
    if (!destination) return;
    
    const newStatus = destination.droppableId as Todo['status'];
    if (newStatus === 'Done') {
      setPendingDragAction({ todoId: draggableId, newStatus });
      setShowApprovalModal(true);
    } else {
      onStatusChange(draggableId, newStatus);
    }
  }, [onStatusChange]);

  const handleApprove = () => {
    if (pendingDragAction) {
      onStatusChange(pendingDragAction.todoId, pendingDragAction.newStatus);
      setPendingDragAction(null);
    }
    setShowApprovalModal(false);
  };

  const todo = pendingDragAction ? todos.find(t => t.id === pendingDragAction.todoId) : null;

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div 
          className="grid grid-cols-3 gap-6 min-h-[600px] w-full"
          role="region"
          aria-label="Task board"
        >
          {columns.map(column => (
            <div 
              key={column.id}
              className={`rounded-xl p-4 flex flex-col ${column.color}`}
              role="region"
              aria-label={`${column.title} column`}
            >
              <div className="flex items-center gap-2 mb-4">
                <column.icon className="w-5 h-5 text-slate-600 dark:text-slate-400" />
                <h3 
                  id={`column-${column.id}`}
                  className="text-lg font-semibold text-slate-700 dark:text-slate-300"
                >
                  {column.title}
                </h3>
                <span className="ml-auto text-sm text-slate-500 dark:text-slate-400">
                  {todos.filter(todo => todo.status === column.id).length}
                </span>
              </div>
              
              <Droppable droppableId={column.id}>
                {(provided, snapshot) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className={`flex-1 space-y-3 p-2 rounded-lg transition-colors duration-200
                              ${snapshot.isDraggingOver 
                                ? 'bg-slate-100/80 dark:bg-slate-800/80' 
                                : 'bg-transparent'
                              }`}
                    role="list"
                    aria-labelledby={`column-${column.id}`}
                  >
                    {todos
                      .filter(todo => todo.status === column.id)
                      .map((todo, index) => (
                        <Draggable 
                          key={todo.id} 
                          draggableId={todo.id} 
                          index={index}
                        >
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              {...provided.dragHandleProps}
                              className={`transition-all duration-200
                                        ${snapshot.isDragging 
                                          ? 'rotate-2 scale-105 shadow-lg' 
                                          : 'rotate-0 scale-100'}`}
                            >
                              <TodoItem
                                todo={todo}
                                onStatusChange={onStatusChange}
                                onDelete={onDelete}
                                onUpdate={onUpdate}
                                activeOptionsId={activeOptionsId}
                                onOptionsClick={onOptionsClick}
                                isBoardMode={true}
                              />
                            </div>
                          )}
                        </Draggable>
                      ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>

      <ApprovalModal
        open={showApprovalModal}
        onClose={() => {
          setShowApprovalModal(false);
          setPendingDragAction(null);
        }}
        onApprove={handleApprove}
        title={todo?.title || ''}
        message="Are you sure you want to mark this task as done?"
        confirmText="Approve"
        confirmStyle="primary"
      />
    </>
  );
}; 