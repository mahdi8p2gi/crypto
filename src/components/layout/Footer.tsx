import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Send, Phone, Mail, MapPin, Shield, CheckCircle2, ChevronLeft } from 'lucide-react';
import { Button } from '../common/Button';
import { Input } from '../common/Input';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim() && email.includes('@')) {
      setNewsletterSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-slate-50 dark:bg-[#0B0C0E] border-t border-slate-150 dark:border-border-dark pt-16 pb-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12 mb-12">
          
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-6">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 bg-gradient-to-tr from-primary to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25">
                <span className="text-slate-950 font-black text-xl">Z</span>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                زرین‌<span className="text-primary">اکس</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-500 dark:text-slate-400 max-w-md">
              زرین‌اکس به عنوان یکی از پیشگامان پلتفرم‌های تبادل رمزارز در ایران، با ارائه زیرساخت‌های امن، ابزارهای معاملاتی حرفه‌ای و پشتیبانی ۲۴ ساعته، فضایی ایده‌آل را برای سرمایه‌گذاری کاربران فراهم آورده است. امنیت دارایی‌های شما، مهم‌ترین ماموریت ماست.
            </p>
            
            {/* Trust highlights */}
            <div className="flex flex-wrap gap-4 pt-2">
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-card-dark px-3 py-2 rounded-xl border border-slate-100 dark:border-border-dark">
                <Shield size={14} className="text-primary" />
                <span>ذخیره‌سازی کاملاً سرد</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-white dark:bg-card-dark px-3 py-2 rounded-xl border border-slate-100 dark:border-border-dark">
                <CheckCircle2 size={14} className="text-emerald-500" />
                <span>تضمین نقدینگی بازار</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-5 relative inline-block">
              دسترسی سریع
              <span className="absolute bottom-[-6px] right-0 w-6 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-3.5">
              {[
                { name: 'بازارهای رمزارز', path: '/markets' },
                { name: 'درباره زرین‌اکس', path: '/about' },
                { name: 'راهنمای استفاده', path: '#' },
                { name: 'قوانین و مقررات', path: '#' },
                { name: 'سوالات متداول', path: '#' },
              ].map((link, i) => (
                <li key={i}>
                  <Link
                    to={link.path}
                    className="text-xs text-slate-500 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors flex items-center gap-1.5 group"
                  >
                    <ChevronLeft size={10} className="opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-5 relative inline-block">
              ارتباط با ما
              <span className="absolute bottom-[-6px] right-0 w-6 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <ul className="space-y-4 text-xs text-slate-500 dark:text-slate-400">
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-primary shrink-0 mt-0.5" />
                <span className="leading-relaxed">تهران، شاهین‌شهر، بلوار فناوری، پارک علم و فناوری دانشگاه تهران، ساختمان امیرکبیر</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-primary shrink-0" />
                <span dir="ltr" className="hover:text-primary transition-colors">+۹۸ ۲۱ ۹۱۰۱ ۸۸۸۸</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-primary shrink-0" />
                <span className="hover:text-primary transition-colors">support@zarrinex.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div>
            <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-5 relative inline-block">
              خبرنامه تخصصی
              <span className="absolute bottom-[-6px] right-0 w-6 h-0.5 bg-primary rounded-full"></span>
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed mb-4">
              با عضویت در خبرنامه زرین‌اکس، از تحلیل‌های بازار، کمپین‌ها و رویدادهای ویژه زودتر از همه باخبر شوید.
            </p>
            {newsletterSubscribed ? (
              <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-xl text-xs flex items-center gap-2">
                <CheckCircle2 size={16} />
                <span>ایمیل شما با موفقیت ثبت شد!</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-2">
                <Input
                  type="email"
                  placeholder="ایمیل شما (مثال: email@domain.com)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="text-xs text-left placeholder:text-right"
                  required
                />
                <Button variant="primary" size="sm" className="w-full" type="submit" icon={<Send size={12} />} iconPosition="left">
                  عضویت در خبرنامه
                </Button>
              </form>
            )}
          </div>

        </div>

        {/* Divider */}
        <div className="h-px bg-slate-200 dark:bg-border-dark my-8"></div>

        {/* Bottom Bar: Copyright & Badges */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          
          <p className="text-xs text-slate-400 dark:text-slate-500 text-center md:text-right leading-relaxed">
            کلیه حقوق مادی و معنوی این وب‌سایت متعلق به شرکت زرین اندیشان فناوری اطلاعات فردا (سهامی خاص) می‌باشد. © ۱۴۰۴
          </p>

          {/* Premium Tech Trust Badges */}
          <div className="flex items-center gap-3">
            {/* Mock Enamad */}
            <div className="w-12 h-12 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl flex items-center justify-center shadow-sm p-1">
              <svg className="w-full h-full text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
              </svg>
            </div>
            {/* Mock Samandehi */}
            <div className="w-12 h-12 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl flex items-center justify-center shadow-sm p-1">
              <svg className="w-full h-full text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"/>
              </svg>
            </div>
            {/* Mock Fintech Association */}
            <div className="w-12 h-12 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl flex items-center justify-center shadow-sm p-1">
              <svg className="w-full h-full text-slate-300 dark:text-slate-700" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
          </div>

        </div>

      </div>
    </footer>
  );
};
