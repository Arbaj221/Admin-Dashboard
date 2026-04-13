import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import UserForm from './form';
import { User } from '../types-data/users';

interface UserFormDialogProps {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  user?: User;
}

const UserFormDialog = ({ open, onClose, mode, user }: UserFormDialogProps) => {
  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) onClose(); }}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{mode === 'create' ? 'Create User' : 'Edit User'}</DialogTitle>
        </DialogHeader>
        <UserForm
          mode={mode}
          onSuccess={onClose}
          initialData={user ? {
            firstName:  user.firstName,
            lastName:   user.lastName,
            username:   user.username,
            email:      user.email,
            jobTitle:   user.jobTitle,
            department: user.department,
            role:       user.role,
          } : undefined}
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;