import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  Wallet,
  ArrowUpRight,
  ArrowDownRight,
  History,
  Star,
  Zap,
  CheckCircle2,
  Lock,
  Plus,
  ArrowDownLeft
} from 'lucide-react';
import { useCrypto } from '../hooks/useCrypto';
import { useFavorites } from '../hooks/useFavorites';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';
import { AnimatedNumber } from '../components/common/AnimatedNumber';
import { Modal } from '../components/common/Modal';
import { Input } from '../components/common/Input';

interface ActivityItem {
  id: string;
  type: 'خرید' | 'فروش' | 'واریز' | 'برداشت';
  coin: string;
  amount: string;
  valueIrt: number;
  date: string;
  status: 'موفق' | 'درحال بررسی' | 'ناموفق';
}

const MOCK_ACTIVITY: ActivityItem[] = [
  { id: '1', type: 'خرید', coin: 'BTC', amount: '۰.۰۱۵', valueIrt: 84825000, date: 'امروز، ۱۲:۳۰', status: 'موفق' },
  { id: '2', type: 'واریز', coin: 'تومان', amount: '۵۰,۰۰۰,۰۰۰', valueIrt: 50000000, date: 'دیروز، ۱۵:۴۵', status: 'موفق' },
  { id: '3', type: 'فروش', coin: 'ETH', amount: '۱.۲', valueIrt: 224676000, date: '۳ روز پیش', status: 'موفق' },
  { id: '4', type: 'برداشت', coin: 'USDT', amount: '۵۰۰', valueIrt: 30000000, date: '۵ روز پیش', status: 'موفق' }
];

