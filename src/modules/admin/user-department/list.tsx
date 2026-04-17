import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';
import CardBox from 'src/components/shared/CardBox';

import { departmentService, Department } from 'src/modules/admin/departments/services/departmentService';
import { usersService, User } from "./services/userServiceDp"

import { userDepartmentService, } from './services/userDepartmentService';

import DepartmentSelector from './components/DepartmentSelector';

const UserDepartmentList = () => {
    const [users, setUsers] = useState<User[]>([]);
    const [departments, setDepartments] = useState<Department[]>([]);
    const [selectedUser, setSelectedUser] = useState<number | null>(null);

    const [selected, setSelected] = useState<Record<number, boolean>>({});
    const [existing, setExisting] = useState<Set<number>>(new Set());

    const [loading, setLoading] = useState(false);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { title: 'User Departments' },
    ];

    // 👉 initial load
    const loadInitialData = async () => {
        const [usersData, deptData] = await Promise.all([
            usersService.getUsers(),
            departmentService.getDepartments(),
        ]);

        setUsers(usersData);
        setDepartments(deptData);

        if (usersData.length) {
            setSelectedUser(usersData[0].id);
        }
    };

    // 👉 load mappings
    const loadMappings = async (userId: number) => {
        setLoading(true);

        const data = await userDepartmentService.getMappings();

        const { selected, existing } =
            userDepartmentService.buildState(data, userId);

        setSelected(selected);
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
    const handleToggle = (deptId: number) => {
        setSelected((prev) => ({
            ...prev,
            [deptId]: !prev[deptId],
        }));
    };

    // 👉 save
    const handleSave = async () => {
        if (!selectedUser) return;

        try {
            const { updatedExisting, hasChanges } =
                await userDepartmentService.saveMappings(
                    selectedUser,
                    selected,
                    existing
                );

            setExisting(updatedExisting);

            if (hasChanges) {
                toast.success('Departments updated successfully 🎉');
            } else {
                toast.info('No changes made');
            }
        } catch (err) {
            // handled globally
        }
    };

    return (
        <>
            <SlimBreadcrumb title="User Departments" items={BCrumb} />

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

                {/* Departments */}
                {loading ? (
                    <p className="text-muted-foreground">Loading...</p>
                ) : (
                    <DepartmentSelector
                        departments={departments}
                        selected={selected}
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

export default UserDepartmentList;