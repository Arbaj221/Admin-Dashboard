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
import { getCurrencySymbol } from "src/utils/currencySymbol";
import { formatDateShort } from "src/utils/formatDateShort";

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
            <TableHead>Allocation Revenue</TableHead>
            <TableHead>Accepted Revenue</TableHead>
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

                <TableCell className="wrap-break-word text-xs text-primary font-semibold">
                  {r.segment_code}
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
                  {formatDateShort(r.segment_start_date)}
                </TableCell>

                <TableCell>
                  {formatDateShort(r.segment_end_date)}
                </TableCell>


                {/* ALLOCATION */}
                <TableCell>

                  <div className="font-semibold text-warningstrong ">
                    {getCurrencySymbol(r.currency)}{" "}
                    {r.allocation_revenue?.toLocaleString?.() || r.allocation_revenue}
                  </div>

                  <div className="text-xs text-muted-foreground mt-0.5">
                    Leads: {r.allocation?.toLocaleString?.() || r.allocation}
                  </div>

                </TableCell>

                {/* ACCEPTED */}
                <TableCell>

                  <div className="font-semibold text-successemphasis">
                    {getCurrencySymbol(r.currency)}{" "}
                    {r.accepted_revenue?.toLocaleString?.() || r.accepted_revenue}
                  </div>

                  <div className="text-xs text-muted-foreground mt-0.5">
                    Leads: {r.accepted?.toLocaleString?.() || r.accepted}
                  </div>

                </TableCell>

                {/* DEFICIT */}
                <TableCell>

                  <div
                    className={
                      r.deficit === 0
                        ? "font-semibold text-successemphasis"
                        : "font-semibold text-erroremphasis"
                    }
                  >
                    {getCurrencySymbol(r.currency)}{" "}
                    {r.deficit_revenue?.toLocaleString?.() || r.deficit_revenue}
                  </div>

                  <div
                    className="text-xs text-muted-foreground mt-0.5"
                  >
                    Leads: {r.deficit?.toLocaleString?.() || r.deficit}
                  </div>

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