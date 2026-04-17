import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';

import { rolesService, Role } from 'src/modules/admin/roles/services/rolesService';
import { departmentService, Department } from 'src/modules/admin/departments/services/departmentService';
import { permissionService, Permission } from 'src/modules/admin/permissions/services/permissionService';

import { rdpService } from './services/rdpService';
import MatrixTable from './components/MatrixTable';

const RDPList = () => {
    const [roles, setRoles] = useState<Role[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedRole, setSelectedRole] = useState<number | null>(null);

    const [matrix, setMatrix] = useState<
        Record<number, Record<number, boolean>>
    >({});
    const [existingMappings, setExistingMappings] = useState<Set<string>>(new Set());

    const [loading, setLoading] = useState(false);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { title: 'Role Permissions' },
    ];

    // 👉 load initial data
    const loadInitialData = async () => {
        const [rolesData, deptData, permData] = await Promise.all([
            rolesService.getRoles(),
            departmentService.getDepartments(),
            permissionService.getPermissions(),
        ]);

        setRoles(rolesData);
        setDepartments(deptData);
        setPermissions(permData);

        if (rolesData.length) {
            setSelectedRole(rolesData[0].id);
        }
    };

    // 👉 load mappings
    const loadMappings = async (roleId: number) => {
        setLoading(true);

        const data = await rdpService.getMappings();

        const { matrix, existing } =
            rdpService.buildMatrixAndExisting(data, roleId);

        setMatrix(matrix);
        setExistingMappings(existing);

        setLoading(false);
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedRole !== null) {
            loadMappings(selectedRole);
        }
    }, [selectedRole]);

    // 👉 toggle
    const handleToggle = (deptId: number, permId: number) => {
        setMatrix((prev) => ({
            ...prev,
            [deptId]: {
                ...prev[deptId],
                [permId]: !prev[deptId]?.[permId],
            },
        }));
    };

    // 👉 save
    const handleSave = async () => {
        if (!selectedRole) return;

        try {
            const updatedExisting = await rdpService.saveMappings(
                selectedRole,
                matrix,
                existingMappings
            );

            // ✅ update state from service
            setExistingMappings(updatedExisting);

            toast.success('Permissions updated successfully 🎉');
        } catch (err) {
            // handled globally
        }
    };

    return (
        <>
            <SlimBreadcrumb title="Role Permissions" items={BCrumb} />

            <CardBox>
                {/* Role Select */}
                <div className="mb-4">
                    <label className="text-sm font-medium">Select Role</label>
                    <select
                        className="mt-2 border border-border rounded-md p-2"
                        value={selectedRole || ''}
                        onChange={(e) => setSelectedRole(Number(e.target.value))}
                    >
                        {roles.map((role) => (
                            <option key={role.id} value={role.id}>
                                {role.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Matrix */}
                {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                ) : (
                    <MatrixTable
                        departments={departments}
                        permissions={permissions}
                        matrix={matrix}
                        onToggle={handleToggle}
                    />
                )}

                {/* Save */}
                <div className="flex justify-end mt-6">
                    <button
                        onClick={handleSave}
                        className="bg-primary hover:bg-primaryemphasis text-white px-6 py-2 rounded-md"
                    >
                        Save Changes
                    </button>
                </div>
            </CardBox>
        </>
    );
};

export default RDPList;