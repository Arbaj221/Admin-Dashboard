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
import { Department } from '../services/departmentService';

interface DepartmentsTableProps {
  departments: Department[];
  onEdit: (dept: Department) => void;
  onDelete: (dept: Department) => void;
}

const DepartmentsTable = ({ departments, onEdit, onDelete }: DepartmentsTableProps) => {
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
          {departments.length === 0 ? (
            <TableRow>
              <TableCell colSpan={3} className="text-center py-8 text-muted-foreground">
                No departments found.
              </TableCell>
            </TableRow>
          ) : (
            departments.map((dept) => (
              <TableRow
                key={dept.id}
                className="hover:bg-lightprimary even:bg-lightprimary/80"
              >
                <TableCell className="text-center border-r border-border">
                  {dept.id}
                </TableCell>

                <TableCell className="text-center border-r border-border font-medium">
                  {dept.name}
                </TableCell>

                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      onClick={() => onEdit(dept)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="lighterror"
                      className="size-8! rounded-full"
                      onClick={() => onDelete(dept)}
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

export default DepartmentsTable;