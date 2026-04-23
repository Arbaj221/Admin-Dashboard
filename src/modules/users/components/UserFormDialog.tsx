import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';
import UserForm from './form';
import { User } from '../services/userService';

interface Props {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  user?: User;
}

const UserFormDialog = ({ open, onClose, mode, user }: Props) => {
  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create User' : 'Edit User'}
          </DialogTitle>
        </DialogHeader>

        <UserForm
          mode={mode}
          onSuccess={onClose}
          initialData={
            user
              ? {
                  id: user.id,
                  firstName: user.firstName,
                  lastName: user.lastName,
                  email: user.email,
                  mobileNumber: user.mobileNumber,
                  jobTitle: user.jobTitle,
                  workLocation: user.workLocation,
                  roleId: user.roleId,
                  departmentId: user.departmentId,
                  isActive: user.isActive,
                }
              : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default UserFormDialog;