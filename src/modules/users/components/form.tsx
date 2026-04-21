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
import { departmentService, Department } from 'src/modules/admin/departments/services/departmentService';
import { userService } from '../services/userService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  onSuccess: () => void;
}

const UserForm = ({ mode, initialData, onSuccess }: Props) => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);

  const [form, setForm] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    mobile_number: '',
    job_title: '',
    work_location: '',
    role_id: '',
    department_ids: [] as number[],
    is_active: true,
  });

  // 👉 load roles + departments
  useEffect(() => {
    const loadData = async () => {
      const [rolesData, deptData] = await Promise.all([
        rolesService.getRoles(),
        departmentService.getDepartments(),
      ]);

      setRoles(rolesData);
      setDepartments(deptData);
    };

    loadData();
  }, []);

  // 👉 prefill for edit
  useEffect(() => {
    if (mode === 'edit' && initialData) {
      setForm({
        email: initialData.email,
        password: '',
        confirmPassword: '',
        mobile_number: initialData.mobileNumber,
        job_title: initialData.jobTitle,
        work_location: initialData.workLocation,
        role_id: String(initialData.roleId),
        department_ids: (initialData.departmentIds || []).map(Number),
        is_active: initialData.isActive ?? true,
      });
    }
  }, [mode, initialData]);

  // 👉 change handler
  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // 👉 toggle department
  const toggleDepartment = (id: number) => {
    setForm((prev) => {
      const exists = prev.department_ids.includes(Number(id));

      return {
        ...prev,
        department_ids: exists
          ? prev.department_ids.filter((d) => d !== Number(id))
          : [...prev.department_ids, Number(id)],
      };
    });
  };

  // 👉 submit
  const handleSubmit = async () => {
    if (!form.email || !form.role_id) {
      toast.error('Required fields missing');
      return;
    }

    if (mode === 'create') {
      if (!form.password || !form.confirmPassword) {
        toast.error('Password required');
        return;
      }

      if (form.password !== form.confirmPassword) {
        toast.error('Passwords do not match');
        return;
      }
    }

    const payload: any = {
      email: form.email,
      mobile_number: form.mobile_number,
      job_title: form.job_title,
      work_location: form.work_location,
      role_id: Number(form.role_id),
      department_ids: form.department_ids,
      is_active: form.is_active,
    };

    // 👉 password handling
    if (mode === 'create') {
      payload.password = form.password;
    } else if (form.password) {
      payload.password = form.password;
    }

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
      // handled globally
    }
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Email */}
        <div>
          <Label>Email *</Label>
          <Input
            value={form.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>

        {/* Password (create only) */}
        {mode === 'create' && (
          <>
            <div>
              <Label>Password *</Label>
              <Input
                type="password"
                value={form.password}
                onChange={(e) => handleChange('password', e.target.value)}
              />
            </div>

            <div>
              <Label>Confirm Password *</Label>
              <Input
                type="password"
                value={form.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
              />
            </div>
          </>
        )}

        {/* Mobile */}
        <div>
          <Label>Mobile</Label>
          <Input
            value={form.mobile_number}
            onChange={(e) => handleChange('mobile_number', e.target.value)}
          />
        </div>

        {/* Job */}
        <div>
          <Label>Job Title</Label>
          <Input
            value={form.job_title}
            onChange={(e) => handleChange('job_title', e.target.value)}
          />
        </div>

        {/* Location */}
        <div>
          <Label>Work Location</Label>
          <Input
            value={form.work_location}
            onChange={(e) => handleChange('work_location', e.target.value)}
          />
        </div>

        {/* Role */}
        <div>
          <Label>Role *</Label>
          <Select
            value={form.role_id}
            onValueChange={(v) => handleChange('role_id', v)}
          >
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

        {/* Departments (Multi Select) */}
        {/* Active */}
        <div>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={form.is_active}
              onChange={(e) => handleChange('is_active', e.target.checked)}
            />
            Active User
          </label>
        </div>
        <div>
          <Label>Departments</Label>

          <div className="border border-border rounded-md p-3 space-y-2 max-h-40 overflow-y-auto">
            {departments.map((dept) => (
              <label key={dept.id} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.department_ids.includes(dept.id)}
                  onChange={() => toggleDepartment(dept.id)}
                />
                <span className="text-sm">{dept.name}</span>
              </label>
            ))}
          </div>
        </div>

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3">
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

export default UserForm;