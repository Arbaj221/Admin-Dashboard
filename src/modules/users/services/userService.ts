import apiClient from 'src/services/apiClient';
export type Department =
  | 'Management'
  | 'Technology'
  | 'HR'
  | 'Finance'
  | 'Sales'
  | 'Customer Success'
  | 'DataOps'
  | 'Email'
  | 'Quality'
  | 'DB Refresh'
  | 'Voice Verification'
  | 'MIS';

export type Role = 'Manager' | 'Executive';
export interface User {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  jobTitle: string;
  department: Department;
  role: Role;
  addedDate: string;
}

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