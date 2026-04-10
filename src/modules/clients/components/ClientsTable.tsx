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
import { clientsData } from '../data/client.data';
import { Link } from 'react-router';

export interface Client {
  id: number;
  code: string;
  name: string;
  person: string;
  email: string;
  number: string;
  assignedTo: string;
  status: 'Active' | 'Inactive';
}

const tableHeadings = ['Code', 'Name', 'Person', 'Email', 'Number', 'Assigned To', 'Status', 'Actions'];

const ClientsTable = () => {
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
          {clientsData.map((client: any) => (
            <TableRow key={client.id} className="hover:bg-lightprimary transition-colors">

              {/* Code */}
              <TableCell>
                <span className="text-sm font-semibold text-primary">{client.code}</span>
              </TableCell>

              {/* Name */}
              <TableCell>
                <span className="text-sm font-medium text-foreground whitespace-nowrap">
                  {client.name}
                </span>
              </TableCell>

              {/* Person */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-lightprimary text-primary flex items-center justify-center text-xs font-bold shrink-0">
                    {client.person.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-sm text-foreground whitespace-nowrap">{client.person}</span>
                </div>
              </TableCell>

              {/* Email */}
              <TableCell>
                <span className="text-sm text-muted-foreground">{client.email}</span>
              </TableCell>

              {/* Number */}
              <TableCell>
                <span className="text-sm text-muted-foreground whitespace-nowrap">{client.number}</span>
              </TableCell>

              {/* Assigned To */}
              <TableCell>
                <span className="text-sm text-foreground whitespace-nowrap">{client.assignedTo}</span>
              </TableCell>

              {/* Status */}
              <TableCell>
                <Badge
                  className={`text-xs rounded-full px-3 py-1 font-medium
                    ${client.status === 'Active'
                      ? 'bg-lightsuccess text-successemphasis'
                      : 'bg-lighterror text-error'
                    }`}
                >
                  {client.status}
                </Badge>
              </TableCell>

              {/* Actions */}
              <TableCell>
                <div className="flex items-center gap-2">
                  <Link to={`/clients/edit/${client.id}`}>
                    <Button
                      size="sm"
                      variant="lightprimary"
                      className="size-8! rounded-full"
                      title="Edit"
                    >
                      <Pencil className="size-4" />
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="lighterror"
                    className="size-8! rounded-full"
                    title="Delete"
                  >
                    <Trash2 className="size-4" />
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

export default ClientsTable;