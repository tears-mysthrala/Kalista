'use client';

import React, { useEffect } from 'react';
import { getVisitStats } from '../lib/tracker';

const VisitTracker: React.FC = () => {
  useEffect(() => {
    const trackVisit = async () => {
      const lastVisit = localStorage.getItem('lastVisit');
      const now = new Date().toISOString();
      if (!lastVisit || new Date(lastVisit).getDate() !== new Date(now).getDate()) {
        localStorage.setItem('lastVisit', now);
        const stats = await getVisitStats();
        if (stats.daily.total % 100 === 0) {
          try {
            const response = await fetch('/api/send-visit-stats', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Failed to send visit stats');
            }
          } catch (error) {
            console.error('Error sending visit stats:', error);
          }
        }
      }
    };

    trackVisit();
  }, []);

  // No renderizamos nada visible
  return null;
};

export default VisitTracker;