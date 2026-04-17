import apiClient from 'src/services/apiClient';

export interface Department {
  id: number;
  name: string;
}

export const departmentService = {
  async getDepartments(): Promise<Department[]> {
    const res = await apiClient.get('/departments/');
    return res.data;
  },

  async createDepartment(payload: { name: string }) {
    const res = await apiClient.post('/departments/', payload);
    return res.data;
  },
};