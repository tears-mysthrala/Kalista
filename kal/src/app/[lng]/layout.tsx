import { languages } from '../../i18n/settings'

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }))
}

export default function Layout({
  children,
  params: { lng },
}: {
  children: React.ReactNode
  params: { lng: string }
}) {
  return (
    <html lang={lng}>
      <body>{children}</body>
    </html>
  )
}