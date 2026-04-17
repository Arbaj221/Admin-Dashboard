import { useState, useEffect } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

interface PermissionFormProps {
  mode: 'create' | 'edit';
  initialData?: { name: string };
  onSuccess: (name: string) => void;
  onCancel: () => void;
}

const PermissionForm = ({ mode, initialData, onSuccess, onCancel }: PermissionFormProps) => {
  const [name, setName] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setName(initialData.name);
    }
  }, [mode, initialData]);

  const handleSubmit = () => {
    if (!name.trim()) {
      setError('Permission name is required');
      return;
    }

    onSuccess(name);
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit();
      }}
    >
      <div>
        <Label>
          Permission Name <span className="text-error">*</span>
        </Label>
        <Input
          placeholder="Enter permission name"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
            if (error) setError('');
          }}
          className={`mt-2 ${error ? 'border-error' : ''}`}
        />
        {error && <p className="text-xs text-error mt-1">{error}</p>}
      </div>

      <div className="flex justify-end gap-3 mt-6">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit" className="bg-primary hover:bg-primaryemphasis text-white">
          {mode === 'create' ? 'Create Permission' : 'Update Permission'}
        </Button>
      </div>
    </form>
  );
};

export default PermissionForm;