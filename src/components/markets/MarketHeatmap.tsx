import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Coin } from '../../hooks/useCrypto';
import { Card } from '../common/Card';
import { TrendingUp } from 'lucide-react';

interface MarketHeatmapProps {
  coins: Coin[];
}

export const MarketHeatmap: React.FC<MarketHeatmapProps> = ({ coins }) => {
  const navigate = useNavigate();

  // Sort coins by market cap to determine their relative sizes
  const sortedCoins = [...coins].sort((a, b) => b.marketCapUsd - a.marketCapUsd);
  
  // Total market cap of these coins to compute percentage weight
  const totalWeight = sortedCoins.reduce((sum, c) => sum + c.marketCapUsd, 0);

  return (
    <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
      <div className="flex items-center justify-between mb-6">
        <h3 className="font-bold text-base text-slate-805 dark:text-slate-200 flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <span>نقشه حرارتی بازار رمزارزها (Heatmap)</span>
        </h3>
        <span className="text-[10px] text-slate-400 dark:text-slate-500">مساحت هر خانه نشان‌دهنده سهم ارزش بازار (Market Cap) است</span>
      </div>

      {/* Heatmap Grid Container */}
      <div className="grid grid-cols-12 gap-2 min-h-[340px] md:min-h-[420px]">
        {sortedCoins.map((coin, index) => {
          const isPositive = coin.change24h >= 0;
          const weightPercent = (coin.marketCapUsd / totalWeight) * 100;
          
          // Custom color density based on performance
          let bgColor = 'bg-red-500/10 hover:bg-red-500/20 border-red-500/30';
          let textColor = 'text-red-500';
          
          if (isPositive) {
            if (coin.change24h > 5) {
              bgColor = 'bg-emerald-500/20 hover:bg-emerald-500/30 border-emerald-500/45';
              textColor = 'text-emerald-500';
            } else {
              bgColor = 'bg-emerald-500/10 hover:bg-emerald-500/20 border-emerald-500/30';
              textColor = 'text-emerald-500';
            }
          } else {
            if (coin.change24h < -5) {
              bgColor = 'bg-red-500/20 hover:bg-red-500/30 border-red-500/45';
              textColor = 'text-red-500';
            }
          }

          // Dynamic grid span based on weight
          let colSpan = 'col-span-3';
          let rowSpan = 'h-24';

          if (index === 0) { // Bitcoin
            colSpan = 'col-span-12 md:col-span-6';
            rowSpan = 'h-48 md:h-80';
          } else if (index === 1) { // Ethereum
            colSpan = 'col-span-6 md:col-span-3';
            rowSpan = 'h-32 md:h-80';
          } else if (index === 2) { // Tether
            colSpan = 'col-span-6 md:col-span-3';
            rowSpan = 'h-32 md:h-40';
          } else if (index === 3 || index === 4) {
            colSpan = 'col-span-4 md:col-span-2';
            rowSpan = 'h-24 md:h-36';
          } else {
            colSpan = 'col-span-4 md:col-span-1';
            rowSpan = 'h-20 md:h-36';
          }

          return (
            <div
              key={coin.id}
              onClick={() => navigate(`/coin/${coin.id}`)}
              className={`${colSpan} ${rowSpan} ${bgColor} border rounded-2xl p-4 flex flex-col justify-between transition-all duration-300 cursor-pointer group relative overflow-hidden`}
              title={`${coin.nameFa} (${coin.symbol})`}
            >
              {/* Glossy card overlay */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/5 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-sm md:text-base font-black text-slate-800 dark:text-white group-hover:text-primary transition-colors">
                    {coin.symbol}
                  </span>
                  <span className="hidden sm:block text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                    {coin.nameFa}
                  </span>
                </div>
                
                <span className={`text-xs md:text-sm font-black ${textColor} dir-ltr`}>
                  {isPositive ? '+' : ''}{coin.change24h}%
                </span>
              </div>

              <div className="space-y-0.5 z-10">
                <p className="text-xs md:text-sm font-black text-slate-900 dark:text-white tracking-wide">
                  {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-[9px] font-semibold text-slate-405">تومن</span>
                </p>
                <p className="hidden md:block text-[10px] text-slate-400 dark:text-slate-500">
                  سهم بازار: {weightPercent.toFixed(1)}٪
                </p>
              </div>

              {/* Hover Details overlay for premium desktop feel */}
              <div className="absolute inset-0 bg-[#0F1115]/95 p-3 flex flex-col justify-between opacity-0 group-hover:opacity-100 transition-opacity duration-250 pointer-events-none z-20">
                <div className="space-y-1">
                  <h4 className="text-xs font-black text-white">{coin.nameFa} ({coin.symbol})</h4>
                  <p className="text-[10px] text-slate-400">قیمت: ${coin.priceUsd.toLocaleString('en-US')}</p>
                  <p className="text-[10px] text-slate-400">ارزش بازار: ${coin.marketCapUsd.toLocaleString()}</p>
                  <p className="text-[10px] text-slate-400">حجم معاملات: ${coin.volume24hUsd.toLocaleString()}</p>
                </div>
                <span className="text-[9px] text-primary font-bold text-left self-end">مشاهده جزئیات رمزارز ←</span>
              </div>

            </div>
          );
        })}
      </div>
    </Card>
  );
};
