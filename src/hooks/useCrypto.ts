import { useState, useEffect, useCallback } from 'react';

export interface ChartPoint {
  time: string;
  price: number;
}

export interface Coin {
  id: string;
  name: string;
  nameFa: string;
  symbol: string;
  priceUsd: number;
  priceIrt: number;
  change24h: number;
  high24h: number;
  low24h: number;
  volume24hUsd: number;
  volume24hIrt: number;
  sparkline: number[];
  marketCapUsd: number;
  circulatingSupply: number;
  maxSupply: number | null;
  descriptionFa: string;
  history24h: ChartPoint[];
  history7d: ChartPoint[];
  history30d: ChartPoint[];
}

const generateHistoryData = (basePrice: number, pointsCount: number, variance: number, periodType: '24h' | '7d' | '30d'): ChartPoint[] => {
  const points: ChartPoint[] = [];
  const now = new Date();
  
  for (let i = pointsCount - 1; i >= 0; i--) {
    let timeString = '';
    const date = new Date(now.getTime());
    
    if (periodType === '24h') {
      date.setHours(now.getHours() - i);
      timeString = date.toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' });
    } else if (periodType === '7d') {
      date.setDate(now.getDate() - i);
      timeString = date.toLocaleDateString('fa-IR', { weekday: 'long' });
    } else {
      date.setDate(now.getDate() - i);
      timeString = date.toLocaleDateString('fa-IR', { month: 'short', day: 'numeric' });
    }

    const factor = 1 + (Math.sin(i * 0.5) * 0.05) + ((Math.random() - 0.5) * variance);
    const price = Number((basePrice * factor).toFixed(basePrice < 1 ? 6 : 2));
    
    points.push({ time: timeString, price });
  }
  
  return points;
};

