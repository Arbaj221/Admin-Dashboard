import apiClient from 'src/services/apiClient';

export interface UserDepartment {
  user_id: number;
  department_id: number;
}

export const userDepartmentService = {
  async getMappings(): Promise<UserDepartment[]> {
    const res = await apiClient.get('/user-departments/');
    return res.data;
  },

  // 👉 build UI state
  buildState(data: UserDepartment[], userId: number) {
    const selected: Record<number, boolean> = {};
    const existing = new Set<number>();

    data
      .filter((item) => item.user_id === userId)
      .forEach((item) => {
        selected[item.department_id] = true;
        existing.add(item.department_id);
      });

    return { selected, existing };
  },

  // 👉 save logic
  // modules/user-department/services/userDepartmentService.ts

async saveMappings(
  userId: number,
  selected: Record<number, boolean>,
  existing: Set<number>
) {
  const updatedExisting = new Set(existing);
  let hasChanges = false;

  for (const deptId in selected) {
    if (!selected[deptId]) continue;

    const deptNum = Number(deptId);

    if (existing.has(deptNum)) continue;

    try {
      await apiClient.post('/user-departments/', {
        user_id: userId,
        department_id: deptNum,
      });

      updatedExisting.add(deptNum);
      hasChanges = true;

    } catch (err: any) {
      if (
        err?.response?.data?.detail?.includes('already assigned')
      ) {
        updatedExisting.add(deptNum);
        continue;
      }
      throw err;
    }
  }

  return {
    updatedExisting,
    hasChanges,
  };
}
};