import { useState } from 'react';

export const useRecentlyViewed = () => {
  const [recentIds, setRecentIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zarrinex_recent_viewed');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const addRecent = (coinId: string) => {
    setRecentIds((prev) => {
      // Remove if already exists, then prepend to keep it at the top
      const filtered = prev.filter((id) => id !== coinId);
      const updated = [coinId, ...filtered].slice(0, 5); // Keep last 5 viewed
      localStorage.setItem('zarrinex_recent_viewed', JSON.stringify(updated));
      return updated;
    });
  };

  return { recentIds, addRecent };
};
