import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from './store/store';
import { fetchTodos, createTodo, updateTodoStatus, removeTodo } from './store/slices/todoSlice';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { useTheme } from './hooks/useTheme';
import { Todo } from './types/todo';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const { items: todos, loading, error } = useSelector((state: RootState) => state.todos);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');
  const { theme, toggleTheme } = useTheme();

  // fetch todos on component mount
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

  const filteredTodos = todos.filter((todo) => 
    status === 'all' ? true : todo.status === status
  );

  const statusOptions = ['all', 'Todo', 'Doing', 'Done'] as const;

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-600">{error}</div>;
  }

  return (
    <div className="min-h-screen transition-colors duration-300 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white">
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

        <TodoForm onSubmit={handleAddTodo} />

        <div className="flex gap-2 mb-4">
          {statusOptions.map((option) => (
            <button
              key={option}
              onClick={() => setStatus(option)}
              className={`px-4 py-2 rounded-lg ${
                status === option
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200'
              }`}
            >
              {option}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTodo}
              onUpdate={(updatedTodo) => dispatch(updateTodoStatus({
                id: updatedTodo.id,
                status: updatedTodo.status
              }))}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
