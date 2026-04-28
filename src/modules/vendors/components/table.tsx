import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from 'src/components/ui/table';

import { Button } from 'src/components/ui/button';
import { Pencil, Trash2, Download } from 'lucide-react';
import { useNavigate } from 'react-router';

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'src/components/ui/tooltip';

import { Vendor, vendorService } from '../services/vendorService';
import { User } from 'src/modules/users/services/userService';

import { capitalizeFirst } from 'src/utils/format';
import StatusBadge from 'src/components/shared/status-badges/StatusBadge';
import Can from 'src/permissions/Can';

interface Props {
  vendors: Vendor[];
  users: User[];
  onEdit: (vendor: Vendor) => void;
  onDelete: (vendor: Vendor) => void;
}

const VendorTable = ({
  vendors,
  users,
  onEdit,
  onDelete,
}: Props) => {
  const navigate = useNavigate();

  const getAssignedUserEmail = (userId: number) => {
    const user = users.find((u) => u.id === userId);
    return user ? user.email : 'N/A';
  };

  // ✅ Download handler
  const handleDownload = async (id: number) => {
    await vendorService.downloadContract(id);
  };
  return (
    <TooltipProvider delayDuration={200}>
      <div className="overflow-x-auto border border-border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Code</TableHead>
              <TableHead className="text-center">Vendor Name</TableHead>
              <TableHead className="text-center">Person</TableHead>
              <TableHead className="text-center">Email</TableHead>
              <TableHead className="text-center">Number</TableHead>
              <TableHead className="text-center">Assigned To</TableHead>
              <TableHead className="text-center">Status</TableHead>

              <Can module="vendor" actions={['edit', 'delete', 'download']}>
                <TableHead className="text-center">Actions</TableHead>
              </Can>
            </TableRow>
          </TableHeader>

          <TableBody>
            {vendors.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No vendors found.
                </TableCell>
              </TableRow>
            ) : (
              vendors.map((vendor) => (
                <TableRow
                  key={vendor.id}
                  className="even:bg-lightprimary/80 cursor-pointer hover:bg-muted/50"
                  onClick={() => navigate(`/vendors/details/${vendor.id}`)}
                >
                  {/* ID */}
                  <TableCell className="text-center font-semibold text-primary">{vendor.code}</TableCell>

                  {/* Name */}
                  <TableCell className="text-center">
                    {capitalizeFirst(vendor.name)}
                  </TableCell>

                  {/* Person */}
                  <TableCell className="text-center">
                    <div className="flex items-center gap-2">

                      <div className="h-8 w-8 rounded-full bg-lightprimary text-primary flex items-center justify-center text-xs font-bold shrink-0">
                        {vendor.firstName.charAt(0).toUpperCase()}
                      </div>
                      <span className="text-sm text-foreground whitespace-nowrap">{vendor.firstName} {vendor.lastName}</span>
                    </div>
                  </TableCell>

                  {/* Email */}
                  <TableCell className="text-center">
                    {vendor.contactEmail}
                  </TableCell>

                  {/* Mobile */}
                  <TableCell className="text-center">
                    {vendor.contactMobileNumber}
                  </TableCell>

                  {/* Assigned */}
                  <TableCell className="text-center">
                    {getAssignedUserEmail(vendor.assignedTo)}
                  </TableCell>

                  {/* ✅ Status */}
                  <TableCell className="text-center">
                    <StatusBadge value={vendor.isActive ? 'Active' : 'Inactive'} />
                  </TableCell>

                  {/* Actions */}
                  <TableCell
                    className="text-center"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="flex justify-center gap-2">
                      <Can module="vendor" action="download">
                        {vendor.contractFileName ? (
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                size="sm"
                                variant="lightinfo"
                                onClick={() => handleDownload(vendor.id)}
                              >
                                <Download className="size-4" />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>
                              {vendor.contractFileName}
                            </TooltipContent>
                          </Tooltip>
                        ) : (
                          <span className="text-muted-foreground text-sm">N/A</span>
                        )}
                      </Can>
                      <Can module="vendor" action="edit">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="lightprimary"
                              onClick={() => onEdit(vendor)}
                            >
                              <Pencil className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Edit</TooltipContent>
                        </Tooltip>
                      </Can>

                      <Can module="vendor" action="delete">
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Button
                              size="sm"
                              variant="lighterror"
                              onClick={() => onDelete(vendor)}
                            >
                              <Trash2 className="size-4" />
                            </Button>
                          </TooltipTrigger>
                          <TooltipContent>Delete</TooltipContent>
                        </Tooltip>
                      </Can>

                    </div>
                  </TableCell>

                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </TooltipProvider>
  );
};

export default VendorTable;