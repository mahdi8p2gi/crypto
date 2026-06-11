import { useState } from 'react';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('zarrinex_favorites');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const toggleFavorite = (coinId: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(coinId)
        ? prev.filter((id) => id !== coinId)
        : [...prev, coinId];
      localStorage.setItem('zarrinex_favorites', JSON.stringify(updated));
      return updated;
    });
  };

  const isFavorite = (coinId: string) => favorites.includes(coinId);

  return { favorites, toggleFavorite, isFavorite };
};
