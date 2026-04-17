// modules/roles/RolesList.tsx

import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';

import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import RolesTable from './components/table';
import RoleForm from './components/form';
import { rolesService, Role } from './services/rolesService';

const RolesList = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);

  const confirm = useConfirm();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Roles' },
  ];

  const loadRoles = async () => {
    const data = await rolesService.getRoles();
    setRoles(data);
  };

  useEffect(() => {
    loadRoles();
  }, []);

  // 👉 Create / Edit handler (no edit API yet)
  const handleSubmit = async (name: string) => {
    if (mode === 'create') {
      await rolesService.createRole({ name });
      await loadRoles();
      toast.success('Role created successfully 🎉');
    } else {
      toast.info('Edit coming soon ✏️');
    }

    setOpen(false);
  };

  // 👉 Edit click
  const handleEdit = (role: Role) => {
    setMode('edit');
    setSelectedRole(role);
    setOpen(true);
  };

  // 👉 Delete click
  const handleDelete = async (role: Role) => {
    const ok = await confirm({
      title: 'Delete role?',
      description: 'This action will be available soon.',
      variant: 'destructive',
      confirmText: 'Delete',
    });

    if (!ok) return;

    toast.info('Delete coming soon 🚧');
  };

  // 👉 Create click
  const handleCreate = () => {
    setMode('create');
    setSelectedRole(null);
    setOpen(true);
  };

  return (
    <>
      <SlimBreadcrumb title="Roles" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Roles List</h5>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm px-4 py-2.5 rounded-md"
          >
            <Icon icon="solar:add-circle-linear" width={18} />
            Create Role
          </button>
        </div>

        <RolesTable
          roles={roles}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardBox>

      {/* Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Role' : 'Edit Role'}
            </DialogTitle>
          </DialogHeader>

          <RoleForm
            mode={mode}
            initialData={selectedRole || undefined}
            onSuccess={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RolesList;