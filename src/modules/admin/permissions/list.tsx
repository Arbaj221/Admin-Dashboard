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

import PermissionsTable from './components/table';
import PermissionForm from './components/form';
import { permissionService, Permission } from './services/permissionService';

const PermissionsList = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedPerm, setSelectedPerm] = useState<Permission | null>(null);

  const confirm = useConfirm();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Permissions' },
  ];

  const loadPermissions = async () => {
    const data = await permissionService.getPermissions();
    setPermissions(data);
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  const handleSubmit = async (name: string) => {
    if (mode === 'create') {
      await permissionService.createPermission({ name });
      await loadPermissions();
      toast.success('Permission created successfully 🎉');
    } else {
      toast.info('Edit coming soon ✏️');
    }

    setOpen(false);
  };

  const handleCreate = () => {
    setMode('create');
    setSelectedPerm(null);
    setOpen(true);
  };

  const handleEdit = (perm: Permission) => {
    setMode('edit');
    setSelectedPerm(perm);
    setOpen(true);
  };

  const handleDelete = async (perm: Permission) => {
    const ok = await confirm({
      title: 'Delete permission?',
      description: 'This action will be available soon.',
      variant: 'destructive',
      confirmText: 'Delete',
    });

    if (!ok) return;

    toast.info('Delete coming soon 🚧');
  };

  return (
    <>
      <SlimBreadcrumb title="Permissions" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Permissions List</h5>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm px-4 py-2.5 rounded-md"
          >
            <Icon icon="solar:add-circle-linear" width={18} />
            Create Permission
          </button>
        </div>

        <PermissionsTable
          permissions={permissions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardBox>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Permission' : 'Edit Permission'}
            </DialogTitle>
          </DialogHeader>

          <PermissionForm
            mode={mode}
            initialData={selectedPerm || undefined}
            onSuccess={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default PermissionsList;