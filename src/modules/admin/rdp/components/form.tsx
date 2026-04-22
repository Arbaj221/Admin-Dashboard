import { useEffect, useState } from 'react';
import { rdpService } from '../services/rdpService';
import { modulePermissionService } from 'src/modules/admin/module-permissions/services/modulePermissionService';
import { capitalizeFirst } from 'src/utils/format';

interface Props {
    roleId: number;
    departmentId: number;
    setActiveCount: (count: number) => void;
}

const RDPForm = ({ roleId, departmentId, setActiveCount }: Props) => {
    const [permissions, setPermissions] = useState<any[]>([]);
    const [selected, setSelected] = useState<Set<number>>(new Set());

    // load data
    const load = async () => {
        const [all, assigned] = await Promise.all([
            modulePermissionService.getAll(),
            rdpService.getRDP(roleId, departmentId),
        ]);

        setPermissions(all);

        const selectedSet = new Set<number>();

        assigned.forEach((r: any) => {
            if (r.is_active) {
                selectedSet.add(r.module_permission_id);
            }
        });

        setSelected(selectedSet);
        setActiveCount(selectedSet.size);
    };

    useEffect(() => {
        if (roleId && departmentId) load();
    }, [roleId, departmentId]);

    const toggle = async (permId: number) => {
        const isChecked = selected.has(permId);

        try {
            await rdpService.upsert({
                role_id: roleId,
                department_id: departmentId,
                module_permission_id: permId,
                is_active: !isChecked,
            });

            setSelected((prev) => {
                const newSet = new Set(prev);

                if (isChecked) {
                    newSet.delete(permId);
                } else {
                    newSet.add(permId);
                }

                // update active count here
                setActiveCount(newSet.size);

                return newSet;
            });

        } catch {
            // handled globally
        }
    };

    // group by module
    const grouped = permissions.reduce((acc: any, item: any) => {
        if (!acc[item.moduleName]) acc[item.moduleName] = [];
        acc[item.moduleName].push(item);
        return acc;
    }, {});

    if (!permissions.length) {
        return (
            <p className="text-sm text-muted-foreground">
                Loading permissions...
            </p>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            {Object.entries(grouped).map(([module, perms]: any) => (
                <div
                    key={module}
                    className=" rounded-md p-4 bg-lightprimary/80 "
                >

                    {/* Module Header */}
                    <h6 className="text-sm font-semibold text-primary mb-3">
                        {capitalizeFirst(module)}
                    </h6>

                    {/* Permissions ROW style */}
                    <div className="space-y-2">

                        {perms.map((p: any) => {
                            const isChecked = selected.has(p.id);

                            return (
                                <label
                                    key={p.id}
                                    className={`
                  flex items-center justify-between px-3 py-2 rounded-md cursor-pointer text-sm
                  transition-all
                  ${isChecked
                                            ? 'bg-lightprimary/30 border border-primary'
                                            : 'hover:bg-lightprimary/20'
                                        }
                `}
                                >

                                    <span>
                                        {capitalizeFirst(
                                            p.permissionName.replace(/_/g, ' ')
                                        )}
                                    </span>

                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggle(p.id)}
                                        className="accent-primary"
                                    />

                                </label>
                            );
                        })}

                    </div>

                </div>
            ))}

        </div>
    );
};

export default RDPForm;