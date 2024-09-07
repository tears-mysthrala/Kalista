'use client';

import ClientPage from './ClientPage';

export default function Home({ params: { lng } }: { params: { lng: string } }) {
  return <ClientPage lng={lng} />
}