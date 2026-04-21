import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { toast } from 'sonner';
import { modulePermissionService } from '../services/modulePermissionService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const ModulePermissionForm = ({ mode, initialData, onSuccess }: Props) => {
  const [form, setForm] = useState({
    module_name: '',
    menu_name: '',
    permission_name: '',
    description: '',
    is_active: true,
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        module_name: initialData.moduleName,
        menu_name: initialData.menuName,
        permission_name: initialData.permissionName,
        description: initialData.description,
        is_active: initialData.isActive,
      });
    }
  }, [mode, initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.module_name || !form.permission_name) {
      toast.error('Required fields missing');
      return;
    }

    try {
      if (mode === 'create') {
        await modulePermissionService.create(form);
        toast.success('Permission created');
      } else {
        await modulePermissionService.patch(initialData.id, form);
        toast.success('Permission updated');
      }

      onSuccess();
    } catch (e: any) {
      const status = e?.response?.status;
      const message = e?.response?.data?.detail;

      if (status === 409) {
        toast.error('Permission already exists');
      } else if (status === 422) {
        toast.error(message || 'Validation failed');
      } else {
        toast.error('Something went wrong');
      }
    }
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
      className="space-y-4"
    >

      <div>
        <Label>Menu Name</Label>
        <Input
          value={form.menu_name}
          onChange={(e) => handleChange('menu_name', e.target.value)}
        />
      </div>

      <div>
        <Label>Module Name *</Label>
        <Input
          value={form.module_name}
          onChange={(e) => handleChange('module_name', e.target.value)}
        />
      </div>

      <div>
        <Label>Permission Name *</Label>
        <Input
          value={form.permission_name}
          onChange={(e) => handleChange('permission_name', e.target.value)}
        />
      </div>

      <div>
        <Label>Description</Label>
        <textarea
          className="w-full border rounded-md p-2 text-sm"
          value={form.description}
          onChange={(e) => handleChange('description', e.target.value)}
        />
      </div>

      <div>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => handleChange('is_active', e.target.checked)}
          />
          Active
        </label>
      </div>

      <div className="flex justify-end gap-3">
        <Button variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button type="submit">
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>

    </form>
  );
};

export default ModulePermissionForm;