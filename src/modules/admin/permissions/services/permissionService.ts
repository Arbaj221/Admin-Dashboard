import apiClient from 'src/services/apiClient';

export interface Permission {
  id: number;
  name: string;
}

export const permissionService = {
  async getPermissions(): Promise<Permission[]> {
    const res = await apiClient.get('/permissions/');
    return res.data;
  },

  async createPermission(payload: { name: string }) {
    const res = await apiClient.post('/permissions/', payload);
    return res.data;
  },
};