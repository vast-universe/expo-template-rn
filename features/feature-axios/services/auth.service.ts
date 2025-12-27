import { request } from '../request';

// 类型定义
export interface LoginParams {
  email: string;
  password: string;
}

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}

// Auth API
export const authService = {
  login: (params: LoginParams) => 
    request.post<AuthResponse>('/auth/login', params),

  register: (params: RegisterParams) => 
    request.post<AuthResponse>('/auth/register', params),

  logout: () => 
    request.post<void>('/auth/logout'),

  refreshToken: () => 
    request.post<{ token: string }>('/auth/refresh'),
};
