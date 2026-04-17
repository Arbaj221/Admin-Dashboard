// modules/user-permissions/services/userPermissionService.ts

import apiClient from 'src/services/apiClient';

export interface UserPermission {
  user_id: number;
  department_id: number;
  permission_id: number;
}

export const userPermissionService = {
  async getMappings(): Promise<UserPermission[]> {
    const res = await apiClient.get('/user-permissions/');
    return res.data;
  },

  buildState(data: UserPermission[], userId: number) {
    const matrix: Record<number, Record<number, boolean>> = {};
    const existing = new Set<string>();

    data
      .filter((item) => item.user_id === userId)
      .forEach((item) => {
        const key = `${item.department_id}-${item.permission_id}`;
        existing.add(key);

        if (!matrix[item.department_id]) {
          matrix[item.department_id] = {};
        }

        matrix[item.department_id][item.permission_id] = true;
      });

    return { matrix, existing };
  },

  // 🔥 FIXED: returns hasChanges
  async saveMappings(
    userId: number,
    matrix: Record<number, Record<number, boolean>>,
    existing: Set<string>
  ) {
    const updatedExisting = new Set(existing);
    let hasChanges = false;

    for (const deptId in matrix) {
      for (const permId in matrix[deptId]) {
        if (!matrix[deptId][permId]) continue;

        const key = `${deptId}-${permId}`;

        if (existing.has(key)) continue;

        try {
          await apiClient.post('/user-permissions/', {
            user_id: userId,
            department_id: Number(deptId),
            permission_id: Number(permId),
          });

          updatedExisting.add(key);
          hasChanges = true;
        } catch (err: any) {
          if (
            err?.response?.data?.detail?.includes('already assigned')
          ) {
            updatedExisting.add(key);
            continue;
          }
          throw err;
        }
      }
    }

    return {
      updatedExisting,
      hasChanges,
    };
  },
};