import { InitOptions } from 'i18next'
import fs from 'fs-extra'
import path from 'path'

export const fallbackLng = 'en'
export const defaultNS = 'common'

export const getLanguages = async () => {
  const localesDir = path.join(process.cwd(), 'public', 'locales')
  const languages = await fs.readdir(localesDir)
  return languages
}

export async function getOptions(lng = fallbackLng, ns = defaultNS): Promise<InitOptions> {
  const languages = await getLanguages()
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  }
}

// No exportamos i18n directamente desde aquí