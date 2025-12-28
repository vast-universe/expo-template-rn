# expo-template-rn

[create-rn-app](https://github.com/your-username/create-rn-app) 的模板仓库。

## 📁 模板结构

```
features/
├── feature-redux/        # Redux Toolkit + 持久化
├── feature-axios/        # Axios + useRequest
├── feature-i18n/         # i18next 国际化
├── feature-nativewind/   # NativeWind + cn + cva
├── feature-toast/        # Toast 消息提示
├── feature-form/         # 表单验证 (react-hook-form + zod)
├── feature-lint/         # Husky + Prettier
└── feature-env/          # 环境变量
```

## 📦 模板说明

### feature-redux

Redux Toolkit + redux-persist + AsyncStorage

```
feature-redux/
├── index.ts          # store 配置
├── hooks.ts          # useAppDispatch, useAppSelector
└── slices/
    ├── rootReducer.ts
    └── auth/
        ├── slice.ts
        └── index.ts
```

### feature-axios

Axios 封装 + useRequest Hook（复制到 `services/`）

```
feature-axios/
├── index.ts
├── request.ts        # axios 实例 + 拦截器
├── hooks/
│   └── useRequest.ts # 自动取消请求
└── services/
    ├── auth.service.ts
    └── user.service.ts
```

### feature-i18n

i18next 多语言支持（复制到 `lib/i18n/`）

```
feature-i18n/
├── index.ts
└── locales/
    ├── zh.ts
    └── en.ts
```

### feature-nativewind

NativeWind v5 配置 + UI 组件

```
feature-nativewind/
├── global.css
├── metro.config.js
├── postcss.config.mjs
├── nativewind-env.d.ts
├── components/
│   └── ui/
│       └── Button.tsx
└── utils/
    └── cn.ts
```

### feature-toast

react-native-toast-message 封装（复制到 `lib/toast/`）

```
feature-toast/
└── index.ts
```

### feature-form

react-hook-form + zod 表单验证（复制到 `lib/form/`）

```
feature-form/
├── index.ts              # 导出 useForm, Controller, zodResolver, z
├── schemas/
│   └── index.ts          # 常用验证规则
├── components/
│   └── FormInput.tsx     # 表单输入组件
└── examples/
    └── LoginForm.tsx     # 登录表单示例
```

### feature-lint

Husky + Prettier + lint-staged

```
feature-lint/
├── .prettierrc
├── .prettierignore
└── .lintstagedrc.js
```

### feature-env

环境变量配置

```
feature-env/
└── .env.example
```

## 🔧 使用方式

此仓库由 [create-rn-app](https://github.com/your-username/create-rn-app) CLI 自动拉取使用，无需手动操作。

### 拉取逻辑

1. 开发时：CLI 优先从本地 `expo-template-rn/features/` 复制
2. 发布后：通过 [degit](https://github.com/Rich-Harris/degit) 从 GitHub 拉取

## 🔗 相关

- [create-rn-app](https://github.com/your-username/create-rn-app) - CLI 工具

## 📄 License

MIT
