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
import { Permission } from '../services/permissionService';

interface PermissionsTableProps {
  permissions: Permission[];
  onEdit: (permission: Permission) => void;
  onDelete: (permission: Permission) => void;
}

const PermissionsTable = ({ permissions, onEdit, onDelete }: PermissionsTableProps) => {
  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center border-r border-border">ID</TableHead>
            <TableHead className="text-center border-r border-border">Name</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {permissions.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                No permissions found.
              </TableCell>
            </TableRow>
          ) : (
            permissions.map((perm) => (
              <TableRow
                key={perm.id}
                className="hover:bg-lightprimary even:bg-lightprimary/80"
              >
                <TableCell className="text-center border-r border-border">
                  {perm.id}
                </TableCell>

                <TableCell className="text-center border-r border-border font-medium">
                  {perm.name}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      onClick={() => onEdit(perm)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="lighterror"
                      className="size-8! rounded-full"
                      onClick={() => onDelete(perm)}
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

export default PermissionsTable;