import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import { Button } from 'src/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Campaign } from '../types/campaign.types';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

interface CampaignsTableProps {
  campaigns: Campaign[];
  onDelete: (id: number) => void;
}

const tableHeadings = [
  'CRM Code', 'Name', 'Type', 'Start Date', 'End Date',
  'Method', 'Allocation', 'Delivered', 'Accepted', 'Deficit', 'Status', 'Actions',
];



const CampaignsTable = ({ campaigns, onDelete }: CampaignsTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeadings.map((heading) => (
              <TableHead key={heading} className="text-xs font-semibold whitespace-nowrap">
                {heading}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>

        <TableBody>
          {campaigns.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeadings.length} className="text-center py-8 text-muted-foreground">
                No campaigns found.
              </TableCell>
            </TableRow>
          ) : (
            campaigns.map((campaign) => (
              <TableRow
                key={campaign.id}
                className="hover:bg-lightprimary transition-colors even:bg-lightprimary/80"
              >
                {/* CRM Code */}
                <TableCell>
                  <span className="text-xs font-semibold text-primary whitespace-nowrap">
                    {campaign.crmCode}
                  </span>
                </TableCell>

                {/* Name */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {campaign.name}
                  </span>
                </TableCell>

                {/* Type */}
                <TableCell>
                  <StatusBadge value={campaign.type} />
                </TableCell>

                {/* Start Date */}
                <TableCell>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {campaign.startDate}
                  </span>
                </TableCell>

                {/* End Date */}
                <TableCell>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">
                    {campaign.endDate}
                  </span>
                </TableCell>

                {/* Method */}
                <TableCell>
                  <span className="text-sm text-foreground whitespace-nowrap">
                    {campaign.method}
                  </span>
                </TableCell>

                {/* Allocation */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    {campaign.allocation.toLocaleString()}
                  </span>
                </TableCell>

                {/* Delivered */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    {campaign.delivered.toLocaleString()}
                  </span>
                </TableCell>

                {/* Accepted */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground">
                    {campaign.accepted.toLocaleString()}
                  </span>
                </TableCell>

                {/* Deficit */}
                <TableCell>
                  <span className={`text-sm font-medium ${campaign.deficit > 0 ? 'text-erroremphasis' : 'text-successemphasis'}`}>
                    {campaign.deficit.toLocaleString()}
                  </span>
                </TableCell>

                {/* Status */}
                <TableCell>
                   <StatusBadge value={campaign.status} />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      title="Edit"
                      onClick={() => navigate(`/campaigns/edit/${campaign.id}`)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="lighterror"
                      className="size-8! rounded-full"
                      title="Delete"
                      onClick={() => onDelete(campaign.id)}
                    >
                      <Trash2 className="size-4" />
                    </Button>
                  </div>
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default CampaignsTable;