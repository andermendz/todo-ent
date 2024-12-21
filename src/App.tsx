import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTheme } from './hooks/useTheme';
import { AppDispatch, RootState } from './store/store';
import { fetchTodos, createTodo, updateTodoStatus, removeTodo, updateTodo } from './store/slices/todoSlice';
import { Todo } from './types/todo';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: todos, loading, error } = useSelector((state: RootState) => state.todos);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');
  const { theme, toggleTheme } = useTheme();
  const [activeOptionsId, setActiveOptionsId] = useState<string | null>(null);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = async (values: Partial<Todo>) => {
    const newTodo = {
      title: values.title!,
      status: 'Todo' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    await dispatch(createTodo(newTodo));
  };

  const handleStatusChange = async (id: string, newStatus: Todo['status']) => {
    await dispatch(updateTodoStatus({ id, status: newStatus }));
  };

  const handleDeleteTodo = async (id: string) => {
    await dispatch(removeTodo(id));
  };

  const handleUpdateTodo = async (todo: Todo) => {
    await dispatch(updateTodo(todo));
  };

  const filteredTodos = todos.filter((todo) => 
    status === 'all' ? true : todo.status === status
  );

  const statusOptions = ['all', 'Todo', 'Doing', 'Done'] as const;

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  if (loading) {
    return (
      <div 
        className="text-center py-8" 
        role="status" 
        aria-live="polite"
      >
        Loading tasks...
      </div>
    );
  }

  if (error) {
    return (
      <div 
        className="text-center py-8 text-red-600" 
        role="alert"
        aria-live="assertive"
      >
        {error}
      </div>
    );
  }

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
                  bg-primary-light text-white px-4 py-2 rounded-lg z-50
                  focus:outline-none focus:ring-2 focus:ring-primary-light"
      >
        Skip to main content
      </a>
      
      <div className="min-h-screen transition-colors duration-300 bg-background-light dark:bg-background-dark">
      <main id="main-content" className="max-w-3xl mx-auto px-4 py-12 pb-28">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-slate-800 dark:text-slate-200">
              Tasks
            </h1>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl bg-slate-100 dark:bg-slate-800 
                       hover:bg-slate-200 dark:hover:bg-slate-700
                       transition-colors duration-200
                       focus:outline-none focus:ring-2 focus:ring-primary-light"
              aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <SunIcon className="w-6 h-6 text-amber-500" aria-hidden="true" />
              ) : (
                <MoonIcon className="w-6 h-6 text-slate-700" aria-hidden="true" />
              )}
            </button>
          </div>
          
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">Add New Task</h2>
            <TodoForm onSubmit={handleAddTodo} />
          </section>

          <section aria-labelledby="filter-heading" className="mt-8">
            <h2 id="filter-heading" className="sr-only">Filter Tasks</h2>
            <div className="flex gap-2 mb-6" role="radiogroup" aria-label="Filter tasks by status">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setStatus(option)}
                  onKeyDown={(e) => handleKeyPress(e, () => setStatus(option))}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-light
                            ${status === option
                              ? 'bg-primary-light text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                  role="radio"
                  aria-checked={status === option}
                  tabIndex={0}
                >
                  {option}
                </button>
              ))}
            </div>
          </section>

          <section aria-labelledby="todo-list-heading">
            <h2 id="todo-list-heading" className="sr-only">Task List</h2>
            {filteredTodos.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400" role="status">
                No tasks found
              </p>
            ) : (
              <ul className="space-y-3" role="list">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem
                      todo={todo}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTodo}
                      onUpdate={handleUpdateTodo}
                      activeOptionsId={activeOptionsId}
                      onOptionsClick={setActiveOptionsId}
                    />
                  </li>
                ))}
              </ul>
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
