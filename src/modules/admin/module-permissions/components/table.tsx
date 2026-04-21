import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from 'src/components/ui/table';
import { Button } from 'src/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';
import { capitalizeFirst } from 'src/utils/format';

interface Props {
  data: any[];
  onEdit: (row: any) => void;
  onDelete: (row: any) => void;
}

const ModulePermissionsTable = ({ data, onEdit, onDelete }: Props) => {
  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Menu</TableHead>
            <TableHead>Module</TableHead>
            <TableHead>Permission</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created By</TableHead>
            <TableHead>Updated By</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row) => (
            <TableRow key={row.id} className="even:bg-lightprimary/80">

              <TableCell>{row.id}</TableCell>
              <TableCell>{capitalizeFirst(row.menuName)}</TableCell>
              <TableCell>{capitalizeFirst(row.moduleName)}</TableCell>
              <TableCell> {capitalizeFirst(row.permissionName)}</TableCell>
              <TableCell>{capitalizeFirst(row.description)}</TableCell>

              <TableCell>
                <StatusBadge value={row.isActive ? 'Active' : 'Inactive'} />
              </TableCell>

              <TableCell>{capitalizeFirst(row.createdByEmail)}</TableCell>
              <TableCell>{capitalizeFirst(row.updatedByEmail)}</TableCell>
              <TableCell>{capitalizeFirst(row.createdAt)}</TableCell>
              <TableCell>{capitalizeFirst(row.updatedAt)}</TableCell>

              <TableCell>
                <div className="flex gap-2">
                  <Button size="sm" variant="lightprimary" onClick={() => onEdit(row)}>
                    <Pencil size={16} />
                  </Button>
                  <Button size="sm" variant="lighterror" onClick={() => onDelete(row)}>
                    <Trash2 size={16} />
                  </Button>
                </div>
              </TableCell>

            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ModulePermissionsTable;