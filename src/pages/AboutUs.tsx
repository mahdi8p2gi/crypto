import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Users, Target, Activity } from 'lucide-react';
import { Card } from '../components/common/Card';

export const AboutUs: React.FC = () => {
  const coreValues = [
    {
      icon: <ShieldCheck className="text-primary" size={24} />,
      title: 'امنیت خلل‌ناپذیر دارایی‌ها',
      description: 'زرین‌اکس مجهز به سیستم‌های ذخیره‌سازی سرد چندامضایی است که امنیت دارایی‌های دیجیتال کاربران را تضمین می‌کند.'
    },
    {
      icon: <Users className="text-primary" size={24} />,
      title: 'تمرکز بر تجربه و رضایت کاربر',
      description: 'ما ساده‌سازی فرایندهای پیچیده و ارائه پشتیبانی واقعی ۲۴ساعته را سرلوحه تمام تصمیمات خود قرار داده‌ایم.'
    },
    {
      icon: <Target className="text-primary" size={24} />,
      title: 'شفافیت و صداقت در عملکرد',
      description: 'ما متعهد به شفاف‌سازی در کلیه هزینه‌ها، نرخ‌های کارمزد و فرآیندهای مالی بدون هزینه‌های پنهان هستیم.'
    },
    {
      icon: <Activity className="text-primary" size={24} />,
      title: 'نوآوری و توسعه همیشگی',
      description: 'ارائه مدرن‌ترین ابزارهای معاملاتی و انطباق مستمر با آخرین دستاوردهای صنعت فین‌تک در دنیا.'
    }
  ];

  const milestones = [
    {
      year: '۱۴۰۰',
      title: 'تاسیس و راه‌اندازی اولیه',
      description: 'شروع کار زرین‌اکس با تیمی متشکل از متخصصان امنیت سایبری و بلاک‌چین دانشگاه صنعتی شریف.'
    },
    {
      year: '۱۴۰۲',
      title: 'راه‌اندازی ذخیره‌سازی کاملاً سرد',
      description: 'پیاده‌سازی موفقیت‌آمیز سیستم اختصاصی کیف‌پول سرد چندامضایی به عنوان اولین صرافی ایرانی مجهز به این سطح از امنیت.'
    },
    {
      year: '۱۴۰۳',
      title: 'مرز ۱۰۰,۰۰۰ کاربر فعال',
      description: 'استقبال گسترده سرمایه‌گذاران و توسعه‌دهندگان ایرانی و گسترش بازارهای معاملاتی به بیش از ۵۰ رمزارز.'
    },
    {
      year: '۱۴۰۵',
      title: 'ادغام فناوری‌های هوش مصنوعی',
      description: 'راه‌اندازی سیستم احراز هویت آنی خودکار مبتنی بر AI و پیاده‌سازی موتور تطبیق سفارشات جدید فوق سریع.'
    }
  ];

  const teamMembers = [
    {
      name: 'دکتر علیرضا کریمی',
      role: 'هم‌بنیان‌گذار و مدیرعامل',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop',
      bio: 'فارغ‌التحصیل دکترای فناوری اطلاعات دانشگاه تهران، با ۱۰ سال سابقه مدیریت پروژه‌های فین‌تک.'
    },
    {
      name: 'مهندس رضا سهرابی',
      role: 'مدیر ارشد فناوری (CTO)',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&h=200&fit=crop',
      bio: 'متخصص معماری بلاک‌چین و سیستم‌های توزیع‌شده با سابقه فعالیت در توسعه پلتفرم‌های بین‌المللی.'
    },
    {
      name: 'سارا احمدی',
      role: 'مدیر امنیت اطلاعات (CISO)',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=200&h=200&fit=crop',
      bio: 'پژوهشگر امنیت سایبری و متخصص در طراحی دیوارهای آتشین نفوذناپذیر و ممیزی سیستم‌های مالی.'
    },
    {
      name: 'امیرحسین رضایی',
      role: 'مدیر پشتیبانی و ارتباطات',
      image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=200&h=200&fit=crop',
      bio: 'رهبر پرانرژی تیم پشتیبانی با تعهد بالا در جلب حداکثر رضایت و پاسخ‌دهی موثر به کاربران.'
    }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-16 bg-gradient-to-br from-slate-900 to-slate-950 dark:from-[#13161D] dark:to-[#0A0B0E] border border-slate-800 p-8 sm:p-12 md:p-16 text-white text-center">
          <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-primary to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-primary to-transparent" />
          
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              درباره زرین‌اکس
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black leading-tight text-white">
              داستان یک رویا: ایجاد امن‌ترین صرافی رمزارز ایرانی
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              زرین‌اکس با هدف از بین بردن محدودیت‌های معاملاتی کاربران ایرانی و ساخت پلتفرمی در تراز جهانی پا به عرصه گذاشت. ما معتقدیم که دسترسی به بازارهای مالی حق مسلم هر ایرانی است.
            </p>
          </div>
        </div>

        {/* Core Values */}
        <div className="space-y-12 mb-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              ارزش‌های بنیادین ما
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              ما در زرین‌اکس مسیرمان را بر پایه ارزش‌های محکم و اصولی ترسیم کرده‌ایم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => (
              <Card key={idx} variant="default" padding="lg" className="border border-slate-100 dark:border-border-dark flex flex-col items-start gap-4">
                <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-2xl">
                  {val.icon}
                </div>
                <h3 className="text-base font-bold text-slate-800 dark:text-white">
                  {val.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-550 dark:text-slate-455">
                  {val.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Milestones / Story Timeline */}
        <div className="space-y-12 mb-20">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              مسیر رشد و دستاوردها
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              نگاهی گذرا به مهم‌ترین قدم‌هایی که در طول سال‌ها فعالیت در کنار شما برداشته‌ایم.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {/* Connecting line on desktop */}
            <div className="hidden lg:block absolute top-10 left-12 right-12 h-0.5 bg-slate-200 dark:bg-border-dark z-0" />
            
            {milestones.map((milestone, idx) => (
              <Card key={idx} variant="gradient" padding="lg" className="relative z-10 flex flex-col items-start gap-3">
                <div className="flex items-center gap-3 w-full">
                  <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center text-slate-950 font-black text-sm shadow-md shadow-primary/15 shrink-0">
                    {milestone.year}
                  </div>
                  <div className="h-px bg-slate-200 dark:bg-border-dark flex-1 lg:hidden" />
                </div>
                <h3 className="text-sm font-bold text-slate-800 dark:text-white mt-2">
                  {milestone.title}
                </h3>
                <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                  {milestone.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Meet The Team */}
        <div className="space-y-12">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 dark:text-white">
              تیم راهبری زرین‌اکس
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2">
              متخصصانی دلسوز و متعهد که هر روز برای ارتقا و امنیت تجارب مالی شما تلاش می‌کنند.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, idx) => (
              <Card key={idx} variant="default" padding="none" className="border border-slate-100 dark:border-border-dark flex flex-col items-center text-center overflow-hidden group">
                {/* Member Photo */}
                <div className="w-full h-48 overflow-hidden relative bg-slate-105">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent" />
                </div>
                {/* Member Info */}
                <div className="p-5 space-y-2">
                  <h3 className="text-base font-bold text-slate-800 dark:text-white">
                    {member.name}
                  </h3>
                  <span className="inline-block text-xs font-semibold text-primary px-2.5 py-0.5 bg-primary/10 rounded-full border border-primary/20">
                    {member.role}
                  </span>
                  <p className="text-[11px] leading-relaxed text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-border-dark">
                    {member.bio}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>

      </div>
    </motion.div>
  );
};
