import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from 'src/components/ui/table';

import { Button } from 'src/components/ui/button';
import { Pencil, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';

import { Campaign, campaignService } from '../services/campaignService';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';
import Can from 'src/permissions/Can';

const CampaignTable = ({ campaigns, clients, onEdit, onDelete }: any) => {
  const navigate = useNavigate();

  const getClient = (id: number) => {
    const c = clients.find((x: any) => x.id === id);
    return c ? `${c.code} - ${c.name}` : 'N/A';
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="overflow-x-auto border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-center">Name</TableHead>
              <TableHead className="text-center">Type</TableHead>
              <TableHead className="text-center">Start</TableHead>
              <TableHead className="text-center">End</TableHead>
              <TableHead className="text-center">Allocation</TableHead>
              <TableHead className="text-center">Delivered</TableHead>
              <TableHead className="text-center">Accepted</TableHead>
              <TableHead className="text-center">Rejected</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Document</TableHead>

              <Can module="campaign" actions={['edit', 'delete']}>
                <TableHead className="text-center">Actions</TableHead>
              </Can>
            </TableRow>
          </TableHeader>

          <TableBody>
            {campaigns.length === 0 ? (
              <TableRow>
                <TableCell colSpan={12} className="text-center py-10">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">

                    <span className="text-lg font-medium text-foreground">
                      No Campaigns Found
                    </span>

                    <span className="text-sm">
                      You haven’t created any campaigns yet.
                    </span>

                  </div>
                </TableCell>
              </TableRow>
            ) : (
              campaigns.map((c: Campaign) => (
                <TableRow
                  key={c.id}
                  className="even:bg-lightprimary/80 cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/campaigns/details/${c.id}`)}
                >
                  <TableCell className="text-center font-semibold text-primary">{c.code}</TableCell>
                  <TableCell className="text-center">{c.campaign_name}</TableCell>
                  <TableCell className="text-center">{c.campaign_type}</TableCell>
                  <TableCell className="text-center">{c.start_date}</TableCell>
                  <TableCell className="text-center">{c.end_date}</TableCell>
                  <TableCell className="text-center">{c.total_allocation}</TableCell>
                  <TableCell className="text-center">{c.total_delivered}</TableCell>
                  <TableCell className="text-center">{c.total_accepted}</TableCell>
                  <TableCell className="text-center">{c.total_rejected}</TableCell>

                  <TableCell className="text-center">
                    <StatusBadge value={c.status as any} />
                  </TableCell>

                  <TableCell
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {c.campaign_document_name && (
                      <div className="flex items-center justify-center gap-2">

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="text-sm truncate max-w-120 cursor-pointer">
                              {c.campaign_document_name}
                            </span>
                          </TooltipTrigger>
                          <TooltipContent>
                            {c.campaign_document_name}
                          </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="lightinfo"
                              onClick={() => campaignService.downloadDocument(c.id)}
                            >
                              <Download className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Download</TooltipContent>
                        </Tooltip>

                      </div>
                    )}
                  </TableCell>

                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <div className="flex justify-center gap-2">

                      <Can module="campaign" action="edit">
                        <Button size="sm" variant="lightprimary" onClick={() => onEdit(c)}>
                          <Pencil className="size-4" />
                        </Button>
                      </Can>

                      <Can module="campaign" action="delete">
                        <Button size="sm" variant="lighterror" onClick={() => onDelete(c)}>
                          <Trash2 className="size-4" />
                        </Button>
                      </Can>

                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default CampaignTable;