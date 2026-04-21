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
  const [name, setName] = useState('');
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
      setIsActive(initialData.isActive);
    }
  }, [mode, initialData]);

  const handleSubmit = async () => {
    if (!name.trim()) {
      toast.error('Role name is required');
      return;
    }

    const payload = {
      name,
      is_active: isActive,
    };

    try {
      if (mode === 'create') {
        await rolesService.createRole(payload);
        toast.success('Role created 🎉');
      } else {
        await rolesService.patchRole(initialData.id, payload);
        toast.success('Role updated ✏️');
      }

      onSuccess();
    } catch {}
  };

  return (
    <div className="space-y-4">

      <div className="w-full">
        <Label>Role Name *</Label>
        <Input
          className="w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="w-full">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={isActive}
            onChange={(e) => setIsActive(e.target.checked)}
          />
          Active Role
        </label>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button onClick={handleSubmit}>
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>

    </div>
  );
};

export default RoleForm;