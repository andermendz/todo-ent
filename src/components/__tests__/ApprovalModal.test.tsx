import { render, screen, fireEvent } from '@testing-library/react';
import { ApprovalModal } from '../ApprovalModal';
import { vi } from 'vitest';

describe('ApprovalModal', () => {
  const defaultProps = {
    open: true,
    onClose: vi.fn(),
    onApprove: vi.fn(),
    title: 'Test Task',
    message: 'Are you sure?',
    confirmText: 'Confirm',
    confirmStyle: 'primary' as const,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders modal when open', () => {
    render(<ApprovalModal {...defaultProps} />);
    expect(screen.getByText('Test Task')).toBeInTheDocument();
    expect(screen.getByText('Are you sure?')).toBeInTheDocument();
  });

  it('calls onClose when cancel button is clicked', () => {
    render(<ApprovalModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Cancel'));
    expect(defaultProps.onClose).toHaveBeenCalled();
  });

  it('calls onApprove when confirm button is clicked', () => {
    render(<ApprovalModal {...defaultProps} />);
    fireEvent.click(screen.getByText('Confirm'));
    expect(defaultProps.onApprove).toHaveBeenCalled();
  });

  it('does not render when closed', () => {
    render(<ApprovalModal {...defaultProps} open={false} />);
    expect(screen.queryByText('Test Task')).not.toBeInTheDocument();
  });
}); 