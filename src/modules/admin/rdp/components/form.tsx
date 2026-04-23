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
            modulePermissionService.getActiveModulePermissions(),
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
        <div className="columns-1 md:columns-2 gap-6">

            {Object.entries(grouped).map(([module, perms]: any, index: number) => (
                <div key={module} className="break-inside-avoid mb-4">

                    {/* Header */}
                    <div className="flex items-center gap-2 mb-3 px-2 py-1.5 rounded-md bg-lightprimary/60">

                        <span className="text-xs px-2 py-0.5 rounded-md bg-primary/10 text-primary font-medium">
                            {String(index + 1).padStart(2, '0')}
                        </span>

                        <h6 className="text-[13px] font-semibold text-primary">
                            {capitalizeFirst(module)}
                        </h6>

                    </div>

                    {/* Permissions */}
                    <div className="space-y-1">

                        {perms.map((p: any) => {
                            const isChecked = selected.has(p.id);

                            return (
                                <label
                                    key={p.id}
                                    className={`
                  flex items-center gap-3 px-2 py-1.5 rounded-md cursor-pointer text-sm
                  transition-all
                  ${isChecked
                                            ? 'bg-lightprimary/10 text-primary'
                                            : 'hover:bg-lightprimary/10'
                                        }
                `}
                                >

                                    <input
                                        type="checkbox"
                                        checked={isChecked}
                                        onChange={() => toggle(p.id)}
                                        className="accent-primary"
                                    />

                                    <span>
                                        {capitalizeFirst(
                                            p.permissionName.replace(/_/g, ' ')
                                        )}
                                    </span>

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