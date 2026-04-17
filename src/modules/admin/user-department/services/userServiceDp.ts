import apiClient from 'src/services/apiClient';

export interface User {
    id: number;
    email: string;
    role_id: number;
}

export const usersService = {
    // 👉 GET users
    async getUsers(): Promise<User[]> {
        const res = await apiClient.get('/auth/users');
        return res.data;
    },
};