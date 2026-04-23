import { useEffect, useState } from 'react';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';
import { Icon } from '@iconify/react';

import AppSettingsTable from './components/table';
import AppSettingsForm from './components/form';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';
import { toast } from 'sonner';

import { appSettingsService } from './services/appSettingsService';

const AppSettingsList = () => {
  const [data, setData] = useState<any[]>([]);
  const [open, setOpen] = useState(false);

  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selected, setSelected] = useState<any>(null);

  const confirm = useConfirm();

  const load = async () => {
    const res = await appSettingsService.getAllAppSettings();
    setData(res);
  };

  useEffect(() => {
    load();
  }, []);

  const openCreate = () => {
    setMode('create');
    setSelected(null);
    setOpen(true);
  };

  const handleEdit = (row: any) => {
    setMode('edit');
    setSelected(row);
    setOpen(true);
  };

  const handleDelete = async (row: any) => {
    const ok = await confirm({
      title: 'Delete setting?',
      confirmText: 'Delete',
      variant: 'destructive',
    });

    if (!ok) return;

    try {
      await appSettingsService.delete(row.key);
      toast.success('Deleted');
      load();
    } catch (e: any) {
      toast.error(e?.response?.data?.detail);
    }
  };

  return (
    <>
      <SlimBreadcrumb title="App Settings" items={[{ title: 'App Settings' }]} />

      <CardBox>

        <div className="flex justify-between mb-4">
          <h5 className="card-title">App Settings</h5>

          <button
            onClick={openCreate}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-md"
          >
            <Icon icon="solar:add-circle-linear" width={18} />
            Add Setting
          </button>
        </div>

        <AppSettingsTable
          data={data}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />

      </CardBox>

      <Dialog open={open} onOpenChange={(v) => !v && setOpen(false)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Setting' : 'Edit Setting'}
            </DialogTitle>
          </DialogHeader>

          <AppSettingsForm
            mode={mode}
            initialData={selected}
            onSuccess={() => {
              setOpen(false);
              load();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AppSettingsList;