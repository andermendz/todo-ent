import { useState } from 'react';
import { Card, CardContent, Typography, IconButton, Select, MenuItem, TextField } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Save as SaveIcon, Cancel as CancelIcon } from '@mui/icons-material';
import { Todo } from '../types/todo';
import { ApprovalModal } from './ApprovalModal';

interface TodoItemProps {
  todo: Todo;
  onStatusChange: (id: string, status: Todo['status']) => void;
  onDelete: (id: string) => void;
  onUpdate: (todo: Todo) => void;
}

export const TodoItem = ({ todo, onStatusChange, onDelete, onUpdate }: TodoItemProps) => {
  const [showApproval, setShowApproval] = useState(false);
  const [pendingStatus, setPendingStatus] = useState<Todo['status'] | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(todo.title);

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

  const handleSave = () => {
    if (editTitle.trim()) {
      onUpdate({
        ...todo,
        title: editTitle,
        updatedAt: new Date()
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditTitle(todo.title);
    setIsEditing(false);
  };

  return (
    <>
      <Card className="mb-4">
        <CardContent className="flex justify-between items-center">
          <div className="flex-grow">
            {isEditing ? (
              <TextField
                fullWidth
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                size="small"
                autoFocus
              />
            ) : (
              <>
                <Typography variant="h6">{todo.title}</Typography>
                <Typography color="textSecondary">
                  Created: {new Date(todo.createdAt).toLocaleDateString()}
                </Typography>
              </>
            )}
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
            {isEditing ? (
              <>
                <IconButton onClick={handleSave}>
                  <SaveIcon />
                </IconButton>
                <IconButton onClick={handleCancel}>
                  <CancelIcon />
                </IconButton>
              </>
            ) : (
              <>
                <IconButton onClick={() => setIsEditing(true)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => onDelete(todo.id)}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
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
