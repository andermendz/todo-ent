import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Todo } from '../../types/todo';

// states
interface TodoState {
  items: Todo[];
  loading: boolean;
  error: string | null;
}

// initial states
const initialState: TodoState = {
  items: [],
  loading: false,
  error: null,
};

//action handlers
const todoSlice = createSlice({
  name: 'todos',
  initialState,
  reducers: {
    // add new todo
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.items.push(action.payload);
    },
    
    // update an existing one
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const todoIndex = state.items.findIndex(
        todo => todo.id === action.payload.id
      );
      
      if (todoIndex !== -1) {
        state.items[todoIndex] = {
          ...state.items[todoIndex],
          ...action.payload,
          updatedAt: new Date()
        };
      }
    },
    
    // remove tood by id
    deleteTodo: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(todo => todo.id !== action.payload);
    },

    //set loading
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    //set error
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
});

export const { 
  addTodo, 
  updateTodo, 
  deleteTodo,
  setLoading,
  setError 
} = todoSlice.actions;

export default todoSlice.reducer;
