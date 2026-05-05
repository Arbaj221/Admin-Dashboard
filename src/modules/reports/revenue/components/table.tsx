import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "src/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "src/components/ui/tooltip";

import StatusBadge from "src/components/shared/status-badges/StatusBadge";
import { formatSplitDate } from "src/utils/formatSplitDate";
import { getCurrencySymbol } from "src/utils/currencySymbol";

interface Props {
  data: any[];
  loading: boolean;
}

const RevenueTable = ({ data, loading }: Props) => {
  return (
    <div className="border border-border rounded-md">
      <Table className="table-auto w-full">
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Start</TableHead>
            <TableHead>End</TableHead>
            <TableHead>Allocation</TableHead>
            <TableHead>Accepted</TableHead>
            <TableHead>Allocation Revenue</TableHead>
            <TableHead>Accepted Revenue</TableHead>
            <TableHead>Deficit</TableHead>
            <TableHead>Deficit Revenue</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>

          {loading ? (
            <TableRow>
              <TableCell colSpan={13} className="text-center py-6">
                Loading...
              </TableCell>
            </TableRow>
          ) : data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={13} className="text-center py-6 text-muted-foreground">
                No data found
              </TableCell>
            </TableRow>
          ) : (
            data.map((r) => (
              <TableRow key={r.id} className="even:bg-lightprimary/80">

                <TableCell className="wrap-break-word">
                  <div className="text-sm font-medium">
                    {r.campaign_code}
                  </div>

                  <div className="text-xs text-primary font-semibold">
                    {r.segment_code}
                  </div>
                </TableCell>
                <TableCell className="max-w-200">

                  {r.title?.length > 30 ? (
                    <TooltipProvider delayDuration={200}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <span className="block truncate cursor-pointer">
                            {r.title.slice(0, 30)}...
                          </span>
                        </TooltipTrigger>

                        <TooltipContent>
                          {r.title}
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) : (
                    <span className="wrap-break-word">{r.title}</span>
                  )}

                </TableCell>

                <TableCell>
                  {formatSplitDate(r.segment_start_date)}
                </TableCell>

                <TableCell>
                  {formatSplitDate(r.segment_end_date)}
                </TableCell>

                <TableCell>{r.allocation}</TableCell>
                <TableCell>{r.accepted}</TableCell>

                <TableCell className="font-medium text-successemphasis">
                  {getCurrencySymbol(r.currency)} {r.allocation_revenue?.toLocaleString?.() || r.allocation_revenue}
                </TableCell>

                <TableCell className="font-medium text-successemphasis">
                  {getCurrencySymbol(r.currency)} {r.accepted_revenue?.toLocaleString?.() || r.accepted_revenue}
                </TableCell>

                <TableCell
                  className={
                    r.deficit === 0
                      ? "text-successemphasis font-medium"
                      : "text-error font-medium"
                  }
                >
                  {r.deficit}
                </TableCell>

                <TableCell>
                  {getCurrencySymbol(r.currency)} {r.deficit_revenue?.toLocaleString?.() || r.deficit_revenue}
                </TableCell>

                <TableCell>
                  <StatusBadge value={r.segment_status} />
                </TableCell>

              </TableRow>
            ))
          )}

        </TableBody>
      </Table>
    </div>
  );
};

export default RevenueTable;