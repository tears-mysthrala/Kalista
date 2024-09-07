export const fallbackLng = 'en'
export const languages = ['en', 'es', 'fr', 'eu', 'zh']

export function getOptions (lng = fallbackLng, ns = 'common') {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: 'common',
    defaultNS: 'common',
    ns
  }
}