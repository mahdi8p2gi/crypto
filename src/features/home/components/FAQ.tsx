import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus, HelpCircle } from 'lucide-react';
import { Card } from '../../../components/common/Card';

interface FAQItem {
  question: string;
  answer: string;
}

export const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQItem[] = [
    {
      question: 'ثبت‌نام و احراز هویت در زرین‌اکس چقدر زمان می‌برد؟',
      answer: 'ثبت‌نام اولیه با شماره موبایل کمتر از ۱ دقیقه زمان می‌برد. فرآیند احراز هویت هوشمند در زرین‌اکس به صورت کاملاً خودکار و با استفاده از هوش مصنوعی انجام می‌شود؛ بنابراین بلافاصله پس از بارگذاری مدارک و حداکثر طی ۱۰ الی ۱۵ دقیقه حساب شما تایید و آماده معامله خواهد شد.'
    },
    {
      question: 'آیا برای واریز ریالی یا برداشت رمزارز کارمزدی دریافت می‌شود؟',
      answer: 'واریز ریالی به صرافی زرین‌اکس کاملاً رایگان و بدون کارمزد است. برای برداشت‌های ریالی نیز تنها کارمزد ناچیز مربوط به شتاب/پایا کسر می‌شود. کارمزد واریز رمزارز نیز صفر است و کارمزد برداشت رمزارز صرفاً شامل هزینه شبکه (Network Fee) بلاک‌چین مربوطه بوده و صرافی هیچ سود اضافی از آن دریافت نمی‌کند.'
    },
    {
      question: 'حداقل مبلغ برای شروع خرید و فروش چقدر است؟',
      answer: 'شما می‌توانید معاملات خود را در بخش خرید آسان با حداقل مبلغ ۱۰۰ هزار تومان آغاز کنید. در بازارهای حرفه‌ای (اسپات) نیز حداقل میزان معامله متناسب با هر رمزارز متغیر بوده و از معادل چند دلار شروع می‌شود.'
    },
    {
      question: 'زرین‌اکس چگونه امنیت دارایی‌های کاربران را تضمین می‌کند؟',
      answer: 'بیش از ۹۸٪ دارایی‌های رمزارزی کاربران در کیف‌پول‌های سرد (Cold Storage) و به صورت آفلاین نگهداری می‌شوند که دسترسی هکرها به آن‌ها غیرممکن است. همچنین زیرساخت‌های سرور ما با فایروال‌های پیشرفته چندلایه محافظت شده و قابلیت تایید دو مرحله‌ای (2FA) نیز امنیت حساب کاربری شما را دوچندان می‌کند.'
    },
    {
      question: 'کیف پول ریالی و رمزارزی زرین‌اکس چیست و چطور کار می‌کند؟',
      answer: 'پس از ثبت‌نام، به صورت خودکار یک کیف پول ریالی و بیش از ۸۰ کیف پول اختصاصی برای هر یک از رمزارزهای موجود در صرافی برای شما ایجاد می‌شود. شما می‌توانید مستقیماً رمزارزهای خود را در این کیف‌پول‌ها ذخیره، دریافت یا به کیف‌پول‌های شخصی دیگر ارسال کنید.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-white dark:bg-[#0F1115] transition-colors duration-300">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 border border-amber-500/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary mb-3">
            <HelpCircle size={14} />
            <span>پاسخ به سوالات شما</span>
          </div>
          <h2 className="text-3xl font-black text-slate-900 dark:text-white">
            سوالات متداول کاربران
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
            اگر سوالی در ذهن دارید، احتمالاً پاسخ آن را در گزینه‌های زیر پیدا خواهید کرد.
          </p>
        </div>

        {/* Collapsible FAQ Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = activeIndex === index;
            return (
              <Card
                key={index}
                variant="default"
                padding="none"
                className={`border border-slate-100 dark:border-border-dark overflow-hidden transition-all duration-200 ${
                  isOpen ? 'ring-1 ring-primary/20 bg-slate-50/20 dark:bg-card-dark/60' : ''
                }`}
              >
                {/* Accordion Trigger */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex items-center justify-between p-5 text-right font-bold text-sm sm:text-base text-slate-800 dark:text-slate-200 hover:text-primary dark:hover:text-primary transition-colors cursor-pointer"
                >
                  <span>{faq.question}</span>
                  <div className={`p-1.5 rounded-lg border transition-all ${
                    isOpen
                      ? 'bg-primary/10 border-primary/20 text-primary rotate-180'
                      : 'bg-slate-50 dark:bg-slate-900 border-slate-200/50 dark:border-slate-855 text-slate-400 dark:text-slate-500'
                  }`}>
                    {isOpen ? <Minus size={14} /> : <Plus size={14} />}
                  </div>
                </button>

                {/* Accordion Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' }}
                    >
                      <div className="px-5 pb-5 pt-1 border-t border-slate-100/50 dark:border-border-dark/50 text-xs sm:text-sm leading-relaxed text-slate-550 dark:text-slate-400">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            );
          })}
        </div>

      </div>
    </section>
  );
};
