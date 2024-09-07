'use client'

import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { getOptions } from './settings'
import HttpBackend from 'i18next-http-backend'

i18next
  .use(initReactI18next)
  .use(LanguageDetector)
  .use(HttpBackend)
  .init({
    ...getOptions(),
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ['path', 'cookie', 'navigator'],
    },
  })

export default i18next