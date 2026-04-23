import { useEffect, useState } from 'react';
import CardBox from 'src/components/shared/CardBox';
import SlimBreadcrumb from 'src/components/shared/breadcrumb/SlimBreadcrumb';

import { rolesService } from 'src/modules/admin/roles/services/rolesService';
import { departmentService } from 'src/modules/admin/departments/services/departmentService';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from 'src/components/ui/select';
import { Label } from 'src/components/ui/label';

import RDPForm from './components/form';

const RDPList = () => {
    const [roles, setRoles] = useState<any[]>([]);
    const [departments, setDepartments] = useState<any[]>([]);

    const [roleId, setRoleId] = useState<number | null>(null);
    const [deptId, setDeptId] = useState<number | null>(null);

    const [activeCount, setActiveCount] = useState(0);

    useEffect(() => {
        const load = async () => {
            const [r, d] = await Promise.all([
                rolesService.getActiveRoles(),
                departmentService.getActiveDepartments(),
            ]);

            setRoles(r);
            setDepartments(d);
        };

        load();
    }, []);

    const selectedRole = roles.find((r) => r.id === roleId);
    const selectedDept = departments.find((d) => d.id === deptId);

    const BCrumb = [
        { to: '/', title: 'Home' },
        { title: 'Role Department Permissions' },
    ];

    return (
        <>
            <SlimBreadcrumb title="RDP" items={BCrumb} />

            <CardBox>

                {/* Selects */}
                <div className="grid grid-cols-2 gap-4 mb-1">

                    {/* Role */}
                    <div>
                        <Label className='py-1'>Role</Label>
                        <Select
                            value={roleId ? String(roleId) : ''}
                            onValueChange={(v) => setRoleId(Number(v))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Role" />
                            </SelectTrigger>

                            <SelectContent>
                                {roles.map((r) => (
                                    <SelectItem key={r.id} value={String(r.id)}>
                                        {r.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Department */}
                    <div>
                        <Label className='py-1'>Department</Label>
                        <Select
                            value={deptId ? String(deptId) : ''}
                            onValueChange={(v) => setDeptId(Number(v))}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select Department" />
                            </SelectTrigger>

                            <SelectContent>
                                {departments.map((d) => (
                                    <SelectItem key={d.id} value={String(d.id)}>
                                        {d.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                </div>

                {/* Context Section */}
                <div className="">

                    {!roleId || !deptId ? (
                        <p className="text-sm text-muted-foreground">
                            Please select a role and department to manage permissions
                        </p>
                    ) : (
                        <div className="flex items-center justify-between gap-3 flex-wrap">

                            {/* Context text */}
                            <div className="text-sm text-muted-foreground">
                                Managing permissions for{' '}
                                <span className="font-medium text-foreground">
                                    {selectedRole?.name}
                                </span>{' '}
                                role in{' '}
                                <span className="font-medium text-foreground">
                                    {selectedDept?.name}
                                </span>{' '}
                                department
                            </div>

                            {/* Badge */}
                            <div className="shrink-0 flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full bg-lightprimary/20 text-primary font-medium whitespace-nowrap">
                                <span className="w-2 h-2 rounded-full bg-primary" />
                                {activeCount} active permissions
                            </div>

                        </div>
                    )}

                </div>

                {/* Form */}
                {roleId && deptId && (
                    <RDPForm
                        roleId={roleId}
                        departmentId={deptId}
                        setActiveCount={setActiveCount}
                    />
                )}

            </CardBox>
        </>
    );
};

export default RDPList;