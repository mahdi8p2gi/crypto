import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smartphone, Code, TrendingUp, ShieldCheck, ArrowUpRight, Check } from 'lucide-react';
import { Card } from '../../../components/common/Card';
import { Button } from '../../../components/common/Button';

interface FeatureTab {
  id: string;
  title: string;
  icon: React.ReactNode;
  heading: string;
  description: string;
  bullets: string[];
  ctaText: string;
  ctaLink: string;
  tag: string;
}

export const Features: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('spot');

  const tabs: FeatureTab[] = [
    {
      id: 'spot',
      title: 'معاملات حرفه‌ای (Spot)',
      icon: <TrendingUp size={18} />,
      tag: 'برای معامله‌گران با تجربه',
      heading: 'پنل کاربری پیشرفته مجهز به دفتر سفارشات جهانی',
      description: 'با پنل اسپات زرین‌اکس، سفارشات محدود (Limit)، حد ضرر (Stop-Limit) و سفارش بازار (Market) را با بالاترین سرعت و عمق بازار فوق‌العاده اجرا کنید.',
      bullets: [
        'نمودارهای زنده متصل به TradingView',
        'دفتر سفارشات (Order Book) آنی و پرسرعت',
        'امکان ایجاد سفارشات شرطی و پیشرفته',
        'کارمزدهای رقابتی متناسب با حجم معاملات ماهانه'
      ],
      ctaText: 'شروع معامله اسپات',
      ctaLink: '/markets'
    },
    {
      id: 'otc',
      title: 'خرید و فروش آسان (OTC)',
      icon: <ShieldCheck size={18} />,
      tag: 'سریع‌ترین روش مبادله',
      heading: 'تبادل آنی رمزارزها با قیمت قطعی و بدون کارمزد اضافی',
      description: 'اگر می‌خواهید بدون درگیر شدن با جزئیات بازار و به سرعت رمزارزهای خود را تبدیل کنید، بخش خرید آسان بهترین گزینه برای شماست.',
      bullets: [
        'تبدیل تومن به رمزارز و برعکس در کسری از ثانیه',
        'عدم نیاز به انتظار برای تطبیق سفارش در بازار',
        'قیمت‌گذاری شفاف و تضمین‌شده بدون نوسان لحظه‌ای',
        'پشتیبانی از بیش از ۸۰ رمزارز محبوب دنیا'
      ],
      ctaText: 'خرید و فروش آنی',
      ctaLink: '/login'
    },
    {
      id: 'mobile',
      title: 'اپلیکیشن اختصاصی موبایل',
      icon: <Smartphone size={18} />,
      tag: 'همیشه همراه شما',
      heading: 'بازار ارزهای دیجیتال در جیب شما، در هر زمان و مکان',
      description: 'با دانلود اپلیکیشن موبایل زرین‌اکس برای سیستم‌عامل‌های اندروید و iOS، فرصت‌های طلایی بازار را هیچ‌گاه از دست نخواهید داد.',
      bullets: [
        'طراحی فوق‌العاده روان و بهینه‌شده برای گوشی‌های هوشمند',
        'دریافت اعلانات و هشدارهای لحظه‌ای تغییر قیمت‌ها',
        'احراز هویت بیومتریک (اثر انگشت و تشخیص چهره)',
        'کیف پول داخلی فوق‌العاده امن با دسترسی همیشگی'
      ],
      ctaText: 'دانلود اپلیکیشن',
      ctaLink: '#'
    },
    {
      id: 'api',
      title: 'مستندات حرفه‌ای API',
      icon: <Code size={18} />,
      tag: 'برای توسعه‌دهندگان و الگوتریدرها',
      heading: 'اتصال قدرتمند و پایدار با کمترین تاخیر زمانی (Latency)',
      description: 'پلتفرم زرین‌اکس با ارائه مستندات جامع API (Restful & Websocket)، امکان پیاده‌سازی ربات‌های معامله‌گر و سیستم‌های تحلیل الگوریتمی را فراهم ساخته است.',
      bullets: [
        'ارسال اطلاعات بازار با پروتکل WebSocket به صورت آنی',
        'مستندات کامل به زبان‌های Python, JS, Go و PHP',
        'امنیت فوق‌العاده بالا با کلیدهای اختصاصی API Keys',
        'نرخ محدودیت درخواست (Rate Limit) بسیار بالا'
      ],
      ctaText: 'مشاهده مستندات API',
      ctaLink: '#'
    }
  ];

  const activeContent = tabs.find((t) => t.id === activeTab)!;

  return (
    <section className="py-20 bg-slate-50 dark:bg-[#0C0D10] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            امکانات و ابزارهای معاملاتی تراز اول
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
            از یک صرافی پیشرفته رمزارز انتظار چه چیزهایی دارید؟ ما تمام ابزارهای مورد نیاز برای یک معامله امن و حرفه‌ای را برایتان فراهم کرده‌ایم.
          </p>
        </div>

        {/* Features Showcase Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left: Tab selectors */}
          <div className="lg:col-span-4 space-y-3.5">
            {tabs.map((tab) => {
              const isSelected = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-4 p-4.5 rounded-2xl border text-right transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-white dark:bg-card-dark border-primary/30 shadow-md shadow-primary/5 text-slate-800 dark:text-white'
                      : 'bg-slate-100/50 dark:bg-slate-900/30 border-transparent text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-900/60'
                  }`}
                >
                  <div className={`p-2.5 rounded-xl border transition-colors ${
                    isSelected
                      ? 'bg-primary/10 border-primary/20 text-primary'
                      : 'bg-slate-200/50 dark:bg-slate-800 border-slate-300/30 text-slate-500 dark:text-slate-400'
                  }`}>
                    {tab.icon}
                  </div>
                  <div className="flex-1">
                    <span className="block text-sm font-bold">{tab.title}</span>
                    <span className="block text-[10px] text-slate-400 dark:text-slate-500 mt-1">
                      {tab.tag}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right: Tab content display */}
          <div className="lg:col-span-8">
            <Card variant="default" padding="lg" className="min-h-[420px] flex flex-col justify-between border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 10 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-6"
                >
                  {/* Badge & Title */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-extrabold text-primary px-2.5 py-1 bg-primary/10 rounded-full">
                      {activeContent.tag}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white pt-1">
                      {activeContent.heading}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                    {activeContent.description}
                  </p>

                  {/* Bullet List */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                    {activeContent.bullets.map((bullet, idx) => (
                      <div key={idx} className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
                        <div className="w-5 h-5 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 shrink-0">
                          <Check size={12} />
                        </div>
                        <span>{bullet}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* CTA Action */}
              <div className="pt-8 mt-8 border-t border-slate-100 dark:border-border-dark flex flex-wrap gap-4 items-center justify-between">
                {activeTab === 'mobile' ? (
                  <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button variant="primary" size="md" className="flex-1 sm:flex-none">دانلود اندروید</Button>
                    <Button variant="outline" size="md" className="flex-1 sm:flex-none">دانلود iOS</Button>
                  </div>
                ) : (
                  <Button variant="primary" size="md" icon={<ArrowUpRight size={16} />} iconPosition="left">
                    {activeContent.ctaText}
                  </Button>
                )}
                
                <span className="text-[11px] text-slate-400 dark:text-slate-500">
                  {activeTab === 'spot' || activeTab === 'otc' ? 'معامله در بازارهای زرین‌اکس شامل ریسک است.' : ''}
                </span>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </section>
  );
};
