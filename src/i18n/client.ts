import i18next from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from '../locales/en.json';
// Importa otros idiomas si los tienes

i18next
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      // Añade otros idiomas aquí
    },
    lng: 'en', // idioma por defecto
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18next;