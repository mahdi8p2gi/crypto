import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

export const LoginForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Form Validation States
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [generalError, setGeneralError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    setEmailError('');
    setPasswordError('');
    setGeneralError('');

    // Email validation
    if (!email) {
      setEmailError('لطفاً آدرس ایمیل خود را وارد کنید.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('فرمت آدرس ایمیل وارد شده معتبر نیست.');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('لطفاً رمز عبور خود را وارد کنید.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Mock validation credentials: any valid-looking email + password (e.g. at least 6 chars)
      if (email && password.length >= 6) {
        const mockUser = {
          email,
          name: email.split('@')[0], // Extract username from email
          token: 'mock-jwt-token-12345'
        };
        // Save user to localStorage
        localStorage.setItem('zarrinex_user', JSON.stringify(mockUser));
        
        // Dispatch storage event to notify navbar instantly
        window.dispatchEvent(new Event('storage'));
        
        // Redirect to homepage or dashboard
        navigate('/markets');
      } else {
        setGeneralError('آدرس ایمیل یا رمز عبور اشتباه است.');
      }
    }, 1500);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-md mx-auto bg-white dark:bg-card-dark border border-slate-150 dark:border-border-dark rounded-3xl p-8 shadow-2xl space-y-6"
    >
      {/* Header */}
      <div className="text-center space-y-2">
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">ورود به حساب کاربری</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          برای دسترسی به پنل معاملات و مدیریت کیف پول، وارد شوید.
        </p>
      </div>

      {generalError && (
        <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-xs text-center font-bold">
          {generalError}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Email Input */}
        <Input
          label="پست الکترونیک (ایمیل)"
          type="email"
          placeholder="example@domain.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          error={emailError}
          className="text-left font-semibold"
          startIcon={<Mail size={18} className="text-slate-400" />}
        />

        {/* Password Input */}
        <div className="relative">
          <Input
            label="رمز عبور"
            type={showPassword ? 'text' : 'password'}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={passwordError}
            className="text-left font-semibold"
            startIcon={<Lock size={18} className="text-slate-400" />}
            endIcon={
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            }
          />
        </div>

        {/* Forgot password */}
        <div className="flex justify-end">
          <a href="#" className="text-xs font-semibold text-primary hover:underline">
            رمز عبور خود را فراموش کرده‌اید؟
          </a>
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-slate-950 shadow-lg shadow-primary/15"
          isLoading={isLoading}
        >
          ورود به حساب
        </Button>
      </form>

      {/* Footer / Switch to register */}
      <div className="text-center pt-4 border-t border-slate-100 dark:border-border-dark space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          هنوز در زرین‌اکس حساب ندارید؟{' '}
          <Link to="/register" className="font-bold text-primary hover:underline">
            ثبت‌نام سریع
          </Link>
        </p>

        {/* Back to Home */}
        <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors">
          <ArrowLeft size={12} />
          <span>بازگشت به خانه</span>
        </Link>
      </div>

      {/* Security Disclaimer */}
      <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900/50 p-2.5 rounded-xl border border-slate-100 dark:border-border-dark">
        <ShieldCheck size={14} className="text-emerald-500" />
        <span>ارتباط شما با سرور به صورت کاملاً رمزنگاری شده است.</span>
      </div>

    </motion.div>
  );
};
