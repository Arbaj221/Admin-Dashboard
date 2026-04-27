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

import { Icon } from '@iconify/react';
import { toast } from 'sonner';
import CardBox from 'src/components/shared/CardBox';

import { vendorService } from '../services/vendorService';
import { User } from 'src/modules/users/services/userService';

interface Props {
  mode: 'create' | 'edit';
  initialData?: any;
  users: User[];
  onSuccess: () => void;
}

const countries = [
  'India', 'USA', 'UK', 'Canada', 'Australia',
  'Germany', 'France', 'Japan', 'Singapore', 'UAE',
];

const billingTermsOptions = [
  { label: 'Net 10', value: '10' },
  { label: 'Net 20', value: '20' },
  { label: 'Net 30', value: '30' },
];

// ✅ Extracted builder — used in useState init AND useEffect sync
const buildFormState = (initialData?: any) => ({
  name: initialData?.name || '',
  address: initialData?.address || '',
  country: initialData?.country || '',
  // Must be string — shadcn <Select> does strict string comparison on value
  assigned_to: initialData?.assignedTo ? String(initialData.assignedTo) : '',

  contract_file_name: initialData?.contractFileName || '',
  contract_file: '',

  first_name: initialData?.firstName || '',
  last_name: initialData?.lastName || '',
  contact_designation: initialData?.contactDesignation || '',
  contact_email: initialData?.contactEmail || '',
  contact_office_number: initialData?.contactOfficeNumber || '',
  contact_mobile_number: initialData?.contactMobileNumber || '',

  billing_name: initialData?.billingName || '',
  billing_address: initialData?.billingAddress || '',
  billing_email: initialData?.billingEmail || '',
  billing_terms: initialData?.billingTerms || '',

  is_active: initialData?.isActive ?? true,
});

