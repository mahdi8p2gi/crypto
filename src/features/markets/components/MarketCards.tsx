import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Sparkline } from '../../home/components/PopularCoins';
import { Coin } from '../../../hooks/useCrypto';

interface MarketCardsProps {
  coins: Coin[];
}

export const MarketCards: React.FC<MarketCardsProps> = ({ coins }) => {
  // Take top 4 coins for high-visibility market cards
  const highlightSymbols = ['BTC', 'ETH', 'SOL', 'TON'];
  const highlightCoins = coins.filter(c => highlightSymbols.includes(c.symbol));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
      {highlightCoins.map((coin) => {
        const isPositive = coin.change24h >= 0;
        const changeColor = isPositive ? '#10B981' : '#EF4444';

        return (
          <Link to={`/coin/${coin.id}`} key={coin.id} className="block">
            <Card
              variant="default"
              hoverEffect={true}
              className="border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D] relative overflow-hidden h-full"
            >
              {/* Ambient neon light for cards */}
              <div className={`absolute top-0 right-0 w-24 h-1 rounded-full ${
                isPositive ? 'bg-emerald-500/35' : 'bg-red-500/35'
              }`} />

              <div className="space-y-4">
                {/* Header: Name & Symbol */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-200">
                      {coin.symbol}
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500">{coin.nameFa}</h4>
                      <span className="text-sm font-extrabold text-slate-800 dark:text-slate-100">{coin.symbol}/IRT</span>
                    </div>
                  </div>
                  
                  {/* 24h Change Badge */}
                  <span className={`px-2 py-0.5 rounded-lg text-[10px] font-bold flex items-center gap-0.5 ${
                    isPositive
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-red-500/10 text-red-500'
                  }`}>
                    {isPositive ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                    <span dir="ltr">{coin.change24h}%</span>
                  </span>
                </div>

                {/* Price Display */}
                <div className="space-y-1">
                  <p className="text-xl font-black text-slate-900 dark:text-white tracking-wide">
                    {coin.priceIrt.toLocaleString('fa-IR')} <span className="text-xs font-semibold text-slate-450 dark:text-slate-500">تومان</span>
                  </p>
                  <p className="text-xs text-slate-400 dark:text-slate-500 font-medium">
                    ${coin.priceUsd.toLocaleString('en-US')}
                  </p>
                </div>

                {/* Sparkline & Details */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-150 dark:border-slate-800">
                  <div className="text-[10px] text-slate-400 dark:text-slate-500 space-y-0.5">
                    <p>بالاترین ۲۴ ساعت: <span className="font-bold">${coin.high24h.toLocaleString()}</span></p>
                    <p>پایین‌ترین ۲۴ ساعت: <span className="font-bold">${coin.low24h.toLocaleString()}</span></p>
                  </div>
                  <div className="shrink-0 scale-90 -mr-2">
                    <Sparkline data={coin.sparkline} color={changeColor} />
                  </div>
                </div>

              </div>
            </Card>
          </Link>
        );
      })}
    </div>
  );
};
