export const fallbackLng = 'es'
export const languages = ['es', 'en', 'fr', 'eu', 'zh']
export const defaultNS = 'common'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}