import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { TodoItem } from '../TodoItem';
import { vi } from 'vitest';

describe('TodoItem', () => {
  const mockTodo = {
    id: '1',
    title: 'Test Todo',
    status: 'To Do' as const,
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  const mockProps = {
    todo: mockTodo,
    onStatusChange: vi.fn(),
    onDelete: vi.fn(),
    onUpdate: vi.fn(),
    activeOptionsId: null,
    onOptionsClick: vi.fn(),
    isBoardMode: false,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders todo item correctly', () => {
    render(<TodoItem {...mockProps} />);
    
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(screen.getByText(mockTodo.status)).toBeInTheDocument();
  });

  it('handles status change', async () => {
    render(<TodoItem {...mockProps} />);
    
    const statusButton = screen.getByRole('button', { name: mockTodo.status });
    await userEvent.click(statusButton);
    
    expect(mockProps.onOptionsClick).toHaveBeenCalledWith(mockTodo.id);
  });

  it('handles delete', async () => {
    render(<TodoItem {...mockProps} />);
    
    const deleteButton = screen.getByLabelText(`Delete task: ${mockTodo.title}`);
    await userEvent.click(deleteButton);

    // click the confirm button in the approval modal
    const confirmButton = screen.getByText('Delete');
    await userEvent.click(confirmButton);
    
    expect(mockProps.onDelete).toHaveBeenCalledWith(mockTodo.id);
  });

  it('handles update in edit mode', async () => {
    render(<TodoItem {...mockProps} />);
    
    // enter edit mode
    const editButton = screen.getByLabelText(`Edit task: ${mockTodo.title}`);
    await userEvent.click(editButton);
    
    // pdate title
    const input = screen.getByDisplayValue(mockTodo.title);
    await userEvent.clear(input);
    await userEvent.type(input, 'Updated Todo');
    
    // save changes
    const saveButton = screen.getByLabelText('Save changes');
    await userEvent.click(saveButton);
    
    expect(mockProps.onUpdate).toHaveBeenCalledWith({
      ...mockTodo,
      title: 'Updated Todo',
      updatedAt: expect.any(Date)
    });
  });

  it('cancels edit mode without changes', async () => {
    render(<TodoItem {...mockProps} />);
    
    // enter edit mode
    const editButton = screen.getByLabelText(`Edit task: ${mockTodo.title}`);
    await userEvent.click(editButton);
    
    // cancel editing
    const cancelButton = screen.getByLabelText('Cancel editing');
    await userEvent.click(cancelButton);
    
    expect(screen.getByText(mockTodo.title)).toBeInTheDocument();
    expect(mockProps.onUpdate).not.toHaveBeenCalled();
  });

  it('shows status menu when clicked', async () => {
    render(<TodoItem {...mockProps} />);
    
    const statusButton = screen.getByRole('button', { name: mockTodo.status });
    await userEvent.click(statusButton);
    
    expect(mockProps.onOptionsClick).toHaveBeenCalledWith(mockTodo.id);
  });

 
});