export interface Todo {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Done';
  createdAt: Date;
  updatedAt: Date;
}