import axios from 'axios';
import { Todo } from '../types/todo';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3001',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const todoApi = {
  getAllTodos: async (): Promise<Todo[]> => {
    const response = await api.get('/todos');
    return response.data;
  },

  createTodo: async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const response = await api.post('/todos', todo);
    return response.data;
  },

  updateTodo: async (id: string, todo: Partial<Todo>): Promise<Todo> => {
    const response = await api.patch(`/todos/${id}`, todo);
    return response.data;
  },

  deleteTodo: async (id: string): Promise<void> => {
    await api.delete(`/todos/${id}`);
  },
}; 