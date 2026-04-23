import apiClient from 'src/services/apiClient';

export interface AppSetting {
  id: number;
  key: string;
  value: string;
  description: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export const appSettingsService = {
  async getAll(): Promise<AppSetting[]> {
    const res = await apiClient.get('/app-settings/');

    return res.data.map((item: any) => ({
      id: item.id,
      key: item.key,
      value: item.value,
      description: item.description,
      isActive: item.is_active,
      createdAt: new Date(item.created_at).toLocaleDateString(),
      updatedAt: new Date(item.updated_at).toLocaleDateString(),
    }));
  },

  async create(payload: any) {
    const res = await apiClient.post('/app-settings/', payload);
    return res.data;
  },

  async update(key: string, payload: any) {
    const res = await apiClient.patch(`/app-settings/${key}`, payload);
    return res.data;
  },

  async delete(key: string) {
    const res = await apiClient.delete(`/app-settings/${key}`);
    return res.data;
  },
};