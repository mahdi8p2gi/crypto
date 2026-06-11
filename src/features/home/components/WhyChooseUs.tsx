import React from 'react';
import { ShieldAlert, Zap, Percent, Headphones, CreditCard, Award } from 'lucide-react';
import { Card } from '../../../components/common/Card';

export const WhyChooseUs: React.FC = () => {
  const highlights = [
    {
      icon: <ShieldAlert className="text-amber-500" size={24} />,
      title: 'امنیت در سطح نظامی',
      description: 'ذخیره‌سازی سرد دارایی‌ها در کیف پول‌های چندامضایی به همراه پروتکل‌های امنیتی چندلایه برای حفاظت از حساب‌ها.'
    },
    {
      icon: <CreditCard className="text-amber-500" size={24} />,
      title: 'واریز و برداشت آنی ریالی',
      description: 'تسویه حساب ریالی سریع از طریق شبکه شتاب، ساتنا و پایا بدون معطلی و در تمامی ساعات شبانه‌روز.'
    },
    {
      icon: <Percent className="text-amber-500" size={24} />,
      title: 'کمترین کارمزد معاملات',
      description: 'کارمزدهای فوق‌العاده منصفانه و پله‌ای که متناسب با سطح معاملاتی شما تا صفر درصد کاهش می‌یابد.'
    },
    {
      icon: <Headphones className="text-amber-500" size={24} />,
      title: 'پشتیبانی تخصصی ۲۴ ساعته',
      description: 'تیم پشتیبانی فنی زرین‌اکس در تمامی ایام سال، حتی روزهای تعطیل به صورت آنلاین و تلفنی همراه شماست.'
    },
    {
      icon: <Zap className="text-amber-500" size={24} />,
      title: 'موتور تطبیق سفارش فوق سریع',
      description: 'اجرای سفارشات در کمتر از ۵ میلی‌ثانیه با توانایی پردازش بیش از ۱۰۰,۰۰۰ تراکنش بر ثانیه.'
    },
    {
      icon: <Award className="text-amber-500" size={24} />,
      title: 'رابط کاربری ساده و حرفه‌ای',
      description: 'طراحی مینیمال و کاربرپسند برای مبتدیان، در کنار ابزارهای تحلیل تکنیکال پیشرفته برای معامله‌گران حرفه‌ای.'
    }
  ];

  return (
    <section className="py-20 bg-white dark:bg-[#0F1115] transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full">
            مزیت‌های رقابتی زرین‌اکس
          </span>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white mt-4">
            چرا زرین‌اکس انتخاب اول معامله‌گران ایرانی است؟
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-3 text-sm leading-relaxed">
            ما با ترکیب فناوری‌های روز امنیت سایبری و زیرساخت‌های مالی پایدار، ایمن‌ترین و سریع‌ترین راهکار معامله رمزارز را در اختیارتان قرار می‌دهیم.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {highlights.map((item, index) => (
            <Card
              key={index}
              variant="default"
              hoverEffect={true}
              padding="lg"
              className="flex flex-col items-start space-y-4 border border-slate-100 dark:border-border-dark"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-slate-100 dark:border-border-dark flex items-center justify-center">
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-800 dark:text-white">
                {item.title}
              </h3>
              <p className="text-xs leading-relaxed text-slate-500 dark:text-slate-400">
                {item.description}
              </p>
            </Card>
          ))}
        </div>

      </div>
    </section>
  );
};
