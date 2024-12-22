import { render, screen } from '@testing-library/react';
import { TodoForm } from '../TodoForm';
import { vi } from 'vitest';
import userEvent from '@testing-library/user-event';

describe('TodoForm', () => {
  const mockOnSubmit = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders form elements correctly', () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    expect(screen.getByLabelText(/new task title/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add new todo/i)).toBeDisabled();
  });

  it('handles input changes', async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/new task title/i);
    await userEvent.type(input, 'New Task');
    
    expect(input).toHaveValue('New Task');
    expect(screen.getByLabelText(/add new todo/i)).toBeEnabled();
  });

  it('shows validation error for short title', async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/new task title/i);
    await userEvent.type(input, 'ab');
    await userEvent.tab(); // Trigger blur to show validation
    
    expect(screen.getByText(/title must be at least 3 characters/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/add new todo/i)).toBeDisabled();
  });

  it('submits form with valid input', async () => {
    render(<TodoForm onSubmit={mockOnSubmit} />);
    
    const input = screen.getByLabelText(/new task title/i);
    await userEvent.type(input, 'New Task');
    
    const submitButton = screen.getByLabelText(/add new todo/i);
    await userEvent.click(submitButton);
    
    expect(mockOnSubmit).toHaveBeenCalledWith({ title: 'New Task' });
    expect(input).toHaveValue(''); // Form should reset after submission
  });
}); 