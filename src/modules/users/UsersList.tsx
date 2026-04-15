import { useState } from 'react';
import { Icon } from '@iconify/react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import UsersTable from './components/table';
import CardBox from 'src/components/shared/CardBox';
import { usersData as initialData, User } from './types-data/users';
import UserFormDialog from './components/UserFormDialog';
import ConfirmDialog from 'src/components/shared/confirmdialog/ConfirmDialog';

const UsersList = () => {
  const [users, setUsers] = useState<User[]>(initialData);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<'create' | 'edit'>('create');
  const [selectedUser, setSelectedUser] = useState<User | undefined>();
  const [open, setOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState<number | null>(null);

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Users' },
  ];

  // Called from UsersTable — stores the ID and opens the confirm dialog
  const openDeleteDialog = (id: number) => {
    setUserToDelete(id);
    setOpen(true);
  };

  // Called by ConfirmDialog onConfirm — no arguments, uses stored ID
  const handleDelete = () => {
    if (userToDelete === null) return;
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete));
    setUserToDelete(null);
    setOpen(false);
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
      <ConfirmDialog
        open={open}
        onOpenChange={setOpen}
        title="Delete user?"
        description="This action cannot be undone."
        confirmText="Delete"
        variant="destructive"
        onConfirm={handleDelete}
      />

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

        <UsersTable users={users} onDelete={openDeleteDialog} onEdit={openEdit} />
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