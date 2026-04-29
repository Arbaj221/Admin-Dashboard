import { useEffect, useState } from 'react';

import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Label } from 'src/components/ui/label';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';

import { CAMPAIGN_STATUS_OPTIONS } from 'src/config/constant-data/campaignOptions';
import { campaignSegmentService } from '../services/campaignSegmentService';
import { campaignService } from '../../manageCampaigns/services/campaignService';

import { toast } from 'sonner';

interface Props {
    mode: 'create' | 'edit';
    campaignId?: number;
    segment?: any;
    onSuccess: () => void;
}

const SegmentForm = ({ mode, campaignId, segment, onSuccess }: Props) => {
    const [form, setForm] = useState<any>({
        title: '',
        segment_start_date: '',
        segment_end_date: '',
        allocation: '',
        delivered: 0,
        accepted: 0,
        rejected: 0,
        status: '',
    });

    const [original, setOriginal] = useState<any>(null);
    const [campaign, setCampaign] = useState<any>(null);

    // 🔹 Load campaign
    useEffect(() => {
        const loadCampaign = async () => {
            if (!campaignId) return;
            const data = await campaignService.getCampaignById(campaignId);
            setCampaign(data);
        };
        loadCampaign();
    }, [campaignId]);

    // 🔹 Edit Mode
    useEffect(() => {
        if (segment) {
            const mapped = {
                ...segment,
                delivered: segment.delivered ?? 0,
                accepted: segment.accepted ?? 0,
                rejected: segment.rejected ?? 0,
                status: segment.status?.trim() || '',
            };

            setForm(mapped);
            setOriginal(mapped); // ✅ store original for patch diff
        }
    }, [segment]);

    const handleChange = (field: string, value: any) => {
        setForm((prev: any) => ({
            ...prev,
            [field]: value,
        }));
    };

    const getDeficit = () =>
        Number(form.allocation || 0) - Number(form.delivered || 0);

    const validate = () => {
        if (
            !form.title ||
            !form.segment_start_date ||
            !form.segment_end_date ||
            form.allocation === '' ||
            !form.status
        ) {
            toast.error('Please fill required fields');
            return false;
        }

        if (form.segment_start_date > form.segment_end_date) {
            toast.error('Start date cannot be after end date');
            return false;
        }

        if (
            Number(form.allocation) < 0 ||
            Number(form.delivered) < 0 ||
            Number(form.accepted) < 0 ||
            Number(form.rejected) < 0
        ) {
            toast.error('Negative values are not allowed');
            return false;
        }

        if (getDeficit() !== 0 && form.status === 'Completed') {
            toast.error('Cannot mark as Completed until deficit is 0');
            return false;
        }

        return true;
    };

    // 🔥 PATCH ONLY CHANGED FIELDS
    const getChangedPayload = () => {
        if (!original) return form;

        const payload: any = {};

        Object.keys(form).forEach((key) => {
            if (form[key] !== original[key]) {
                payload[key] = form[key];
            }
        });

        return payload;
    };

    const handleSubmit = async (e?: any) => {
        e?.preventDefault();

        if (!validate()) return;

        try {
            if (mode === 'create') {
                await campaignSegmentService.createSegment({
                    ...form,
                    campaign_id: campaignId,
                });
                toast.success('Created');
            } else {
                const payload = getChangedPayload();

                if (Object.keys(payload).length === 0) {
                    toast.info('No changes detected');
                    return;
                }

                await campaignSegmentService.updateSegment(segment.id, payload);
                toast.success('Updated');
            }

            onSuccess();
        } catch (e: any) {
            toast.error(e?.response?.data?.detail || 'Error');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">

            {/* 🔹 Campaign Reference */}
            {campaign && (
                <div className="space-y-2 border p-3 rounded-md bg-muted/30 text-sm">
                    <div className="font-semibold">
                        {campaign.code} - {campaign.campaign_name}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div><strong>Start Date:</strong> {campaign.start_date}</div>
                        <div><strong>End Date:</strong> {campaign.end_date}</div>
                        <div><strong>Allocation:</strong> {campaign.total_allocation}</div>
                        <div><strong>Delivered:</strong> {campaign.total_delivered}</div>
                        <div><strong>Accepted:</strong> {campaign.total_accepted}</div>
                        <div><strong>Rejected:</strong> {campaign.total_rejected}</div>
                    </div>
                </div>
            )}

            {/* 🔹 FORM GRID */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                <div>
                    <Label>Title</Label>
                    <Input value={form.title} onChange={(e) => handleChange('title', e.target.value)} />
                </div>

                <div>
                    <Label>Status</Label>
                    <Select
                        key={form.status}
                        value={form.status || ''}
                        onValueChange={(v) => handleChange('status', v)}
                    >
                        <SelectTrigger className='w-full'>
                            <SelectValue placeholder="Select Status" />
                        </SelectTrigger>

                        <SelectContent>
                            {CAMPAIGN_STATUS_OPTIONS
                                .filter((s) =>
                                    mode === 'create'
                                        ? ['Not Started', 'Live'].includes(s.value)
                                        : true
                                )
                                .map((s) => {
                                    const disableCompleted =
                                        s.value === 'Completed' && getDeficit() !== 0;

                                    return (
                                        <SelectItem
                                            key={s.value}
                                            value={s.value}
                                            disabled={disableCompleted}
                                        >
                                            {s.label}
                                        </SelectItem>
                                    );
                                })}
                        </SelectContent>
                    </Select>
                </div>

                <div>
                    <Label>Start Date</Label>
                    <Input
                        type="date"
                        value={form.segment_start_date}
                        min={campaign?.start_date}
                        max={form.segment_end_date || campaign?.end_date}
                        onChange={(e) => handleChange('segment_start_date', e.target.value)}
                    />
                </div>

                <div>
                    <Label>End Date</Label>
                    <Input
                        type="date"
                        value={form.segment_end_date}
                        min={form.segment_start_date || campaign?.start_date}
                        max={campaign?.end_date}
                        onChange={(e) => handleChange('segment_end_date', e.target.value)}
                    />
                </div>

                <div>
                    <Label>Allocation</Label>
                    <Input type="number" min="0" value={form.allocation} onChange={(e) => handleChange('allocation', e.target.value)} />
                </div>

                <div>
                    <Label>Delivered</Label>
                    <Input type="number" min="0" value={form.delivered ?? 0} onChange={(e) => handleChange('delivered', e.target.value || 0)} />
                </div>

                <div>
                    <Label>Accepted</Label>
                    <Input type="number" min="0" value={form.accepted ?? 0} onChange={(e) => handleChange('accepted', e.target.value || 0)} />
                </div>

                <div>
                    <Label>Rejected</Label>
                    <Input type="number" min="0" value={form.rejected ?? 0} onChange={(e) => handleChange('rejected', e.target.value || 0)} />
                </div>

                <div className="md:col-span-2">
                    <Label>Deficit</Label>
                    <Input value={getDeficit()} disabled />
                </div>

            </div>

            {/* 🔹 BUTTONS */}
            <div className="flex justify-end gap-2">
                <Button type="button" variant="lighterror" onClick={onSuccess}>
                    Cancel
                </Button>

                <Button type="submit" variant="lightprimary">
                    {mode === 'create' ? 'Create' : 'Update'}
                </Button>
            </div>

        </form>
    );
};

export default SegmentForm;