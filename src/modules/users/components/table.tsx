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
import { Pencil, Trash2, KeyRound, Lock } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';

import { User } from '../services/userService';
import { Role } from 'src/modules/admin/roles/services/rolesService';
import { Department } from 'src/modules/admin/departments/services/departmentService';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';

interface Props {
  users: User[];
  roles: Role[];
  departments: Department[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onChangePassword: (user: User) => void;
  onPermission: (user: User) => void;
}

const UsersTable = ({
  users,
  roles,
  departments,
  onEdit,
  onDelete,
  onChangePassword,
  onPermission,
}: Props) => {
  const navigate = useNavigate();

  const getRoleName = (roleId: number) =>
    roles.find((r) => r.id === roleId)?.name || 'N/A';

  const getDepartmentNames = (ids: number[]) =>
    departments
      .filter((d) => ids.includes(d.id))
      .map((d) => d.name);

  return (
    <TooltipProvider delayDuration={200}>
      <div className="overflow-x-auto border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">User ID</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Mobile</TableHead>
              <TableHead className="text-center">Job Title</TableHead>
              <TableHead className="text-center">Role</TableHead>
              <TableHead className="text-center">Departments</TableHead>
              <TableHead className="text-center">Status</TableHead>
              <TableHead className="text-center">Password</TableHead>
              <TableHead className="text-center">Permissions</TableHead>
              <TableHead className="text-center">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={10} className="text-center py-8 text-muted-foreground">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => {
                const deptNames = getDepartmentNames(user.departmentIds);
                const shortText = deptNames.slice(0, 2).join(', ');
                const fullText = deptNames.join(', ');

                return (
                  <TableRow key={user.id} className="even:bg-lightprimary/80">

                    {/* ID */}
                    <TableCell
                      className="text-center cursor-pointer"
                      onClick={() => navigate(`/users/details/${user.id}`)}
                    >
                      {user.id}
                    </TableCell>

                    {/* Email */}
                    <TableCell className="text-center">
                      {user.email}
                    </TableCell>

                    {/* Mobile */}
                    <TableCell className="text-center">
                      {user.mobileNumber}
                    </TableCell>

                    {/* Job */}
                    <TableCell className="text-center">
                      {user.jobTitle}
                    </TableCell>

                    {/* Role */}
                    <TableCell className="text-center">
                      {getRoleName(user.roleId)}
                    </TableCell>

                    {/* Departments with Radix Tooltip */}
                    <TableCell className="text-center">
                      {deptNames.length > 2 ? (
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <span className="cursor-default whitespace-nowrap">
                              {shortText}...
                            </span>
                          </TooltipTrigger>

                          <TooltipContent side="top" className="text-xs max-w-xs">
                            {fullText}
                          </TooltipContent>
                        </Tooltip>
                      ) : (
                        <span className="whitespace-nowrap">
                          {fullText}
                        </span>
                      )}
                    </TableCell>

                    {/* Status */}
                    <TableCell className="text-center">
                      <StatusBadge value={user.isActive ? 'Active' : 'Inactive'} />
                    </TableCell>

                    {/* Password */}
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onChangePassword(user)}
                      >
                        <KeyRound className="size-4" />
                      </Button>
                    </TableCell>

                    {/* Permissions */}
                    <TableCell className="text-center">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onPermission(user)}
                      >
                        <Lock className="size-4" />
                      </Button>
                    </TableCell>

                    {/* Actions */}
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
                );
              })
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default UsersTable;