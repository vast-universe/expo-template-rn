import { useEffect, useRef, useCallback, useState } from 'react';
import { request } from '../request';
import { AxiosRequestConfig } from 'axios';

interface UseRequestState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

interface UseRequestOptions {
  manual?: boolean; // 是否手动触发
}

/**
 * 自动取消请求的 hook
 * 页面卸载时自动取消未完成的请求
 */
export function useRequest<T>(
  url: string,
  config?: AxiosRequestConfig,
  options?: UseRequestOptions
) {
  const [state, setState] = useState<UseRequestState<T>>({
    data: null,
    loading: !options?.manual,
    error: null,
  });

  const abortControllerRef = useRef<AbortController | null>(null);

  const run = useCallback(async (overrideConfig?: AxiosRequestConfig) => {
    // 取消上一个请求
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // 创建新的 AbortController
    abortControllerRef.current = new AbortController();

    setState((prev) => ({ ...prev, loading: true, error: null }));

    try {
      const data = await request.get<T>(url, {
        ...config,
        ...overrideConfig,
        signal: abortControllerRef.current.signal,
      });
      setState({ data, loading: false, error: null });
      return data;
    } catch (error: any) {
      // 忽略取消请求的错误
      if (error.name === 'CanceledError' || error.name === 'AbortError') {
        return;
      }
      setState({ data: null, loading: false, error });
      throw error;
    }
  }, [url, config]);

  const cancel = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
  }, []);

  // 自动请求
  useEffect(() => {
    if (!options?.manual) {
      run();
    }
  }, [options?.manual]);

  // 页面卸载时取消请求
  useEffect(() => {
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    ...state,
    run,
    cancel,
  };
}
