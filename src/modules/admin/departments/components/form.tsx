import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { toast } from 'sonner';
import { departmentService } from '../services/departmentService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const DepartmentForm = ({ mode, initialData, onSuccess }: Props) => {
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
      toast.error('Department name is required');
      return;
    }

    const payload = {
      name,
      is_active: isActive,
    };

    try {
      if (mode === 'create') {
        await departmentService.createDepartment(payload);
        toast.success('Department created 🎉');
      } else {
        await departmentService.patchDepartment(initialData.id, payload);
        toast.success('Department updated ✏️');
      }

      onSuccess();
    } catch {}
  };

  return (
    <div className="space-y-4">

      <div className="w-full">
        <Label>Department Name *</Label>
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
          Active Department
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

export default DepartmentForm;