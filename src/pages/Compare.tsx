import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Scale, ArrowUpRight, ArrowDownRight, X, AlertCircle, Sparkles } from 'lucide-react';
import { useCrypto, Coin } from '../hooks/useCrypto';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Sparkline } from '../features/home/components/PopularCoins';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Compare: React.FC = () => {
  const { coins } = useCrypto();
  const [selectedIds, setSelectedIds] = useState<string[]>(['bitcoin', 'ethereum']); // Defaults

  const toggleSelectCoin = (id: string) => {
    setSelectedIds((prev) => {
      if (prev.includes(id)) {
        // Keep at least one coin
        if (prev.length === 1) return prev;
        return prev.filter((item) => item !== id);
      }
      if (prev.length >= 3) {
        return [...prev.slice(1), id]; // Replace oldest to keep max 3
      }
      return [...prev, id];
    });
  };

  const selectedCoins = selectedIds
    .map((id) => coins.find((c) => c.id === id))
    .filter((c): c is Coin => !!c);

  const availableCoins = coins.filter((c) => !selectedIds.includes(c.id));

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="mb-10 text-center md:text-right flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary mb-3">
              <Scale size={12} className="text-primary" />
              <span>مقایسه تخصصی دارایی‌ها</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              مقایسه رمزارزها (Side-by-Side Comparison)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              تا ۳ رمزارز مختلف را انتخاب کنید و قیمت، حجم معاملات، ارزش بازار و روندهای هفتگی آن‌ها را مستقیماً با یکدیگر مقایسه کنید.
            </p>
          </div>
        </div>

        {/* Selection panel */}
        <ScrollReveal direction="up" duration={0.4} className="mb-8">
          <Card variant="default" padding="md" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
            <h3 className="text-xs font-bold text-slate-400 dark:text-slate-500 mb-4">رمزارزها را جهت مقایسه انتخاب کنید (حداکثر ۳ رمزارز):</h3>
            
            <div className="flex flex-wrap gap-2.5">
              {coins.map((coin) => {
                const isSelected = selectedIds.includes(coin.id);
                return (
                  <button
                    key={coin.id}
                    onClick={() => toggleSelectCoin(coin.id)}
                    className={`px-4 py-2.5 rounded-2xl text-xs font-black transition-all border flex items-center gap-2 cursor-pointer ${
                      isSelected
                        ? 'bg-primary border-primary text-slate-950 shadow-md shadow-primary/15'
                        : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-100'
                    }`}
                  >
                    <span>{coin.nameFa}</span>
                    <span className="text-[10px] opacity-60">({coin.symbol})</span>
                    {isSelected && <X size={12} className="shrink-0" />}
                  </button>
                );
              })}
            </div>
          </Card>
        </ScrollReveal>

        {/* Comparison Matrix Table */}
        <div className="overflow-x-auto bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 font-bold bg-slate-50/50 dark:bg-slate-900/40">
                <th className="py-5 pr-8 w-1/4">ویژگی / شاخص</th>
                {selectedCoins.map((coin) => (
                  <th key={coin.id} className="py-5 px-6 text-center w-1/4">
                    <div className="flex flex-col items-center gap-2">
                      <div className="w-10 h-10 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 flex items-center justify-center font-black text-sm text-slate-800 dark:text-slate-200">
                        {coin.symbol}
                      </div>
                      <div>
                        <span className="block font-black text-sm text-slate-850 dark:text-white">{coin.nameFa}</span>
                        <span className="block text-[10px] text-slate-400 uppercase">{coin.symbol}</span>
                      </div>
                    </div>
                  </th>
                ))}
                {/* Empty columns if comparing less than 3 */}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <th key={`empty-th-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 text-xs font-semibold w-1/4">
                    <div className="border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl py-6 flex flex-col items-center justify-center gap-1">
                      <AlertCircle size={18} />
                      <span>خالی</span>
                    </div>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-150 dark:divide-slate-800 text-xs sm:text-sm">
              
              {/* Row 1: Price IRT */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">قیمت تومانی</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center font-black text-base text-slate-900 dark:text-white">
                    {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-xs font-normal">تومان</span>
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-price-irt-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 2: Price USD */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">قیمت دلاری</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center font-bold text-slate-800 dark:text-slate-200">
                    ${coin.priceUsd.toLocaleString('en-US', {
                      minimumFractionDigits: coin.symbol === 'SHIB' ? 8 : 2
                    })}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-price-usd-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 3: 24h Change */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">تغییرات ۲۴ ساعته</td>
                {selectedCoins.map((coin) => {
                  const isPositive = coin.change24h >= 0;
                  return (
                    <td key={coin.id} className={`py-5 px-6 text-center font-black ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                      <span className="inline-flex items-center gap-0.5" dir="ltr">
                        {isPositive ? '+' : ''}{coin.change24h}%
                      </span>
                    </td>
                  );
                })}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-change-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 4: 24h High/Low */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">کمترین / بیشترین ۲۴ ساعت</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center text-slate-800 dark:text-slate-250 font-semibold" dir="ltr">
                    ${coin.low24h.toLocaleString()} - ${coin.high24h.toLocaleString()}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-highlow-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 5: Market Cap */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">ارزش کل بازار (Market Cap)</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center text-slate-800 dark:text-slate-200 font-bold">
                    ${coin.marketCapUsd.toLocaleString()}
                    <span className="block text-[10px] text-slate-405 mt-1">
                      {Math.round(coin.marketCapUsd * 60000 / 1000000000000).toLocaleString('fa-IR')} هزار میلیارد تومان
                    </span>
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-mcap-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 6: Volume */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">حجم معاملات ۲۴ ساعته</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center text-slate-800 dark:text-slate-200 font-bold">
                    ${coin.volume24hUsd.toLocaleString()}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-volume-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 7: Circulating Supply */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">عرضه در گردش</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6 text-center text-slate-800 dark:text-slate-250">
                    {coin.circulatingSupply.toLocaleString()} {coin.symbol}
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-supply-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 8: Sparkline Trend */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">نمودار نوسان ۷ روزه</td>
                {selectedCoins.map((coin) => {
                  const isPositive = coin.change24h >= 0;
                  const changeColor = isPositive ? '#10B981' : '#EF4444';
                  return (
                    <td key={coin.id} className="py-5 px-6">
                      <div className="flex justify-center items-center scale-90">
                        <Sparkline data={coin.sparkline} color={changeColor} />
                      </div>
                    </td>
                  );
                })}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-sparkline-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

              {/* Row 9: Actions */}
              <tr>
                <td className="py-5 pr-8 font-black text-slate-500 dark:text-slate-400">عملیات</td>
                {selectedCoins.map((coin) => (
                  <td key={coin.id} className="py-5 px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-2">
                      <Link to={`/coin/${coin.id}`} className="w-full sm:w-auto">
                        <Button variant="primary" size="sm" className="w-full text-slate-950 cursor-pointer">جزئیات</Button>
                      </Link>
                      <button
                        onClick={() => toggleSelectCoin(coin.id)}
                        className="px-3 py-1.5 border border-red-500/30 text-red-500 rounded-xl text-xs font-bold hover:bg-red-50 dark:hover:bg-red-950/20 transition-all cursor-pointer"
                      >
                        حذف
                      </button>
                    </div>
                  </td>
                ))}
                {Array.from({ length: 3 - selectedCoins.length }).map((_, i) => (
                  <td key={`empty-actions-${i}`} className="py-5 px-6 text-center text-slate-350 dark:text-slate-600 font-medium">-</td>
                ))}
              </tr>

            </tbody>
          </table>
        </div>

      </div>
    </motion.div>
  );
};
