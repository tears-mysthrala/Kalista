import { NextApiRequest, NextApiResponse } from 'next'
import { getLanguages } from '../../i18n/settings'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const languages = await getLanguages()
    res.status(200).json(languages)
  } catch (error) {
    console.error('Error fetching languages:', error)
    res.status(500).json({ error: 'Error fetching languages' })
  }
}