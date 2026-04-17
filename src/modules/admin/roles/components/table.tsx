// modules/roles/components/RolesTable.tsx

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
import { Role } from '../services/rolesService';

interface RolesTableProps {
  roles: Role[];
  onEdit: (role: Role) => void;
  onDelete: (role: Role) => void;
}

const RolesTable = ({ roles, onEdit, onDelete }: RolesTableProps) => {
  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="border-r border-border text-center">ID</TableHead>
            <TableHead className="border-r border-border text-center">Name</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {roles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                No roles found.
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role) => (
              <TableRow
                key={role.id}
                className="hover:bg-lightprimary even:bg-lightprimary/80 text-center"
              >
                <TableCell className="border-r border-border text-sm">
                  {role.id}
                </TableCell>

                <TableCell className="border-r border-border text-sm font-medium">
                  {role.name}
                </TableCell>

                <TableCell className='text-center'>
                  <div className="flex items-center gap-2 text-center justify-center">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      onClick={() => onEdit(role)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="lighterror"
                      className="size-8! rounded-full"
                      onClick={() => onDelete(role)}
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

export default RolesTable;