import axios, {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// React Native 全局变量
declare const __DEV__: boolean;

// 配置
const BASE_URL = 'https://api.example.com';
const TIMEOUT = 10000;

// Token 获取函数 - 根据你的状态管理方案修改
const getToken = (): string | null => {
  try {
    // Redux 方式
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { store } = require('@/store');
    return store.getState().auth?.token || null;
  } catch {
    // 如果没有使用 Redux，返回 null 或从其他地方获取
    return null;
  }
};

// 统一响应格式
export interface ApiResponse<T = unknown> {
  code: number;
  data: T;
  message: string;
}

// 创建实例
const instance = axios.create({
  baseURL: BASE_URL,
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // 获取 token
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // 开发环境打印请求日志
    if (__DEV__) {
      console.log(`🚀 [${config.method?.toUpperCase()}] ${config.url}`, config.data || '');
    }

    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
instance.interceptors.response.use(
  (response: AxiosResponse<ApiResponse>) => {
    // 开发环境打印响应日志
    if (__DEV__) {
      console.log(`✅ [${response.config.method?.toUpperCase()}] ${response.config.url}`, response.data);
    }

    // 如果后端返回统一格式，可以在这里处理
    // const { code, data, message } = response.data;
    // if (code !== 0) {
    //   return Promise.reject(new Error(message));
    // }
    // return data;

    return response.data;
  },
  (error: AxiosError<ApiResponse>) => {
    // 开发环境打印错误日志
    if (__DEV__) {
      console.log(`❌ [${error.config?.method?.toUpperCase()}] ${error.config?.url}`, error.message);
    }

    if (error.response) {
      const { status, data } = error.response;
      const message = data?.message || error.message;

      switch (status) {
        case 401:
          // TODO: 清除 token，跳转登录
          // store.dispatch(logout());
          // router.replace('/login');
          console.log('未授权，请重新登录');
          break;
        case 403:
          console.log('拒绝访问');
          break;
        case 404:
          console.log('请求资源不存在');
          break;
        case 500:
          console.log('服务器错误');
          break;
        default:
          console.log(message);
      }
    } else if (error.code === 'ECONNABORTED') {
      console.log('请求超时');
    } else if (error.message === 'Network Error') {
      console.log('网络错误，请检查网络连接');
    }

    return Promise.reject(error);
  }
);

// 通用请求方法
export const request = {
  get: <T>(url: string, config?: AxiosRequestConfig) => instance.get<T, T>(url, config),

  post: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.post<T, T>(url, data, config),

  put: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.put<T, T>(url, data, config),

  patch: <T>(url: string, data?: unknown, config?: AxiosRequestConfig) =>
    instance.patch<T, T>(url, data, config),

  delete: <T>(url: string, config?: AxiosRequestConfig) => instance.delete<T, T>(url, config),
};

// 带取消功能的请求
export function createCancelableRequest<T>(
  requestFn: (signal: AbortSignal) => Promise<T>
): [Promise<T>, () => void] {
  const controller = new AbortController();
  const promise = requestFn(controller.signal);
  return [promise, () => controller.abort()];
}

export default instance;
