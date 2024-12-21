import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';
import { todoApi } from '../../services/api';

// async thunks
export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async (_, { rejectWithValue }) => {
    try {
      return await todoApi.getAllTodos();
    } catch (error) {
      return rejectWithValue('Failed to fetch todos');
    }
  }
);

export const createTodo = createAsyncThunk(
  'todos/createTodo',
  async (todo: Omit<Todo, 'id'>, { rejectWithValue }) => {
    try {
      return await todoApi.createTodo(todo);
    } catch (error) {
      return rejectWithValue('Failed to create todo');
    }
  }
);

export const updateTodoStatus = createAsyncThunk(
  'todos/updateTodoStatus',
  async ({ id, status }: { id: string; status: Todo['status'] }, { rejectWithValue }) => {
    try {
      return await todoApi.updateTodo(id, { status });
    } catch (error) {
      return rejectWithValue('Failed to update todo status');
    }
  }
);

export const removeTodo = createAsyncThunk(
  'todos/removeTodo',
  async (id: string, { rejectWithValue }) => {
    try {
      await todoApi.deleteTodo(id);
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete todo');
    }
  }
);

const todoSlice = createSlice({
  name: 'todos',
  initialState: {
    items: [] as Todo[],
    loading: false,
    error: null as string | null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // fetch todos
      .addCase(fetchTodos.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTodos.fulfilled, (state, action) => {
        state.items = action.payload;
        state.loading = false;
      })
      .addCase(fetchTodos.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // create
      .addCase(createTodo.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      //update
      .addCase(updateTodoStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(todo => todo.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      //delete
      .addCase(removeTodo.fulfilled, (state, action) => {
        state.items = state.items.filter(todo => todo.id !== action.payload);
      });
  },
});

export default todoSlice.reducer;
