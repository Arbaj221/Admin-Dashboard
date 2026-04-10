import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';
import { Textarea } from 'src/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import CardBox from 'src/components/shared/CardBox';
import { Icon } from '@iconify/react';

interface CampaignFormData {
  campaignName: string;
  campaignType: string;
  deliveryMode: string;
  client: string;
  deliveryMethod: string;
  status: string;
  startDate: string;
  endDate: string;
  totalAllocation: string;
  totalDelivered: string;
  totalAccepted: string;
  totalRejected: string;
  currency: string;
  cpl: string;
  priority: string;
  campaignDocument: File | null;
  comment: string;
}

interface CampaignFormProps {
  mode: 'create' | 'edit';
  initialData?: Partial<CampaignFormData>;
}

const defaultFormData: CampaignFormData = {
  campaignName: '',
  campaignType: '',
  deliveryMode: '',
  client: '',
  deliveryMethod: '',
  status: '',
  startDate: '',
  endDate: '',
  totalAllocation: '',
  totalDelivered: '',
  totalAccepted: '',
  totalRejected: '',
  currency: '',
  cpl: '',
  priority: '',
  campaignDocument: null,
  comment: '',
};

const CampaignForm = ({ mode, initialData }: CampaignFormProps) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<CampaignFormData>({
    ...defaultFormData,
    ...initialData,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CampaignFormData, string>>>({});

  const handleChange = (field: keyof CampaignFormData, value: string | File | null) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CampaignFormData, string>> = {};
    if (!formData.campaignName.trim()) newErrors.campaignName = 'Campaign name is required';
    if (!formData.campaignType) newErrors.campaignType = 'Campaign type is required';
    if (!formData.deliveryMode) newErrors.deliveryMode = 'Delivery mode is required';
    if (!formData.client) newErrors.client = 'Client is required';
    if (!formData.deliveryMethod) newErrors.deliveryMethod = 'Delivery method is required';
    if (!formData.status) newErrors.status = 'Status is required';
    if (!formData.startDate) newErrors.startDate = 'Start date is required';
    if (!formData.endDate) newErrors.endDate = 'End date is required';
    if (!formData.totalAllocation) newErrors.totalAllocation = 'Total allocation is required';
    if (!formData.currency) newErrors.currency = 'Currency is required';
    if (!formData.priority) newErrors.priority = 'Priority is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    navigate('/campaigns');
  };

  const inputClass = (field: keyof CampaignFormData) =>
    `mt-2 ${errors[field] ? 'border-error focus-visible:border-error' : ''}`;

  const selectClass = (field: keyof CampaignFormData) =>
    `mt-2 w-full ${errors[field] ? 'border-error' : ''}`;

  return (
    <CardBox>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* 1. Campaign Name */}
        <div>
          <Label htmlFor="campaignName">Campaign Name <span className="text-error">*</span></Label>
          <Input
            id="campaignName"
            type="text"
            placeholder="Enter campaign name"
            value={formData.campaignName}
            onChange={(e) => handleChange('campaignName', e.target.value)}
            className={inputClass('campaignName')}
          />
          {errors.campaignName && <p className="text-xs text-error mt-1">{errors.campaignName}</p>}
        </div>

        {/* 2. Campaign Type */}
        <div>
          <Label>Campaign Type <span className="text-error">*</span></Label>
          <Select value={formData.campaignType} onValueChange={(val) => handleChange('campaignType', val)}>
            <SelectTrigger className={selectClass('campaignType')}>
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email</SelectItem>
              <SelectItem value="bant">BANT</SelectItem>
              <SelectItem value="telemarketing">Telemarketing</SelectItem>
            </SelectContent>
          </Select>
          {errors.campaignType && <p className="text-xs text-error mt-1">{errors.campaignType}</p>}
        </div>

        {/* 3. Delivery Mode */}
        <div>
          <Label>Delivery Mode <span className="text-error">*</span></Label>
          <Select value={formData.deliveryMode} onValueChange={(val) => handleChange('deliveryMode', val)}>
            <SelectTrigger className={selectClass('deliveryMode')}>
              <SelectValue placeholder="Select delivery mode" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email_delivery">Email Delivery</SelectItem>
              <SelectItem value="portal_delivery">Portal Delivery</SelectItem>
            </SelectContent>
          </Select>
          {errors.deliveryMode && <p className="text-xs text-error mt-1">{errors.deliveryMode}</p>}
        </div>

        {/* 4. Client */}
        <div>
          <Label>Client <span className="text-error">*</span></Label>
          <Select value={formData.client} onValueChange={(val) => handleChange('client', val)}>
            <SelectTrigger className={selectClass('client')}>
              <SelectValue placeholder="Select client" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="pv01">Acme Corporation</SelectItem>
              <SelectItem value="pv02">Globex Industries</SelectItem>
              <SelectItem value="pv03">Initech Solutions</SelectItem>
              <SelectItem value="pv04">Umbrella Corp</SelectItem>
            </SelectContent>
          </Select>
          {errors.client && <p className="text-xs text-error mt-1">{errors.client}</p>}
        </div>

        {/* 5. Delivery Method */}
        <div>
          <Label>Delivery Method <span className="text-error">*</span></Label>
          <Select value={formData.deliveryMethod} onValueChange={(val) => handleChange('deliveryMethod', val)}>
            <SelectTrigger className={selectClass('deliveryMethod')}>
              <SelectValue placeholder="Select delivery method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="front_load">Front Load</SelectItem>
            </SelectContent>
          </Select>
          {errors.deliveryMethod && <p className="text-xs text-error mt-1">{errors.deliveryMethod}</p>}
        </div>

        {/* 6. Status */}
        <div>
          <Label>Status <span className="text-error">*</span></Label>
          <Select value={formData.status} onValueChange={(val) => handleChange('status', val)}>
            <SelectTrigger className={selectClass('status')}>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="live">Live</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
            </SelectContent>
          </Select>
          {errors.status && <p className="text-xs text-error mt-1">{errors.status}</p>}
        </div>

        {/* 7. Start Date */}
        <div>
          <Label htmlFor="startDate">Start Date <span className="text-error">*</span></Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => handleChange('startDate', e.target.value)}
            className={inputClass('startDate')}
          />
          {errors.startDate && <p className="text-xs text-error mt-1">{errors.startDate}</p>}
        </div>

        {/* 8. End Date */}
        <div>
          <Label htmlFor="endDate">End Date <span className="text-error">*</span></Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => handleChange('endDate', e.target.value)}
            className={inputClass('endDate')}
          />
          {errors.endDate && <p className="text-xs text-error mt-1">{errors.endDate}</p>}
        </div>

        {/* 9. Total Allocation */}
        <div>
          <Label htmlFor="totalAllocation">Total Allocation <span className="text-error">*</span></Label>
          <Input
            id="totalAllocation"
            type="number"
            placeholder="Enter total allocation"
            value={formData.totalAllocation}
            onChange={(e) => handleChange('totalAllocation', e.target.value)}
            className={inputClass('totalAllocation')}
          />
          {errors.totalAllocation && <p className="text-xs text-error mt-1">{errors.totalAllocation}</p>}
        </div>

        {/* 10. Total Delivered */}
        <div>
          <Label htmlFor="totalDelivered">Total Delivered</Label>
          <Input
            id="totalDelivered"
            type="number"
            placeholder="Enter total delivered"
            value={formData.totalDelivered}
            onChange={(e) => handleChange('totalDelivered', e.target.value)}
            className="mt-2"
          />
        </div>

        {/* 11. Total Accepted */}
        <div>
          <Label htmlFor="totalAccepted">Total Accepted</Label>
          <Input
            id="totalAccepted"
            type="number"
            placeholder="Enter total accepted"
            value={formData.totalAccepted}
            onChange={(e) => handleChange('totalAccepted', e.target.value)}
            className="mt-2"
          />
        </div>

        {/* 12. Total Rejected */}
        <div>
          <Label htmlFor="totalRejected">Total Rejected</Label>
          <Input
            id="totalRejected"
            type="number"
            placeholder="Enter total rejected"
            value={formData.totalRejected}
            onChange={(e) => handleChange('totalRejected', e.target.value)}
            className="mt-2"
          />
        </div>

        {/* 13. Currency */}
        <div>
          <Label>Currency <span className="text-error">*</span></Label>
          <Select value={formData.currency} onValueChange={(val) => handleChange('currency', val)}>
            <SelectTrigger className={selectClass('currency')}>
              <SelectValue placeholder="Select currency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="usd">USD</SelectItem>
              <SelectItem value="eur">EUR</SelectItem>
              <SelectItem value="gbp">GBP</SelectItem>
            </SelectContent>
          </Select>
          {errors.currency && <p className="text-xs text-error mt-1">{errors.currency}</p>}
        </div>

        {/* 14. CPL */}
        <div>
          <Label htmlFor="cpl">CPL</Label>
          <Input
            id="cpl"
            type="number"
            placeholder="Enter CPL"
            value={formData.cpl}
            onChange={(e) => handleChange('cpl', e.target.value)}
            className="mt-2"
          />
        </div>

        {/* 15. Priority */}
        <div>
          <Label>Priority <span className="text-error">*</span></Label>
          <Select value={formData.priority} onValueChange={(val) => handleChange('priority', val)}>
            <SelectTrigger className={selectClass('priority')}>
              <SelectValue placeholder="Select priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
            </SelectContent>
          </Select>
          {errors.priority && <p className="text-xs text-error mt-1">{errors.priority}</p>}
        </div>

        {/* 16. Campaign Document */}
        <div>
          <Label htmlFor="campaignDocument">Campaign Document</Label>
          <div className="mt-2 flex items-center gap-3 border border-border rounded-md px-3 py-2">
            <Icon icon="solar:file-linear" width={18} className="text-muted-foreground shrink-0" />
            <input
              id="campaignDocument"
              type="file"
              className="text-sm text-muted-foreground w-full bg-transparent outline-none cursor-pointer
                file:mr-3 file:py-1 file:px-3 file:rounded file:border-0
                file:text-xs file:font-medium file:bg-lightprimary file:text-primary
                hover:file:bg-primary hover:file:text-white file:cursor-pointer file:transition-colors"
              onChange={(e) => handleChange('campaignDocument', e.target.files?.[0] ?? null)}
            />
          </div>
        </div>

        {/* 17. Comment — full width */}
        <div className="md:col-span-2">
          <Label htmlFor="comment">Comment</Label>
          <Textarea
            id="comment"
            placeholder="Add any additional comments..."
            rows={4}
            value={formData.comment}
            onChange={(e) => handleChange('comment', e.target.value)}
            className="mt-2"
          />
        </div>

      </div>

      {/* Actions */}
      <div className="flex items-center justify-end gap-3 mt-6">
        <Button variant="outline" onClick={() => navigate('/campaigns')} className="px-6">
          Cancel
        </Button>
        <Button
          onClick={handleSubmit}
          className="px-6 bg-primary hover:bg-primaryemphasis text-white"
        >
          {mode === 'create' ? 'Save Campaign' : 'Update Campaign'}
        </Button>
      </div>
    </CardBox>
  );
};

export default CampaignForm;