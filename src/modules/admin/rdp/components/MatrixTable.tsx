import { Department } from 'src/modules/admin/departments/services/departmentService';
import { Permission } from 'src/modules/admin/permissions/services/permissionService';

interface MatrixTableProps {
    departments: Department[];
    permissions: Permission[];
    matrix: Record<number, Record<number, boolean>>;
    onToggle: (deptId: number, permId: number) => void;
}

const MatrixTable = ({
    departments,
    permissions,
    matrix,
    onToggle,
}: MatrixTableProps) => {
    return (
        <div className="overflow-x-auto border border-border rounded-md">
            <table className="w-full border-collapse">
                <thead>
                    <tr>
                        <th className="p-3 text-center border-r border-border">Department</th>
                        {permissions.map((perm) => (
                            <th key={perm.id} className="p-3 text-center border-r border-border">
                                {perm.name}
                            </th>
                        ))}
                    </tr>
                </thead>

                <tbody>
                    {departments.map((dept) => (
                        <tr key={dept.id} className="even:bg-lightprimary/80">
                            <td className="p-3 text-center border-r border-border font-medium">
                                {dept.name}
                            </td>

                            {permissions.map((perm) => (
                                <td key={perm.id} className="p-3 text-center border-r border-border">
                                    <input
                                        type="checkbox"
                                        checked={matrix[dept.id]?.[perm.id] || false}
                                        onChange={() => onToggle(dept.id, perm.id)}
                                        className="cursor-pointer"
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MatrixTable;