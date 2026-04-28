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
import { Button } from 'src/components/ui/button';

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
      userService.getAllUsersList(),
    ]);

    setData(mp);
    setUsers(users);
  };

  useEffect(() => {
    loadAll();
  }, []);

const getUser = (id?: number) => {
  if (!id) return null;
  return users.find((u) => u.id === id) || null;
};

const mapped = data.map((d) => {
  const updatedUser = getUser(d.updatedBy);

  return {
    ...d,
    updatedByName: updatedUser
      ? `${updatedUser.firstName} ${updatedUser.lastName}`
      : '—',
    updatedByEmail: updatedUser?.email || '—',
  };
});

  const handleDelete = async (row: any) => {
    const ok = await confirm({
      title: 'Delete permission?',
      description: 'Deleting this module permission may affect user access across the system. This action cannot be undone.',
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
            <Button variant="lightprimary"
              onClick={() => { setMode('create'); setOpen(true); }}
            >
              <Icon icon="solar:add-circle-linear" width={18} />
              Create Permission
            </Button>
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