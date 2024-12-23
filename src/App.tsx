import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState, useMemo } from 'react';
import { SunIcon, MoonIcon, ViewColumnsIcon, ListBulletIcon, BeakerIcon } from '@heroicons/react/24/outline';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTheme } from './hooks/useTheme';
import { AppDispatch, RootState } from './store/store';
import { fetchTodos, createTodo, updateTodoStatus, removeTodo, updateTodo } from './store/slices/todoSlice';
import { Todo } from './types/todo';
import { TodoBoard } from './components/TodoBoard';
import { generateTasks } from './utils/taskFactory';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: todos, loading, error } = useSelector((state: RootState) => state.todos);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');
  const { theme, toggleTheme } = useTheme();
  const [activeOptionsId, setActiveOptionsId] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'list' | 'board'>(() => 
    window.innerWidth < 768 ? 'list' : 'board'
  );

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const handleAddTodo = async (values: Partial<Todo>) => {
    const newTodo = {
      id: Date.now().toString(),
      title: values.title!,
      status: 'To Do' as const,
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

  const filteredTodos = useMemo(() => {
    if (viewMode === 'board') {
      return todos;
    }
    return status === 'all' 
      ? todos 
      : todos.filter(todo => todo.status === status);
  }, [todos, status, viewMode]);

  useEffect(() => {
    if (viewMode === 'board') {
      setStatus('all');
    }
  }, [viewMode]);

  const statusOptions = ['All', 'To Do', 'In Progress', 'Done'] as const;

  const handleKeyPress = (e: React.KeyboardEvent, action: () => void) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      action();
    }
  };

  // force list on mobile
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768 && viewMode === 'board') {
        setViewMode('list');
      }
    };

    // resize check
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [viewMode]);

  const handleViewModeChange = (newMode: 'list' | 'board') => {
    setViewMode(newMode);
    setActiveOptionsId(null); // Close any open options menu
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
      <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 
                bg-primary-light text-white px-4 py-2 rounded-lg z-50
                focus:outline-none focus:ring-2 focus:ring-primary-light">
        Skip to main content
      </a>
      
      <div className="min-h-screen transition-colors duration-300 bg-background-light dark:bg-background-dark">
        <main id="main-content" className="max-full max-w-[1400px] mx-auto px-6 py-12 pb-28">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-slate-800 dark:text-slate-200">
              Task Manager
            </h1>
            
            <div className="flex items-center gap-4">
              <div className="hidden md:flex items-center gap-2">
                <button
                  onClick={() => handleViewModeChange(viewMode === 'list' ? 'board' : 'list')}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-light"
                  aria-label={`Switch to ${viewMode === 'list' ? 'board' : 'list'} view`}
                >
                  {viewMode === 'list' ? (
                    <>
                      <ViewColumnsIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                        Board View
                      </span>
                    </>
                  ) : (
                    <>
                      <ListBulletIcon className="w-6 h-6 text-slate-700 dark:text-slate-300" />
                      <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                        List View
                      </span>
                    </>
                  )}
                </button>
              </div>
              
              <div className="flex items-center gap-2">
                <button
                  onClick={async () => {
                    const tasks = generateTasks();
                    for (const task of tasks) {
                      await dispatch(createTodo(task));
                    }
                  }}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-light"
                  aria-label="Generate sample tasks"
                >
                  <BeakerIcon className="w-6 h-6 text-violet-500" aria-hidden="true" />
                  <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                    Generate Tasks
                  </span>
                </button>

                <button 
                  onClick={toggleTheme}
                  className="flex items-center gap-2 p-3 rounded-xl bg-slate-100 dark:bg-slate-800 
                            hover:bg-slate-200 dark:hover:bg-slate-700
                            transition-colors duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-light"
                  aria-label="Toggle theme"
                >
                  {theme === 'dark' ? (
                    <>
                      <SunIcon className="w-6 h-6 text-amber-500" aria-hidden="true" />
                      <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                        Light Mode
                      </span>
                    </>
                  ) : (
                    <>
                      <MoonIcon className="w-6 h-6 text-slate-700" aria-hidden="true" />
                      <span className="hidden md:inline text-sm font-medium text-slate-700 dark:text-slate-300">
                        Dark Mode
                      </span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
          
          <section aria-labelledby="form-heading">
            <h2 id="form-heading" className="sr-only">Add New Task</h2>
            <TodoForm onSubmit={handleAddTodo} />
          </section>

          {viewMode === 'list' && (
            <div className="flex gap-3 mb-6" role="radiogroup" aria-label="Filter tasks by status">
              {statusOptions.map((option) => (
                <button
                  key={option}
                  onClick={() => setStatus(option === 'All' ? 'all' : option === 'To Do' ? 'To Do' : option === 'In Progress' ? 'In Progress' : 'Done')}
                  onKeyDown={(e) => handleKeyPress(e, () => setStatus(option === 'All' ? 'all' : option === 'To Do' ? 'To Do' : option === 'In Progress' ? 'In Progress' : 'Done'))}
                  className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200
                            focus:outline-none focus:ring-2 focus:ring-primary-light
                            ${status === (option === 'All' ? 'all' : option === 'To Do' ? 'To Do' : option === 'In Progress' ? 'In Progress' : 'Done')
                              ? 'bg-primary-light text-white'
                              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                            }`}
                  role="radio"
                  aria-checked={status === (option === 'All' ? 'all' : option === 'To Do' ? 'To Do' : option === 'In Progress' ? 'In Progress' : 'Done')}
                  tabIndex={0}
                >
                  {option}
                </button>
              ))}
            </div>
          )}

          <section aria-labelledby="todo-list-heading" className="w-full">
            {filteredTodos.length === 0 ? (
              <p className="text-center text-slate-600 dark:text-slate-400">
                No tasks found
              </p>
            ) : viewMode === 'list' ? (
              <ul className="space-y-4" role="list">
                {filteredTodos.map((todo) => (
                  <li key={todo.id}>
                    <TodoItem
                      todo={todo}
                      onStatusChange={handleStatusChange}
                      onDelete={handleDeleteTodo}
                      onUpdate={handleUpdateTodo}
                      activeOptionsId={activeOptionsId}
                      onOptionsClick={setActiveOptionsId}
                      isBoardMode={false}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <TodoBoard
                todos={filteredTodos}
                onStatusChange={handleStatusChange}
                onDelete={handleDeleteTodo}
                onUpdate={handleUpdateTodo}
                activeOptionsId={activeOptionsId}
                onOptionsClick={setActiveOptionsId}
              />
            )}
          </section>
        </main>
      </div>
    </>
  );
}

export default App;
