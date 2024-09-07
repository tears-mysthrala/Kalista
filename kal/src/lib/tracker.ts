import { NextRequest } from 'next/server';

interface Visit {
  country: string;
  language: string;
  timestamp: Date;
}

let visits: Visit[] = [];

export function trackVisit(req: NextRequest) {
  const country = req.geo?.country || 'Unknown';
  const language = req.headers.get('accept-language')?.split(',')[0] || 'Unknown';
  
  visits.push({
    country,
    language,
    timestamp: new Date()
  });
}

export function getVisitStats() {
  const now = new Date();
  const dayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  const yearAgo = new Date(now.getTime() - 365 * 24 * 60 * 60 * 1000);

  const stats = {
    daily: countVisits(dayAgo),
    weekly: countVisits(weekAgo),
    monthly: countVisits(monthAgo),
    yearly: countVisits(yearAgo),
  };

  return stats;
}

function countVisits(since: Date) {
  const relevantVisits = visits.filter(v => v.timestamp >= since);
  const countryCounts = {};
  const languageCounts = {};

  relevantVisits.forEach(visit => {
    countryCounts[visit.country] = (countryCounts[visit.country] || 0) + 1;
    languageCounts[visit.language] = (languageCounts[visit.language] || 0) + 1;
  });

  return {
    total: relevantVisits.length,
    countries: countryCounts,
    languages: languageCounts,
  };
}