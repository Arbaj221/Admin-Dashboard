import { Department } from 'src/modules/admin/departments/services/departmentService';

interface Props {
  departments: Department[];
  selected: Record<number, boolean>;
  onToggle: (deptId: number) => void;
}

const DepartmentSelector = ({ departments, selected, onToggle }: Props) => {
  return (
    <div className="border border-border rounded-md p-4 space-y-3">
      {departments.map((dept) => (
        <label
          key={dept.id}
          className="flex items-center gap-3 cursor-pointer"
        >
          <input
            type="checkbox"
            checked={selected[dept.id] || false}
            onChange={() => onToggle(dept.id)}
          />
          <span className="text-sm">{dept.name}</span>
        </label>
      ))}
    </div>
  );
};

export default DepartmentSelector;