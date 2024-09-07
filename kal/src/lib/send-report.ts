import nodemailer from 'nodemailer';
import { getVisitStats } from './tracker';

export async function sendReport() {
  const stats = getVisitStats();

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.RECIPIENT_EMAIL,
    subject: 'Reporte de visitas del sitio web',
    html: `
      <h1>Reporte de visitas</h1>
      <h2>Visitas diarias: ${stats.daily.total}</h2>
      <p>Países: ${JSON.stringify(stats.daily.countries)}</p>
      <p>Idiomas: ${JSON.stringify(stats.daily.languages)}</p>
      <h2>Visitas semanales: ${stats.weekly.total}</h2>
      <p>Países: ${JSON.stringify(stats.weekly.countries)}</p>
      <p>Idiomas: ${JSON.stringify(stats.weekly.languages)}</p>
      <h2>Visitas mensuales: ${stats.monthly.total}</h2>
      <p>Países: ${JSON.stringify(stats.monthly.countries)}</p>
      <p>Idiomas: ${JSON.stringify(stats.monthly.languages)}</p>
      <h2>Visitas anuales: ${stats.yearly.total}</h2>
      <p>Países: ${JSON.stringify(stats.yearly.countries)}</p>
      <p>Idiomas: ${JSON.stringify(stats.yearly.languages)}</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}