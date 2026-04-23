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
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';
import { capitalizeFirst } from 'src/utils/format';
import Can from 'src/permissions/Can';

interface RoleUI {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdByEmail: string;
  updatedByEmail: string;
}

interface Props {
  roles: RoleUI[];
  onEdit: (role: any) => void;
  onDelete: (role: any) => void;
}

const RolesTable = ({ roles, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">ID</TableHead>
            <TableHead className="text-center">Name</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-center">Created By</TableHead>
            <TableHead className="text-center">Updated By</TableHead>
            <TableHead className="text-center">Created At</TableHead>
            <TableHead className="text-center">Updated At</TableHead>
            <Can module="roles" actions={['edit', 'delete']}>
              <TableHead className="text-center">Actions</TableHead>
            </Can>
          </TableRow>
        </TableHeader>


        <TableBody>
          {roles.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No roles found.
              </TableCell>
            </TableRow>
          ) : (
            roles.map((role) => (
              <TableRow key={role.id} className="even:bg-lightprimary/80">

                <TableCell className="text-center">{role.id}</TableCell>

                <TableCell className="text-center font-medium">
                  {capitalizeFirst(role.name)}
                </TableCell>

                <TableCell className="text-center">
                  <StatusBadge value={role.isActive ? 'Active' : 'Inactive'} />
                </TableCell>

                <TableCell className="text-center">
                  {capitalizeFirst(role.createdByEmail)}
                </TableCell>

                <TableCell className="text-center">
                  {capitalizeFirst(role.updatedByEmail)}
                </TableCell>

                <TableCell className="text-center">
                  {role.createdAt}
                </TableCell>

                <TableCell className="text-center">
                  {role.updatedAt}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Can module="roles" actions={['edit']}>
                      <Button
                        size="sm"
                        variant="lightprimary"
                        onClick={() => onEdit(role)}
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </Can>
                    <Can module="roles" actions={['delete']}>
                      <Button
                        size="sm"
                        variant="lighterror"
                        onClick={() => onDelete(role)}
                      >
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
  );
};

export default RolesTable;