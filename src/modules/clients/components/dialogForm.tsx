import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from 'src/components/ui/dialog';

import ClientForm from './form';
import { Client } from '../services/clientService';
import { User } from 'src/modules/users/services/userService';

interface Props {
    open: boolean;
    onClose: () => void;
    mode: 'create' | 'edit';
    client?: Client;
    users: User[];
}

const ClientDialog = ({
    open,
    onClose,
    mode,
    client,
    users,
}: Props) => {
    return (
        <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
            <DialogContent className="max-w-7xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>
                        {mode === 'create' ? 'Create Client' : 'Edit Client'}
                    </DialogTitle>
                </DialogHeader>

                <ClientForm
                    mode={mode}
                    onSuccess={onClose}
                    users={users}
                    initialData={
                        client
                            ? {
                                id: client.id,
                                name: client.name,
                                address: client.address,
                                country: client.country,
                                assignedTo: client.assignedTo,

                                contractFileName: client.contractFileName,

                                firstName: client.firstName,
                                lastName: client.lastName,
                                contactDesignation: client.contactDesignation,
                                contactEmail: client.contactEmail,
                                contactOfficeNumber: client.contactOfficeNumber,
                                contactMobileNumber: client.contactMobileNumber,

                                billingName: client.billingName,
                                billingAddress: client.billingAddress,
                                billingEmail: client.billingEmail,
                                billingTerms: client.billingTerms,

                                isActive: client.isActive,
                            }
                            : undefined
                    }
                />
            </DialogContent>
        </Dialog>
    );
};

export default ClientDialog;