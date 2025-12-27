import { request } from '../request';

// 类型定义
export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface UpdateUserParams {
  name?: string;
  avatar?: string;
}

// User API
export const userService = {
  getProfile: () => 
    request.get<User>('/user/profile'),

  updateProfile: (params: UpdateUserParams) => 
    request.put<User>('/user/profile', params),

  getUsers: (page = 1, limit = 10) => 
    request.get<{ data: User[]; total: number }>(`/users?page=${page}&limit=${limit}`),

  getUserById: (id: string) => 
    request.get<User>(`/users/${id}`),
};
