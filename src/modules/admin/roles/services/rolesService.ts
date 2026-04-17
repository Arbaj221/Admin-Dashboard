import apiClient from 'src/services/apiClient';

export interface Role {
  id: number;
  name: string;
}

export const rolesService = {
  async getRoles(): Promise<Role[]> {
    const res = await apiClient.get('/roles/');
    return res.data;
  },

  // add this inside rolesService
  async createRole(payload: { name: string }) {
    const res = await apiClient.post('/roles/', payload);
    return res.data;
  }
};

