import type { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import { getVisitStats } from '../../lib/tracker'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const stats = await getVisitStats()

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: `"Estadísticas de Visitas" <${process.env.EMAIL_USER}>`,
      to: process.env.RECIPIENT_EMAIL,
      subject: `Resumen de Estadísticas de Visitas`,
      text: `Estadísticas de visitas:\n${JSON.stringify(stats, null, 2)}`,
      html: `<h1>Estadísticas de Visitas</h1>
             <pre>${JSON.stringify(stats, null, 2)}</pre>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Email sent successfully' })
  } catch (error) {
    console.error('Error sending email:', error)
    res.status(500).json({ message: 'Error sending email' })
  }
}