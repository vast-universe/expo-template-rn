import { View, Text, TextInput, TextInputProps } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';

interface FormInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
  control: Control<T>;
  name: Path<T>;
  label?: string;
}

/**
 * 表单输入组件，基于 Controller 封装
 */
export function FormInput<T extends FieldValues>({
  control,
  name,
  label,
  ...props
}: FormInputProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="mb-4">
          {label && <Text className="mb-1 text-sm text-gray-700">{label}</Text>}
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            className={`border rounded-lg px-3 py-2 ${error ? 'border-red-500' : 'border-gray-300'}`}
            {...props}
          />
          {error && <Text className="mt-1 text-xs text-red-500">{error.message}</Text>}
        </View>
      )}
    />
  );
}
