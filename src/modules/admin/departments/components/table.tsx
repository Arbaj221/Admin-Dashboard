import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from 'src/components/ui/table';
import { Button } from 'src/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

interface DepartmentUI {
  id: number;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdByEmail: string;
  updatedByEmail: string;
}

interface Props {
  departments: DepartmentUI[];
  onEdit: (d: any) => void;
  onDelete: (d: any) => void;
}

const DepartmentsTable = ({ departments, onEdit, onDelete }: Props) => {
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
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                No departments found.
              </TableCell>
            </TableRow>
          ) : (
            departments.map((d) => (
              <TableRow key={d.id} className="even:bg-lightprimary/80">

                <TableCell className="text-center">{d.id}</TableCell>
                <TableCell className="text-center font-medium">{d.name}</TableCell>

                <TableCell className="text-center">
                  <StatusBadge value={d.isActive ? 'Active' : 'Inactive'} />
                </TableCell>

                <TableCell className="text-center">{d.createdByEmail}</TableCell>
                <TableCell className="text-center">{d.updatedByEmail}</TableCell>
                <TableCell className="text-center">{d.createdAt}</TableCell>
                <TableCell className="text-center">{d.updatedAt}</TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button size="sm" variant="lightprimary" onClick={() => onEdit(d)}>
                      <Pencil className="size-4" />
                    </Button>
                    <Button size="sm" variant="lighterror" onClick={() => onDelete(d)}>
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

export default DepartmentsTable;