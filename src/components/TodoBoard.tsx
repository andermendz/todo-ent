import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { Todo } from '../types/todo';
import { TodoItem } from './TodoItem';
import { useCallback } from 'react';

interface TodoBoardProps {
  todos: Todo[];
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
  activeOptionsId: string | null;
  onOptionsClick: (id: string | null) => void;
}

const columns = [
  { id: 'Todo', title: 'To Do' },
  { id: 'Doing', title: 'In Progress' },
  { id: 'Done', title: 'Done' }
] as const;

export const TodoBoard = ({
  todos,
  onStatusChange,
  onDelete,
  onUpdate,
  activeOptionsId,
  onOptionsClick
}: TodoBoardProps) => {
  const handleDragEnd = useCallback((result: DropResult) => {
    const { destination, draggableId } = result;

    if (!destination) return;

    const newStatus = destination.droppableId as Todo['status'];
    onStatusChange(draggableId, newStatus);
  }, [onStatusChange]);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <div 
        className="grid grid-cols-3 gap-6 min-h-[600px] w-full"
        role="region"
        aria-label="Task board"
      >
        {columns.map(column => (
          <div 
            key={column.id}
            className="bg-slate-100 dark:bg-slate-800 rounded-xl p-6 flex flex-col"
            role="region"
            aria-label={`${column.title} column`}
          >
            <h3 
              id={`column-${column.id}`}
              className="text-xl font-semibold mb-4 text-slate-700 dark:text-slate-300"
            >
              {column.title}
            </h3>
            
            <Droppable droppableId={column.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`flex-1 space-y-4 p-2 rounded-md transition-bg duration-200
                            ${snapshot.isDraggingOver ? 'bg-slate-200 dark:bg-slate-700' : 'bg-slate-100 dark:bg-slate-800'}`}
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
                            className={`transition-shadow duration-200
                                      ${snapshot.isDragging ? 'shadow-lg opacity-75' : 'shadow-md opacity-100'}`}
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
  );
}; 