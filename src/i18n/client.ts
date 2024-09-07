import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importación dinámica para evitar errores de compilación
const en = () => import('../locales/en.json');

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: 'en', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;