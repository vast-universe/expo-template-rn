import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * 合并 className 工具函数
 * 结合 clsx 条件拼接 + tailwind-merge 冲突合并
 *
 * @example
 * cn('p-4', 'p-2') // => 'p-2' (后者覆盖)
 * cn('p-4', isActive && 'bg-blue-500') // 条件拼接
 * cn(buttonVariants({ variant }), className) // 配合 cva 使用
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));
