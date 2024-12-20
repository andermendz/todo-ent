import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Select, MenuItem } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material'; 
import { Todo } from '../types/todo';
import { ApprovalModal } from './ApprovalModal';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
  onEdit: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onStatusChange, onDelete, onEdit }: TodoItemProps) => {
  const [showApproval, setShowApproval] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Todo['status'] | null>(null);

  const handleStatusChange = (newStatus: Todo['status']) => {
    if (newStatus === 'Done') {
      setShowApproval(true);
      setPendingStatus(newStatus);
    } else {
      onStatusChange(todo.id, newStatus);
    }
  };

  const handleApprove = () => {
    if (pendingStatus) {
      onStatusChange(todo.id, pendingStatus);
    }
    setShowApproval(false);
    setPendingStatus(null);
  };

  return (
    <>
      <Card className="mb-4">
        <CardContent className="flex justify-between items-center">
          <div>
            <Typography variant="h6">{todo.title}</Typography>
            <Typography color="textSecondary">
              Created: {new Date(todo.createdAt).toLocaleDateString()}
            </Typography>
          </div>
          <div className="flex items-center gap-2">
            <Select
              value={todo.status}
              onChange={(e) => handleStatusChange(e.target.value as Todo['status'])}
              size="small"
            >
              <MenuItem value="Todo">Todo</MenuItem>
              <MenuItem value="Doing">Doing</MenuItem>
              <MenuItem value="Done">Done</MenuItem>
            </Select>
            <IconButton onClick={() => onEdit(todo)}>
              <EditIcon />
            </IconButton>
            <IconButton onClick={() => onDelete(todo.id)}>
              <DeleteIcon />
            </IconButton>
          </div>
        </CardContent>
      </Card>
      <ApprovalModal
        open={showApproval}
        onClose={() => setShowApproval(false)}
        onApprove={handleApprove}
        title={todo.title}
      />
    </>
  );
};
