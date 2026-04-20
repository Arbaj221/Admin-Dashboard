import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from 'src/components/ui/dialog';
import React from 'react'

const PermissionDialog = () => {
    return (
        <Dialog >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Permissions</DialogTitle>
                </DialogHeader>

                <p className="text-sm text-muted-foreground">
                    Coming soon 🚧
                </p>
            </DialogContent>
        </Dialog>
    )
}

export default PermissionDialog