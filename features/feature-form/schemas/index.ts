import { z } from 'zod';

// 基础验证
export const email = z.string().email('请输入有效的邮箱');
export const password = z.string().min(6, '密码至少6位');
export const phone = z.string().regex(/^1[3-9]\d{9}$/, '请输入有效的手机号');
export const required = (msg = '此项必填') => z.string().min(1, msg);

// 数字验证
export const positiveNumber = z.number().positive('请输入正数');
export const integer = z.number().int('请输入整数');
export const range = (min: number, max: number) =>
  z.number().min(min, `最小值为${min}`).max(max, `最大值为${max}`);

// 字符串验证
export const minLength = (len: number, msg?: string) =>
  z.string().min(len, msg || `至少${len}个字符`);
export const maxLength = (len: number, msg?: string) =>
  z.string().max(len, msg || `最多${len}个字符`);
export const url = z.string().url('请输入有效的URL');

// 日期验证
export const date = z.coerce.date({ message: '请输入有效日期' });
export const futureDate = z.coerce.date().refine((d) => d > new Date(), '请选择未来日期');

// 可选字段
export const optional = <T extends z.ZodTypeAny>(schema: T) => schema.optional();
export const nullable = <T extends z.ZodTypeAny>(schema: T) => schema.nullable();
