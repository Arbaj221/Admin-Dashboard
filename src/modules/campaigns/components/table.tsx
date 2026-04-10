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
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { Campaign } from '../types/campaign.types';

interface CampaignsTableProps {
  campaigns: Campaign[];
  onDelete: (id: number) => void;
}

const tableHeadings = [
  'CRM Code', 'Name', 'Type', 'Start Date', 'End Date',
  'Method', 'Allocation', 'Delivered', 'Accepted', 'Deficit', 'Status', 'Actions',
];

const typeBadgeClass = (type: Campaign['type']) => {
  switch (type) {
    case 'Email': return 'bg-lightinfo text-infoemphasis';
    case 'BANT': return 'bg-lightwarning text-warningemphasis';
    case 'Telemarketing': return 'bg-lightsecondary text-secondaryemphasis';
    default: return 'bg-muted text-muted-foreground';
  }
};

const CampaignsTable = ({ campaigns, onDelete }: CampaignsTableProps) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            {tableHeadings.map((heading) => (
              <TableHead key={heading} className="text-sm font-semibold whitespace-nowrap">
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
                  <span className="text-sm font-semibold text-primary whitespace-nowrap">
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
                  <Badge className={`text-xs rounded-full px-3 py-1 font-medium ${typeBadgeClass(campaign.type)}`}>
                    {campaign.type}
                  </Badge>
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
                  <Badge
                    className={`text-xs rounded-full px-3 py-1 font-medium
                      ${campaign.status === 'Live'
                        ? 'bg-lightsuccess text-successemphasis'
                        : 'bg-lightinfo text-infoemphasis'
                      }`}
                  >
                    {campaign.status}
                  </Badge>
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