export const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const { coins, tomanRate } = useCrypto();
  const { favorites } = useFavorites();
  
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [walletBalance, setWalletBalance] = useState<number>(48500000); // 48,500,000 Tomans default
  
  // Deposit & Withdraw Modal States
  const [isDepositOpen, setIsDepositOpen] = useState(false);
  const [isWithdrawOpen, setIsWithdrawOpen] = useState(false);
  const [amountInput, setAmountInput] = useState('');
  const [transactionSuccess, setTransactionSuccess] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('zarrinex_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // If not logged in, redirect to login page
      navigate('/login');
    }
  }, [navigate]);

  if (!user) return null;

  // Find user's favorite coins
  const favoriteCoins = coins.filter((c) => favorites.includes(c.id));

  const handleDeposit = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setWalletBalance((prev) => prev + amount);
      setTransactionSuccess(true);
      setTimeout(() => {
        setIsDepositOpen(false);
        setTransactionSuccess(false);
        setAmountInput('');
      }, 2000);
    }
  };

  const handleWithdraw = (e: React.FormEvent) => {
    e.preventDefault();
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0 && amount <= walletBalance) {
      setWalletBalance((prev) => prev - amount);
      setTransactionSuccess(true);
      setTimeout(() => {
        setIsWithdrawOpen(false);
        setTransactionSuccess(false);
        setAmountInput('');
      }, 2000);
    }
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
        
        {/* Welcome & Security Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          
          {/* Welcome Card (8 Cols) */}
          <div className="lg:col-span-8">
            <ScrollReveal direction="none" duration={0.4}>
              <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 dark:from-[#13161D] dark:to-[#0A0B0E] border border-slate-800 rounded-3xl p-6 sm:p-8 text-white overflow-hidden shadow-xl">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-primary to-transparent" />
                <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-primary to-transparent" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-primary/5 blur-[90px] pointer-events-none" />

                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2.5">
                      <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center text-primary font-black text-lg">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-xl sm:text-2xl font-black text-white">
                          خوش آمدید، {user.name} عزیز!
                        </h2>
                        <p className="text-[11px] text-slate-400 mt-0.5">پست الکترونیک: {user.email}</p>
                      </div>
                    </div>
                    
                    {/* Verification & Protection Badges */}
                    <div className="flex flex-wrap gap-2.5 pt-2">
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-lg text-[10px] font-semibold">
                        <CheckCircle2 size={12} />
                        <span>احراز هویت سطح ۲ (تایید شده)</span>
                      </span>
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-primary/10 border border-primary/20 text-primary rounded-lg text-[10px] font-semibold">
                        <Zap size={12} />
                        <span>پورتفوی فعال و پرسرعت</span>
                      </span>
                    </div>
                  </div>

                  {/* Settings link */}
                  <Link to="/profile">
                    <Button variant="outline" size="sm" className="border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white">
                      ویرایش پروفایل و امنیت
                    </Button>
                  </Link>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Account Security Summary Card (4 Cols) */}
          <div className="lg:col-span-4">
            <ScrollReveal direction="none" duration={0.4} delay={0.1}>
              <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark h-full flex flex-col justify-between">
                <div className="space-y-3">
                  <h3 className="font-bold text-sm text-slate-800 dark:text-slate-200 flex items-center gap-2">
                    <Lock size={16} className="text-primary" />
                    <span>وضعیت امنیت حساب</span>
                  </h3>
                  <p className="text-[11px] text-slate-405 dark:text-slate-400 leading-relaxed">
                    حساب شما با تایید دو مرحله‌ای (2FA) و سیستم ضد فیشینگ به طور کامل محافظت می‌شود. آخرین ورود شما با آی‌پی ایران بوده است.
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-[10px] text-slate-400 dark:text-slate-500 pt-4 border-t border-slate-100 dark:border-border-dark mt-4">
                  <span>سپر امنیتی زرین‌اکس:</span>
                  <span className="font-bold text-emerald-500">فعال و به‌روز</span>
                </div>
              </Card>
            </ScrollReveal>
          </div>

        </div>

        {/* Wallet Balances Card */}
        <ScrollReveal direction="up" duration={0.4} delay={0.15}>
          <div className="bg-white dark:bg-card-dark border border-slate-150 dark:border-border-dark rounded-3xl p-6 sm:p-8 shadow-sm mb-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              
              {/* Balances */}
              <div className="flex items-center gap-4">
                <div className="p-3.5 bg-primary/10 rounded-2xl text-primary">
                  <Wallet size={28} />
                </div>
                <div className="space-y-1.5">
                  <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">موجودی کل کیف پول ریالی</span>
                  <div className="flex items-baseline gap-2">
                    <h3 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white tracking-wide">
                      <AnimatedNumber value={walletBalance} />
                    </h3>
                    <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">تومان</span>
                  </div>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500">
                    معادل تقریبی:{' '}
                    <span className="font-bold">${(walletBalance / tomanRate).toFixed(2)} USD</span>
                  </p>
                </div>
              </div>

              {/* Deposit/Withdraw CTA Buttons */}
              <div className="flex items-center gap-3 w-full md:w-auto">
                <Button
                  variant="primary"
                  size="md"
                  className="flex-1 md:flex-none shadow-md shadow-primary/10"
                  icon={<Plus size={16} />}
                  iconPosition="left"
                  onClick={() => setIsDepositOpen(true)}
                >
                  واریز ریالی
                </Button>
                <Button
                  variant="outline"
                  size="md"
                  className="flex-1 md:flex-none"
                  icon={<ArrowDownLeft size={16} />}
                  iconPosition="left"
                  onClick={() => setIsWithdrawOpen(true)}
                >
                  برداشت ریالی
                </Button>
              </div>

            </div>
          </div>
        </ScrollReveal>

        {/* Dashboard Grid Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Favorite Coins Panel (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark min-h-[380px] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-805 dark:text-slate-200 mb-6 flex items-center gap-2">
                  <Star size={18} className="text-primary fill-primary" />
                  <span>دیده‌بان علاقه‌مندی‌ها</span>
                </h3>

                {favoriteCoins.length > 0 ? (
                  <div className="divide-y divide-slate-100 dark:divide-border-dark">
                    {favoriteCoins.map((coin) => {
                      const isPositive = coin.change24h >= 0;
                      return (
                        <div key={coin.id} className="flex items-center justify-between py-3.5 first:pt-0 last:pb-0">
                          <div className="flex items-center gap-3">
                            <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-200">
                              {coin.symbol}
                            </div>
                            <div>
                              <Link to={`/coin/${coin.id}`} className="font-bold text-sm text-slate-800 dark:text-slate-100 hover:text-primary transition-colors">
                                {coin.nameFa}
                              </Link>
                              <span className="text-[10px] text-slate-400 dark:text-slate-500 mr-2 uppercase">{coin.symbol}</span>
                            </div>
                          </div>
                          <div className="text-left">
                            <p className="text-sm font-black text-slate-850 dark:text-white">
                              {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-[10px] font-semibold text-slate-400">تومن</span>
                            </p>
                            <span className={`inline-flex items-center gap-0.5 text-xs font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'} mt-0.5`}>
                              {isPositive ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                              <span dir="ltr">{coin.change24h}%</span>
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-center py-12 text-slate-400 dark:text-slate-500 space-y-2">
                    <p className="text-sm">هیچ رمزارزی در لیست علاقه‌مندی‌های شما وجود ندارد.</p>
                    <p className="text-xs">با کلیک روی آیکون ستاره در صفحه بازارها، رمزارزهای محبوب خود را به این بخش اضافه کنید.</p>
                    <div className="pt-4">
                      <Link to="/markets">
                        <Button variant="outline" size="sm">برو به بازارها</Button>
                      </Link>
                    </div>
                  </div>
                )}
              </div>

              {favoriteCoins.length > 0 && (
                <div className="pt-4 border-t border-slate-100 dark:border-border-dark text-left">
                  <Link to="/markets" className="text-xs font-bold text-primary hover:underline">
                    مدیریت و مشاهده تمام رمزارزها ←
                  </Link>
                </div>
              )}
            </Card>
          </div>

          {/* Recent Activity Timeline (6 Cols) */}
          <div className="lg:col-span-6 space-y-6">
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark min-h-[380px] flex flex-col justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-805 dark:text-slate-200 mb-6 flex items-center gap-2">
                  <History size={18} className="text-primary" />
                  <span>تاریخچه فعالیت‌های اخیر</span>
                </h3>

                <div className="space-y-4">
                  {MOCK_ACTIVITY.map((activity) => (
                    <div key={activity.id} className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900/40 border border-slate-100 dark:border-border-dark rounded-2xl text-xs">
                      <div className="flex items-center gap-3">
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold ${
                          activity.type === 'خرید' || activity.type === 'واریز'
                            ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                            : 'bg-red-500/10 text-red-500'
                        }`}>
                          {activity.type.charAt(0)}
                        </div>
                        <div>
                          <span className="font-bold text-slate-800 dark:text-slate-250">
                            {activity.type} {activity.coin}
                          </span>
                          <p className="text-[10px] text-slate-400 dark:text-slate-550 mt-0.5">{activity.date}</p>
                        </div>
                      </div>

                      <div className="text-left">
                        <span className="font-bold block text-slate-800 dark:text-white">
                          {activity.amount} {activity.coin !== 'تومان' ? activity.coin : ''}
                        </span>
                        <span className="text-[10px] text-slate-400 dark:text-slate-500 block mt-0.5">
                          {activity.valueIrt.toLocaleString('fa-IR')} تومان
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-border-dark text-left">
                <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">
                  نمایش ۱۰ تراکنش آخر
                </span>
              </div>
            </Card>
          </div>

        </div>

      </div>

      {/* Deposit Modal */}
      <Modal isOpen={isDepositOpen} onClose={() => setIsDepositOpen(false)} title="واریز ریالی به کیف پول">
        {transactionSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">واریز با موفقیت انجام شد!</h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-550 leading-relaxed max-w-[200px]">
              مبلغ مورد نظر به موجودی کیف پول ریالی شما اضافه شد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleDeposit} className="space-y-4">
            <Input
              label="مبلغ واریزی (تومان)"
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder="مثال: ۵,۰۰۰,۰۰۰"
              className="text-left font-bold"
              endIcon={<span className="text-xs font-bold text-slate-400">IRT</span>}
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
              واریز ریالی از طریق درگاه پرداخت شتاب و با کلیه کارت‌های بانکی عضو شتاب تحت نام شما امکان‌پذیر است.
            </p>
            <Button type="submit" variant="primary" size="md" className="w-full text-slate-950">
              اتصال به درگاه بانکی
            </Button>
          </form>
        )}
      </Modal>

      {/* Withdraw Modal */}
      <Modal isOpen={isWithdrawOpen} onClose={() => setIsWithdrawOpen(false)} title="برداشت ریالی از کیف پول">
        {transactionSuccess ? (
          <div className="flex flex-col items-center justify-center py-6 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
              <CheckCircle2 size={28} />
            </div>
            <h4 className="text-sm font-bold text-slate-800 dark:text-white">برداشت با موفقیت ثبت شد!</h4>
            <p className="text-[11px] text-slate-400 dark:text-slate-550 leading-relaxed max-w-[200px]">
              درخواست برداشت شما ثبت گردید و در اولین چرخه پایا به حساب بانکی واریز خواهد شد.
            </p>
          </div>
        ) : (
          <form onSubmit={handleWithdraw} className="space-y-4">
            <Input
              label="مبلغ برداشت (تومان)"
              type="number"
              value={amountInput}
              onChange={(e) => setAmountInput(e.target.value)}
              placeholder={`حداکثر: ${walletBalance.toLocaleString()}`}
              className="text-left font-bold"
              error={parseFloat(amountInput) > walletBalance ? 'موجودی کافی نیست.' : undefined}
              endIcon={<span className="text-xs font-bold text-slate-400">IRT</span>}
            />
            <p className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed">
              تسویه حساب‌های ریالی به صورت چرخه پایا و پایا شبانه انجام می‌گیرد. کارمزد بانکی انتقال شبا کسر خواهد شد.
            </p>
            <Button type="submit" variant="primary" size="md" className="w-full text-slate-950" disabled={parseFloat(amountInput) > walletBalance}>
              تایید و درخواست تسویه
            </Button>
          </form>
        )}
      </Modal>

    </motion.div>
  );
};
