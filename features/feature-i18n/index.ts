import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import zh from './locales/zh';
import en from './locales/en';

// 支持的语言
export const languages = {
  zh: { name: '中文', translation: zh },
  en: { name: 'English', translation: en },
};

i18n.use(initReactI18next).init({
  lng: 'zh', // 默认语言
  fallbackLng: 'en',
  resources: {
    zh: { translation: zh },
    en: { translation: en },
  },
  interpolation: {
    escapeValue: false,
  },
});

// 切换语言
export const changeLanguage = (lng: keyof typeof languages) => {
  i18n.changeLanguage(lng);
};

// 获取当前语言
export const getCurrentLanguage = () => i18n.language;

export default i18n;
