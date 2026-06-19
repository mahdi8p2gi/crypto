import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ArrowDownRight, ArrowLeftRight } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';
import { useCrypto } from '../../../hooks/useCrypto';
import { Link } from 'react-router-dom';

// Utility to render a custom SVG Sparkline
export const Sparkline: React.FC<{ data: number[]; color: string }> = ({ data, color }) => {
  if (data.length === 0) return null;
  const width = 120;
  const height = 40;
  const padding = 2;
  
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min === 0 ? 1 : max - min;

  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * (width - padding * 2) + padding;
    const y = height - ((val - min) / range) * (height - padding * 2) - padding;
    return `${x},${y}`;
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      <polyline
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        points={points.join(' ')}
      />
    </svg>
  );
};

export const PopularCoins: React.FC = () => {
  const { coins } = useCrypto();

  // Show top 6 coins on home page
  const popularCoins = coins.slice(0, 6);

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0C0D10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
          <div className="text-center md:text-right">
            <h2 className="text-3xl font-black text-slate-900 dark:text-white">
              رمزارزهای محبوب بازار
            </h2>
            <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
              قیمت لحظه‌ای رمزارزهای مطرح جهان و امکان خرید آسان در چند ثانیه
            </p>
          </div>
          <Link to="/markets">
            <Button variant="outline" icon={<ArrowUpRight size={16} />} iconPosition="left">
              مشاهده همه بازارها
            </Button>
          </Link>
        </div>

        {/* Desktop Table View (Hidden on Mobile) */}
        <div className="hidden lg:block overflow-hidden bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 font-semibold bg-slate-50/50 dark:bg-slate-900/40">
                <th className="py-5 pr-8">نام رمزارز</th>
                <th className="py-5 px-4">قیمت دلاری</th>
                <th className="py-5 px-4">قیمت تومانی</th>
                <th className="py-5 px-4">تغییرات ۲۴ ساعته</th>
                <th className="py-5 px-4 text-center">نمودار تغییرات</th>
                <th className="py-5 pl-8 text-left">عملیات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-sm">
              {popularCoins.map((coin) => {
                const isPositive = coin.change24h >= 0;
                const changeColor = isPositive ? '#10B981' : '#EF4444'; // Emerald 500 / Red 500

                return (
                  <motion.tr
                    key={coin.id}
                    layoutId={`row-${coin.id}`}
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-900/40 transition-colors group"
                  >
                    {/* Coin Identity */}
                    <td className="py-5 pr-8">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                          <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <Link to={`/coin/${coin.id}`} className="font-bold text-slate-850 dark:text-slate-100 hover:text-primary transition-colors">
                            {coin.nameFa}
                          </Link>
                          <span className="text-xs text-slate-400 dark:text-slate-500 mr-2 font-medium">
                            {coin.symbol}
                          </span>
                          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-normal">
                            {coin.name}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Price USD */}
                    <td className="py-5 px-4 font-bold tracking-wide text-slate-800 dark:text-slate-200">
                      ${coin.priceUsd.toLocaleString('en-US', {
                        minimumFractionDigits: coin.symbol === 'SHIB' ? 8 : 2,
                        maximumFractionDigits: coin.symbol === 'SHIB' ? 8 : 2
                      })}
                    </td>

                    {/* Price IRT */}
                    <td className="py-5 px-4 font-black tracking-wide text-slate-900 dark:text-white">
                      {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-xs font-semibold text-slate-450 dark:text-slate-500">تومان</span>
                    </td>

                    {/* Change 24h */}
                    <td className={`py-5 px-4 font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      <span className="flex items-center gap-1">
                        {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        <span dir="ltr">{coin.change24h}%</span>
                      </span>
                    </td>

                    {/* Sparkline Chart */}
                    <td className="py-5 px-4 flex justify-center items-center">
                      <div className="py-1">
                        <Sparkline data={coin.sparkline} color={changeColor} />
                      </div>
                    </td>

                    {/* Actions */}
                    <td className="py-5 pl-8 text-left">
                      <div className="flex items-center justify-end gap-2.5">
                        <Link to={`/coin/${coin.id}`}>
                          <Button variant="glass" size="sm">خرید و فروش</Button>
                        </Link>
                        <Link to={`/coin/${coin.id}`}>
                          <Button
                            variant="outline"
                            size="sm"
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                            icon={<ArrowLeftRight size={12} />}
                            iconPosition="left"
                          >
                            جزئیات
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile / Tablet Card View (Hidden on Desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:hidden">
          {popularCoins.map((coin) => {
            const isPositive = coin.change24h >= 0;
            const changeColor = isPositive ? '#10B981' : '#EF4444';

            return (
              <Card key={coin.id} variant="default" className="space-y-4 border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
                {/* Identity & Sparkline */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                      <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <Link to={`/coin/${coin.id}`} className="font-bold text-slate-850 dark:text-slate-100 hover:text-primary transition-colors">
                        <h4 className="font-bold">{coin.nameFa}</h4>
                      </Link>
                      <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{coin.name}</p>
                    </div>
                  </div>
                  <Sparkline data={coin.sparkline} color={changeColor} />
                </div>

                {/* Pricing Info */}
                <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-slate-150 dark:border-slate-800 text-xs">
                  <div>
                    <p className="text-slate-400 dark:text-slate-500">قیمت تومانی</p>
                    <p className="font-black text-slate-850 dark:text-white mt-1">
                      {coin.priceIrt.toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                  <div className="text-left">
                    <p className="text-slate-400 dark:text-slate-500">تغییرات ۲۴ ساعته</p>
                    <span className={`inline-flex items-center gap-0.5 font-bold mt-1 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                      <span dir="ltr">{coin.change24h}%</span>
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2.5 pt-1">
                  <Link to={`/coin/${coin.id}`} className="w-full">
                    <Button variant="primary" size="sm" className="w-full">
                      خرید آسان
                    </Button>
                  </Link>
                  <Link to={`/coin/${coin.id}`} className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      مشاهده جزئیات
                    </Button>
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
