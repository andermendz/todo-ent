import { render, screen } from '@testing-library/react';
import { TodoBoard } from '../TodoBoard';
import { vi } from 'vitest';

vi.mock('@hello-pangea/dnd', () => ({
  DragDropContext: ({ children }: { children: React.ReactNode }) => children,
  Droppable: ({ children }: { children: Function }) => 
    children({
      draggableProps: {},
      innerRef: null,
    }, {}),
  Draggable: ({ children }: { children: Function }) => 
    children({
      draggableProps: {},
      dragHandleProps: {},
      innerRef: null,
    }, {}),
}));

describe('TodoBoard', () => {
  const mockTodos = [
    {
      id: '1',
      title: 'Test Todo',
      status: 'To Do' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      title: 'In Progress Todo',
      status: 'In Progress' as const,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];

  const mockProps = {
    todos: mockTodos,
    onStatusChange: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
    activeOptionsId: null,
    onOptionsClick: vi.fn(),
  };

  it('renders all columns', () => {
    render(<TodoBoard {...mockProps} />);
    expect(screen.getByRole('region', { name: 'To Do column' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'In Progress column' })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: 'Done column' })).toBeInTheDocument();
  });

  it('renders todos in correct columns', () => {
    render(<TodoBoard {...mockProps} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
    expect(screen.getByText('In Progress Todo')).toBeInTheDocument();
  });
}); 