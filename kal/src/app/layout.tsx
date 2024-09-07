import type { Metadata } from "next";
import localFont from "next/font/local";
import './globals.css';  // Asegúrate de que este archivo exista y contenga los estilos globales
import { dir } from 'i18next'
import { languages } from '../i18n/settings'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Unai Kalista Urzainqui",
  description: "Desarrollador Full Stack | Ingeniero de Software",
  icons: [
    { rel: 'icon', url: '/logo.svg' },
    { rel: 'apple-touch-icon', url: '/logo.svg' },
  ],
};

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function RootLayout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng} dir={dir(lng)} className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}
