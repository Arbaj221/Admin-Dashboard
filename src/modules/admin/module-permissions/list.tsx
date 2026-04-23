import { useEffect, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from 'src/components/ui/dialog';

import { modulePermissionService } from './services/modulePermissionService';
import ModulePermissionsTable from './components/table';
import ModulePermissionForm from './components/form';

import { userService } from 'src/modules/users/services/userService';
import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';
import { toast } from 'sonner';
import { Icon } from '@iconify/react';
import Can from 'src/permissions/Can';

const ModulePermissionsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [users, setUsers] = useState<any[]>([]);

  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<any>(null);

  const confirm = useConfirm();

  const loadAll = async () => {
    const [mp, users] = await Promise.all([
      modulePermissionService.getAllModulePermissions(),
      userService.getActiveUsers(),
    ]);

    setData(mp);
    setUsers(users);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const getEmail = (id?: number) => {
    if (!id) return '—';
    return users.find((u) => u.id === id)?.email || '—';
  };

  const mapped = data.map((d) => ({
    ...d,
    createdByEmail: getEmail(d.createdBy),
    updatedByEmail: getEmail(d.updatedBy),
  }));

  const handleDelete = async (row: any) => {
    const ok = await confirm({
      title: 'Delete permission?',
      description: 'This action cannot be undone.',
      confirmText: 'Delete',
      variant: 'destructive',
    });

    if (!ok) return;

    await modulePermissionService.delete(row.id);
    toast.success('Deleted');
    loadAll();
  };

  return (
    <>
      <SlimBreadcrumb title="Permissions" items={[{ title: 'Permissions' }]} />

      <CardBox>
        <div className="flex justify-between mb-4">
          <h5 className="card-title">Module Permissions</h5>
          <Can module="module-permissions" actions={['create']}>
            <button
              onClick={() => { setMode('create'); setOpen(true); }}
              className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
            >
              <Icon icon="solar:add-circle-linear" width={18} />
              Create Permission
            </button>
          </Can>
        </div>

        <ModulePermissionsTable
          data={mapped}
          onEdit={(row) => { setSelected(row); setMode('edit'); setOpen(true); }}
          onDelete={handleDelete}
        />
      </CardBox>

      <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Permission' : 'Edit Permission'}
            </DialogTitle>
          </DialogHeader>

          <ModulePermissionForm
            mode={mode}
            initialData={selected}
            onSuccess={() => { setOpen(false); loadAll(); }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ModulePermissionsList;