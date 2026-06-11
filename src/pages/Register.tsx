import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Sparkles, UserPlus } from 'lucide-react';
import { RegisterForm } from '../features/auth/components/RegisterForm';

export const Register: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-24 pb-16 bg-slate-50 dark:bg-bg-dark flex items-center justify-center transition-colors duration-300"
    >
      <div className="max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Side: Premium Fintech Banner (Desktop Only) */}
          <div className="hidden lg:flex lg:col-span-6 flex-col justify-center space-y-8 text-right p-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary">
                <Sparkles size={12} />
                <span>عضویت رایگان و دریافت پاداش نقدی</span>
              </div>
              
              <h1 className="text-4xl font-black text-slate-900 dark:text-white leading-tight">
                شروع یک سرمایه‌گذاری <br />
                امن و هوشمندانه در <span className="text-primary">زرین‌اکس</span>
              </h1>
              
              <p className="text-sm text-slate-500 dark:text-slate-405 leading-relaxed">
                با عضویت در صرافی زرین‌اکس، علاوه بر دسترسی به امن‌ترین زیرساخت مبادله رمزارز در ایران، از پاداش اولین واریز و معامله بدون کارمزد بهره‌مند شوید.
              </p>
            </div>

            {/* Core Selling Points */}
            <div className="space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
                  <UserPlus size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">ثبت‌نام آنی زیر ۱ دقیقه</h4>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    تنها با وارد کردن شماره موبایل و کدملی، فرآیند ثبت‌نام خود را در سریع‌ترین زمان تکمیل کنید.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-primary/10 rounded-xl text-primary shrink-0">
                  <Shield size={18} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">احراز هویت هوشمند</h4>
                  <p className="text-xs text-slate-450 dark:text-slate-500 mt-1">
                    بررسی مدارک شما به صورت خودکار توسط سیستم هوش مصنوعی زرین‌اکس در کمتر از ۱۵ دقیقه انجام می‌شود.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side: Register Form */}
          <div className="lg:col-span-6 w-full">
            <RegisterForm />
          </div>

        </div>
      </div>
    </motion.div>
  );
};
