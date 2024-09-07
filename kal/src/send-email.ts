import nodemailer from 'nodemailer'

export async function sendEmail(name: string, email: string, message: string) {
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
    from: `"Formulario de Contacto" <${process.env.EMAIL_USER}>`,
    to: process.env.RECIPIENT_EMAIL,
    subject: `Nuevo mensaje de ${name}`,
    text: `Nombre: ${name}\nEmail: ${email}\nMensaje: ${message}`,
    html: `<p><strong>Nombre:</strong> ${name}</p>
           <p><strong>Email:</strong> ${email}</p>
           <p><strong>Mensaje:</strong> ${message}</p>`,
  };

  await transporter.sendMail(mailOptions);
}
