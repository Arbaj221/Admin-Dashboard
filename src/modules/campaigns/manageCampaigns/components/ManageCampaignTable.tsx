import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { Badge } from 'src/components/ui/badge';
import { Button } from 'src/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Trash2 } from 'lucide-react';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

type Status = 'Non Started' | 'Cancelled' | 'Completed' | 'Live' | 'Pause';

interface ManageCampaignRow {
  id: number;
  segmentId: string;
  title: string;
  startDate: string;
  endDate: string;
  allocation: number;
  delivered: number;
  accepted: number;
  rejected: number;
  status: Status;
}

const statusBadgeClass = (status: Status) => {
  switch (status) {
    case 'Live': return 'bg-lightsuccess text-successemphasis';
    case 'Completed': return 'bg-lightinfo text-infoemphasis';
    case 'Pause': return 'bg-lightwarning text-warningemphasis';
    case 'Cancelled': return 'bg-lighterror text-erroremphasis';
    case 'Non Started': return 'bg-muted text-muted-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const statusOptions: Status[] = ['Non Started', 'Cancelled', 'Completed', 'Live', 'Pause'];

const initialData: ManageCampaignRow[] = [
  {
    id: 1,
    segmentId: 'PV01_310326_0057_00070',
    title: 'Cohesity NNL - JP - Executive',
    startDate: '2026-04-01',
    endDate: '2026-06-30',
    allocation: 1200,
    delivered: 800,
    accepted: 700,
    rejected: 100,
    status: 'Live',
  },
  {
    id: 2,
    segmentId: 'PV01_310326_0057_00071',
    title: 'Dell EMEA ISG MB GenAi - UK - 123',
    startDate: '2026-04-05',
    endDate: '2026-07-05',
    allocation: 2000,
    delivered: 0,
    accepted: 0,
    rejected: 0,
    status: 'Non Started',
  },
  {
    id: 3,
    segmentId: 'PV02_310326_0058_00072',
    title: 'HP APJ Storage Solutions - SG - 456',
    startDate: '2026-03-15',
    endDate: '2026-05-15',
    allocation: 1500,
    delivered: 1500,
    accepted: 1400,
    rejected: 100,
    status: 'Completed',
  },
  {
    id: 4,
    segmentId: 'PV02_310326_0058_00073',
    title: 'Cisco EMEA Security - DE - 789',
    startDate: '2026-04-10',
    endDate: '2026-06-10',
    allocation: 900,
    delivered: 400,
    accepted: 350,
    rejected: 50,
    status: 'Pause',
  },
  {
    id: 5,
    segmentId: 'PV03_310326_0059_00074',
    title: 'Microsoft Azure - US - 321',
    startDate: '2026-02-01',
    endDate: '2026-04-01',
    allocation: 500,
    delivered: 0,
    accepted: 0,
    rejected: 0,
    status: 'Cancelled',
  },
];

// Minimal input — no border normally, highlights on focus
const InlineInput = ({
  value,
  onChange,
  type = 'text',
}: {
  value: string | number;
  onChange: (val: string) => void;
  type?: string;
}) => (
  <input
    type={type}
    value={value}
    onChange={(e) => onChange(e.target.value)}
    className="
      w-full bg-transparent text-sm text-foreground
      border-b border-transparent
      focus:border-primary focus:outline-none
      transition-colors duration-150
      py-0.5 px-0
    "
  />
);

const tableHeadings = [
  'Segment ID', 'Title', 'Start Date', 'End Date',
  'Allocation', 'Delivered', 'Accepted', 'Rejected', 'Status', 'Remove',
];

const ManageCampaignTable = () => {
  const [rows, setRows] = useState<ManageCampaignRow[]>(initialData);

  const handleChange = <K extends keyof ManageCampaignRow>(
    id: number,
    field: K,
    value: ManageCampaignRow[K],
  ) => {
    setRows((prev) =>
      prev.map((row) => (row.id === id ? { ...row, [field]: value } : row)),
    );
  };

  const handleRemove = (id: number) => {
    setRows((prev) => prev.filter((row) => row.id !== id));
  };

  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeadings.map((heading) => (
              <TableHead
                key={heading}
                className="text-sm font-semibold whitespace-nowrap border-r border-border last:border-r-0"
              >
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {rows.length === 0 ? (
            <TableRow>
              <TableCell
                colSpan={tableHeadings.length}
                className="text-center py-8 text-muted-foreground"
              >
                No segments found.
              </TableCell>
            </TableRow>
          ) : (
            rows.map((row) => (
              <TableRow
                key={row.id}
                className="hover:bg-lightprimary transition-colors even:bg-lightprimary/80"
              >

                {/* Segment ID — read only */}
                <TableCell className="border-r border-border min-w-[200px]">
                  <span className="text-sm font-semibold text-primary whitespace-nowrap">
                    {row.segmentId}
                  </span>
                </TableCell>

                {/* Title — read only */}
                <TableCell className="border-r border-border min-w-[220px]">
                  <span className="text-sm font-medium text-foreground">
                    {row.title}
                  </span>
                </TableCell>

                {/* Start Date — editable */}
                <TableCell className="border-r border-border min-w-[130px]">
                  <InlineInput
                    type="date"
                    value={row.startDate}
                    onChange={(val) => handleChange(row.id, 'startDate', val)}
                  />
                </TableCell>

                {/* End Date — editable */}
                <TableCell className="border-r border-border min-w-[130px]">
                  <InlineInput
                    type="date"
                    value={row.endDate}
                    onChange={(val) => handleChange(row.id, 'endDate', val)}
                  />
                </TableCell>

                {/* Allocation — editable */}
                <TableCell className="border-r border-border min-w-[100px]">
                  <InlineInput
                    type="number"
                    value={row.allocation}
                    onChange={(val) => handleChange(row.id, 'allocation', Number(val))}
                  />
                </TableCell>

                {/* Delivered — editable */}
                <TableCell className="border-r border-border min-w-[100px]">
                  <InlineInput
                    type="number"
                    value={row.delivered}
                    onChange={(val) => handleChange(row.id, 'delivered', Number(val))}
                  />
                </TableCell>

                {/* Accepted — editable */}
                <TableCell className="border-r border-border min-w-[100px]">
                  <InlineInput
                    type="number"
                    value={row.accepted}
                    onChange={(val) => handleChange(row.id, 'accepted', Number(val))}
                  />
                </TableCell>

                {/* Rejected — editable */}
                <TableCell className="border-r border-border min-w-[100px]">
                  <InlineInput
                    type="number"
                    value={row.rejected}
                    onChange={(val) => handleChange(row.id, 'rejected', Number(val))}
                  />
                </TableCell>

                {/* Status — always select */}
                <TableCell className="border-r border-border min-w-[140px]">
                  <Select
                    value={row.status}
                    onValueChange={(val) => handleChange(row.id, 'status', val as Status)}
                  >
                    <SelectTrigger className="border-none shadow-none bg-transparent focus:ring-0 h-auto p-0 gap-1 text-sm">
                      <StatusBadge value={row.status} />
                    </SelectTrigger>
                    <SelectContent>
                      {statusOptions.map((opt) => (
                        <SelectItem key={opt} value={opt}>
                           <StatusBadge value={opt} />
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>

                {/* Remove */}
                <TableCell>
                  <Button
                    size="sm"
                    variant="lighterror"
                    className="size-8! rounded-full"
                    title="Remove"
                    onClick={() => handleRemove(row.id)}
                  >
                    <Trash2 className="size-4" />
                  </Button>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ManageCampaignTable;