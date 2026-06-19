import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Star, Trash2, ArrowUpRight, ArrowDownRight, ArrowLeftRight, Bell, HelpCircle } from 'lucide-react';
import { useCrypto } from '../hooks/useCrypto';
import { useFavorites } from '../hooks/useFavorites';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Sparkline } from '../features/home/components/PopularCoins';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Watchlist: React.FC = () => {
  const { coins } = useCrypto();
  const { favorites, toggleFavorite } = useFavorites();
  
  const [alertSuccess, setAlertSuccess] = useState(false);
  const [selectedCoinForAlert, setSelectedCoinForAlert] = useState<string | null>(null);

  const watchedCoins = coins.filter((coin) => favorites.includes(coin.id));

  const handleSetAlert = (coinName: string) => {
    setSelectedCoinForAlert(coinName);
    setAlertSuccess(true);
    setTimeout(() => {
      setAlertSuccess(false);
      setSelectedCoinForAlert(null);
    }, 3000);
  };

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
              <Star size={12} className="fill-primary text-primary" />
              <span>دیده‌بان اختصاصی شما</span>
            </div>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white">
              لیست علاقه‌مندی‌ها (Watchlist)
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              رمزارزهای منتخب خود را در یک نگاه رصد کنید، هشدارهای تغییر قیمت بسازید و سریع‌تر معامله کنید.
            </p>
          </div>
        </div>

        {alertSuccess && selectedCoinForAlert && (
          <ScrollReveal direction="none" duration={0.3}>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs flex items-center gap-2.5 font-bold mb-8">
              <Bell size={16} className="animate-bounce" />
              <span>هشدار قیمت برای {selectedCoinForAlert} با موفقیت فعال شد. در صورت نوسان شدید به شما اطلاع داده می‌شود!</span>
            </div>
          </ScrollReveal>
        )}

        {/* List Grid */}
        {watchedCoins.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {watchedCoins.map((coin) => {
              const isPositive = coin.change24h >= 0;
              const changeColor = isPositive ? '#10B981' : '#EF4444';

              return (
                <Card
                  key={coin.id}
                  variant="default"
                  hoverEffect={true}
                  className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D] p-6 flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    {/* Top Row: Logo, Name & Star toggle */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                          <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                        </div>
                        <div>
                          <Link to={`/coin/${coin.id}`} className="font-bold text-slate-850 dark:text-slate-100 hover:text-primary transition-colors block">
                            {coin.nameFa}
                          </Link>
                          <span className="text-xs text-slate-400 dark:text-slate-500 uppercase">{coin.symbol}</span>
                        </div>
                      </div>

                      <button
                        onClick={() => toggleFavorite(coin.id)}
                        className="p-2 text-red-550 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-xl transition-colors cursor-pointer"
                        title="حذف از لیست"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>

                    {/* Price & Change */}
                    <div className="grid grid-cols-2 gap-4 py-2 border-t border-b border-slate-150 dark:border-slate-800 text-xs">
                      <div>
                        <p className="text-slate-400 dark:text-slate-500">قیمت تومانی</p>
                        <p className="font-black text-slate-850 dark:text-white mt-1 text-base">
                          {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-[10px] font-normal">تومن</span>
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-550 mt-0.5">
                          ${coin.priceUsd.toLocaleString('en-US')}
                        </p>
                      </div>
                      <div className="text-left">
                        <p className="text-slate-400 dark:text-slate-500">تغییرات ۲۴ ساعته</p>
                        <span className={`inline-flex items-center gap-0.5 font-black mt-2 ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          <span dir="ltr">{coin.change24h}%</span>
                        </span>
                      </div>
                    </div>

                    {/* Sparkline Visualizer */}
                    <div className="flex items-center justify-between py-2">
                      <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold">روند تغییرات ۲۴ ساعته</span>
                      <div className="scale-95 -mr-2">
                        <Sparkline data={coin.sparkline} color={changeColor} />
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-2 gap-3 pt-4 border-t border-slate-150 dark:border-slate-800 mt-4">
                    <Link to={`/coin/${coin.id}`} className="w-full">
                      <Button variant="primary" size="sm" className="w-full text-slate-950" icon={<ArrowLeftRight size={12} />} iconPosition="left">
                        معامله سریع
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full"
                      icon={<Bell size={12} />}
                      iconPosition="left"
                      onClick={() => handleSetAlert(coin.nameFa)}
                    >
                      هشدار قیمت
                    </Button>
                  </div>

                </Card>
              );
            })}
          </div>
        ) : (
          <ScrollReveal direction="none" duration={0.4}>
            <div className="max-w-md mx-auto text-center py-16 px-4 bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-3xl space-y-6 shadow-sm">
              <div className="w-16 h-16 bg-slate-50 dark:bg-slate-900 border border-slate-150 dark:border-slate-800 text-slate-450 dark:text-slate-500 rounded-full flex items-center justify-center mx-auto">
                <HelpCircle size={32} />
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">لیست علاقه‌مندی‌های شما خالی است!</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                  با مراجعه به صفحه بازارها و کلیک بر روی آیکون ستاره در کنار نام رمزارزها، آن‌ها را به لیست دیده‌بان اختصاصی خود اضافه کنید.
                </p>
              </div>
              <Link to="/markets" className="inline-block">
                <Button variant="primary">مشاهده بازارهای رمزارز</Button>
              </Link>
            </div>
          </ScrollReveal>
        )}

      </div>
    </motion.div>
  );
};
