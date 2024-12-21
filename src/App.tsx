import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TodoForm } from './components/TodoForm';
import { TodoItem } from './components/TodoItem';
import { addTodo, updateTodo, deleteTodo } from './store/slices/todoSlice';
import type { RootState } from './store/store';
import type { Todo } from './types/todo';

function App() {
  const dispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.todos.items);
  const [status, setStatus] = useState<'all' | Todo['status']>('all');

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

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-gray-800">
        Todo 
      </h1>

      <TodoForm onSubmit={handleAddTodo} />

      <div className="flex gap-2 mb-6">
        {(['all', 'Todo', 'Doing', 'Done'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setStatus(tab)}
            className={`px-4 py-2 rounded-lg transition-colors ${
              status === tab
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab === 'all' ? 'All' : tab}
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
            onUpdate={handleUpdateTodo}
          />
        ))}
      </div>
    </div>
  );
}

export default App;
