import apiClient from 'src/services/apiClient';

export interface Department {
  id: number;
  name: string;
  isActive: boolean;
  createdBy: number;
  updatedBy: number;
  createdAt: string;
  updatedAt: string;
}

export const departmentService = {
  async getDepartments(): Promise<Department[]> {
    const res = await apiClient.get('/departments');

    return res.data.map((item: any) => ({
      id: item.id,
      name: item.name,
      isActive: item.is_active,
      createdBy: item.created_by,
      updatedBy: item.updated_by,
      createdAt: new Date(item.created_at).toLocaleString(),
      updatedAt: new Date(item.updated_at).toLocaleString(),
    }));
  },

  async createDepartment(payload: { name: string; is_active: boolean }) {
    return (await apiClient.post('/departments', payload)).data;
  },

  async patchDepartment(id: number, payload: Record<string, any>) {
    return (await apiClient.patch(`/departments/${id}`, payload)).data;
  },

  async deleteDepartment(id: number) {
    return (await apiClient.delete(`/departments/${id}`)).data;
  },
};