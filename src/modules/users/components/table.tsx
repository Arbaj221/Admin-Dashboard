// modules/user/components/UsersTable.tsx

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
import { useNavigate } from 'react-router';

import { User } from '../services/userService';

interface Props {
  users: User[];
}
interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
}

const UsersTable = ({ users, onEdit, onDelete }: Props) => {
  const navigate = useNavigate();

  return (
    <div className="overflow-x-auto border border-border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="text-center">Username</TableHead>
            <TableHead className="text-center">Email</TableHead>
            <TableHead className="text-center">Mobile</TableHead>
            <TableHead className="text-center">Job Title</TableHead>
            <TableHead className="text-center">Added Date</TableHead>
            <TableHead className="text-center">Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {users.length === 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                No users found.
              </TableCell>
            </TableRow>
          ) : (
            users.map((user) => (
              <TableRow key={user.id} className="even:bg-lightprimary/80">
                <TableCell
                  className="text-center cursor-pointer"
                  onClick={() => navigate(`/users/details/${user.id}`)}
                >
                  {user.username}
                </TableCell>

                <TableCell className="text-center">{user.email}</TableCell>
                <TableCell className="text-center">{user.mobileNumber}</TableCell>
                <TableCell className="text-center">{user.jobTitle}</TableCell>
                <TableCell className="text-center">{user.createdAt}</TableCell>

                <TableCell className="text-center">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      variant="lightprimary"
                      onClick={() => onEdit(user)}
                    >
                      <Pencil className="size-4" />
                    </Button>

                    <Button
                      size="sm"
                      variant="lighterror"
                     onClick={() => onDelete(user)}
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

export default UsersTable;