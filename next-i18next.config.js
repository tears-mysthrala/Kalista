module.exports = {
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en', 'fr', 'eu', 'zh'],
  },
  localePath: typeof window === 'undefined' ? require('path').resolve('./public/locales') : '/locales',
}