import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, ShieldCheck, Users, HelpCircle } from 'lucide-react';
import { Button } from '../../../components/common/Button';

export const CTA: React.FC = () => {
  return (
    <section className="py-20 bg-white dark:bg-[#0F1115] relative overflow-hidden transition-colors duration-300">
      {/* Background Decorator Gradients */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] rounded-full bg-primary/10 blur-[140px] pointer-events-none" />
      
      <div className="max-w-5xl mx-auto px-4 sm:px-6 relative z-10">
        
        {/* Curved Card Container */}
        <div className="relative bg-gradient-to-br from-slate-900 to-slate-950 dark:from-[#13161D] dark:to-[#0A0B0E] border border-slate-800 rounded-3xl p-8 sm:p-12 md:p-16 text-center text-white shadow-2xl">
          {/* Accent Neon Border */}
          <div className="absolute top-0 right-0 w-32 h-0.5 bg-gradient-to-l from-primary to-transparent" />
          <div className="absolute bottom-0 left-0 w-32 h-0.5 bg-gradient-to-r from-primary to-transparent" />

          {/* Content */}
          <div className="max-w-3xl mx-auto space-y-6">
            <span className="text-xs font-bold text-primary px-3 py-1 bg-primary/10 rounded-full border border-primary/20">
              همین امروز معامله را شروع کنید
            </span>
            
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black leading-tight text-white">
              دروازه ورود شما به بازار جهانی ارزهای دیجیتال
            </h2>
            
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-2xl mx-auto">
              با ایجاد حساب کاربری در کمتر از یک دقیقه، به جمع بیش از ۲۰۰ هزار کاربر فعال صرافی زرین‌اکس بپیوندید و اولین معامله خود را با خیالی آسوده انجام دهید.
            </p>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link to="/register" className="w-full sm:w-auto">
                <Button variant="primary" size="lg" className="w-full sm:w-auto text-slate-950 shadow-lg shadow-primary/20" icon={<ArrowUpRight size={18} />} iconPosition="left">
                  ثبت نام و دریافت هدیه ورود
                </Button>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto">
                <Button variant="outline" size="lg" className="w-full sm:w-auto border-slate-700 text-slate-300 hover:bg-slate-900 hover:text-white">
                  مشاوره با کارشناسان
                </Button>
              </Link>
            </div>

            {/* Features Row */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 mt-8 border-t border-slate-800/60 text-slate-400 text-xs font-medium max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2">
                <ShieldCheck size={16} className="text-primary shrink-0" />
                <span>احراز هویت آنی زیر ۱۵ دقیقه</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <Users size={16} className="text-primary shrink-0" />
                <span>پشتیبانی تلفنی و چت آنلاین</span>
              </div>
              <div className="flex items-center justify-center gap-2">
                <HelpCircle size={16} className="text-primary shrink-0" />
                <span>شروع با هر میزان سرمایه</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