const VendorForm = ({ mode, initialData, users, onSuccess }: Props) => {
  // ✅ THE KEY FIX: initialize directly from initialData, not empty strings.
  //
  // The old code did: useState({ assigned_to: '' }) then setForm(...) in useEffect.
  // Problem: useEffect runs AFTER the first render. shadcn's Select sees value=""
  // on that first render and some internal Radix state "locks in" the empty state,
  // so even when setForm fires with the real value, the displayed option doesn't update.
  //
  // Solution: pass initialData into useState() directly so the correct value
  // is present on render #1 — no timing gap.
  const [form, setForm] = useState(() => buildFormState(initialData));

  // ✅ Still needed: openEdit() does an async fetch, so initialData arrives
  // AFTER the dialog opens. This sync catches that late arrival.
  useEffect(() => {
    if (initialData) {
      setForm(buildFormState(initialData));
    }
  }, [initialData]);

  const handleChange = (key: string, value: any) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  // ✅ File → Base64
  const handleFileChange = (file: File | null) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm((prev) => ({
        ...prev,
        contract_file: reader.result as string,
        contract_file_name: file.name,
      }));
    };
    reader.readAsDataURL(file);
  };

  const getChangedFields = (original: any, current: any) => {
    const diff: any = {};
    Object.keys(current).forEach((key) => {
      const currentValue = current[key];
      const originalValue = original[key];
      const normalizedCurrent = currentValue === '' || currentValue === null ? undefined : currentValue;
      const normalizedOriginal = originalValue === '' || originalValue === null ? undefined : originalValue;
      if (normalizedCurrent !== normalizedOriginal) {
        diff[key] = currentValue;
      }
    });
    return diff;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let payload: any = {
      ...form,
      assigned_to: Number(form.assigned_to),
    };

    try {
      if (mode === 'create') {
        await vendorService.createVendor(payload);
        toast.success('Vendor created');
      } else {
        const original = {
          name: initialData.name,
          address: initialData.address,
          country: initialData.country,
          assigned_to: Number(initialData.assignedTo), // match payload type for diff
          contract_file_name: initialData.contractFileName,
          first_name: initialData.firstName,
          last_name: initialData.lastName,
          contact_designation: initialData.contactDesignation,
          contact_email: initialData.contactEmail,
          contact_office_number: initialData.contactOfficeNumber,
          contact_mobile_number: initialData.contactMobileNumber,
          billing_name: initialData.billingName,
          billing_address: initialData.billingAddress,
          billing_email: initialData.billingEmail,
          billing_terms: initialData.billingTerms,
          is_active: initialData.isActive,
        };

        const current = { ...payload, is_active: form.is_active };
        delete current.contract_file;

        payload = getChangedFields(original, current);

        if (form.contract_file) {
          payload.contract_file = form.contract_file;
          payload.contract_file_name = form.contract_file_name;
        }

        if (Object.keys(payload).length === 0) {
          toast.info('No changes detected');
          onSuccess();
          return;
        }

        await vendorService.updateVendor(initialData.id, payload);
        toast.success('Vendor updated');
      }

      onSuccess();
    } catch (e: any) {
      toast.error(e?.response?.data?.detail || 'Error occurred');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* Vendor Info */}
        <CardBox>
          <h5 className="card-title mb-6">Vendors Information</h5>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div>
              <Label>Vendor Name *</Label>
              <Input className="mt-2 w-full" value={form.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>

            <div>
              <Label>Address *</Label>
              <Input className="mt-2 w-full" value={form.address} onChange={(e) => handleChange('address', e.target.value)} />
            </div>

            <div>
              <Label>Country *</Label>
              <Select value={form.country} onValueChange={(v) => handleChange('country', v)}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select country" />
                </SelectTrigger>
                <SelectContent>
                  {countries.map((c) => (
                    <SelectItem key={c} value={c}>{c}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>Assigned To *</Label>
              <Select value={form.assigned_to} onValueChange={(v) => handleChange('assigned_to', v)}>
                <SelectTrigger className="mt-2 w-full">
                  <SelectValue placeholder="Select user" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((u) => (
                    <SelectItem key={u.id} value={String(u.id)}>
                      {u.email}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div >
              <Label>Contract File</Label>
              <div className="mt-2 flex items-center gap-3 border border-border rounded-md px-3 py-2">
                <Icon icon="solar:file-linear" width={18} />
                <input
                  type="file"
                  className="w-full text-sm bg-transparent outline-none"
                  onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
                />
              </div>
            </div>
            {mode === 'edit' && (
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={form.is_active}
                  onChange={(e) => handleChange('is_active', e.target.checked)}
                  className="h-4 w-4"
                />
                <Label className="mb-0">Active Vendor</Label>
              </div>
            )}

          </div>
        </CardBox>

        {/* Contact Info */}
        <CardBox>
          <h5 className="card-title mb-6">Vendor Contact</h5>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* First Name */}
            <div>
              <Label>First Name</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter first name"
                value={form.first_name}
                onChange={(e) => handleChange('first_name', e.target.value)}
              />
            </div>

            {/* Last Name */}
            <div>
              <Label>Last Name</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter last name"
                value={form.last_name}
                onChange={(e) => handleChange('last_name', e.target.value)}
              />
            </div>

            {/* Email */}
            <div>
              <Label>Contact Email</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter contact email"
                value={form.contact_email}
                onChange={(e) => handleChange('contact_email', e.target.value)}
              />
            </div>

            {/* Mobile */}
            <div>
              <Label>Contact Mobile Number</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter mobile number"
                value={form.contact_mobile_number}
                onChange={(e) => handleChange('contact_mobile_number', e.target.value)}
              />
            </div>

            {/* Office */}
            <div>
              <Label>Contact Office Number</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter office number"
                value={form.contact_office_number}
                onChange={(e) => handleChange('contact_office_number', e.target.value)}
              />
            </div>

            {/* Designation */}
            <div>
              <Label>Contact Designation</Label>
              <Input
                className="mt-2 w-full"
                placeholder="Enter designation"
                value={form.contact_designation}
                onChange={(e) => handleChange('contact_designation', e.target.value)}
              />
            </div>

          </div>
        </CardBox>

      </div>

      {/* Billing */}
      <CardBox>
        <h5 className="card-title mb-6">Billing Information</h5>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Billing Name */}
          <div>
            <Label>Billing Name</Label>
            <Input
              className="mt-2 w-full"
              placeholder="Enter billing name"
              value={form.billing_name}
              onChange={(e) => handleChange('billing_name', e.target.value)}
            />
          </div>

          {/* Billing Email */}
          <div>
            <Label>Billing Email</Label>
            <Input
              className="mt-2 w-full"
              placeholder="Enter billing email"
              value={form.billing_email}
              onChange={(e) => handleChange('billing_email', e.target.value)}
            />
          </div>

          {/* Billing Address */}
          <div>
            <Label>Billing Address</Label>
            <Input
              className="mt-2 w-full"
              placeholder="Enter billing address"
              value={form.billing_address}
              onChange={(e) => handleChange('billing_address', e.target.value)}
            />
          </div>

          {/* Billing Terms */}
          <div>
            <Label>Billing Terms</Label>
            <Select
              value={form.billing_terms}
              onValueChange={(v) => handleChange('billing_terms', v)}
            >
              <SelectTrigger className="mt-2 w-full">
                <SelectValue placeholder="Select billing terms" />
              </SelectTrigger>
              <SelectContent>
                {billingTermsOptions.map((b) => (
                  <SelectItem key={b.value} value={b.value}>
                    {b.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

        </div>
      </CardBox>

      {/* Actions */}
      <div className="flex justify-end gap-3">
        <Button type="button" variant="lighterror" onClick={onSuccess}>
          Cancel
        </Button>
        <Button type="submit" variant="lightprimary">
          {mode === 'create' ? 'Save Vendor' : 'Update Vendor'}
        </Button>
      </div>

    </form>
  );
};

export default VendorForm;