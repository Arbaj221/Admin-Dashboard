import { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { Input } from 'src/components/ui/input';
import { Button } from 'src/components/ui/button';
import { Badge } from 'src/components/ui/badge';
import { Icon } from '@iconify/react';
import CardBox from 'src/components/shared/CardBox';
import { sentinelJobsData, SentinelJob } from '../types-data/sentinelJobs';

const pageSizeOptions = [10, 20, 50, 100];

const tableHeadings = [
  'Job ID',
  'Department',
  'Campaign ID',
  'Segment ID',
  'Batch IDs',
  'Uploaded File',
  'Processed File',
  'Invalid File',
  'Status',
  'Priority',
  'Action',
];

const departmentBadgeClass = (dept: SentinelJob['department']) => {
  switch (dept) {
    case 'DataOps': return 'bg-lightinfo text-infoemphasis';
    case 'Email':   return 'bg-lightsecondary text-secondaryemphasis';
    default:        return 'bg-muted text-muted-foreground';
  }
};

const statusBadgeClass = (status: SentinelJob['status']) => {
  switch (status) {
    case 'Completed': return 'bg-lightsuccess text-successemphasis';
    case 'Pending':   return 'bg-lightwarning text-warningemphasis';
    default:          return 'bg-muted text-muted-foreground';
  }
};

const priorityBadgeClass = (priority: SentinelJob['priority']) => {
  switch (priority) {
    case 'High':   return 'bg-lighterror text-erroremphasis';
    case 'Normal': return 'bg-lightinfo text-infoemphasis';
    case 'Low':    return 'bg-muted text-muted-foreground';
    default:       return 'bg-muted text-muted-foreground';
  }
};

const SentinelJobsTable = () => {
  const [search, setSearch]     = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return sentinelJobsData;
    return sentinelJobsData.filter((item) =>
      item.campaignId.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch   = (val: string) => { setSearch(val);          setPage(1); };
  const handlePageSize = (val: string) => { setPageSize(Number(val)); setPage(1); };

  return (
    <CardBox>

      {/* ── Controls ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">Show entries</span>
          <Select value={String(pageSize)} onValueChange={handlePageSize}>
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {pageSizeOptions.map((size) => (
                <SelectItem key={size} value={String(size)}>{size}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="relative">
          <Icon
            icon="solar:magnifer-linear"
            width={16}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <Input
            type="text"
            placeholder="Search by campaign ID..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            className="pl-9 w-64"
          />
        </div>
      </div>

      {/* ── Table ── */}
      <div className="overflow-x-auto border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              {tableHeadings.map((heading) => (
                <TableHead
                  key={heading}
                  className="text-xs font-semibold whitespace-nowrap border-r border-border last:border-r-0"
                >
                  {heading}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={tableHeadings.length}
                  className="text-center py-8 text-muted-foreground"
                >
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-lightprimary transition-colors even:bg-lightprimary/80"
                >
                  {/* Job ID */}
                  <TableCell className="border-r border-border text-sm font-semibold text-primary whitespace-nowrap">
                    {item.jobId}
                  </TableCell>

                  {/* Department */}
                  <TableCell className="border-r border-border">
                     {item.department}
                  </TableCell>

                  {/* Campaign ID */}
                  <TableCell className="border-r border-border text-xs text-muted-foreground whitespace-nowrap">
                    {item.campaignId}
                  </TableCell>

                  {/* Segment ID */}
                  <TableCell className="border-r border-border text-xs text-muted-foreground whitespace-nowrap">
                    {item.segmentId}
                  </TableCell>

                  {/* Batch IDs — word break, fixed width, grows in height */}
                  <TableCell className="border-r border-border min-w-[160px] max-w-[200px]">
                    <div className="flex flex-wrap gap-1">
                      {item.batchIds.map((batchId) => (
                        <span
                          key={batchId}
                          className="text-xs font-medium text-foreground bg-muted rounded px-1.5 py-0.5 whitespace-nowrap"
                        >
                          {batchId}
                        </span>
                      ))}
                    </div>
                  </TableCell>

                  {/* Uploaded File */}
                  <TableCell className="border-r border-border text-xs text-muted-foreground">
                    {item.uploadedFile ? (
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon icon="solar:file-text-linear" width={14} className="text-primary shrink-0" />
                        {item.uploadedFile}
                      </span>
                    ) : ''}
                  </TableCell>

                  {/* Processed File */}
                  <TableCell className="border-r border-border text-xs text-muted-foreground">
                    {item.processedFile ? (
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon icon="solar:file-check-linear" width={14} className="text-success shrink-0" />
                        {item.processedFile}
                      </span>
                    ) : ''}
                  </TableCell>

                  {/* Invalid File */}
                  <TableCell className="border-r border-border text-xs text-muted-foreground">
                    {item.invalidFile ? (
                      <span className="flex items-center gap-1.5 whitespace-nowrap">
                        <Icon icon="solar:file-corrupted-linear" width={14} className="text-error shrink-0" />
                        {item.invalidFile}
                      </span>
                    ) : ''}
                  </TableCell>

                  {/* Status */}
                  <TableCell className="border-r border-border">
                      {item.status}
                  </TableCell>

                  {/* Priority */}
                  <TableCell className="border-r border-border">
                    {item.priority}
                  </TableCell>

                  {/* Action — placeholder */}
                  <TableCell className="text-sm text-muted-foreground">
                    Action
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between mt-4 flex-wrap gap-3">
        <p className="text-sm text-muted-foreground">
          Showing{' '}
          {filtered.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filtered.length)}{' '}
          of {filtered.length} entries
        </p>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <span className="text-sm text-muted-foreground px-1">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>

    </CardBox>
  );
};

export default SentinelJobsTable;