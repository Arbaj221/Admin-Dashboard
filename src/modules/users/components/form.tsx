import { useState } from 'react';
import { useNavigate } from 'react-router';
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
import CardBox from 'src/components/shared/CardBox';
import { Department, Role } from '../types-data/users';

interface UserFormData {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  jobTitle: string;
  department: string;
  role: string;
}

interface UserFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<UserFormData>;
  onSuccess?: () => void;
}

const defaultFormData: UserFormData = {
  firstName: '',
  lastName: '',
  username: '',
  email: '',
  jobTitle: '',
  department: '',
  role: '',
};

const departments: Department[] = [
  'Management', 'Technology', 'HR', 'Finance', 'Sales',
  'Customer Success', 'DataOps', 'Email', 'Quality',
  'DB Refresh', 'Voice Verification', 'MIS',
];

const roles: Role[] = ['Manager', 'Executive'];

const UserForm = ({ mode, initialData, onSuccess }: UserFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof UserFormData, string>>>({});

  const handleChange = (field: keyof UserFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof UserFormData, string>> = {};
    if (!formData.firstName.trim())  newErrors.firstName  = 'First name is required';
    if (!formData.lastName.trim())   newErrors.lastName   = 'Last name is required';
    if (!formData.username.trim())   newErrors.username   = 'Username is required';
    if (!formData.email.trim())      newErrors.email      = 'Email is required';
    if (!formData.jobTitle.trim())   newErrors.jobTitle   = 'Job title is required';
    if (!formData.department)        newErrors.department = 'Department is required';
    if (!formData.role)              newErrors.role       = 'Role is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/users');
    }
  };

  const handleCancel = () => {
    if (onSuccess) {
      onSuccess();
    } else {
      navigate('/users');
    }
  };

  const inputClass = (field: keyof UserFormData) =>
    `mt-2 ${errors[field] ? 'border-error focus-visible:border-error' : ''}`;

  const selectClass = (field: keyof UserFormData) =>
    `mt-2 w-full ${errors[field] ? 'border-error' : ''}`;

  const formContent = (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. First Name */}
        <div>
          <Label htmlFor="firstName">
            First Name <span className="text-error">*</span>
          </Label>
          <Input
            id="firstName"
            type="text"
            placeholder="Enter first name"
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            className={inputClass('firstName')}
          />
          {errors.firstName && <p className="text-xs text-error mt-1">{errors.firstName}</p>}
        </div>

        {/* 2. Last Name */}
        <div>
          <Label htmlFor="lastName">
            Last Name <span className="text-error">*</span>
          </Label>
          <Input
            id="lastName"
            type="text"
            placeholder="Enter last name"
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            className={inputClass('lastName')}
          />
          {errors.lastName && <p className="text-xs text-error mt-1">{errors.lastName}</p>}
        </div>

        {/* 3. Username */}
        <div>
          <Label htmlFor="username">
            Username <span className="text-error">*</span>
          </Label>
          <Input
            id="username"
            type="text"
            placeholder="Enter username"
            value={formData.username}
            onChange={(e) => handleChange('username', e.target.value)}
            className={inputClass('username')}
          />
          {errors.username && <p className="text-xs text-error mt-1">{errors.username}</p>}
        </div>

        {/* 4. Email */}
        <div>
          <Label htmlFor="email">
            Email <span className="text-error">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            placeholder="Enter email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className={inputClass('email')}
          />
          {errors.email && <p className="text-xs text-error mt-1">{errors.email}</p>}
        </div>

        {/* 5. Job Title */}
        <div>
          <Label htmlFor="jobTitle">
            Job Title <span className="text-error">*</span>
          </Label>
          <Input
            id="jobTitle"
            type="text"
            placeholder="Enter job title"
            value={formData.jobTitle}
            onChange={(e) => handleChange('jobTitle', e.target.value)}
            className={inputClass('jobTitle')}
          />
          {errors.jobTitle && <p className="text-xs text-error mt-1">{errors.jobTitle}</p>}
        </div>

        {/* 6. Department */}
        <div>
          <Label>
            Department <span className="text-error">*</span>
          </Label>
          <Select
            value={formData.department}
            onValueChange={(val) => handleChange('department', val)}
          >
            <SelectTrigger className={selectClass('department')}>
              <SelectValue placeholder="Select department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((dept) => (
                <SelectItem key={dept} value={dept}>{dept}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.department && <p className="text-xs text-error mt-1">{errors.department}</p>}
        </div>

        {/* 7. Role */}
        <div>
          <Label>
            Role <span className="text-error">*</span>
          </Label>
          <Select
            value={formData.role}
            onValueChange={(val) => handleChange('role', val)}
          >
            <SelectTrigger className={selectClass('role')}>
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role} value={role}>{role}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.role && <p className="text-xs text-error mt-1">{errors.role}</p>}
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <Button
          variant="outline"
          onClick={handleCancel}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-6 bg-primary hover:bg-primaryemphasis text-white"
        >
          {mode === 'create' ? 'Save User' : 'Update User'}
        </Button>
      </div>
    </>
  );

  // When used inside dialog, no CardBox wrapper needed
  if (onSuccess) return formContent;

  return <CardBox>{formContent}</CardBox>;
};

export default UserForm;