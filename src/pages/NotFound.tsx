import React from 'react';
import { motion } from 'framer-motion';
import { Home, Compass, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/common/Button';

export const NotFound: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen flex items-center justify-center pt-24 pb-16 bg-slate-50 dark:bg-bg-dark transition-colors duration-300 relative overflow-hidden"
    >
      {/* Background Neon Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full bg-primary/10 blur-[120px] pointer-events-none" />

      <div className="max-w-md w-full mx-auto px-6 text-center space-y-8 relative z-10">
        
        {/* Animated 404 Visual */}
        <div className="relative">
          <motion.h1
            initial={{ scale: 0.8, rotate: -5 }}
            animate={{ scale: 1.05, rotate: 0 }}
            transition={{
              type: 'spring',
              stiffness: 100,
              damping: 10,
              repeat: Infinity,
              repeatType: 'reverse',
              duration: 2
            }}
            className="text-8xl font-black text-slate-200 dark:text-slate-800/60 select-none tracking-widest"
          >
            ۴۰۴
          </motion.h1>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-16 h-16 bg-primary/10 border border-primary/25 text-primary rounded-full flex items-center justify-center shadow-lg shadow-primary/10">
              <AlertCircle size={32} className="animate-pulse" />
            </div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-3">
          <h2 className="text-xl font-black text-slate-800 dark:text-white">صفحه مورد نظر یافت نشد!</h2>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
            متاسفیم، اما صفحه‌ای که به دنبال آن هستید وجود ندارد، حذف شده یا آدرس آن تغییر کرده است.
          </p>
        </div>

        {/* Navigation Actions */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link to="/" className="w-full sm:w-auto">
            <Button variant="primary" size="md" className="w-full sm:w-auto" icon={<Home size={16} />} iconPosition="left">
              بازگشت به صفحه اصلی
            </Button>
          </Link>
          <Link to="/markets" className="w-full sm:w-auto">
            <Button variant="outline" size="md" className="w-full sm:w-auto" icon={<Compass size={16} />} iconPosition="left">
              مشاهده بازارها
            </Button>
          </Link>
        </div>

      </div>
    </motion.div>
  );
};