const COIN_METADATA: Record<string, { nameFa: string; descriptionFa: string }> = {
  bitcoin: {
    nameFa: 'بیت‌کوین',
    descriptionFa: 'بیت‌کوین اولین و معتبرترین رمزارز جهان است که در سال ۲۰۰۸ توسط شخص یا گروهی ناشناس به نام ساتوشی ناکاموتو معرفی شد. بیت‌کوین بر پایه شبکه همتا‌به‌همتا بدون نیاز به واسطه‌ها و بانک‌های مرکزی فعالیت می‌کند و از الگوریتم اثبات کار (Proof of Work) برای امنیت شبکه استفاده می‌کند. تعداد کل بیت‌کوین‌های قابل استخراج محدود به ۲۱ میلیون واحد است که این ویژگی آن را به طلای دیجیتال معروف کرده است.'
  },
  ethereum: {
    nameFa: 'اتریوم',
    descriptionFa: 'اتریوم یک پلتفرم بلاک‌چین غیرمتمرکز و منبع‌باز است که قابلیت اجرای قراردادهای هوشمند (Smart Contracts) و برنامه‌های غیرمتمرکز (dApps) را فراهم می‌سازد. اتریوم توسط ویتالیک بوترین در سال ۲۰۱۳ پیشنهاد شد و در سال ۲۰۱۵ رسماً آغاز به کار کرد. این شبکه با انتقال به نسخه ۲.۰ مکانیزم اجماع خود را به اثبات سهام (Proof of Stake) تغییر داد تا مصرف انرژی را کاهش داده و مقیاس‌پذیری را افزایش دهد.'
  },
  tether: {
    nameFa: 'تتر',
    descriptionFa: 'تتر محبوب‌ترین استیبل‌کوین (ارز دیجیتال با قیمت پایدار) در سراسر جهان است که ارزش آن همواره معادل یک دلار ایالات متحده آمریکا نگه داشته می‌شود. تتر به عنوان یک ابزار پوشش ریسک در برابر نوسانات شدید بازار رمزارزها عمل می‌کند و معامله‌گران از آن برای انتقال سریع دارایی‌ها استفاده می‌کنند. پشتوانه تتر توسط ذخایر نقدی و اوراق قرضه شرکت تتر لیمیتد تامین می‌شود.'
  },
  solana: {
    nameFa: 'سولانا',
    descriptionFa: 'سولانا یک بلاک‌چین با کارایی و سرعت بسیار بالا است که به طور ویژه برای پشتیبانی از برنامه‌های غیرمتمرکز مقیاس‌پذیر و بازارهای مالی طراحی شده است. سولانا از مکانیزم اجماع منحصر‌به‌فرد اثبات تاریخچه (Proof of History) در کنار اثبات سهام استفاده می‌کند که به آن اجازه می‌دهد تا هزاران تراکنش را در ثانیه با کارمزد بسیار نزدیک به صفر پردازش کند.'
  },
  binancecoin: {
    nameFa: 'بایننس کوین',
    descriptionFa: 'بی‌ان‌بی رمزارز بومی اکوسیستم بایننس (بزرگ‌ترین صرافی رمزارز جهان) و شبکه هوشمند بایننس (BNB Chain) است. کاربرد اصلی BNB در پرداخت کارمزد تراکنش‌ها در شبکه، شرکت در رویدادهای فروش توکن و دریافت تخفیف کارمزد در صرافی بایننس است. بایننس به صورت دوره‌ای با استفاده از فرآیند توکن‌سوزی (Token Burn) اقدام به کاهش عرضه کل این رمزارز می‌کند.'
  },
  ripple: {
    nameFa: 'ریپل',
    descriptionFa: 'ریپل یک پروتکل پرداخت و رمزارز (XRP) است که با هدف تسهیل و سرعت‌بخشی به حواله‌های بین‌المللی و تراکنش‌های بانکی ایجاد شده است. برخلاف بیت‌کوین، ریپل از بلاک‌چین سنتی استفاده نمی‌کند بلکه بر اساس یک دفترکل توزیع‌شده توافقی کار می‌کند. این شبکه به بانک‌ها و موسسات مالی اجازه می‌دهد تا پول را در کسری از ثانیه و با هزینه‌ای بسیار اندک در سطح جهانی انتقال دهند.'
  },
  dogecoin: {
    nameFa: 'دوج‌کوین',
    descriptionFa: 'دوج‌کوین به عنوان اولین میم‌کوین (Meme Coin) جهان در سال ۲۰۱۳ توسط بیلی مارکوس و جکسون پالمر به عنوان یک شوخی با بیت‌کوین ساخته شد. تصویر سگ نژاد شیبا اینو نماد این رمزارز است. با وجود شروع طنزآمیز، دوج‌کوین به لطف جامعه کاربری بسیار وفادار و حمایت‌های چهره‌های سرشناس مانند ایلان ماسک به یکی از بزرگ‌ترین و محبوب‌ترین رمزارزهای بازار تبدیل شد.'
  },
  toncoin: {
    nameFa: 'تن‌کوین',
    descriptionFa: 'تن‌کوین رمزارز بومی شبکه باز (The Open Network) است که ابتدا توسط بنیان‌گذاران پیام‌رسان تلگرام طراحی شد و سپس توسعه آن به دست یک بنیاد مستقل سپرده شد. تن‌کوین به طور عمیقی با اکوسیستم تلگرام ادغام شده است و کاربران می‌توانند از آن برای پرداخت خدمات داخلی، ارسال رمزارز در چت‌ها و خرید نام‌های کاربری و اشتراک پرمیوم استفاده کنند.'
  },
  cardano: {
    nameFa: 'کاردانو',
    descriptionFa: 'کاردانو یک پلتفرم بلاک‌چین اثبات سهام است که توسعه آن بر پایه تحقیقات علمی دقیق و داوری همتا (Peer-Review) انجام می‌گیرد. کاردانو توسط چارلز هاسکینسون، یکی از هم‌بنیان‌گذاران سابق اتریوم، ایجاد شد. هدف کاردانو ایجاد یک پلتفرم قرارداد هوشمند بسیار امن، مقیاس‌پذیر و پایدار برای توسعه برنامه‌های سازمانی و هویت دیجیتال است.'
  },
  'shiba-inu': {
    nameFa: 'شیبا اینو',
    descriptionFa: 'شیبا اینو یک میم‌کوین مبتنی بر شبکه اتریوم است که در سال ۲۰۲۰ توسط فردی ناشناس به نام ریوشی به عنوان رقیبی برای دوج‌کوین ایجاد شد. شیبا اینو فراتر از یک میم‌کوین ساده، اکنون دارای یک اکوسیستم رو به رشد شامل صرافی غیرمتمرکز ShibaSwap، شبکه لایه دوم Shibarium و بازی‌های بلاک‌چینی اختصاصی است.'
  }
};

