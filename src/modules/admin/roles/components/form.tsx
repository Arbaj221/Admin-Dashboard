// modules/roles/components/RoleForm.tsx

import { useState, useEffect } from 'react';
import { Input } from 'src/components/ui/input';
import { Label } from 'src/components/ui/label';
import { Button } from 'src/components/ui/button';

interface RoleFormProps {
    mode: 'create' | 'edit';
    initialData?: { name: string };
    onSuccess: (name: string) => void;
    onCancel: () => void;
}

const RolesForm = ({ mode, initialData, onSuccess, onCancel }: RoleFormProps) => {
    const [name, setName] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (mode === 'edit' && initialData) {
            setName(initialData.name);
        }
    }, [mode, initialData]);

    const handleSubmit = () => {
        if (!name.trim()) {
            setError('Role name is required');
            return;
        }

        onSuccess(name);
    };

    return (
        <>
            <form onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
            }}>
                <div>
                    <Label>
                        Role Name <span className="text-error">*</span>
                    </Label>
                    <Input
                        placeholder="Enter role name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value);
                            if (error) setError('');
                        }}
                        className={`mt-2 ${error ? 'border-error' : ''}`}
                    />
                    {error && <p className="text-xs text-error mt-1">{error}</p>}
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <Button variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                    <Button
                        type="submit"
                        className="bg-primary hover:bg-primaryemphasis text-white"
                    >
                        {mode === 'create' ? 'Create Role' : 'Update Role'}
                    </Button>
                </div>
            </form>
        </>
    );
};

export default RolesForm;