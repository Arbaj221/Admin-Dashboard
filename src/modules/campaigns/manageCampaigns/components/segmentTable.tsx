import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';

import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

const SegmentTable = ({ segments }: any) => {
  return (
    <div className="overflow-x-auto border border-border rounded-md mt-6">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Segment Code</TableHead>
            <TableHead className="text-center">Title</TableHead>
            <TableHead className="text-center">Start Date</TableHead>
            <TableHead className="text-center">End Date</TableHead>
            <TableHead className="text-center">Allocation</TableHead>
            <TableHead className="text-center">Delivered</TableHead>
            <TableHead className="text-center">Accepted</TableHead>
            <TableHead className="text-center">Rejected</TableHead>
            <TableHead className="text-center">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {segments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                No Segments Found
              </TableCell>
            </TableRow>
          ) : (
            segments.map((s: any) => (
              <TableRow key={s.id} className="even:bg-lightprimary/80">

                <TableCell className="text-center font-semibold text-primary">
                  {s.segment_code}
                </TableCell>

                <TableCell className="text-center">
                  {s.title}
                </TableCell>

                <TableCell className="text-center">
                  {s.segment_start_date}
                </TableCell>

                <TableCell className="text-center">
                  {s.segment_end_date}
                </TableCell>

                <TableCell className="text-center">
                  {s.allocation}
                </TableCell>

                <TableCell className="text-center">
                  {s.delivered}
                </TableCell>

                <TableCell className="text-center">
                  {s.accepted}
                </TableCell>

                <TableCell className="text-center">
                  {s.rejected}
                </TableCell>

                <TableCell className="text-center">
                  <StatusBadge value={s.status as any} />
                </TableCell>

              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SegmentTable;