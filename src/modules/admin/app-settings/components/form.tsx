import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { toast } from 'sonner';

import { appSettingsService } from '../services/appSettingsService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const AppSettingsForm = ({ mode, initialData, onSuccess }: Props) => {
  const [form, setForm] = useState({
    key: '',
    value: '',
    description: '',
    is_active: true,
  });

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        key: initialData.key,
        value: initialData.value,
        description: initialData.description || '',
        is_active: initialData.isActive,
      });
    } else {
      setForm({
        key: '',
        value: '',
        description: '',
        is_active: true,
      });
    }
  }, [mode, initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

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
    e.preventDefault();

    if (!form.key || !form.value) {
      toast.error('Key & Value required');
      return;
    }

    try {
      if (mode === 'create') {
        await appSettingsService.create(form);
        toast.success('Setting created');
      } else {
        const original = {
          value: initialData.value,
          description: initialData.description,
          is_active: initialData.isActive,
        };

        let payload = getChangedFields(original, {
          value: form.value,
          description: form.description,
          is_active: form.is_active,
        });

        if (Object.keys(payload).length === 0) {
          toast.info('No changes detected');
          return;
        }

        await appSettingsService.update(form.key, payload);
        toast.success('Setting updated');
      }

      onSuccess();

    } catch (e: any) {
      const status = e?.response?.status;
      const message = e?.response?.data?.detail;

      if (status === 409) {
        if (message?.includes('deleted')) {
          toast.error('Setting exists but is deleted. Please restore it.');
        } else {
          toast.error('Setting already exists');
        }
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">

      <div>
        <Label>Key *</Label>
        <Input
          value={form.key}
          disabled={mode === 'edit'}
          onChange={(e) => handleChange('key', e.target.value)}
        />
      </div>

      <div>
        <Label>Value *</Label>
        <Input
          value={form.value}
          onChange={(e) => handleChange('value', e.target.value)}
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
        <Button type="button" variant="outline" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit">
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>

    </form>
  );
};

export default AppSettingsForm;