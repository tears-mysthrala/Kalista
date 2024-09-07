import React from 'react';
import '../../i18n/client';

export default function Layout({ children, params: { lng } }: { children: React.ReactNode, params: { lng: string } }) {
  return (
    <>
      {children}
    </>
  );
}