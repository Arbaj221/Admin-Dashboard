import apiClient from 'src/services/apiClient';
import { User } from '../types-data/users';

export const userService = {
  // 👉 GET users
  async getUsers(): Promise<User[]> {
    const res = await apiClient.get('/auth/users');
    return res.data;
  },

  // 👉 CREATE user
  async createUser(payload: Partial<User>) {
    const res = await apiClient.post('/users', payload);
    return res.data;
  },

  // 👉 UPDATE user
  async updateUser(id: number, payload: Partial<User>) {
    const res = await apiClient.put(`/users/${id}`, payload);
    return res.data;
  },

  // 👉 DELETE user
  async deleteUser(id: number) {
    const res = await apiClient.delete(`/users/${id}`);
    return res.data;
  },
};