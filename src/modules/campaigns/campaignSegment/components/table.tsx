import { useEffect, useState } from 'react';

import {
    Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from 'src/components/ui/table';

import {
    Tooltip, TooltipContent, TooltipProvider, TooltipTrigger
} from 'src/components/ui/tooltip';

import { Button } from 'src/components/ui/button';
import { Input } from 'src/components/ui/input';
import {
    Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from 'src/components/ui/select';

import { Pencil, Trash2, Check, X } from 'lucide-react';

import StatusBadge from 'src/components/shared/status-badges/StatusBadge';
import { campaignSegmentService } from '../services/campaignSegmentService';
import { CAMPAIGN_STATUS_OPTIONS } from 'src/config/constant-data/campaignOptions';
import { toast } from 'sonner';
import Can from 'src/permissions/Can';
import { useConfirm } from 'src/components/shared/confirmdialog/confirm-context';
import { campaignService } from '../../manageCampaigns/services/campaignService';

interface Props {
    campaignId: number | undefined;
    addTrigger?: number;

}

const CampSegmentTable = ({ campaignId, addTrigger }: Props) => {
    const [segments, setSegments] = useState<any[]>([]);
    const [campaign, setCampaign] = useState<any>(null);

    const [editingId, setEditingId] = useState<number | null>(null);
    const [editedRow, setEditedRow] = useState<any>({});
    const [newRow, setNewRow] = useState<any | null>(null);

    const confirm = useConfirm();

    const loadSegments = async () => {
        if (!campaignId) return;
        const data = await campaignSegmentService.getSegmentsByCampaignId(campaignId);
        setSegments(data || []);
    };

    const loadCampaign = async () => {
        if (!campaignId) return;
        const data = await campaignService.getCampaignById(campaignId);
        setCampaign(data);
    };

    useEffect(() => {
        loadSegments();
        loadCampaign();
    }, [campaignId]);

    const getDeficit = (row: any) =>
        Number(row.allocation || 0) - Number(row.delivered || 0);

    const handleChange = (field: string, value: any) => {
        if (editingId) {
            setEditedRow((prev: any) => ({ ...prev, [field]: value }));
        } else {
            setNewRow((prev: any) => ({ ...prev, [field]: value }));
        }
    };

    const validate = (row: any) => {
        if (!row.title) return toast.error('Title is required'), false;

        if (!row.segment_start_date || !row.segment_end_date)
            return toast.error('Select start & end date'), false;

        if (row.segment_start_date > row.segment_end_date)
            return toast.error('Start date cannot be after end date'), false;

        if (campaign) {
            if (row.segment_start_date < campaign.start_date)
                return toast.error('Start date cannot be before campaign start'), false;

            if (row.segment_end_date > campaign.end_date)
                return toast.error('End date cannot be after campaign end'), false;
        }

        if (row.allocation === '')
            return toast.error('Allocation is required'), false;

        if (
            Number(row.allocation) < 0 ||
            Number(row.delivered) < 0 ||
            Number(row.accepted) < 0 ||
            Number(row.rejected) < 0
        ) {
            return toast.error('Negative values not allowed'), false;
        }

        if (!row.status)
            return toast.error('Select status'), false;

        if (getDeficit(row) !== 0 && row.status === 'Completed')
            return toast.error('Deficit must be 0 for Completed'), false;

        return true;
    };

    useEffect(() => {
        if (!campaignId) return;

        setNewRow({
            title: '',
            segment_start_date: '',
            segment_end_date: '',
            allocation: '',
            delivered: 0,
            accepted: 0,
            rejected: 0,
            status: '',
        });

        setEditingId(null);
    }, [addTrigger]);

    const handleEdit = (row: any) => {
        setEditingId(row.id);
        setEditedRow({ ...row });
        setNewRow(null);
    };

    const handleCancel = () => {
        setEditingId(null);
        setEditedRow({});
        setNewRow(null);
    };

    const handleSave = async () => {
        if (newRow) {
            if (!validate(newRow)) return;

            await campaignSegmentService.createSegment({
                ...newRow,
                campaign_id: campaignId,
            });

            toast.success('Segment created successfully');
        } else if (editingId) {
            if (!validate(editedRow)) return;

            const original = segments.find((s) => s.id === editingId);
            const payload: any = {};

            Object.keys(editedRow).forEach((k) => {
                if (editedRow[k] !== original[k]) payload[k] = editedRow[k];
            });

            if (!Object.keys(payload).length) {
                toast.info('No changes detected');
                handleCancel();
                return;
            }

            await campaignSegmentService.updateSegment(editingId, payload);
            toast.success('Segment updated successfully');
        }

        handleCancel();
        loadSegments();
    };

    const handleDelete = async (id: number) => {
        const ok = await confirm({
            title: 'Delete segment?',
            description: 'This action cannot be undone.',
            confirmText: 'Delete',
            variant: 'destructive',
        });

        if (!ok) return;

        await campaignSegmentService.deleteSegment(id);
        toast.success('Segment deleted successfully');
        loadSegments();
    };

    return (
        <div className="overflow-x-auto border border-border rounded-md mt-6">

            <Table>

                <TableHeader>
                    <TableRow>
                        <TableHead className="min-w-[220px]">Segment</TableHead>
                        <TableHead>Start</TableHead>
                        <TableHead>End</TableHead>
                        <TableHead>Allocation</TableHead>
                        <TableHead>Delivered</TableHead>
                        <TableHead>Accepted</TableHead>
                        <TableHead>Rejected</TableHead>
                        <TableHead>Deficit</TableHead>
                        <TableHead>Status</TableHead>
                        <Can module="campaign_segment" actions={["edit", "delete", "create"]}>
                            <TableHead>Actions</TableHead>
                        </Can>
                    </TableRow>
                </TableHeader>

                <TableBody>

                    {/* CREATE ROW */}
                    {newRow && (
                        <TableRow>
                            <TableCell>
                                <Input value={newRow.title} onChange={(e) => handleChange('title', e.target.value)} />
                                <div className="text-xs text-muted-foreground">Code auto</div>
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="date"
                                    min={campaign?.start_date}
                                    max={newRow.segment_end_date || campaign?.end_date}
                                    value={newRow.segment_start_date}
                                    onChange={(e) => handleChange('segment_start_date', e.target.value)}
                                />
                            </TableCell>

                            <TableCell>
                                <Input
                                    type="date"
                                    min={newRow.segment_start_date || campaign?.start_date}
                                    max={campaign?.end_date}
                                    value={newRow.segment_end_date}
                                    onChange={(e) => handleChange('segment_end_date', e.target.value)}
                                />
                            </TableCell>

                            <TableCell className='min-w-32'><Input type="number" min="0" value={newRow.allocation} onChange={(e) => handleChange('allocation', e.target.value)} /></TableCell>
                            <TableCell className='min-w-32'><Input type="number" min="0" value={newRow.delivered} onChange={(e) => handleChange('delivered', e.target.value)} /></TableCell>
                            <TableCell className='min-w-32'><Input type="number" min="0" value={newRow.accepted} onChange={(e) => handleChange('accepted', e.target.value)} /></TableCell>
                            <TableCell className='min-w-32'><Input type="number" min="0" value={newRow.rejected} onChange={(e) => handleChange('rejected', e.target.value)} /></TableCell>

                            <TableCell>{getDeficit(newRow)}</TableCell>

                            <TableCell>
                                <Select onValueChange={(v) => handleChange('status', v)}>
                                    <SelectTrigger><SelectValue placeholder="Status" /></SelectTrigger>
                                    <SelectContent>
                                        {CAMPAIGN_STATUS_OPTIONS
                                            .filter(s => ['Not Started', 'Live'].includes(s.value))
                                            .map(s => (
                                                <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                                            ))}
                                    </SelectContent>
                                </Select>
                            </TableCell>

                            <TableCell>
                                <div className="flex justify-center gap-2">
                                    <Button variant="lightprimary" size="sm" onClick={handleSave}><Check size={14} /></Button>
                                    <Button variant="lighterror" size="sm" onClick={handleCancel}><X size={14} /></Button>
                                </div>
                            </TableCell>
                        </TableRow>
                    )}

                    {/* DATA */}
                    {segments.map((s) => {
                        const isEditing = editingId === s.id;

                        return (
                            <TableRow key={s.id}>

                                <TableCell className="">
                                    {isEditing ? (
                                        <Input value={editedRow.title} onChange={(e) => handleChange('title', e.target.value)} />
                                    ) : (
                                        <>
                                            <div className="font-medium">
                                                {s.title.length > 30 ? (
                                                    <TooltipProvider>
                                                        <Tooltip>
                                                            <TooltipTrigger asChild>
                                                                <span>{s.title.slice(0, 30)}...</span>
                                                            </TooltipTrigger>
                                                            <TooltipContent>{s.title}</TooltipContent>
                                                        </Tooltip>
                                                    </TooltipProvider>
                                                ) : s.title}
                                            </div>
                                            <div className="text-xs text-primary">{s.segment_code}</div>
                                        </>
                                    )}
                                </TableCell>

                                <TableCell>
                                    {isEditing ? (
                                        <Input
                                            type="date"
                                            min={campaign?.start_date}
                                            max={editedRow.segment_end_date || campaign?.end_date}
                                            value={editedRow.segment_start_date}
                                            onChange={(e) => handleChange('segment_start_date', e.target.value)}
                                        />
                                    ) : s.segment_start_date}
                                </TableCell>

                                <TableCell>
                                    {isEditing ? (
                                        <Input
                                            type="date"
                                            min={editedRow.segment_start_date || campaign?.start_date}
                                            max={campaign?.end_date}
                                            value={editedRow.segment_end_date}
                                            onChange={(e) => handleChange('segment_end_date', e.target.value)}
                                        />
                                    ) : s.segment_end_date}
                                </TableCell>

                                <TableCell className='min-w-32'>{isEditing ? <Input type="number" min="0" value={editedRow.allocation} onChange={(e) => handleChange('allocation', e.target.value)} /> : s.allocation}</TableCell>
                                <TableCell className='min-w-32'>{isEditing ? <Input type="number" min="0" value={editedRow.delivered} onChange={(e) => handleChange('delivered', e.target.value)} /> : s.delivered}</TableCell>
                                <TableCell className='min-w-32'>{isEditing ? <Input type="number" min="0" value={editedRow.accepted} onChange={(e) => handleChange('accepted', e.target.value)} /> : s.accepted}</TableCell>
                                <TableCell className='min-w-32 text-error'>{isEditing ? <Input type="number" min="0" value={editedRow.rejected} onChange={(e) => handleChange('rejected', e.target.value)} /> : s.rejected}</TableCell>

                                <TableCell>{isEditing ? getDeficit(editedRow) : getDeficit(s)}</TableCell>

                                <TableCell>
                                    {isEditing ? (
                                        <Select value={editedRow.status} onValueChange={(v) => handleChange('status', v)}>
                                            <SelectTrigger><SelectValue /></SelectTrigger>
                                            <SelectContent>
                                                {CAMPAIGN_STATUS_OPTIONS.map((opt) => {
  const deficit = getDeficit(editedRow);

  const disableCompleted =
    opt.value === 'Completed' &&
    (deficit !== 0 || Number(editedRow.allocation) === 0);

  return (
    <SelectItem
      key={opt.value}
      value={opt.value}
      disabled={disableCompleted}
    >
      {opt.label}
    </SelectItem>
  );
})}
                                            </SelectContent>
                                        </Select>
                                    ) : <StatusBadge value={s.status} />}
                                </TableCell>

                                <TableCell>
                                    <div className="flex justify-center gap-2">
                                        {isEditing ? (
                                            <>
                                                <Button variant="lightprimary" size="sm" onClick={handleSave}><Check size={14} /></Button>
                                                <Button variant="lighterror" size="sm" onClick={handleCancel}><X size={14} /></Button>
                                            </>
                                        ) : (
                                            <>
                                                <Can module="campaign_segment" action="edit">
                                                    <Button variant="lightprimary" size="sm" onClick={() => handleEdit(s)}><Pencil size={14} /></Button>
                                                </Can>
                                                <Can module="campaign_segment" action="delete">
                                                    <Button variant="lighterror" size="sm" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></Button>
                                                </Can>
                                            </>
                                        )}
                                    </div>
                                </TableCell>

                            </TableRow>
                        );
                    })}

                </TableBody>
            </Table>
        </div>
    );
};

export default CampSegmentTable;