import { useState } from 'react';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UsersTable from './components/table';
import CardBox from 'src/components/shared/CardBox';
import { usersData as initialData, User } from './types-data/users';
import UserFormDialog from './components/UserFormDialog';
import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const confirm = useConfirm();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Users' },
  ];

  const handleDelete = async (id: number) => {
    const ok = await confirm({
      title: 'Delete user?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'destructive',
    });

    if (!ok) return;

    setUsers(prev => prev.filter(u => u.id !== id));
  };


  const openCreate = () => {
    setDialogMode('create');
    setSelectedUser(undefined);
    setDialogOpen(true);
  };

  const openEdit = (user: User) => {
    setDialogMode('edit');
    setSelectedUser(user);
    setDialogOpen(true);
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

        <UsersTable users={users} onDelete={handleDelete} onEdit={openEdit} />
      </CardBox>

      <UserFormDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        mode={dialogMode}
        user={selectedUser}
      />
    </>
  );
};

export default UsersList;