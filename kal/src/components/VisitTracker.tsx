'use client';

import { useEffect } from 'react';
import { trackVisit } from '../lib/tracker';

export default function VisitTracker() {
  useEffect(() => {
    const country = document.cookie.split('; ').find(row => row.startsWith('x-vercel-ip-country'))?.split('=')[1] || 'Unknown';
    const language = navigator.language || 'Unknown';

    trackVisit({
      geo: { country },
      headers: {
        get: (name: string) => name === 'accept-language' ? language : null
      }
    });
  }, []);

  return null;
}