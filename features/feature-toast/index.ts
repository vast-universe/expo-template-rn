import Toast, { ToastShowParams } from 'react-native-toast-message';

/**
 * Toast 工具函数
 * 命令式调用，无需在组件中引入
 */
export const toast = {
  /**
   * 成功提示
   * @example toast.success('操作成功')
   */
  success: (message: string, options?: Partial<ToastShowParams>) => {
    Toast.show({
      type: 'success',
      text1: message,
      ...options,
    });
  },

  /**
   * 错误提示
   * @example toast.error('操作失败')
   */
  error: (message: string, options?: Partial<ToastShowParams>) => {
    Toast.show({
      type: 'error',
      text1: message,
      ...options,
    });
  },

  /**
   * 信息提示
   * @example toast.info('请注意')
   */
  info: (message: string, options?: Partial<ToastShowParams>) => {
    Toast.show({
      type: 'info',
      text1: message,
      ...options,
    });
  },

  /**
   * 自定义提示
   * @example toast.show({ type: 'success', text1: '标题', text2: '描述' })
   */
  show: (params: ToastShowParams) => {
    Toast.show(params);
  },

  /**
   * 隐藏当前 Toast
   */
  hide: () => {
    Toast.hide();
  },
};

// Toast 容器组件，需要放在根组件（_layout.tsx）
export { default as Toast } from 'react-native-toast-message';
