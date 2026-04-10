import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Icon } from '@iconify/react';
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

interface ClientFormData {
  // Client Information
  name: string;
  address: string;
  country: string;
  contractFile: File | null;
  assignedTo: string;
  // Contact Information
  firstName: string;
  lastName: string;
  contactDesignation: string;
  contactEmail: string;
  contactOfficeNo: string;
  contactMobileNo: string;
  // Billing Information
  billingName: string;
  billingAddress: string;
  billingEmail: string;
  billingTerms: string;
}

interface ClientFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<ClientFormData>;
}

const defaultFormData: ClientFormData = {
  name: '',
  address: '',
  country: '',
  contractFile: null,
  assignedTo: '',
  firstName: '',
  lastName: '',
  contactDesignation: '',
  contactEmail: '',
  contactOfficeNo: '',
  contactMobileNo: '',
  billingName: '',
  billingAddress: '',
  billingEmail: '',
  billingTerms: '',
};

const countries = [
  { value: 'in', label: 'India' },
  { value: 'us', label: 'United States' },
  { value: 'uk', label: 'United Kingdom' },
  { value: 'ca', label: 'Canada' },
  { value: 'au', label: 'Australia' },
  { value: 'ae', label: 'United Arab Emirates' },
  { value: 'sg', label: 'Singapore' },
];

const employees = [
  { value: 'sarah_johnson', label: 'Sarah Johnson' },
  { value: 'mike_thompson', label: 'Mike Thompson' },
  { value: 'david_clark', label: 'David Clark' },
  { value: 'emily_davis', label: 'Emily Davis' },
  { value: 'robert_wilson', label: 'Robert Wilson' },
];

const billingTermsOptions = [
  { value: '10_days', label: '10 Days' },
  { value: '20_days', label: '20 Days' },
  { value: '30_days', label: '30 Days' },
];

