import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Search,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  ArrowDownRight,
  ArrowLeftRight,
  CheckCircle2,
  AlertTriangle,
  Wallet,
  Star
} from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';
import { Modal } from '../../../components/common/Modal';
import { Sparkline } from '../../home/components/PopularCoins';
import { Coin } from '../../../hooks/useCrypto';
import { useFavorites } from '../../../hooks/useFavorites';
import { ScrollReveal } from '../../../components/common/ScrollReveal';

interface CoinListProps {
  coins: Coin[];
}

type FilterType = 'all' | 'gainers' | 'losers' | 'volume' | 'favorites';
type SortField = 'symbol' | 'priceUsd' | 'priceIrt' | 'change24h' | 'volume24hUsd';
type SortOrder = 'asc' | 'desc';

export const CoinList: React.FC<CoinListProps> = ({ coins }) => {
  const navigate = useNavigate();
  const { toggleFavorite, isFavorite } = useFavorites();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  
  // Sorting states
  const [sortField, setSortField] = useState<SortField>('volume24hUsd');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');

  // Modal & Trading States
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCoin, setSelectedCoin] = useState<Coin | null>(null);
  const [tradeType, setTradeType] = useState<'buy' | 'sell'>('buy');
  const [amountIrt, setAmountIrt] = useState<string>('5000000');
  const [amountCrypto, setAmountCrypto] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [tradeStatus, setTradeStatus] = useState<'idle' | 'success'>('idle');

  // Check auth state
  useEffect(() => {
    const user = localStorage.getItem('zarrinex_user');
    setIsLoggedIn(!!user);
  }, [isModalOpen]);

  // Sync inputs inside Modal
  useEffect(() => {
    if (selectedCoin) {
      const irt = parseFloat(amountIrt);
      if (!isNaN(irt) && irt > 0) {
        const cryptoVal = irt / selectedCoin.priceIrt;
        setAmountCrypto(cryptoVal.toFixed(selectedCoin.symbol === 'BTC' ? 6 : 4));
      } else {
        setAmountCrypto('');
      }
    }
  }, [amountIrt, selectedCoin, tradeType]);

  const handleCryptoChange = (val: string) => {
    setAmountCrypto(val);
    if (selectedCoin) {
      const cryptoVal = parseFloat(val);
      if (!isNaN(cryptoVal) && cryptoVal > 0) {
        const irtVal = Math.round(cryptoVal * selectedCoin.priceIrt);
        setAmountIrt(irtVal.toString());
      } else {
        setAmountIrt('');
      }
    }
  };

  const handleIrtChange = (val: string) => {
    setAmountIrt(val);
    if (selectedCoin) {
      const irtVal = parseFloat(val);
      if (!isNaN(irtVal) && irtVal > 0) {
        const cryptoVal = irtVal / selectedCoin.priceIrt;
        setAmountCrypto(cryptoVal.toFixed(selectedCoin.symbol === 'BTC' ? 6 : 4));
      } else {
        setAmountCrypto('');
      }
    }
  };

  const openTradeModal = (coin: Coin, type: 'buy' | 'sell' = 'buy') => {
    setSelectedCoin(coin);
    setTradeType(type);
    setTradeStatus('idle');
    setIsModalOpen(true);
  };

  const handleConfirmTrade = () => {
    setTradeStatus('success');
    setTimeout(() => {
      setIsModalOpen(false);
      setTradeStatus('idle');
    }, 2500);
  };

  // Sort toggle handler
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // Filtering & Sorting Logic
  const filteredCoins = coins
    .filter(coin => {
      const matchesSearch =
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
        coin.nameFa.includes(searchTerm);
      
      if (!matchesSearch) return false;

      switch (activeFilter) {
        case 'gainers':
          return coin.change24h > 1.5;
        case 'losers':
          return coin.change24h < -1.0;
        case 'volume':
          return coin.volume24hUsd > 1000000000;
        case 'favorites':
          return isFavorite(coin.id);
        default:
          return true;
      }
    })
    .sort((a, b) => {
      let comparison = 0;
      if (sortField === 'symbol') {
        comparison = a.symbol.localeCompare(b.symbol);
      } else {
        comparison = a[sortField] - b[sortField];
      }
      return sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <ScrollReveal direction="up" duration={0.4} delay={0.2}>
      <div>
        {/* Search & Filter Bar */}
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 mb-8">
          
          {/* Search */}
          <div className="w-full lg:max-w-md relative">
            <Input
              placeholder="جستجو بر اساس نام یا نماد رمزارز (مثال: بیت کوین، BTC)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pr-11 pl-4 bg-white dark:bg-[#13161D] border-slate-200 dark:border-slate-800"
              startIcon={<Search size={18} className="text-slate-400" />}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
            {[
              { id: 'all', label: 'همه بازارها' },
              { id: 'gainers', label: 'بیشترین سود (۲۴ساعت)' },
              { id: 'losers', label: 'بیشترین ضرر (۲۴ساعت)' },
              { id: 'volume', label: 'حجم بالا (بالای ۱B$)' },
              { id: 'favorites', label: 'نشان‌شده‌ها ⭐' }
            ].map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id as FilterType)}
                className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all border cursor-pointer ${
                  activeFilter === filter.id
                    ? 'bg-primary border-primary text-slate-950 shadow-md shadow-primary/15 font-extrabold'
                    : 'bg-white dark:bg-[#13161D] border-slate-150 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-850'
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>

        </div>

        {/* Coins Table */}
        <div className="overflow-x-auto bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-3xl shadow-sm">
          <table className="w-full text-right border-collapse min-w-[800px]">
            <thead>
              <tr className="border-b border-slate-100 dark:border-slate-800 text-xs text-slate-400 dark:text-slate-500 font-semibold bg-slate-50/50 dark:bg-slate-900/40">
                <th className="py-5 pr-8 cursor-pointer hover:text-slate-700 dark:hover:text-white transition-colors" onClick={() => handleSort('symbol')}>
                  <div className="flex items-center gap-1">
                    <span>نام رمزارز / نماد</span>
                    {sortField === 'symbol' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>

                <th className="py-5 px-4 cursor-pointer hover:text-slate-700 dark:hover:text-white transition-colors" onClick={() => handleSort('priceUsd')}>
                  <div className="flex items-center gap-1">
                    <span>قیمت دلاری</span>
                    {sortField === 'priceUsd' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>

                <th className="py-5 px-4 cursor-pointer hover:text-slate-700 dark:hover:text-white transition-colors" onClick={() => handleSort('priceIrt')}>
                  <div className="flex items-center gap-1">
                    <span>قیمت تومانی</span>
                    {sortField === 'priceIrt' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>

                <th className="py-5 px-4 cursor-pointer hover:text-slate-700 dark:hover:text-white transition-colors" onClick={() => handleSort('change24h')}>
                  <div className="flex items-center gap-1">
                    <span>تغییرات ۲۴ ساعته</span>
                    {sortField === 'change24h' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>

                <th className="py-5 px-4 cursor-pointer hover:text-slate-700 dark:hover:text-white transition-colors" onClick={() => handleSort('volume24hUsd')}>
                  <div className="flex items-center gap-1">
                    <span>حجم کل معاملات</span>
                    {sortField === 'volume24hUsd' && (sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />)}
                  </div>
                </th>

                <th className="py-5 px-4 text-center">نمودار</th>
                <th className="py-5 pl-8 text-left">عملیات</th>
              </tr>
            </thead>
            
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-sm">
              {filteredCoins.length > 0 ? (
                filteredCoins.map((coin) => {
                  const isPositive = coin.change24h >= 0;
                  const changeColor = isPositive ? '#10B981' : '#EF4444';
                  const isFav = isFavorite(coin.id);

                  return (
                    <tr
                      key={coin.id}
                      className="hover:bg-slate-50/75 dark:hover:bg-slate-900/40 transition-colors group"
                    >
                      {/* Identity & Favorite Star */}
                      <td className="py-5 pr-8">
                        <div className="flex items-center gap-3">
                          {/* Favorite Star Icon */}
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(coin.id);
                            }}
                            className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                              isFav ? 'text-primary' : 'text-slate-350 hover:text-primary dark:text-slate-600'
                            }`}
                            aria-label="نشان کردن"
                          >
                            <Star size={16} className={isFav ? 'fill-primary' : ''} />
                          </button>

                          <div className="w-9 h-9 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 overflow-hidden flex items-center justify-center">
                            <img src={coin.image} alt={coin.name} className="w-full h-full object-contain" />
                          </div>
                          <div>
                            <Link
                              to={`/coin/${coin.id}`}
                              className="font-bold text-slate-850 dark:text-slate-100 hover:text-primary transition-colors"
                            >
                              {coin.nameFa}
                            </Link>
                            <span className="text-xs text-slate-400 dark:text-slate-500 mr-2 font-medium">
                              {coin.symbol}
                            </span>
                            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5 font-normal">
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
                        {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-xs font-semibold text-slate-400 dark:text-slate-500">تومان</span>
                      </td>

                      {/* Change 24h */}
                      <td className={`py-5 px-4 font-bold ${isPositive ? 'text-emerald-500' : 'text-red-500'}`}>
                        <span className="flex items-center gap-1">
                          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                          <span dir="ltr">{coin.change24h}%</span>
                        </span>
                      </td>

                      {/* Volume */}
                      <td className="py-5 px-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                        <div>${(coin.volume24hUsd / 1000000).toFixed(1)}M</div>
                        <div className="text-[10px] text-slate-400 mt-0.5" dir="ltr">
                          {Math.round(coin.volume24hIrt / 1000000000).toLocaleString('fa-IR')} میلیارد تومان
                        </div>
                      </td>

                      {/* Sparkline */}
                      <td className="py-5 px-4">
                        <div className="flex justify-center items-center scale-90">
                          <Sparkline data={coin.sparkline} color={changeColor} />
                        </div>
                      </td>

                      {/* Actions */}
                      <td className="py-5 pl-8 text-left">
                        <div className="flex items-center justify-end gap-2">
                          <Button
                            variant="primary"
                            size="sm"
                            onClick={() => openTradeModal(coin, 'buy')}
                          >
                            خرید
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="hover:border-red-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                            onClick={() => openTradeModal(coin, 'sell')}
                          >
                            فروش
                          </Button>
                        </div>
                      </td>

                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-slate-400 dark:text-slate-500">
                    <div className="flex flex-col items-center gap-2">
                      <span className="text-lg">هیچ رمزارزی یافت نشد.</span>
                      <span className="text-xs">لطفاً عبارت دیگری را جستجو کنید یا فیلترها را تغییر دهید.</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Order Panel / Trade Modal */}
        {selectedCoin && (
          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            title={`خرید و فروش آنی ${selectedCoin.nameFa} (${selectedCoin.symbol})`}
            size="md"
          >
            {tradeStatus === 'success' ? (
              <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                  <CheckCircle2 size={36} />
                </div>
                <h4 className="text-lg font-bold text-slate-805 dark:text-slate-100">سفارش شما با موفقیت ثبت شد!</h4>
                <p className="text-xs text-slate-400 dark:text-slate-550 leading-relaxed max-w-xs">
                  مبادله آنی انجام گردید و دارایی شما در کیف پول اختصاصی زرین‌اکس بروزرسانی شد.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                
                {/* Live Ticker info in Modal */}
                <div className="flex items-center justify-between p-3.5 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-xl">
                  <div>
                    <span className="text-xs text-slate-400 dark:text-slate-500">نرخ فعلی بازار</span>
                    <p className="text-sm font-black text-slate-800 dark:text-white mt-1">
                      {selectedCoin.priceIrt.toLocaleString('fa-IR')} تومان
                    </p>
                  </div>
                  <div className="text-left">
                    <span className="text-xs text-slate-400 dark:text-slate-500">تغییر ۲۴ ساعته</span>
                    <span className={`block text-xs font-bold mt-1 ${selectedCoin.change24h >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                      {selectedCoin.change24h}%
                    </span>
                  </div>
                </div>

                {/* Buy/Sell Tabs */}
                <div className="grid grid-cols-2 gap-2 p-1 bg-slate-100 dark:bg-slate-900 rounded-xl">
                  <button
                    onClick={() => setTradeType('buy')}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tradeType === 'buy'
                        ? 'bg-emerald-500 text-white shadow-sm'
                        : 'text-slate-555 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-850'
                    }`}
                  >
                    خرید {selectedCoin.symbol}
                  </button>
                  <button
                    onClick={() => setTradeType('sell')}
                    className={`py-2.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                      tradeType === 'sell'
                        ? 'bg-red-500 text-white shadow-sm'
                        : 'text-slate-555 dark:text-slate-400 hover:bg-slate-50/50 dark:hover:bg-slate-850'
                    }`}
                  >
                    فروش {selectedCoin.symbol}
                  </button>
                </div>

                {/* Inputs */}
                <div className="space-y-4">
                  <Input
                    label="مبلغ پرداختی (تومان)"
                    type="number"
                    value={amountIrt}
                    onChange={(e) => handleIrtChange(e.target.value)}
                    placeholder="مثال: ۱,۰۰۰,۰۰۰"
                    className="text-left font-bold"
                    endIcon={<span className="text-xs font-bold text-slate-400 dark:text-slate-500">IRT</span>}
                  />
                  
                  <div className="flex justify-center">
                    <div className="p-2 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-xl text-slate-400">
                      <ArrowLeftRight size={16} />
                    </div>
                  </div>

                  <Input
                    label="مقدار دریافتی تقریبی"
                    type="number"
                    value={amountCrypto}
                    onChange={(e) => handleCryptoChange(e.target.value)}
                    placeholder="مثال: ۰.۰۲۵"
                    className="text-left font-bold"
                    endIcon={<span className="text-xs font-bold text-slate-400 dark:text-slate-500">{selectedCoin.symbol}</span>}
                  />
                </div>

                {/* Order Info & Fees */}
                <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400 border-t border-slate-100 dark:border-border-dark pt-4">
                  <div className="flex justify-between">
                    <span>کارمزد معامله (۰.۲۵٪):</span>
                    <span className="font-bold">
                      {(parseFloat(amountIrt) * 0.0025 || 0).toLocaleString('fa-IR')} تومان
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>خالص دریافتی:</span>
                    <span className="font-bold text-primary">
                      {tradeType === 'buy' ? amountCrypto : amountIrt} {tradeType === 'buy' ? selectedCoin.symbol : 'تومان'}
                    </span>
                  </div>
                </div>

                {/* Check Authentication */}
                {isLoggedIn ? (
                  <div className="space-y-3 pt-2">
                    <Button
                      variant={tradeType === 'buy' ? 'primary' : 'danger'}
                      size="lg"
                      className="w-full"
                      onClick={handleConfirmTrade}
                    >
                      ثبت نهایی معامله {tradeType === 'buy' ? 'خرید' : 'فروش'}
                    </Button>
                    <div className="flex items-center gap-1.5 justify-center text-[10px] text-slate-450 dark:text-slate-500">
                      <Wallet size={12} className="text-primary" />
                      <span>موجودی کیف پول شما کافی است.</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-3 pt-2">
                    <div className="p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-500 rounded-xl text-xs flex items-start gap-2.5 leading-relaxed">
                      <AlertTriangle size={16} className="shrink-0 mt-0.5" />
                      <span>برای ثبت سفارش معامله و حفظ امنیت دارایی خود، لازم است ابتدا وارد حساب کاربری خود شوید یا در صرافی ثبت‌نام کنید.</span>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <Button
                        variant="outline"
                        size="md"
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/login');
                        }}
                      >
                        ورود به حساب
                      </Button>
                      <Button
                        variant="primary"
                        size="md"
                        onClick={() => {
                          setIsModalOpen(false);
                          navigate('/register');
                        }}
                      >
                        ثبت نام سریع
                      </Button>
                    </div>
                  </div>
                )}

              </div>
            )}
          </Modal>
        )}

      </div>
    </ScrollReveal>
  );
};
