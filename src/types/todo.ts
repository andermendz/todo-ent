export interface Todo {
    id: string;
    title: string;
    status: 'Todo' | 'Doing' | 'Done';
    createdAt: Date;
    updatedAt: Date;
  }