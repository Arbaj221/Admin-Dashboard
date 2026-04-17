import { Department } from 'src/modules/admin/departments/services/departmentService';
import { Permission } from 'src/modules/admin/permissions/services/permissionService';

interface Props {
  departments: Department[];
  permissions: Permission[];
  matrix: Record<number, Record<number, boolean>>;
  onToggle: (deptId: number, permId: number) => void;
}

const PermissionOverride = ({
  departments,
  permissions,
  matrix,
  onToggle,
}: Props) => {
  if (departments.length === 0) {
    return (
      <p className="text-muted-foreground">
        No departments assigned to this user
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {departments.map((dept) => (
        <div
          key={dept.id}
          className="border border-border rounded-md p-4"
        >
          <p className="font-medium mb-3">📁 {dept.name}</p>

          <div className="flex flex-wrap gap-4">
            {permissions.map((perm) => (
              <label
                key={perm.id}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={matrix[dept.id]?.[perm.id] || false}
                  onChange={() => onToggle(dept.id, perm.id)}
                />
                <span className="text-sm">{perm.name}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default PermissionOverride;