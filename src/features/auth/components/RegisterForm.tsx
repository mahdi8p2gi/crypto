import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Lock, Eye, EyeOff, ShieldCheck, ArrowLeft } from 'lucide-react';
import { Input } from '../../../components/common/Input';
import { Button } from '../../../components/common/Button';

export const RegisterForm: React.FC = () => {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Validation States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [termsError, setTermsError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setPasswordError('');
    setTermsError('');

    // Name validation
    if (!name.trim()) {
      setNameError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      isValid = false;
    }

    // Email validation
    if (!email) {
      setEmailError('لطفاً آدرس ایمیل خود را وارد کنید.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('فرمت آدرس ایمیل معتبر نیست.');
      isValid = false;
    }

    // Phone validation (Iranian mobile format: e.g. 09123456789)
    if (!phone) {
      setPhoneError('لطفاً شماره تلفن همراه خود را وارد کنید.');
      isValid = false;
    } else if (!/^09\d{9}$/.test(phone)) {
      setPhoneError('شماره تلفن همراه باید با 09 شروع شده و ۱۱ رقم باشد.');
      isValid = false;
    }

    // Password validation
    if (!password) {
      setPasswordError('لطفاً یک رمز عبور وارد کنید.');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('رمز عبور باید حداقل ۶ کاراکتر باشد.');
      isValid = false;
    }

    // Terms validation
    if (!acceptTerms) {
      setTermsError('پذیرش قوانین و مقررات صرافی الزامی است.');
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
      
      const mockUser = {
        email,
        name,
        phone,
        token: 'mock-jwt-token-registered-456'
      };

      // Save user to localStorage (Auto-login)
      localStorage.setItem('zarrinex_user', JSON.stringify(mockUser));
      
      // Dispatch storage event to update navbar instantly
      window.dispatchEvent(new Event('storage'));

      // Redirect to markets page
      navigate('/markets');
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
        <h2 className="text-2xl font-black text-slate-900 dark:text-white">ایجاد حساب کاربری</h2>
        <p className="text-xs text-slate-400 dark:text-slate-500">
          با ثبت‌نام در زرین‌اکس، سفر مالی خود را با امنیت کامل آغاز کنید.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
        <Input
          label="نام و نام خانوادگی"
          type="text"
          placeholder="مثال: علی محمدی"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={nameError}
          startIcon={<User size={18} className="text-slate-400" />}
        />

        {/* Email */}
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

        {/* Phone */}
        <Input
          label="شماره تلفن همراه"
          type="tel"
          placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          error={phoneError}
          className="text-left font-semibold"
          startIcon={<Phone size={18} className="text-slate-400" />}
        />

        {/* Password */}
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

        {/* Terms and conditions Checkbox */}
        <div className="flex flex-col gap-1 pt-2">
          <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-600 dark:text-slate-400">
            <input
              type="checkbox"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              className="mt-0.5 rounded border-slate-300 dark:border-slate-700 text-primary focus:ring-primary/20 cursor-pointer"
            />
            <span className="leading-relaxed select-none">
              با ثبت‌نام در زرین‌اکس،{' '}
              <a href="#" className="text-primary font-semibold hover:underline">
                قوانین و مقررات صرافی
              </a>{' '}
              و شرایط استفاده از خدمات را می‌پذیرم.
            </span>
          </label>
          {termsError && <span className="text-xs text-red-500 mr-1 mt-1">{termsError}</span>}
        </div>

        {/* Submit Button */}
        <Button
          type="submit"
          variant="primary"
          size="lg"
          className="w-full text-slate-950 shadow-lg shadow-primary/15 mt-2"
          isLoading={isLoading}
        >
          ایجاد حساب و شروع معاملات
        </Button>
      </form>

      {/* Switch to login */}
      <div className="text-center pt-4 border-t border-slate-100 dark:border-border-dark space-y-4">
        <p className="text-xs text-slate-500 dark:text-slate-400">
          قبلاً ثبت‌نام کرده‌اید؟{' '}
          <Link to="/login" className="font-bold text-primary hover:underline">
            ورود به حساب کاربری
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
        <span>احراز هویت پیامکی به محض ثبت نام انجام خواهد شد.</span>
      </div>

    </motion.div>
  );
};
