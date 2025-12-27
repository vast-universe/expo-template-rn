# expo-template-rn

配合 `create-rn-app` CLI 使用的模板仓库

## 目录结构

```
features/
├── feature-redux/           # Redux Toolkit + redux-persist
│   ├── index.ts
│   ├── hooks.ts
│   └── slices/
│       ├── rootReducer.ts
│       └── auth/
│           ├── index.ts
│           └── slice.ts
├── feature-axios/           # Axios 封装
│   ├── index.ts
│   ├── request.ts
│   ├── hooks/
│   │   ├── index.ts
│   │   └── useRequest.ts
│   └── services/
│       ├── index.ts
│       ├── auth.service.ts
│       └── user.service.ts
├── feature-i18n/            # i18next 国际化
│   ├── index.ts
│   └── locales/
│       ├── zh.ts
│       └── en.ts
└── feature-nativewind/      # NativeWind v5
    ├── global.css
    ├── metro.config.js
    ├── postcss.config.mjs
    └── nativewind-env.d.ts
```

## 使用

CLI 会根据用户选择，将对应 feature 目录的文件复制到项目中：

| Feature | 目标目录 |
|---------|----------|
| `feature-redux` | `store/` |
| `feature-axios` | `api/` |
| `feature-i18n` | `i18n/` |
| `feature-nativewind` | 根目录 |

## 模板说明

### feature-redux

- Redux Toolkit + redux-persist + AsyncStorage
- 预置 auth slice（user、token、isLoading）
- 导出 `useAppDispatch`、`useAppSelector` hooks

### feature-axios

- Axios 实例封装（拦截器、Token 注入、错误处理）
- `useRequest` hook（自动取消请求）
- 示例 services（auth、user）

### feature-i18n

- i18next + react-i18next
- 中/英双语支持
- `changeLanguage`、`getCurrentLanguage` 工具函数

### feature-nativewind

- NativeWind v5 配置
- Tailwind CSS v4
- PostCSS 配置

## License

MIT
# expo-template-rn
