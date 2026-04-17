import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';

import { usersService, User } from 'src/modules/admin/user-department/services/userServiceDp';
import { departmentService, Department } from 'src/modules/admin/departments/services/departmentService';
import { permissionService, Permission } from 'src/modules/admin/permissions/services/permissionService';

import { userDepartmentService } from 'src/modules/admin/user-department/services/userDepartmentService';
import { userPermissionService } from './services/userPermissionService';

import PermissionOverride from './components/PermissionOverride';

const UserPermissionList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [permissions, setPermissions] = useState<Permission[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const [userDepartments, setUserDepartments] = useState<number[]>([]);

    const [matrix, setMatrix] = useState<
        Record<number, Record<number, boolean>>
    >({});
    const [existing, setExisting] = useState<Set<string>>(new Set());

    const [loading, setLoading] = useState(false);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { title: 'User Permissions' },
    ];

    // 👉 initial load
    const loadInitialData = async () => {
        const [usersData, deptData, permData] = await Promise.all([
            usersService.getUsers(),
            departmentService.getDepartments(),
            permissionService.getPermissions(),
        ]);

        setUsers(usersData);
        setDepartments(deptData);
        setPermissions(permData);

        if (usersData.length) {
            setSelectedUser(usersData[0].id);
        }
    };

    // 👉 load mappings
    const loadMappings = async (userId: number) => {
        setLoading(true);

        const [userDeptData, userPermData] = await Promise.all([
            userDepartmentService.getMappings(),
            userPermissionService.getMappings(),
        ]);

        // 👉 filter departments user belongs to
        const deptIds = userDeptData
            .filter((item) => item.user_id === userId)
            .map((item) => item.department_id);

        setUserDepartments(deptIds);

        // 👉 build matrix
        const { matrix, existing } =
            userPermissionService.buildState(userPermData, userId);

        setMatrix(matrix);
        setExisting(existing);

        setLoading(false);
    };

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (selectedUser !== null) {
            loadMappings(selectedUser);
        }
    }, [selectedUser]);

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
        if (!selectedUser) return;

        try {
            const { updatedExisting, hasChanges } =
                await userPermissionService.saveMappings(
                    selectedUser,
                    matrix,
                    existing
                );

            setExisting(updatedExisting);

            // ✅ toast only when needed
            if (hasChanges) {
                toast.success('Permissions updated successfully 🎉');
            } else {
                toast.info('No changes made');
            }
        } catch (err) {
            // handled globally
        }
    };

    // 👉 filter departments to show
    const visibleDepartments = departments.filter((dept) =>
        userDepartments.includes(dept.id)
    );

    return (
        <>
            <SlimBreadcrumb title="User Permissions" items={BCrumb} />

            <CardBox>
                {/* User Select */}
                <div className="mb-4">
                    <label className="text-sm font-medium">Select User</label>
                    <select
                        className="mt-2 border border-border rounded-md p-2"
                        value={selectedUser || ''}
                        onChange={(e) => setSelectedUser(Number(e.target.value))}
                    >
                        {users.map((user) => (
                            <option key={user.id} value={user.id}>
                                {user.email}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Permissions */}
                {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                ) : (
                    <PermissionOverride
                        departments={visibleDepartments}
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

export default UserPermissionList;