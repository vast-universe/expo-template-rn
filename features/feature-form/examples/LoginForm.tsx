import { View, Text, TextInput, Pressable } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 定义表单 schema
const loginSchema = z.object({
  email: z.string().email('请输入有效的邮箱'),
  password: z.string().min(6, '密码至少6位'),
});

type LoginFormData = z.infer<typeof loginSchema>;

/**
 * 登录表单示例 - 使用 Controller
 */
export function LoginForm() {
  const {
    control,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    console.log('表单数据:', data);
    // TODO: 调用登录 API
  };

  return (
    <View className="p-4">
      <Text className="text-xl font-bold mb-6">登录</Text>

      {/* 邮箱 */}
      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View className="mb-4">
            <Text className="mb-1 text-sm text-gray-700">邮箱</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="请输入邮箱"
              keyboardType="email-address"
              autoCapitalize="none"
              className={`border rounded-lg px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
          </View>
        )}
      />

      {/* 密码 */}
      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
          <View className="mb-4">
            <Text className="mb-1 text-sm text-gray-700">密码</Text>
            <TextInput
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="请输入密码"
              secureTextEntry
              className={`border rounded-lg px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
            />
            {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
          </View>
        )}
      />

      <Pressable
        onPress={handleSubmit(onSubmit)}
        disabled={isSubmitting}
        className="bg-blue-500 rounded-lg py-3 mt-4"
      >
        <Text className="text-white text-center font-medium">
          {isSubmitting ? '登录中...' : '登录'}
        </Text>
      </Pressable>
    </View>
  );
}