const INITIAL_COINS_MOCK: Omit<Coin, 'history24h' | 'history7d' | 'history30d'>[] = [
  {
    id: 'bitcoin',
    name: 'Bitcoin',
    nameFa: 'بیت‌کوین',
    symbol: 'BTC',
    priceUsd: 94250.00,
    priceIrt: 5655000000,
    change24h: 3.45,
    high24h: 94800.00,
    low24h: 91100.00,
    volume24hUsd: 28500000000,
    volume24hIrt: 1710000000000000,
    sparkline: [91100, 91500, 92200, 91900, 92800, 93500, 94100, 94250],
    marketCapUsd: 1850000000000,
    circulatingSupply: 19650000,
    maxSupply: 21000000,
    descriptionFa: COIN_METADATA.bitcoin.descriptionFa
  },
  {
    id: 'ethereum',
    name: 'Ethereum',
    nameFa: 'اتریوم',
    symbol: 'ETH',
    priceUsd: 3120.50,
    priceIrt: 187230000,
    change24h: -1.24,
    high24h: 3210.00,
    low24h: 3080.00,
    volume24hUsd: 14200000000,
    volume24hIrt: 852000000000000,
    sparkline: [3210, 3180, 3160, 3140, 3150, 3100, 3090, 3120.5],
    marketCapUsd: 375000000000,
    circulatingSupply: 120000000,
    maxSupply: null,
    descriptionFa: COIN_METADATA.ethereum.descriptionFa
  },
  {
    id: 'tether',
    name: 'Tether',
    nameFa: 'تتر',
    symbol: 'USDT',
    priceUsd: 1.00,
    priceIrt: 60000,
    change24h: 0.05,
    high24h: 1.01,
    low24h: 0.99,
    volume24hUsd: 45000000000,
    volume24hIrt: 2700000000000000,
    sparkline: [1.00, 0.99, 1.00, 1.01, 1.00, 1.00, 0.99, 1.00],
    marketCapUsd: 110000000000,
    circulatingSupply: 110000000000,
    maxSupply: null,
    descriptionFa: COIN_METADATA.tether.descriptionFa
  },
  {
    id: 'solana',
    name: 'Solana',
    nameFa: 'سولانا',
    symbol: 'SOL',
    priceUsd: 184.20,
    priceIrt: 11052000,
    change24h: 7.82,
    high24h: 186.50,
    low24h: 170.20,
    volume24hUsd: 3800000000,
    volume24hIrt: 228000000000000,
    sparkline: [170.2, 172.5, 175.0, 174.2, 178.9, 180.1, 182.5, 184.2],
    marketCapUsd: 85000000000,
    circulatingSupply: 462000000,
    maxSupply: null,
    descriptionFa: COIN_METADATA.solana.descriptionFa
  },
  {
    id: 'binancecoin',
    name: 'BNB',
    nameFa: 'بایننس کوین',
    symbol: 'BNB',
    priceUsd: 585.40,
    priceIrt: 35124000,
    change24h: 1.15,
    high24h: 590.00,
    low24h: 578.00,
    volume24hUsd: 1200000000,
    volume24hIrt: 72000000000005,
    sparkline: [578, 580, 582, 581, 583, 587, 584, 585.4],
    marketCapUsd: 86000000000,
    circulatingSupply: 147500000,
    maxSupply: 200000000,
    descriptionFa: COIN_METADATA.binancecoin.descriptionFa
  },
  {
    id: 'ripple',
    name: 'Ripple',
    nameFa: 'ریپل',
    symbol: 'XRP',
    priceUsd: 1.12,
    priceIrt: 67200,
    change24h: -2.85,
    high24h: 1.18,
    low24h: 1.09,
    volume24hUsd: 950000000,
    volume24hIrt: 57000000000000,
    sparkline: [1.18, 1.16, 1.15, 1.12, 1.10, 1.11, 1.09, 1.12],
    marketCapUsd: 62000000000,
    circulatingSupply: 55000000000,
    maxSupply: 100000000000,
    descriptionFa: COIN_METADATA.ripple.descriptionFa
  },
  {
    id: 'dogecoin',
    name: 'Dogecoin',
    nameFa: 'دوج‌کوین',
    symbol: 'DOGE',
    priceUsd: 0.385,
    priceIrt: 23100,
    change24h: 12.40,
    high24h: 0.395,
    low24h: 0.340,
    volume24hUsd: 2100000000,
    volume24hIrt: 126000000000000,
    sparkline: [0.340, 0.345, 0.355, 0.350, 0.368, 0.375, 0.380, 0.385],
    marketCapUsd: 55000000000,
    circulatingSupply: 144000000000,
    maxSupply: null,
    descriptionFa: COIN_METADATA.dogecoin.descriptionFa
  },
  {
    id: 'toncoin',
    name: 'Toncoin',
    nameFa: 'تن‌کوین',
    symbol: 'TON',
    priceUsd: 5.62,
    priceIrt: 337200,
    change24h: -0.45,
    high24h: 5.75,
    low24h: 5.55,
    volume24hUsd: 320000000,
    volume24hIrt: 19200000000000,
    sparkline: [5.72, 5.70, 5.68, 5.65, 5.60, 5.58, 5.55, 5.62],
    marketCapUsd: 14000000000,
    circulatingSupply: 2500000000,
    maxSupply: null,
    descriptionFa: COIN_METADATA.toncoin.descriptionFa
  },
  {
    id: 'cardano',
    name: 'Cardano',
    nameFa: 'کاردانو',
    symbol: 'ADA',
    priceUsd: 0.725,
    priceIrt: 43500,
    change24h: 4.12,
    high24h: 0.735,
    low24h: 0.690,
    volume24hUsd: 410000000,
    volume24hIrt: 24600000000000,
    sparkline: [0.690, 0.695, 0.705, 0.700, 0.712, 0.718, 0.720, 0.725],
    marketCapUsd: 25000000000,
    circulatingSupply: 35600000000,
    maxSupply: 45000000000,
    descriptionFa: COIN_METADATA.cardano.descriptionFa
  },
  {
    id: 'shiba-inu',
    name: 'Shiba Inu',
    nameFa: 'شیبا اینو',
    symbol: 'SHIB',
    priceUsd: 0.00002450,
    priceIrt: 1.47,
    change24h: 1.85,
    high24h: 0.00002520,
    low24h: 0.00002380,
    volume24hUsd: 520000005,
    volume24hIrt: 31200000000000,
    sparkline: [0.00002380, 0.00002400, 0.00002410, 0.00002390, 0.00002430, 0.00002450],
    marketCapUsd: 14500000000,
    circulatingSupply: 589000000000000,
    maxSupply: 999000000000000,
    descriptionFa: COIN_METADATA['shiba-inu'].descriptionFa
  }
];

