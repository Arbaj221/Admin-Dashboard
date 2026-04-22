import apiClient from 'src/services/apiClient';

export const rdpService = {
  async getRDP(roleId: number, departmentId: number) {
    const res = await apiClient.get(
      `/role-department-permissions?role_id=${roleId}&department_id=${departmentId}`
    );
    return res.data;
  },

  async upsert(payload: {
    role_id: number;
    department_id: number;
    module_permission_id: number;
    is_active: boolean;
  }) {
    return (await apiClient.post(
      '/role-department-permissions/upsert',
      payload
    )).data;
  },
};