import { useEffect, useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from 'src/components/ui/dialog';

import { modulePermissionService } from 'src/modules/admin/module-permissions/services/modulePermissionService';
import { userPermissionService } from '../../admin/user-permission/services/userPermissionService';

import { capitalizeFirst } from 'src/utils/format';

interface Props {
  open: boolean;
  onClose: () => void;
  userId?: number;
}

const UserPermissionDialog = ({ open, onClose, userId }: Props) => {
  const [permissions, setPermissions] = useState<any[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());

  // ✅ Load data
  const load = async () => {
    if (!userId) return;

    const [all, userPerms] = await Promise.all([
      modulePermissionService.getAll(),
      userPermissionService.get(userId),
    ]);

    setPermissions(all);

    const selectedSet = new Set<number>();

    userPerms.forEach((p: any) => {
      if (p.is_active) {
        selectedSet.add(p.module_permission_id);
      }
    });

    setSelected(selectedSet);
  };

  useEffect(() => {
    if (open) {
      load();
    }
  }, [open, userId]);

  // ✅ Toggle
  const toggle = async (permId: number) => {
    const isChecked = selected.has(permId);

    try {
      await userPermissionService.upsert({
        user_id: userId!,
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

        return newSet;
      });

    } catch {}
  };

  // ✅ Group by module
  const grouped = permissions.reduce((acc: any, item: any) => {
    if (!acc[item.moduleName]) acc[item.moduleName] = [];
    acc[item.moduleName].push(item);
    return acc;
  }, {});

  return (
    <Dialog open={open} onOpenChange={(v) => !v && onClose()}>
      <DialogContent className="max-w-3xl">

        <DialogHeader>
          <DialogTitle>User Permissions</DialogTitle>
        </DialogHeader>

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
                        ${
                          isChecked
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

      </DialogContent>
    </Dialog>
  );
};

export default UserPermissionDialog;