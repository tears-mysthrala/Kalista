import { NextApiRequest, NextApiResponse } from 'next';
import { sendReport } from '../../lib/send-report';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      await sendReport();
      res.status(200).json({ message: 'Reporte enviado con éxito' });
    } catch (error) {
      res.status(500).json({ message: 'Error al enviar el reporte', error });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}