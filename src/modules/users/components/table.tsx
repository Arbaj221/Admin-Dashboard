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
import { Icon } from '@iconify/react';
import { Pencil, Trash2 } from 'lucide-react';
import { useNavigate } from 'react-router';
import { User } from '../types-data/users';

interface UsersTableProps {
  users: User[];
  onDelete: (id: number) => void;
}

const pageSizeOptions = [10, 20, 50, 100];

const UsersTable = ({ users, onDelete }: UsersTableProps) => {
  const navigate  = useNavigate();
  const [search, setSearch]     = useState('');
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage]         = useState(1);

  const filtered = useMemo(() => {
    if (!search.trim()) return users;
    return users.filter((item) =>
      `${item.firstName} ${item.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      item.username.toLowerCase().includes(search.toLowerCase()) ||
      item.email.toLowerCase().includes(search.toLowerCase()),
    );
  }, [search, users]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
  const paginated  = filtered.slice((page - 1) * pageSize, page * pageSize);

  const handleSearch   = (val: string) => { setSearch(val);          setPage(1); };
  const handlePageSize = (val: string) => { setPageSize(Number(val)); setPage(1); };

  return (
    <>
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
            placeholder="Search users..."
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
              {['Name', 'Username', 'Email', 'Added Date', 'Actions', 'More'].map((heading) => (
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
            {paginated.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              paginated.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-lightprimary transition-colors even:bg-lightprimary/80"
                >

                  {/* Name */}
                  <TableCell className="border-r border-border">
                    <div className="flex items-center gap-2">
                      <div className="h-8 w-8 rounded-full bg-lightprimary text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {item.firstName.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground whitespace-nowrap">
                          {item.firstName} {item.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">{item.jobTitle}</p>
                      </div>
                    </div>
                  </TableCell>

                  {/* Username */}
                  <TableCell className="border-r border-border">
                    <span className="text-sm text-muted-foreground">
                      @{item.username}
                    </span>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="border-r border-border">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.email}
                    </span>
                  </TableCell>

                  {/* Added Date */}
                  <TableCell className="border-r border-border">
                    <span className="text-sm text-muted-foreground whitespace-nowrap">
                      {item.addedDate}
                    </span>
                  </TableCell>

                  {/* Actions — Edit + Delete */}
                  <TableCell className="border-r border-border">
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="lightprimary"
                        className="size-8! rounded-full"
                        title="Edit"
                        onClick={() => navigate(`/users/edit/${item.id}`)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="lighterror"
                        className="size-8! rounded-full"
                        title="Delete"
                        onClick={() => onDelete(item.id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>

                  {/* More — Status + Permissions */}
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="lightprimary"
                        className="h-8 px-3 rounded-md text-xs font-medium gap-1.5"
                        title="Status"
                        onClick={() => navigate(`/users/details`)}
                      >
                        <Icon icon="solar:shield-check-linear" width={14} />
                        Status
                      </Button>
                      <Button
                        size="sm"
                        variant="lightprimary"
                        className="h-8 px-3 rounded-md text-xs font-medium gap-1.5"
                        title="Permissions"
                        onClick={() => navigate(`/users/details`)}
                      >
                        <Icon icon="solar:lock-keyhole-minimalistic-linear" width={14} />
                        Permissions
                      </Button>
                    </div>
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
    </>
  );
};

export default UsersTable;