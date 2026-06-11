import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, TrendingUp } from 'lucide-react';
import { MarketCards } from '../features/markets/components/MarketCards';
import { CoinList } from '../features/markets/components/CoinList';
import { useCrypto } from '../hooks/useCrypto';

export const Markets: React.FC = () => {
  const { coins } = useCrypto();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Title & Header */}
        <div className="mb-10 text-center md:text-right flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary mb-3">
              <Sparkles size={12} className="animate-pulse" />
              <span>قیمت لحظه‌ای و مبادلات زنده بازار</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              دیده‌بان بازار رمزارزها
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              تحلیل قیمت‌ها، نوسانات بازار و ثبت سفارش خرید یا فروش رمزارزها به صورت لحظه‌ای با کارمزد رقابتی.
            </p>
          </div>

          {/* Quick market statistics */}
          <div className="hidden lg:flex items-center gap-4 text-xs">
            <div className="px-4 py-3 bg-white dark:bg-card-dark border border-slate-150 dark:border-border-dark rounded-2xl flex items-center gap-2">
              <TrendingUp size={16} className="text-emerald-500" />
              <div>
                <span className="text-slate-400 block">بیشترین رشد ۲۴ساعته:</span>
                <span className="font-bold text-emerald-500 mt-0.5 inline-block">دوج‌کوین (۱۲.۴٪+)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Market Highlight Cards (Grid of top markets) */}
        <MarketCards coins={coins} />

        {/* Full Interactive Search/Filterable Coin Table */}
        <CoinList coins={coins} />

      </div>
    </motion.div>
  );
};
