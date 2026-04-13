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
import { Vendor } from '../types/vendor.type';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

interface VendorTableProps {
  vendor: Vendor[];
  onDelete: (id: number) => void;
}

const tableHeadings = ['Code', 'Name', 'Person', 'Email', 'Number', 'Assigned To', 'Status', 'Actions'];

const VendorTable = ({ vendor, onDelete }: VendorTableProps) => {
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
          {vendor.length === 0 ? (
            <TableRow>
              <TableCell colSpan={tableHeadings.length} className="text-center py-8 text-muted-foreground">
                No vendor found.
              </TableCell>
            </TableRow>
          ) : (
            vendor.map((vendor: Vendor) => (
              <TableRow key={vendor.id} className="hover:bg-lightprimary transition-colors odd:bg-lightprimary/80">

                {/* Code */}
                <TableCell>
                  <span className="text-sm font-semibold text-primary">{vendor.code}</span>
                </TableCell>

                {/* Name */}
                <TableCell>
                  <span className="text-sm font-medium text-foreground whitespace-nowrap">
                    {vendor.name}
                  </span>
                </TableCell>

                {/* Person */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <div className="h-8 w-8 rounded-full bg-lightprimary text-primary flex items-center justify-center text-xs font-bold shrink-0">
                      {vendor.person.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-sm text-foreground whitespace-nowrap">{vendor.person}</span>
                  </div>
                </TableCell>

                {/* Email */}
                <TableCell>
                  <span className="text-sm text-muted-foreground">{vendor.email}</span>
                </TableCell>

                {/* Number */}
                <TableCell>
                  <span className="text-sm text-muted-foreground whitespace-nowrap">{vendor.number}</span>
                </TableCell>

                {/* Assigned To */}
                <TableCell>
                  <span className="text-sm text-foreground whitespace-nowrap">{vendor.assignedTo}</span>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <StatusBadge value={vendor.status} />
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      title="Edit"
                      onClick={() => navigate(`/vendors/edit/${vendor.id}`)}
                    >
                      <Pencil className="size-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="lighterror"
                      className="size-8! rounded-full"
                      title="Delete"
                      onClick={() => onDelete(vendor.id)}
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

export default VendorTable;