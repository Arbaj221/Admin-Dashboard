import apiClient from 'src/services/apiClient';

export interface User {
  id: number;
  email: string;
  mobileNumber: string;
  jobTitle: string;
  workLocation: string;
  roleId: number;
  departmentId: number;
  isActive: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
}

export const userService = {
  async getUsers(): Promise<User[]> {
    const res = await apiClient.get('/users');

    return res.data.map((item: any) => ({
      id: item.id,
      email: item.email,
      mobileNumber: item.mobile_number,
      jobTitle: item.job_title,
      workLocation: item.work_location,
      roleId: item.role_id,
      departmentId: item.department_id,
      isActive: item.is_active,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: new Date(item.created_at).toLocaleDateString(),
    }));
  },

  async getUserById(id: number): Promise<User> {
    const res = await apiClient.get(`/users/${id}`);
    const item = res.data;

    return {
      id: item.id,
      email: item.email,
      mobileNumber: item.mobile_number,
      jobTitle: item.job_title,
      workLocation: item.work_location,
      roleId: item.role_id,
      departmentId: item.department_id,
      isActive: item.is_active,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: new Date(item.created_at).toLocaleDateString(),
    };
  },

  async createUser(payload: any) {
    return (await apiClient.post('/users', payload)).data;
  },

  async updateUser(id: number, payload: any) {
    return (await apiClient.patch(`/users/${id}`, payload)).data;
  },

  async patchUser(id: number, payload: any) {
    return (await apiClient.patch(`/users/${id}`, payload)).data;
  },

  async deleteUser(id: number) {
    return (await apiClient.delete(`/users/${id}`)).data;
  },
};