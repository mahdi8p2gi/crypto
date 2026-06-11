import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';
import {
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  Bookmark,
  TrendingUp,
  Activity,
  Award,
  Wallet
} from 'lucide-react';
import { useCrypto } from '../hooks/useCrypto';
import { useFavorites } from '../hooks/useFavorites';
import { useRecentlyViewed } from '../hooks/useRecentlyViewed';
import { Button } from '../components/common/Button';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const CoinDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { coins } = useCrypto();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { addRecent } = useRecentlyViewed();

  const [timeframe, setTimeframe] = useState<'24h' | '7d' | '30d'>('24h');
  const [amountIrt, setAmountIrt] = useState('5000000');
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [tradeSuccess, setTradeSuccess] = useState(false);

  // Find the selected coin
  const coin = coins.find((c) => c.id === id);

  // Add this coin to recently viewed list on mount
  useEffect(() => {
    if (coin) {
      addRecent(coin.id);
    }
  }, [coin, addRecent]);

  if (!coin) {
    return (
      <div className="min-h-screen pt-28 pb-20 flex flex-col items-center justify-center text-center px-4 bg-slate-50 dark:bg-bg-dark">
        <h2 className="text-2xl font-black text-slate-800 dark:text-white">رمزارز مورد نظر یافت نشد!</h2>
        <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
          ممکن است آدرس را اشتباه وارد کرده باشید یا این رمزارز پشتیبانی نشود.
        </p>
        <Link to="/markets" className="mt-6 cursor-pointer">
          <Button variant="primary" className="cursor-pointer">بازگشت به بازارها</Button>
        </Link>
      </div>
    );
  }

  const isFav = isFavorite(coin.id);
  const isPositive = coin.change24h >= 0;
  const chartColor = isPositive ? '#10B981' : '#EF4444';

  const getChartData = () => {
    switch (timeframe) {
      case '7d':
        return coin.history7d;
      case '30d':
        return coin.history30d;
      default:
        return coin.history24h;
    }
  };

  const chartData = getChartData();

  // Instant Calculator
  const estimatedCrypto = Number((parseFloat(amountIrt) / coin.priceIrt || 0).toFixed(coin.symbol === 'BTC' ? 6 : 4));

  const handleQuickTrade = (e: React.FormEvent) => {
    e.preventDefault();
    const user = localStorage.getItem('zarrinex_user');
    if (!user) {
      navigate('/login');
      return;
    }
    setTradeSuccess(true);
    setTimeout(() => {
      setTradeSuccess(false);
    }, 2500);
  };

  const supplyPercentage = coin.maxSupply ? (coin.circulatingSupply / coin.maxSupply) * 100 : null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation & Quick Stats */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
          <Link
            to="/markets"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-550 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
          >
            <ArrowRight size={14} />
            <span>بازگشت به لیست بازارها</span>
          </Link>
          
          <button
            onClick={() => toggleFavorite(coin.id)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-xs font-bold transition-all cursor-pointer ${
              isFav
                ? 'bg-primary/15 border-primary/30 text-amber-600 dark:text-primary'
                : 'bg-white dark:bg-[#13161D] border-slate-250 dark:border-slate-800 text-slate-550 dark:text-slate-400 hover:bg-slate-50'
            }`}
          >
            {isFav ? <BookmarkCheck size={14} /> : <Bookmark size={14} />}
            <span>{isFav ? 'علاقه‌مندی‌ها (ذخیره شده)' : 'افزودن به علاقه‌مندی‌ها'}</span>
          </button>
        </div>

        {/* Header Hero Stats Block */}
        <ScrollReveal direction="none" duration={0.4}>
          <div className="bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              
              {/* Coin Identity */}
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-tr from-primary to-amber-500 rounded-2xl flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-primary/10 select-none">
                  {coin.symbol}
                </div>
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    <h1 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
                      {coin.nameFa}
                    </h1>
                    <span className="text-xs font-bold text-slate-400 dark:text-slate-550 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-2.5 py-1 rounded-lg">
                      {coin.symbol}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium uppercase">
                    {coin.name} / Tether
                  </p>
                </div>
              </div>

              {/* Price Columns */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 lg:gap-12">
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">قیمت تومانی</span>
                  <p className="text-2xl font-black text-slate-900 dark:text-white mt-1.5 tracking-wide">
                    {coin.priceIrt.toLocaleString('fa-IR')}{' '}
                    <span className="text-xs font-semibold text-slate-450">تومان</span>
                  </p>
                </div>
                
                <div>
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">قیمت دلاری</span>
                  <p className="text-xl font-extrabold text-slate-800 dark:text-slate-200 mt-1.5 tracking-wide">
                    ${coin.priceUsd.toLocaleString('en-US', {
                      minimumFractionDigits: coin.symbol === 'SHIB' ? 8 : 2
                    })}
                  </p>
                </div>

                <div className="col-span-2 sm:col-span-1">
                  <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 block">تغییرات ۲۴ ساعته</span>
                  <span className={`inline-flex items-center gap-1 text-sm font-black mt-2 ${
                    isPositive ? 'text-emerald-500' : 'text-red-500'
                  }`}>
                    {isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    <span dir="ltr">{coin.change24h}%</span>
                  </span>
                </div>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Main Section Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left / Middle: Chart & About (8 Cols) */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Recharts Chart Card */}
            <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
                <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 flex items-center gap-2">
                  <TrendingUp size={18} className="text-primary" />
                  <span>نمودار تحلیل قیمت دلاری</span>
                </h3>

                {/* Timeframe Selectors */}
                <div className="flex items-center gap-1.5 p-1 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-xl">
                  {(['24h', '7d', '30d'] as const).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTimeframe(t)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold uppercase transition-all cursor-pointer ${
                        timeframe === t
                          ? 'bg-primary text-slate-950 shadow-sm font-extrabold'
                          : 'text-slate-500 dark:text-slate-400 hover:bg-slate-150/50 dark:hover:bg-slate-800'
                      }`}
                    >
                      {t === '24h' ? '۲۴ ساعت' : t === '7d' ? '۷ روز' : '۳۰ روز'}
                    </button>
                  ))}
                </div>
              </div>

              {/* Chart Container */}
              <div className="h-[340px] w-full" dir="ltr">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -15, bottom: 0 }}>
                    <defs>
                      <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={chartColor} stopOpacity={0.25} />
                        <stop offset="95%" stopColor={chartColor} stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" className="opacity-40 dark:opacity-10" />
                    <XAxis
                      dataKey="time"
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke="#94A3B8"
                      fontSize={10}
                      tickLine={false}
                      axisLine={false}
                      domain={['auto', 'auto']}
                      tickFormatter={(val) => `$${val.toLocaleString('en-US')}`}
                    />
                    <Tooltip
                      contentStyle={{
                        background: 'rgba(23, 27, 34, 0.95)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: '12px',
                        fontSize: '12px',
                        color: '#FFF',
                        textAlign: 'right'
                      }}
                      formatter={(value: any) => [`$${parseFloat(value).toLocaleString('en-US')}`, 'قیمت']}
                    />
                    <Area
                      type="monotone"
                      dataKey="price"
                      stroke={chartColor}
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#chartGrad)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </Card>

            {/* Supply & Market Stats Card */}
            <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
                <Activity size={18} className="text-primary" />
                <span>اطلاعات تکمیلی و آماری بازار</span>
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Column 1: Market cap & Volume */}
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-850 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">ارزش کل بازار (Market Cap)</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200">
                      ${coin.marketCapUsd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-850 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">حجم معاملات ۲۴ ساعته</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200">
                      ${coin.volume24hUsd.toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-850 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">پایین‌ترین / بالاترین قیمت ۲۴ساعت</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200" dir="ltr">
                      ${coin.low24h.toLocaleString()} - ${coin.high24h.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Column 2: Supply Info */}
                <div className="space-y-4">
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-850 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">عرضه در گردش (Circulating Supply)</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200">
                      {coin.circulatingSupply.toLocaleString()} {coin.symbol}
                    </span>
                  </div>
                  <div className="flex justify-between py-2 border-b border-slate-100 dark:border-slate-850 text-xs">
                    <span className="text-slate-400 dark:text-slate-500 font-medium">حداکثر عرضه قابل استخراج</span>
                    <span className="font-bold text-slate-805 dark:text-slate-200">
                      {coin.maxSupply ? `${coin.maxSupply.toLocaleString()} ${coin.symbol}` : 'نامحدود'}
                    </span>
                  </div>

                  {/* Supply Progress Bar */}
                  {supplyPercentage && (
                    <div className="space-y-1.5">
                      <div className="flex justify-between text-[10px] text-slate-400 dark:text-slate-500">
                        <span>درصد عرضه شده تا کنون</span>
                        <span className="font-bold">{supplyPercentage.toFixed(1)}٪</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-amber-500 rounded-full"
                          style={{ width: `${supplyPercentage}%` }}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Description Section */}
            <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D]">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-200 mb-4 flex items-center gap-2">
                <Award size={18} className="text-primary" />
                <span>درباره رمزارز {coin.nameFa}</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-550 dark:text-slate-400 leading-relaxed text-justify">
                {coin.descriptionFa}
              </p>
            </Card>

          </div>

          {/* Right: OTC Quick Converter (4 Cols) */}
          <div className="lg:col-span-4">
            <Card variant="default" padding="lg" className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D] sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200">خرید و فروش آسان {coin.symbol}</h3>
                <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800">
                  <button
                    onClick={() => setTradeType('buy')}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                      tradeType === 'buy' ? 'bg-emerald-500 text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    خرید
                  </button>
                  <button
                    onClick={() => setTradeType('sell')}
                    className={`px-2.5 py-1 rounded-md text-[10px] font-extrabold transition-all cursor-pointer ${
                      tradeType === 'sell' ? 'bg-red-500 text-white' : 'text-slate-500 dark:text-slate-400'
                    }`}
                  >
                    فروش
                  </button>
                </div>
              </div>

              {tradeSuccess ? (
                <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
                  <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                    <BookmarkCheck size={28} />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">سفارش ثبت شد!</h4>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 leading-relaxed max-w-[200px]">
                    معامله با موفقیت انجام شد و دارایی جدید بلافاصله به کیف پول شما واریز گردید.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleQuickTrade} className="space-y-4">
                  {/* Amount IRT */}
                  <Input
                    label="پرداخت می‌کنید (تومان)"
                    type="number"
                    value={amountIrt}
                    onChange={(e) => setAmountIrt(e.target.value)}
                    placeholder="مثال: ۵,۰۰۰,۰۰۰"
                    className="text-left font-bold text-sm cursor-text"
                    endIcon={<span className="text-xs font-semibold text-slate-400">IRT</span>}
                  />

                  {/* Calculated crypto */}
                  <div className="space-y-1">
                    <span className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1 block">دریافت تقریبی شما</span>
                    <div className="w-full px-4 py-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl font-bold text-sm text-slate-850 dark:text-white text-left flex justify-between items-center min-h-[46px] select-all">
                      <span className="text-xs text-slate-400 font-normal">{coin.symbol}</span>
                      <span>{estimatedCrypto.toLocaleString('en-US')}</span>
                    </div>
                  </div>

                  {/* Fees details */}
                  <div className="space-y-2 py-3 border-t border-b border-slate-150 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
                    <div className="flex justify-between">
                      <span>نرخ تبدیل تقریبی:</span>
                      <span className="font-bold">{coin.priceIrt.toLocaleString('fa-IR')} تومان</span>
                    </div>
                    <div className="flex justify-between">
                      <span>کارمزد معامله (۰.۲۵٪):</span>
                      <span className="font-bold">{(parseFloat(amountIrt) * 0.0025 || 0).toLocaleString('fa-IR')} تومان</span>
                    </div>
                  </div>

                  {/* Submit */}
                  <Button
                    type="submit"
                    variant={tradeType === 'buy' ? 'primary' : 'danger'}
                    size="lg"
                    className="w-full text-slate-950 cursor-pointer"
                  >
                    {tradeType === 'buy' ? 'خرید آنی' : 'فروش آنی'} {coin.symbol}
                  </Button>

                  <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500">
                    <Wallet size={12} className="text-primary" />
                    <span>تضمین کمترین کارمزد مبادلات آنی</span>
                  </div>

                </form>
              )}
            </Card>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
const BookmarkCheck = ({ size }: { size: number }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="lucide lucide-bookmark-check text-emerald-500"
  >
    <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2Z" />
    <path d="m9 10 2 2 4-4" />
  </svg>
);
