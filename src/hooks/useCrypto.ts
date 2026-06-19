import { useState, useEffect, useCallback } from "react";

// ================ Types ================
export interface ChartPoint {
  time: string;
  price: number;
}

export interface Coin {
  id: string;
  name: string;
  nameFa: string;
  symbol: string;
  image: string;
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

// ================ Utility Functions ================
const generateHistoryData = (
  basePrice: number,
  pointsCount: number,
  variance: number,
  periodType: "24h" | "7d" | "30d",
): ChartPoint[] => {
  const points: ChartPoint[] = [];
  const now = new Date();

  for (let i = pointsCount - 1; i >= 0; i--) {
    let timeString = "";
    const date = new Date(now.getTime());

    if (periodType === "24h") {
      date.setHours(now.getHours() - i);
      timeString = date.toLocaleTimeString("fa-IR", {
        hour: "2-digit",
        minute: "2-digit",
      });
    } else if (periodType === "7d") {
      date.setDate(now.getDate() - i);
      timeString = date.toLocaleDateString("fa-IR", { weekday: "long" });
    } else {
      date.setDate(now.getDate() - i);
      timeString = date.toLocaleDateString("fa-IR", {
        month: "short",
        day: "numeric",
      });
    }

    const factor =
      1 + Math.sin(i * 0.5) * 0.05 + (Math.random() - 0.5) * variance;
    const price = Number((basePrice * factor).toFixed(basePrice < 1 ? 6 : 2));

    points.push({ time: timeString, price });
  }

  return points;
};

// ================ Metadata ================
const COIN_METADATA: Record<string, { nameFa: string; descriptionFa: string }> =
  {
    bitcoin: {
      nameFa: "بیت‌کوین",
      descriptionFa:
        "بیت‌کوین اولین و معتبرترین رمزارز جهان است که در سال ۲۰۰۸ توسط شخص یا گروهی ناشناس به نام ساتوشی ناکاموتو معرفی شد. بیت‌کوین بر پایه شبکه همتا‌به‌همتا بدون نیاز به واسطه‌ها و بانک‌های مرکزی فعالیت می‌کند و از الگوریتم اثبات کار (Proof of Work) برای امنیت شبکه استفاده می‌کند. تعداد کل بیت‌کوین‌های قابل استخراج محدود به ۲۱ میلیون واحد است که این ویژگی آن را به طلای دیجیتال معروف کرده است.",
    },
    ethereum: {
      nameFa: "اتریوم",
      descriptionFa:
        "اتریوم یک پلتفرم بلاک‌چین غیرمتمرکز و منبع‌باز است که قابلیت اجرای قراردادهای هوشمند (Smart Contracts) و برنامه‌های غیرمتمرکز (dApps) را فراهم می‌سازد. اتریوم توسط ویتالیک بوترین در سال ۲۰۱۳ پیشنهاد شد و در سال ۲۰۱۵ رسماً آغاز به کار کرد. این شبکه با انتقال به نسخه ۲.۰ مکانیزم اجماع خود را به اثبات سهام (Proof of Stake) تغییر داد تا مصرف انرژی را کاهش داده و مقیاس‌پذیری را افزایش دهد.",
    },
    tether: {
      nameFa: "تتر",
      descriptionFa:
        "تتر محبوب‌ترین استیبل‌کوین (ارز دیجیتال با قیمت پایدار) در سراسر جهان است که ارزش آن همواره معادل یک دلار ایالات متحده آمریکا نگه داشته می‌شود. تتر به عنوان یک ابزار پوشش ریسک در برابر نوسانات شدید بازار رمزارزها عمل می‌کند و معامله‌گران از آن برای انتقال سریع دارایی‌ها استفاده می‌کنند. پشتوانه تتر توسط ذخایر نقدی و اوراق قرضه شرکت تتر لیمیتد تامین می‌شود.",
    },
    solana: {
      nameFa: "سولانا",
      descriptionFa:
        "سولانا یک بلاک‌چین با کارایی و سرعت بسیار بالا است که به طور ویژه برای پشتیبانی از برنامه‌های غیرمتمرکز مقیاس‌پذیر و بازارهای مالی طراحی شده است. سولانا از مکانیزم اجماع منحصر‌به‌فرد اثبات تاریخچه (Proof of History) در کنار اثبات سهام استفاده می‌کند که به آن اجازه می‌دهد تا هزاران تراکنش را در ثانیه با کارمزد بسیار نزدیک به صفر پردازش کند.",
    },
    binancecoin: {
      nameFa: "بایننس کوین",
      descriptionFa:
        "بی‌ان‌بی رمزارز بومی اکوسیستم بایننس (بزرگ‌ترین صرافی رمزارز جهان) و شبکه هوشمند بایننس (BNB Chain) است. کاربرد اصلی BNB در پرداخت کارمزد تراکنش‌ها در شبکه، شرکت در رویدادهای فروش توکن و دریافت تخفیف کارمزد در صرافی بایننس است. بایننس به صورت دوره‌ای با استفاده از فرآیند توکن‌سوزی (Token Burn) اقدام به کاهش عرضه کل این رمزارز می‌کند.",
    },
    ripple: {
      nameFa: "ریپل",
      descriptionFa:
        "ریپل یک پروتکل پرداخت و رمزارز (XRP) است که با هدف تسهیل و سرعت‌بخشی به حواله‌های بین‌المللی و تراکنش‌های بانکی ایجاد شده است. برخلاف بیت‌کوین، ریپل از بلاک‌چین سنتی استفاده نمی‌کند بلکه بر اساس یک دفترکل توزیع‌شده توافقی کار می‌کند. این شبکه به بانک‌ها و موسسات مالی اجازه می‌دهد تا پول را در کسری از ثانیه و با هزینه‌ای بسیار اندک در سطح جهانی انتقال دهند.",
    },
    dogecoin: {
      nameFa: "دوج‌کوین",
      descriptionFa:
        "دوج‌کوین به عنوان اولین میم‌کوین (Meme Coin) جهان در سال ۲۰۱۳ توسط بیلی مارکوس و جکسون پالمر به عنوان یک شوخی با بیت‌کوین ساخته شد. تصویر سگ نژاد شیبا اینو نماد این رمزارز است. با وجود شروع طنزآمیز، دوج‌کوین به لطف جامعه کاربری بسیار وفادار و حمایت‌های چهره‌های سرشناس مانند ایلان ماسک به یکی از بزرگ‌ترین و محبوب‌ترین رمزارزهای بازار تبدیل شد.",
    },
    toncoin: {
      nameFa: "تن‌کوین",
      descriptionFa:
        "تن‌کوین رمزارز بومی شبکه باز (The Open Network) است که ابتدا توسط بنیان‌گذاران پیام‌رسان تلگرام طراحی شد و سپس توسعه آن به دست یک بنیاد مستقل سپرده شد. تن‌کوین به طور عمیقی با اکوسیستم تلگرام ادغام شده است و کاربران می‌توانند از آن برای پرداخت خدمات داخلی، ارسال رمزارز در چت‌ها و خرید نام‌های کاربری و اشتراک پرمیوم استفاده کنند.",
    },
    cardano: {
      nameFa: "کاردانو",
      descriptionFa:
        "کاردانو یک پلتفرم بلاک‌چین اثبات سهام است که توسعه آن بر پایه تحقیقات علمی دقیق و داوری همتا (Peer-Review) انجام می‌گیرد. کاردانو توسط چارلز هاسکینسون، یکی از هم‌بنیان‌گذاران سابق اتریوم، ایجاد شد. هدف کاردانو ایجاد یک پلتفرم قرارداد هوشمند بسیار امن، مقیاس‌پذیر و پایدار برای توسعه برنامه‌های سازمانی و هویت دیجیتال است.",
    },
    "shiba-inu": {
      nameFa: "شیبا اینو",
      descriptionFa:
        "شیبا اینو یک میم‌کوین مبتنی بر شبکه اتریوم است که در سال ۲۰۲۰ توسط فردی ناشناس به نام ریوشی به عنوان رقیبی برای دوج‌کوین ایجاد شد. شیبا اینو فراتر از یک میم‌کوین ساده، اکنون دارای یک اکوسیستم رو به رشد شامل صرافی غیرمتمرکز ShibaSwap، شبکه لایه دوم Shibarium و بازی‌های بلاک‌چینی اختصاصی است.",
    },
  };

const COIN_LOGOS: Record<string, string> = {
  bitcoin: "https://assets.coingecko.com/coins/images/1/large/bitcoin.png",
  ethereum: "https://assets.coingecko.com/coins/images/279/large/ethereum.png",
  tether: "https://assets.coingecko.com/coins/images/325/large/Tether-logo.png",
  solana: "https://assets.coingecko.com/coins/images/4128/large/solana.png",
  binancecoin:
    "https://assets.coingecko.com/coins/images/825/large/bnb-icon2_2x.png",
  ripple:
    "https://assets.coingecko.com/coins/images/44/large/xrp-symbol-white-128.png",
  dogecoin: "https://assets.coingecko.com/coins/images/5/large/dogecoin.png",
  toncoin: "https://assets.coingecko.com/coins/images/17980/large/ton-logo.png",
  cardano: "https://assets.coingecko.com/coins/images/975/large/cardano.png",
  "shiba-inu":
    "https://assets.coingecko.com/coins/images/11939/large/shiba.png",
};

const getCoinImage = (id: string) => COIN_LOGOS[id] ?? "";

// ================ Fallback Static Data ================
const generateFallbackCoins = (
  tomanRate: number,
): Omit<Coin, "history24h" | "history7d" | "history30d">[] => {
  const basePrices: Record<string, number> = {
    bitcoin: 94250,
    ethereum: 3120.5,
    tether: 1,
    solana: 184.2,
    binancecoin: 585.4,
    ripple: 1.12,
    dogecoin: 0.385,
    toncoin: 5.62,
    cardano: 0.725,
    "shiba-inu": 0.0000245,
  };

  return Object.keys(COIN_METADATA).map((id) => {
    const price = basePrices[id] || 0;
    return {
      id,
      name:
        id === "binancecoin" ? "BNB" : id.charAt(0).toUpperCase() + id.slice(1),
      nameFa: COIN_METADATA[id].nameFa,
      symbol: id === "binancecoin" ? "BNB" : id.slice(0, 3).toUpperCase(),
      image: getCoinImage(id),
      priceUsd: price,
      priceIrt: Math.round(price * tomanRate),
      change24h: 0,
      high24h: price * 1.05,
      low24h: price * 0.95,
      volume24hUsd: 0,
      volume24hIrt: 0,
      sparkline: [],
      marketCapUsd: 0,
      circulatingSupply: 0,
      maxSupply: null,
      descriptionFa: COIN_METADATA[id].descriptionFa,
    };
  });
};

// ================ Hook ================
export const useCrypto = () => {
  const [tomanRate, setTomanRate] = useState<number>(60000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [coins, setCoins] = useState<Coin[]>([]);

  // ===== Build Coin Object from Live Data =====
  const buildCoinFromLive = (liveCoin: any, toman: number): Coin => {
    const id = liveCoin.id;
    const meta = COIN_METADATA[id] || {
      nameFa: liveCoin.name,
      descriptionFa: "",
    };
    const price = liveCoin.current_price || 0;

    return {
      id,
      name: liveCoin.name,
      nameFa: meta.nameFa,
      symbol: liveCoin.symbol.toUpperCase(),
      image: liveCoin.image || getCoinImage(id),
      priceUsd: price,
      priceIrt: Math.round(price * toman),
      change24h: Number((liveCoin.price_change_percentage_24h || 0).toFixed(2)),
      high24h: liveCoin.high_24h || price * 1.05,
      low24h: liveCoin.low_24h || price * 0.95,
      volume24hUsd: liveCoin.total_volume || 0,
      volume24hIrt: Math.round((liveCoin.total_volume || 0) * toman),
      sparkline: liveCoin.sparkline_in_7d?.price?.slice(-20) || [],
      marketCapUsd: liveCoin.market_cap || 0,
      circulatingSupply: liveCoin.circulating_supply || 0,
      maxSupply: liveCoin.max_supply || null,
      descriptionFa: meta.descriptionFa || "",
      history24h: generateHistoryData(price, 24, 0.04, "24h"),
      history7d: generateHistoryData(price, 7, 0.08, "7d"),
      history30d: generateHistoryData(price, 30, 0.15, "30d"),
    };
  };

  // ===== Build Coin from Fallback =====
  const buildCoinFromFallback = (staticCoin: any, toman: number): Coin => {
    const price = staticCoin.priceUsd || 0;
    return {
      ...staticCoin,
      priceIrt: Math.round(price * toman),
      volume24hIrt: Math.round((staticCoin.volume24hUsd || 0) * toman),
      history24h: generateHistoryData(price, 24, 0.04, "24h"),
      history7d: generateHistoryData(price, 7, 0.08, "7d"),
      history30d: generateHistoryData(price, 30, 0.15, "30d"),
    };
  };

const fetchExchangeRate = useCallback(async () => {
  try {
    const response = await fetch(
      "https://api.bitpin.org/api/v1/mkt/tickers/"
    );

    const data = await response.json();

    const usdt = data.find(
      (item: any) => item.symbol === "USDT_IRT"
    );

    if (usdt?.price) {
      const tomanRate = Math.round(Number(usdt.price));

      setTomanRate(tomanRate);

      console.log("USDT/IRT:", tomanRate);
    }
  } catch (error) {
    console.error("Bitpin Error:", error);
  }
}, []);
  // ===== Fetch Live Coin Data =====
  const fetchLiveData = useCallback(async () => {
    setIsLoading(true);
    try {
      const coinIds = Object.keys(COIN_METADATA).join(",");
      const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${coinIds}&order=market_cap_desc&sparkline=true&price_change_percentage=24h&x_cg_demo_api_key=CG-KqFjEKcb2vKTceuRZMf5YtkQ`;
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`CoinGecko HTTP Error: ${response.status}`);
      }

      const data = await response.json();
      if (Array.isArray(data) && data.length > 0) {
        const liveCoins = data.map((item: any) =>
          buildCoinFromLive(item, tomanRate),
        );
        setCoins(liveCoins);
        setIsError(false);
      } else {
        throw new Error("No data received from CoinGecko");
      }
    } catch (err) {
      console.warn("CoinGecko API error, using fallback data:", err);
      setIsError(true);

      // Use fallback data
      if (coins.length === 0) {
        const fallbackStatic = generateFallbackCoins(tomanRate);
        const fallbackCoins = fallbackStatic.map((item) =>
          buildCoinFromFallback(item, tomanRate),
        );
        setCoins(fallbackCoins);
      }
    } finally {
      setIsLoading(false);
    }
  }, [tomanRate, coins.length]);

  // ===== Effect: Fetch on Mount =====
  useEffect(() => {
    fetchExchangeRate();
    fetchLiveData();

    const priceInterval = window.setInterval(fetchLiveData, 30000);
    const rateInterval = window.setInterval(fetchExchangeRate, 600000);

    return () => {
      window.clearInterval(priceInterval);
      window.clearInterval(rateInterval);
    };
  }, [fetchExchangeRate, fetchLiveData]);

  // ===== Effect: Update IRT prices when Toman rate changes =====
  useEffect(() => {
    setCoins((prevCoins) =>
      prevCoins.map((coin) => ({
        ...coin,
        priceIrt: Math.round(coin.priceUsd * tomanRate),
        volume24hIrt: Math.round(coin.volume24hUsd * tomanRate),
      })),
    );
  }, [tomanRate]);

  return { coins, tomanRate, isLoading, isError, refetch: fetchLiveData };
};
