import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

interface ApprovalModalProps {
  open: boolean;
  onClose: () => void;
  onApprove: () => void;
  title: string;
}

export const ApprovalModal = ({ open, onClose, onApprove, title }: ApprovalModalProps) => {
  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Confirm Status Change</DialogTitle>
      <DialogContent>
        Are you sure you want to mark "{title}" as done?
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onApprove} variant="contained" color="primary">
          Approve
        </Button>
      </DialogActions>
    </Dialog>
  );
};
