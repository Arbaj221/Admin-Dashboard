import { useEffect, useState } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { toast } from 'sonner';

import { rolesService, Role } from 'src/modules/admin/roles/services/rolesService';
import { userService } from '../services/userService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const UserForm = ({ mode, initialData, onSuccess }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    mobile_number: '',
    job_title: '',
    work_location: '',
    role_id: '',
  });

  useEffect(() => {
    rolesService.getRoles().then(setRoles);
  }, []);

  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        username: initialData.username,
        email: initialData.email,
        password: '',
        confirmPassword: '',
        mobile_number: initialData.mobileNumber,
        job_title: initialData.jobTitle,
        work_location: initialData.workLocation,
        role_id: String(initialData.roleId),
      });
    }
  }, [mode, initialData]);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    if (!form.username || !form.email || !form.role_id) {
      toast.error('Required fields missing');
      return;
    }

    if (mode === 'create' && form.password !== form.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    const payload = {
      username: form.username,
      email: form.email,
      password: form.password,
      mobile_number: form.mobile_number,
      job_title: form.job_title,
      work_location: form.work_location,
      role_id: Number(form.role_id),
    };

    try {
      if (mode === 'create') {
        await userService.createUser(payload);
        toast.success('User created 🎉');
      } else {
        await userService.updateUser(initialData.id, payload);
        toast.success('User updated ✏️');
      }

      onSuccess();
    } catch (e) {
      // handled by apiClient
    }
  };

  return (
    <div className="space-y-4">
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div>
        <Label>Username *</Label>
        <Input value={form.username} onChange={(e) => handleChange('username', e.target.value)} />
      </div>

      <div>
        <Label>Email *</Label>
        <Input value={form.email} onChange={(e) => handleChange('email', e.target.value)} />
      </div>

      {mode === 'create' && (
        <>
          <div>
            <Label>Password *</Label>
            <Input type="password" value={form.password} onChange={(e) => handleChange('password', e.target.value)} />
          </div>

          <div>
            <Label>Confirm Password *</Label>
            <Input type="password" value={form.confirmPassword} onChange={(e) => handleChange('confirmPassword', e.target.value)} />
          </div>
        </>
      )}

      <div>
        <Label>Mobile</Label>
        <Input value={form.mobile_number} onChange={(e) => handleChange('mobile_number', e.target.value)} />
      </div>

      <div>
        <Label>Job Title</Label>
        <Input value={form.job_title} onChange={(e) => handleChange('job_title', e.target.value)} />
      </div>

      <div>
        <Label>Work Location</Label>
        <Input value={form.work_location} onChange={(e) => handleChange('work_location', e.target.value)} />
      </div>

      <div>
        <Label>Role *</Label>
        <Select value={form.role_id} onValueChange={(v) => handleChange('role_id', v)}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder="Select role" />
          </SelectTrigger>
          <SelectContent>
            {roles.map((r) => (
              <SelectItem key={r.id} value={String(r.id)}>
                {r.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      </div>

      <div className="flex justify-end gap-3 mt-4">
        <Button variant="outline" onClick={onSuccess}>Cancel</Button>
        <Button onClick={handleSubmit}>
          {mode === 'create' ? 'Create' : 'Update'}
        </Button>
      </div>
    </div>
  );
};

export default UserForm;