import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UsersTable from './components/table';
import CardBox from 'src/components/shared/CardBox';
import { userService, User } from './services/userService';
import UserFormDialog from './components/UserFormDialog';
import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';
import { toast } from 'sonner';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const confirm = useConfirm();

  const loadUsers = async () => {
    const data = await userService.getUsers();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Users' },
  ];

  const openCreate = () => {
    setDialogMode('create');
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setDialogOpen(true);
  };

  const handleDelete = async (user: User) => {
    const ok = await confirm({
      title: 'Delete user?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'destructive',
    });

    if (!ok) return;

    await userService.deleteUser(user.id);
    toast.success('User deleted');

    loadUsers();
  };

  return (
    <>
      <SlimBreadcrumb title="Users" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Users List</h5>
          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm font-medium px-4 py-2.5 rounded-md transition-colors duration-150 cursor-pointer"
          >
            <Icon icon="solar:add-circle-linear" width={18} height={18} />
            Create User
          </button>
        </div>

        <UsersTable
          users={users}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      </CardBox>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => {
          setDialogOpen(false);
          loadUsers();
        }}
        mode={dialogMode}
        user={selectedUser || undefined}
      />
    </>
  );
};

export default UsersList;