const ClientForm = ({ mode, initialData }: ClientFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<ClientFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ClientFormData, string>>>({});

  const handleChange = (field: keyof ClientFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof ClientFormData, string>> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.country) newErrors.country = 'Country is required';
    if (!formData.assignedTo) newErrors.assignedTo = 'Assigned To is required';
    if (!formData.firstName.trim()) newErrors.firstName = 'First Name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last Name is required';
    if (!formData.contactEmail.trim()) newErrors.contactEmail = 'Contact Email is required';
    if (!formData.billingName.trim()) newErrors.billingName = 'Billing Name is required';
    if (!formData.billingEmail.trim()) newErrors.billingEmail = 'Billing Email is required';
    if (!formData.billingTerms) newErrors.billingTerms = 'Billing Terms is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    // API call will go here
    navigate('/clients');
  };

  return (
    <div className="flex flex-col gap-6">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {/* ── Client Information ── */}
        <CardBox>
          <h5 className="card-title mb-6">Client Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Name */}
            <div>
              <Label htmlFor="name">
                Name <span className="text-error">*</span>
              </Label>
              <Input
                id="name"
                type="text"
                placeholder="Enter client name"
                value={formData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                className={`mt-2 ${errors.name ? 'border-error focus-visible:border-error' : ''}`}
              />
              {errors.name && (
                <p className="text-xs text-error mt-1">{errors.name}</p>
              )}
            </div>

            {/* Address */}
            <div>
              <Label htmlFor="address">
                Address <span className="text-error">*</span>
              </Label>
              <Input
                id="address"
                type="text"
                placeholder="Enter address"
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                className={`mt-2 ${errors.address ? 'border-error focus-visible:border-error' : ''}`}
              />
              {errors.address && (
                <p className="text-xs text-error mt-1">{errors.address}</p>
              )}
            </div>

            {/* Country */}
            <div>
              <Label>
                Country <span className="text-error">*</span>
              </Label>
              <Select
                value={formData.country}
                onValueChange={(val) => handleChange('country', val)}
              >
                <SelectTrigger className={`mt-2 w-full ${errors.country ? 'border-error' : ''}`}>
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.country && (
                <p className="text-xs text-error mt-1">{errors.country}</p>
              )}
            </div>

            {/* Assigned To */}
            <div>
              <Label>
                Assigned To <span className="text-error">*</span>
              </Label>
              <Select
                value={formData.assignedTo}
                onValueChange={(val) => handleChange('assignedTo', val)}
              >
                <SelectTrigger className={`mt-2 w-full ${errors.assignedTo ? 'border-error' : ''}`}>
                  <SelectValue placeholder="Select employee" />
                </SelectTrigger>
                <SelectContent>
                  {employees.map((e) => (
                    <SelectItem key={e.value} value={e.value}>
                      {e.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.assignedTo && (
                <p className="text-xs text-error mt-1">{errors.assignedTo}</p>
              )}
            </div>

            {/* Contract File */}
            <div className="md:col-span-2">
              <Label htmlFor="contractFile">Contract File</Label>
              <div className="mt-2 flex items-center gap-3 border border-border rounded-md px-3 py-2">
                <Icon icon="solar:file-linear" width={18} className="text-muted-foreground shrink-0" />
                <input
                  id="contractFile"
                  type="file"
                  className="text-sm text-muted-foreground w-full bg-transparent outline-none cursor-pointer
                  file:mr-3 file:py-1 file:px-3 file:rounded file:border-0
                  file:text-xs file:font-medium file:bg-lightprimary file:text-primary
                  hover:file:bg-primary hover:file:text-white file:cursor-pointer file:transition-colors"
                  onChange={(e) => handleChange('contractFile', e.target.files?.[0] ?? null)}
                />
              </div>
            </div>

          </div>
        </CardBox>

        {/* ── Contact Information ── */}
        <CardBox>
          <h5 className="card-title mb-6">Client's Contact Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
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
                className={`mt-2 ${errors.firstName ? 'border-error focus-visible:border-error' : ''}`}
              />
              {errors.firstName && (
                <p className="text-xs text-error mt-1">{errors.firstName}</p>
              )}
            </div>

            {/* Last Name */}
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
                className={`mt-2 ${errors.lastName ? 'border-error focus-visible:border-error' : ''}`}
              />
              {errors.lastName && (
                <p className="text-xs text-error mt-1">{errors.lastName}</p>
              )}
            </div>

            {/* Contact Designation */}
            <div>
              <Label htmlFor="contactDesignation">Contact Designation</Label>
              <Input
                id="contactDesignation"
                type="text"
                placeholder="e.g. Manager, Director"
                value={formData.contactDesignation}
                onChange={(e) => handleChange('contactDesignation', e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Contact Email */}
            <div>
              <Label htmlFor="contactEmail">
                Contact Email <span className="text-error">*</span>
              </Label>
              <Input
                id="contactEmail"
                type="email"
                placeholder="Enter contact email"
                value={formData.contactEmail}
                onChange={(e) => handleChange('contactEmail', e.target.value)}
                className={`mt-2 ${errors.contactEmail ? 'border-error focus-visible:border-error' : ''}`}
              />
              {errors.contactEmail && (
                <p className="text-xs text-error mt-1">{errors.contactEmail}</p>
              )}
            </div>

            {/* Contact Office No */}
            <div>
              <Label htmlFor="contactOfficeNo">Contact Office No</Label>
              <Input
                id="contactOfficeNo"
                type="tel"
                placeholder="Enter office number"
                value={formData.contactOfficeNo}
                onChange={(e) => handleChange('contactOfficeNo', e.target.value)}
                className="mt-2"
              />
            </div>

            {/* Contact Mobile No */}
            <div>
              <Label htmlFor="contactMobileNo">Contact Mobile No</Label>
              <Input
                id="contactMobileNo"
                type="tel"
                placeholder="Enter mobile number"
                value={formData.contactMobileNo}
                onChange={(e) => handleChange('contactMobileNo', e.target.value)}
                className="mt-2"
              />
            </div>

          </div>
        </CardBox>
      </div>

      {/* ── Billing Information ── */}
      <CardBox>
        <h5 className="card-title mb-6">Client's Billing Information</h5>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Billing Name */}
          <div>
            <Label htmlFor="billingName">
              Billing Name <span className="text-error">*</span>
            </Label>
            <Input
              id="billingName"
              type="text"
              placeholder="Enter billing name"
              value={formData.billingName}
              onChange={(e) => handleChange('billingName', e.target.value)}
              className={`mt-2 ${errors.billingName ? 'border-error focus-visible:border-error' : ''}`}
            />
            {errors.billingName && (
              <p className="text-xs text-error mt-1">{errors.billingName}</p>
            )}
          </div>

          {/* Billing Address */}
          <div>
            <Label htmlFor="billingAddress">Billing Address</Label>
            <Input
              id="billingAddress"
              type="text"
              placeholder="Enter billing address"
              value={formData.billingAddress}
              onChange={(e) => handleChange('billingAddress', e.target.value)}
              className="mt-2"
            />
          </div>

          {/* Billing Email */}
          <div>
            <Label htmlFor="billingEmail">
              Billing Email <span className="text-error">*</span>
            </Label>
            <Input
              id="billingEmail"
              type="email"
              placeholder="Enter billing email"
              value={formData.billingEmail}
              onChange={(e) => handleChange('billingEmail', e.target.value)}
              className={`mt-2 ${errors.billingEmail ? 'border-error focus-visible:border-error' : ''}`}
            />
            {errors.billingEmail && (
              <p className="text-xs text-error mt-1">{errors.billingEmail}</p>
            )}
          </div>

          {/* Billing Terms */}
          <div>
            <Label>
              Billing Terms <span className="text-error">*</span>
            </Label>
            <Select
              value={formData.billingTerms}
              onValueChange={(val) => handleChange('billingTerms', val)}
            >
              <SelectTrigger className={`mt-2 w-full ${errors.billingTerms ? 'border-error' : ''}`}>
                <SelectValue placeholder="Select billing terms" />
              </SelectTrigger>
              <SelectContent>
                {billingTermsOptions.map((t) => (
                  <SelectItem key={t.value} value={t.value}>
                    {t.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {errors.billingTerms && (
              <p className="text-xs text-error mt-1">{errors.billingTerms}</p>
            )}
          </div>

        </div>
      </CardBox>

      {/* ── Actions ── */}
      <div className="flex items-center justify-end gap-3">
        <Button
          variant="outline"
          onClick={() => navigate('/clients')}
          className="px-6"
        >
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-6 bg-primary hover:bg-primaryemphasis text-white"
        >
          {mode === 'create' ? 'Save Client' : 'Update Client'}
        </Button>
      </div>

    </div>
  );
};

export default ClientForm;