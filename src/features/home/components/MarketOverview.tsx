import React from 'react';
import { Link } from 'react-router-dom';
import { TrendingUp, BarChart3, AlertCircle, Sparkles, Flame, Check } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { useCrypto } from '../../../hooks/useCrypto';

export const MarketOverview: React.FC = () => {
  const { coins } = useCrypto();

  // Find top gainers and top volume coins from our live data
  const topGainers = [...coins].sort((a, b) => b.change24h - a.change24h).slice(0, 3);
  const topVolume = [...coins].sort((a, b) => b.volume24hUsd - a.volume24hUsd).slice(0, 3);

  return (
    <section className="py-16 bg-white dark:bg-[#0F1115] border-t border-b border-slate-150 dark:border-slate-850 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            نگاهی به بازار رمزارزها در یک نگاه
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
            آخرین نوسانات، حجم معاملات و روندهای کلیدی بازار ارزهای دیجیتال را به صورت زنده رصد کنید.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          
          {/* Stat 1: Market Capitalization */}
          <Card variant="gradient" className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">حجم کل معاملات ۲۴ ساعته</span>
              <div className="p-2 bg-primary/10 rounded-xl">
                <BarChart3 size={18} className="text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-wide">
                ۹۲.۵ <span className="text-sm font-semibold text-slate-400">میلیارد دلار</span>
              </h4>
              <p className="text-xs text-emerald-500 mt-1.5 flex items-center gap-1">
                <TrendingUp size={12} />
                <span>۴.۸٪ افزایش نسبت به دیروز</span>
              </p>
            </div>
          </Card>

          {/* Stat 2: Fear & Greed Index */}
          <Card variant="gradient" className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">شاخص ترس و طمع</span>
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <Flame size={18} className="text-amber-500" />
              </div>
            </div>
            <div className="mt-4">
              <div className="flex items-baseline gap-2">
                <h4 className="text-2xl font-black text-slate-800 dark:text-white">۷۸</h4>
                <span className="text-sm font-bold text-amber-500">طمع شدید (Extreme Greed)</span>
              </div>
              {/* Simple progress bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-500 to-primary rounded-full" style={{ width: '78%' }} />
              </div>
            </div>
          </Card>

          {/* Stat 3: Bitcoin Dominance */}
          <Card variant="gradient" className="flex flex-col justify-between">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">سهم بیت‌کوین از بازار (Dominance)</span>
              <div className="p-2 bg-blue-550/10 rounded-xl">
                <Sparkles size={18} className="text-primary" />
              </div>
            </div>
            <div className="mt-4">
              <h4 className="text-2xl font-black text-slate-800 dark:text-white tracking-wide">
                ۵۶.۲٪
              </h4>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5 flex items-center gap-1">
                <AlertCircle size={12} />
                <span>افزایش جزئی تسلط بیت‌کوین بر آلت‌کوین‌ها</span>
              </p>
            </div>
          </Card>

        </div>

        {/* Gainers & Volume Lists */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Top Gainers Card */}
          <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
              <span>بیشترین افزایش قیمت (۲۴ ساعت اخیر)</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {topGainers.map((coin, i) => (
                <Link
                  to={`/coin/${coin.id}`}
                  key={coin.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group/item hover:opacity-85 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500 w-4 font-bold">{i + 1}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-805 overflow-hidden flex items-center justify-center">
                      <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 group-hover/item:text-primary transition-colors">{coin.nameFa}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-550 mt-0.5">{coin.name}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-850 dark:text-slate-200">${coin.priceUsd.toLocaleString('en-US')} </p>
                    <span className="inline-flex items-center gap-0.5 text-xs font-bold text-emerald-500 mt-1">
                      <Check size={12} />
                      {coin.change24h}%+
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

          {/* Top Volume Card */}
          <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
            <h3 className="text-base font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
              <span className="w-2 h-2 bg-primary rounded-full"></span>
              <span>بیشترین حجم معاملات (۲۴ ساعت اخیر)</span>
            </h3>
            <div className="divide-y divide-slate-100 dark:divide-slate-800">
              {topVolume.map((coin, i) => (
                <Link
                  to={`/coin/${coin.id}`}
                  key={coin.id}
                  className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group/item hover:opacity-85 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-slate-400 dark:text-slate-500 w-4 font-bold">{i + 1}</span>
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-805 overflow-hidden flex items-center justify-center">
                      <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-850 dark:text-slate-200 group-hover/item:text-primary transition-colors">{coin.nameFa}</h4>
                      <p className="text-xs text-slate-400 dark:text-slate-555 mt-0.5">{coin.name}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-bold text-slate-850 dark:text-slate-200">
                      {(coin.volume24hUsd / 1000000).toFixed(1)}M $
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                      قیمت: {coin.priceUsd.toLocaleString('en-US')} $
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </Card>

        </div>

      </div>
    </section>
  );
};
