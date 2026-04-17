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

import DepartmentsTable from './components/table';
import DepartmentForm from './components/form';
import { departmentService, Department } from './services/departmentService';

const DepartmentsList = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState<'create' | 'edit'>('create');
  const [selectedDept, setSelectedDept] = useState<Department | null>(null);

  const confirm = useConfirm();

  const BCrumb = [
    { to: '/', title: 'Home' },
    { title: 'Departments' },
  ];

  const loadDepartments = async () => {
    const data = await departmentService.getDepartments();
    setDepartments(data);
  };

  useEffect(() => {
    loadDepartments();
  }, []);

  const handleSubmit = async (name: string) => {
    if (mode === 'create') {
      await departmentService.createDepartment({ name });
      await loadDepartments();
      toast.success('Department created successfully 🎉');
    } else {
      toast.info('Edit coming soon ✏️');
    }

    setOpen(false);
  };

  const handleCreate = () => {
    setMode('create');
    setSelectedDept(null);
    setOpen(true);
  };

  const handleEdit = (dept: Department) => {
    setMode('edit');
    setSelectedDept(dept);
    setOpen(true);
  };

  const handleDelete = async (dept: Department) => {
    const ok = await confirm({
      title: 'Delete department?',
      description: 'This action will be available soon.',
      variant: 'destructive',
      confirmText: 'Delete',
    });

    if (!ok) return;

    toast.info('Delete coming soon 🚧');
  };

  return (
    <>
      <SlimBreadcrumb title="Departments" items={BCrumb} />

      <CardBox>
        <div className="flex items-center justify-between mb-4">
          <h5 className="card-title">Departments List</h5>

          <button
            onClick={handleCreate}
            className="flex items-center gap-2 bg-primary hover:bg-primaryemphasis text-white text-sm px-4 py-2.5 rounded-md"
          >
            <Icon icon="solar:add-circle-linear" width={18} />
            Create Department
          </button>
        </div>

        <DepartmentsTable
          departments={departments}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </CardBox>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-md p-6">
          <DialogHeader>
            <DialogTitle>
              {mode === 'create' ? 'Create Department' : 'Edit Department'}
            </DialogTitle>
          </DialogHeader>

          <DepartmentForm
            mode={mode}
            initialData={selectedDept || undefined}
            onSuccess={handleSubmit}
            onCancel={() => setOpen(false)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DepartmentsList;