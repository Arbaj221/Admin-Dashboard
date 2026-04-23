import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { toast } from 'sonner';

import { rolesService } from '../services/rolesService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const RoleForm = ({ mode, initialData, onSuccess }: Props) => {
  const [form, setForm] = useState({
    name: '',
    is_active: true,
  });

  // ✅ Prefill
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        name: initialData.name || '',
        is_active: initialData.isActive ?? true,
      });
    }
  }, [mode, initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ diff logic (PATCH clean)
  const getChangedFields = (original: any, current: any) => {
    const diff: any = {};

    Object.keys(current).forEach((key) => {
      if (current[key] !== original[key]) {
        diff[key] = current[key];
      }
    });

    return diff;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // ✅ ENTER key works automatically

    if (!form.name) {
      toast.error('Role name required');
      return;
    }

    let payload: any = {
      name: form.name,
      is_active: form.is_active,
    };

    try {
      if (mode === 'create') {
        await rolesService.createRole(payload);
        toast.success('Role created');
      } else {
        const original = {
          name: initialData.name,
          is_active: initialData.isActive,
        };

        payload = getChangedFields(original, payload);

        if (Object.keys(payload).length === 0) {
          toast.info('No changes detected');
          return;
        }

        await rolesService.patchRole(initialData.id, payload);
        toast.success('Role updated');
      }

      onSuccess();

    } catch (e: any) {
      const status = e?.response?.status;
      const message = e?.response?.data?.detail;

      // ✅ Handle BOTH 409 cases cleanly
      if (status === 409) {
        toast.error(message);
        return;
      }

      // 👉 let interceptor handle others
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">

      <div className="w-full">
        <Label>Role Name *</Label>
        <Input
          className="w-full"
          value={form.name}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Enter role name"
        />
      </div>

      <div className="w-full">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.is_active}
            onChange={(e) => handleChange('is_active', e.target.checked)}
          />
          Active Role
        </label>
      </div>


      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="lighterror" onClick={onSuccess}>
          Cancel
        </Button>
        <Button variant="lightprimary" type="submit">
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>

    </form>
  );
};

export default RoleForm;