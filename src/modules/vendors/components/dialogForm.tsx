import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import ClientForm from './form';
import { Vendor } from '../services/vendorService';
import { userService, User } from 'src/modules/users/services/userService';

interface Props {
  open: boolean;
  onClose: () => void;
  mode: 'create' | 'edit';
  vendor?: Vendor;
}

const VendorDialog = ({
  open,
  onClose,
  mode,
  vendor,
}: Props) => {

  const [users, setUsers] = useState<User[]>([]);

  // ✅ Load users inside dialog
  const loadUsers = async () => {
    try {
      const data = await userService.getAllActiveUsersList();
      setUsers(data || []);
    } catch {
      setUsers([]);
    }
  };

  useEffect(() => {
    if (open) {
      loadUsers();
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {mode === 'create' ? 'Create Vendor' : 'Edit Vendor'}
          </DialogTitle>
        </DialogHeader>

        <ClientForm
          mode={mode}
          onSuccess={onClose}
          users={users}
          initialData={
            vendor
              ? {
                  id: vendor.id,
                  name: vendor.name,
                  address: vendor.address,
                  country: vendor.country,
                  assignedTo: vendor.assignedTo,

                  contractFileName: vendor.contractFileName,

                  firstName: vendor.firstName,
                  lastName: vendor.lastName,
                  contactDesignation: vendor.contactDesignation,
                  contactEmail: vendor.contactEmail,
                  contactOfficeNumber: vendor.contactOfficeNumber,
                  contactMobileNumber: vendor.contactMobileNumber,

                  billingName: vendor.billingName,
                  billingAddress: vendor.billingAddress,
                  billingEmail: vendor.billingEmail,
                  billingTerms: vendor.billingTerms,

                  isActive: vendor.isActive,
                }
              : undefined
          }
        />
      </DialogContent>
    </Dialog>
  );
};

export default VendorDialog;