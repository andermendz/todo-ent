import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Typography, Tab, Tabs, Box } from '@mui/material';
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
    <Container maxWidth="md" className="py-8">
      <Typography variant="h4" component="h1" className="mb-8">
        Todo Application
      </Typography>

      <TodoForm onSubmit={handleAddTodo} />

      <Tabs value={status} onChange={(_, newValue) => setStatus(newValue)} className="mb-4">
        <Tab label="All" value="all" />
        <Tab label="Todo" value="Todo" />
        <Tab label="Doing" value="Doing" />
        <Tab label="Done" value="Done" />
      </Tabs>

      <Box>
        {filteredTodos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onStatusChange={handleStatusChange}
            onDelete={handleDeleteTodo}
            onUpdate={handleUpdateTodo}
          />
        ))}
      </Box>
    </Container>
  );
}

export default App;
