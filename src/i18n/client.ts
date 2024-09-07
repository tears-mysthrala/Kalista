import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

// Importación estática del archivo de localización
import en from '../../public/locales/en/common.json';

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
    },
    lng: 'es', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;