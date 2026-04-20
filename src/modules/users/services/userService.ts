import apiClient from 'src/services/apiClient';

export interface User {
  id: number;
  username: string;
  email: string;
  mobileNumber: string;
  jobTitle: string;
  workLocation: string;
  roleId: number;
  departmentIds: number[];   // ✅ NEW
  isActive: boolean;         // ✅ NEW
  createdAt: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const res = await apiClient.get('/userauth');

    return res.data.map((item: any) => ({
      id: item.id,
      username: item.username,
      email: item.email,
      mobileNumber: item.mobile_number,
      jobTitle: item.job_title,
      workLocation: item.work_location,
      roleId: item.role_id,
      departmentIds: (item.department_ids || []).map(Number),
      isActive: item.is_active,                // ✅
      createdAt: new Date(item.created_at).toLocaleDateString(),
    }));
  },

  async getUserById(id: number) {
    const res = await apiClient.get(`/userauth/${id}`);
    const item = res.data;
    return {
      id: item.id,
      username: item.username,
      email: item.email,
      mobileNumber: item.mobile_number,
      jobTitle: item.job_title,
      workLocation: item.work_location,
      roleId: item.role_id,
      departmentIds: (item.department_ids || []).map(Number),
      isActive: item.is_active,             // ✅
      createdAt: new Date(item.created_at).toLocaleString(),
      updatedAt: new Date(item.updated_at).toLocaleString(),
    };
  },

  async createUser(payload: any) {
    const res = await apiClient.post('/userauth/', payload); // ✅ JSON
    return res.data;
  },

  async updateUser(id: number, payload: any) {
    const res = await apiClient.put(`/userauth/${id}`, payload); // ✅ JSON
    return res.data;
  },

  async patchUser(id: number, payload: Record<string, any>) {
    const res = await apiClient.patch(`/userauth/${id}`, payload);
    return res.data;
  },

  async deleteUser(id: number) {
    const res = await apiClient.delete(`/userauth/${id}`);
    return res.data;
  },

};
