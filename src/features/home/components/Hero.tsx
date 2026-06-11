import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, ShieldCheck, Zap, Users, ArrowLeftRight } from 'lucide-react';
import { Button } from '../../../components/common/Button';
import { Input } from '../../../components/common/Input';
import { useCrypto } from '../../../hooks/useCrypto';
import { Link } from 'react-router-dom';

export const Hero: React.FC = () => {
  const { coins } = useCrypto();
  const [amountIrt, setAmountIrt] = useState<string>('10000000'); // 10,000,000 Tomans default
  const [selectedCoin, setSelectedCoin] = useState<string>('BTC');
  const [estimatedCoinAmount, setEstimatedCoinAmount] = useState<number>(0);

  const activeCoins = coins.filter(c => ['BTC', 'ETH', 'USDT', 'SOL'].includes(c.symbol));

  useEffect(() => {
    const coin = coins.find(c => c.symbol === selectedCoin);
    const irt = parseFloat(amountIrt);
    if (coin && !isNaN(irt) && irt > 0) {
      const result = irt / coin.priceIrt;
      setEstimatedCoinAmount(Number(result.toFixed(selectedCoin === 'BTC' ? 6 : 4)));
    } else {
      setEstimatedCoinAmount(0);
    }
  }, [amountIrt, selectedCoin, coins]);

  return (
    <section className="relative pt-32 pb-20 lg:pt-40 lg:pb-28 overflow-hidden bg-gradient-to-b from-slate-50 to-white dark:from-bg-dark dark:to-bg-dark">
      {/* Background Neon Blobs */}
      <div className="absolute top-1/4 right-[-10%] w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 left-[-10%] w-96 h-96 rounded-full bg-amber-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Premium Content */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-right">
            
            {/* Tagline Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary"
            >
              <Zap size={12} className="animate-pulse" />
              <span>پیشرفته‌ترین پلتفرم خرید و فروش رمزارز در ایران</span>
            </motion.div>

            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-black leading-tight text-slate-900 dark:text-white"
            >
              دنیای دارایی‌های دیجیتال <br className="hidden sm:inline" />
              در کنترل کامل <span className="text-primary bg-gradient-to-r from-primary to-amber-400 bg-clip-text text-transparent">امن و آسان</span> شما
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-500 dark:text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0"
            >
              با صرافی زرین‌اکس، رمزارزهای محبوب خود را با کمترین کارمزد، بالاترین نقدینگی و در محیطی امن و کاملاً منطبق بر استانداردهای روز بین‌المللی مبادله کنید.
            </motion.p>

            {/* Call to Actions */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
            >
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto shadow-xl" icon={<ArrowUpRight size={18} />} iconPosition="left">
                  شروع معامله سریع
                </Button>
              </Link>
              <Link to="/markets" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto">
                  مشاهده بازارهای زنده
                </Button>
              </Link>
            </motion.div>

            {/* Stat Highlights */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-3 gap-6 pt-6 border-t border-slate-100 dark:border-border-dark max-w-md mx-auto lg:mx-0"
            >
              <div className="text-center lg:text-right">
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">+۲۰۰ هزار</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">کاربر فعال</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">+۸۰ رمزارز</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">پشتیبانی کامل</p>
              </div>
              <div className="text-center lg:text-right">
                <p className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">۲۴/۷</p>
                <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">پشتیبانی آنلاین</p>
              </div>
            </motion.div>

          </div>

          {/* Right Column: Premium Convert Calculator & Visual Cards */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative">
              {/* Decorative light reflection */}
              <div className="absolute -inset-0.5 bg-gradient-to-tr from-primary to-amber-500 rounded-3xl blur opacity-30 dark:opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
              
              {/* Main Card */}
              <div className="relative bg-white dark:bg-card-dark border border-slate-150 dark:border-border-dark rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-bold text-lg text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <ArrowLeftRight size={18} className="text-primary animate-pulse" />
                    <span>محاسبه‌گر و خرید آسان</span>
                  </h3>
                  <span className="text-xs text-slate-400 dark:text-slate-500">مبادله آنی تتر / تومن</span>
                </div>

                <div className="space-y-4">
                  {/* Amount In (Tomans) */}
                  <Input
                    label="مبلغ پرداختی (تومان)"
                    type="number"
                    value={amountIrt}
                    onChange={(e) => setAmountIrt(e.target.value)}
                    placeholder="مثال: ۱۰,۰۰۰,۰۰۰"
                    className="text-left font-bold text-base tracking-wide"
                    endIcon={
                      <span className="text-xs font-bold text-slate-400 dark:text-slate-500">IRT</span>
                    }
                  />

                  {/* Selector & Result */}
                  <div className="grid grid-cols-2 gap-4">
                    {/* Coin Selector */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1">
                        انتخاب رمزارز
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {activeCoins.map((coin) => (
                          <button
                            key={coin.id}
                            onClick={() => setSelectedCoin(coin.symbol)}
                            className={`px-3 py-2.5 rounded-xl border text-xs font-bold transition-all ${
                              selectedCoin === coin.symbol
                                ? 'bg-primary border-primary text-slate-950 shadow-md shadow-primary/10'
                                : 'bg-slate-50 dark:bg-slate-900 border-slate-100 dark:border-border-dark text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-850'
                            }`}
                          >
                            {coin.symbol}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Calculated Outcome */}
                    <div className="flex flex-col gap-1.5">
                      <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1">
                        مقدار تقریبی دریافتی
                      </label>
                      <div className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-xl text-left font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center justify-between min-h-[46px]">
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 font-normal">
                          {selectedCoin}
                        </span>
                        <span className="tracking-wide">
                          {estimatedCoinAmount.toLocaleString('en-US', {
                            maximumFractionDigits: selectedCoin === 'BTC' ? 6 : 4
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit action */}
                <Link to={`/coin/${selectedCoin === 'BTC' ? 'bitcoin' : selectedCoin === 'ETH' ? 'ethereum' : selectedCoin === 'USDT' ? 'tether' : 'solana'}`} className="block w-full pt-2">
                  <Button variant="primary" size="lg" className="w-full">
                    شروع خرید و معامله {selectedCoin}
                  </Button>
                </Link>

                {/* Realtime rate disclaimer */}
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-2 border-t border-slate-100 dark:border-border-dark">
                  <div className="flex items-center gap-1">
                    <ShieldCheck size={12} className="text-emerald-500" />
                    <span>نرخ‌ها بر اساس نوسان بازار بروز می‌شوند</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users size={12} className="text-primary" />
                    <span>تضمین کمترین کارمزد صرافی</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