export const useCrypto = () => {
  const [tomanRate, setTomanRate] = useState<number>(60000); // Default USD to IRT rate
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  const [coins, setCoins] = useState<Coin[]>(() => {
    // Generate initial state with beautiful mock history data
    return INITIAL_COINS_MOCK.map(coin => ({
      ...coin,
      history24h: generateHistoryData(coin.priceUsd, 24, 0.04, '24h'),
      history7d: generateHistoryData(coin.priceUsd, 7, 0.08, '7d'),
      history30d: generateHistoryData(coin.priceUsd, 30, 0.15, '30d')
    }));
  });

  const fetchLiveData = useCallback(async () => {
    try {
      // Fetching from CoinGecko's public endpoint
      const response = await fetch(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=bitcoin,ethereum,tether,solana,binancecoin,ripple,dogecoin,toncoin,cardano,shiba-inu&order=market_cap_desc&sparkline=true&price_change_percentage=24h'
      );
      
      if (!response.ok) {
        throw new Error(`CoinGecko HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      
      if (Array.isArray(data) && data.length > 0) {
        setCoins(prevCoins => {
          return prevCoins.map(prevCoin => {
            const liveCoin = data.find((item: any) => item.id === prevCoin.id);
            if (!liveCoin) return prevCoin;

            const newPriceUsd = liveCoin.current_price || prevCoin.priceUsd;
            const newPriceIrt = Math.round(newPriceUsd * tomanRate);
            const newChange24h = Number((liveCoin.price_change_percentage_24h || prevCoin.change24h).toFixed(2));
            const newHigh = liveCoin.high_24h || prevCoin.high24h;
            const newLow = liveCoin.low_24h || prevCoin.low24h;
            
            // Use live sparkline or fallback
            const liveSparkline = liveCoin.sparkline_in_7d?.price || prevCoin.sparkline;

            return {
              ...prevCoin,
              priceUsd: newPriceUsd,
              priceIrt: newPriceIrt,
              change24h: newChange24h,
              high24h: newHigh,
              low24h: newLow,
              volume24hUsd: liveCoin.total_volume || prevCoin.volume24hUsd,
              volume24hIrt: Math.round((liveCoin.total_volume || prevCoin.volume24hUsd) * tomanRate),
              marketCapUsd: liveCoin.market_cap || prevCoin.marketCapUsd,
              circulatingSupply: liveCoin.circulating_supply || prevCoin.circulatingSupply,
              maxSupply: liveCoin.max_supply || prevCoin.maxSupply,
              sparkline: liveSparkline.slice(-20), // Grab last 20 points
              history24h: generateHistoryData(newPriceUsd, 24, 0.04, '24h'),
              history7d: generateHistoryData(newPriceUsd, 7, 0.08, '7d'),
              history30d: generateHistoryData(newPriceUsd, 30, 0.15, '30d')
            };
          });
        });
        setIsError(false);
      }
    } catch (err) {
      console.warn('CoinGecko API is rate-limited or offline. Falling back to high-fidelity simulated updates.');
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  }, [tomanRate]);

  // Fetch live prices on mount and every 30 seconds to respect CoinGecko's free rate limits
  useEffect(() => {
    fetchLiveData();
    const interval = setInterval(fetchLiveData, 30000);
    return () => clearInterval(interval);
  }, [fetchLiveData]);

  // Secondary simulation interval to keep prices feeling "live" with micro-fluctuations in between API pulls
  useEffect(() => {
    const microInterval = setInterval(() => {
      // Simulate minor dollar fluctuations in toman rate
      setTomanRate(prev => {
        const delta = (Math.random() - 0.5) * 40;
        return Math.round(prev + delta);
      });

      setCoins(prevCoins =>
        prevCoins.map(coin => {
          if (coin.symbol === 'USDT') {
            return {
              ...coin,
              priceIrt: tomanRate,
              sparkline: [...coin.sparkline.slice(1), 1.00]
            };
          }

          // Very small micro-change: -0.05% to +0.05%
          const percentChange = (Math.random() - 0.49) * 0.1;
          const newPriceUsd = Math.max(0.000001, coin.priceUsd * (1 + percentChange / 100));
          const newPriceIrt = Math.round(newPriceUsd * tomanRate);

          return {
            ...coin,
            priceUsd: Number(newPriceUsd.toFixed(coin.symbol === 'SHIB' ? 8 : 2)),
            priceIrt: newPriceIrt,
            sparkline: [...coin.sparkline.slice(1), newPriceUsd]
          };
        })
      );
    }, 5000);

    return () => clearInterval(microInterval);
  }, [tomanRate]);

  return { coins, tomanRate, isLoading, isError, refetch: fetchLiveData };
};
