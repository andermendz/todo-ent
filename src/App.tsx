import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { addTodo, updateTodo, deleteTodo } from './store/slices/todoSlice';
import { useTheme } from './hooks/useTheme';
import type { RootState } from './store/store';
import type { Todo } from './types/todo';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');
  const { theme, toggleTheme } = useTheme();

  const handleAddTodo = (values: Partial<Todo>) => {
    const newTodo: Todo = {
      id: Date.now().toString(),
      title: values.title!,
      status: 'Todo',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    dispatch(addTodo(newTodo));
  };

  const handleUpdateTodo = (todo: Todo) => {
    dispatch(updateTodo(todo));
  };

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleStatusChange = (id: string, newStatus: Todo['status']) => {
    const todo = todos.find((t) => t.id === id);
    if (todo) {
      dispatch(updateTodo({ ...todo, status: newStatus }));
    }
  };

  const filteredTodos = todos.filter((todo) => 
    status === 'all' ? true : todo.status === status
  );

  const statusOptions = ['all', 'Todo', 'Doing', 'Done'] as const;

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white transition-colors duration-300">
            Todo App
          </h1>
          <button
            onClick={toggleTheme}
            className="p-3 rounded-full bg-gray-200 dark:bg-gray-700 transition-all duration-300 hover:scale-110"
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? '🌞' : '🌙'}
          </button>
        </div>
        
        <div className="animate-fade-in">
          <TodoForm onSubmit={handleAddTodo} />
        </div>

        <div className="flex flex-wrap gap-2 mb-6 animate-fade-in">
          {statusOptions.map((tab) => (
            <button
              key={tab}
              onClick={() => setStatus(tab)}
              className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                status === tab
                  ? 'bg-primary-dark dark:bg-primary-light text-white transform scale-105'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600'
              }`}
            >
              {tab === 'all' ? 'All' : tab}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTodos.map((todo, index) => (
            <div
              key={todo.id}
              className="animate-slide-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TodoItem
                todo={todo}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
              />
            </div>
          ))}
          {filteredTodos.length === 0 && (
            <p className="text-center text-gray-500 dark:text-gray-400 py-8 animate-fade-in">
              No todos found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
