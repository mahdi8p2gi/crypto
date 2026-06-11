import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate, Link } from 'react-router-dom';
import {
  User,
  ShieldAlert,
  Camera,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Key,
  Globe,
  Palette
} from 'lucide-react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';
import { ScrollReveal } from '../components/common/ScrollReveal';

// Avatars List
const AVATARS = [
  { id: 'gold', color: 'from-amber-400 to-primary', label: 'طلایی' },
  { id: 'cyan', color: 'from-cyan-400 to-blue-600', label: 'فیروزه‌ای' },
  { id: 'purple', color: 'from-fuchsia-500 to-purple-650', label: 'بنفش' },
  { id: 'emerald', color: 'from-emerald-400 to-teal-600', label: 'زمردی' }
];

export const UserProfile: React.FC = () => {
  const navigate = useNavigate();
  
  // Profile Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [nationalId, setNationalId] = useState('۰۰۲۴۸۹۶۵۷۳');
  const [selectedAvatar, setSelectedAvatar] = useState('gold');

  // Security preferences
  const [twoFaEnabled, setTwoFaEnabled] = useState(true);
  const [emailAlertEnabled, setEmailAlertEnabled] = useState(true);

  // Form feedback states
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Validation States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [nationalIdError, setNationalIdError] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('zarrinex_user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setName(parsed.name || '');
      setEmail(parsed.email || '');
      setPhone(parsed.phone || '۰۹۱۲۳۴۵۶۷۸۹');
      
      // Load saved avatar from localStorage if available
      const savedAvatar = localStorage.getItem('zarrinex_avatar');
      if (savedAvatar) setSelectedAvatar(savedAvatar);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setPhoneError('');
    setNationalIdError('');

    if (!name.trim()) {
      setNameError('لطفاً نام و نام خانوادگی خود را وارد کنید.');
      isValid = false;
    }

    if (!email) {
      setEmailError('لطفاً ایمیل خود را وارد کنید.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('فرمت آدرس ایمیل وارد شده معتبر نیست.');
      isValid = false;
    }

    if (!phone) {
      setPhoneError('لطفاً شماره تلفن همراه خود را وارد کنید.');
      isValid = false;
    } else if (!/^09\d{9}$/.test(phone) && !/^۰۹[۰-۹]{9}$/.test(phone)) {
      setPhoneError('شماره تلفن همراه وارد شده نامعتبر است.');
      isValid = false;
    }

    if (!nationalId.trim()) {
      setNationalIdError('وارد کردن کد ملی برای احراز هویت الزامی است.');
      isValid = false;
    }

    return isValid;
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      
      // Save changes to localStorage
      const updatedUser = {
        name,
        email,
        phone,
        token: 'mock-jwt-token-registered-456'
      };
      localStorage.setItem('zarrinex_user', JSON.stringify(updatedUser));
      localStorage.setItem('zarrinex_avatar', selectedAvatar);
      
      // Dispatch storage event to notify navbar instantly
      window.dispatchEvent(new Event('storage'));

      setTimeout(() => {
        setIsSuccess(false);
      }, 2500);
    }, 1200);
  };

  const currentAvatarInfo = AVATARS.find(a => a.id === selectedAvatar) || AVATARS[0];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen pt-28 pb-20 bg-slate-50 dark:bg-bg-dark transition-colors duration-300"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Back navigation */}
        <div className="mb-8 flex items-center justify-between">
          <Link
            to="/dashboard"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-550 dark:text-slate-400 hover:text-primary dark:hover:text-primary transition-colors"
          >
            <ArrowRight size={14} />
            <span>بازگشت به داشبورد کاربری</span>
          </Link>
          
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary">
            <Sparkles size={12} className="animate-pulse" />
            <span>امنیت سطح ۲ تایید شده</span>
          </div>
        </div>

        {/* Success message banner */}
        {isSuccess && (
          <ScrollReveal direction="none" duration={0.3}>
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 rounded-2xl text-xs flex items-center gap-2.5 font-bold mb-8">
              <CheckCircle2 size={16} />
              <span>پروفایل کاربری شما با موفقیت بروزرسانی و ذخیره شد!</span>
            </div>
          </ScrollReveal>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Avatar & Security (5 Cols) */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Avatar Selector Card */}
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark text-center flex flex-col items-center gap-5">
              <div className="relative">
                {/* Visual Circle */}
                <div className={`w-24 h-24 rounded-full bg-gradient-to-tr ${currentAvatarInfo.color} flex items-center justify-center text-white font-black text-3xl shadow-xl shadow-slate-900/10`}>
                  {name.charAt(0) || 'U'}
                </div>
                <div className="absolute bottom-0 left-0 p-1.5 bg-slate-900 border border-slate-700 rounded-full text-white cursor-pointer hover:bg-slate-800 transition-colors">
                  <Camera size={14} />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-bold text-lg text-slate-800 dark:text-white">{name}</h3>
                <p className="text-xs text-slate-400 dark:text-slate-500">سطح دسترسی: معامله‌گر طلایی</p>
              </div>

              {/* Selection Grids */}
              <div className="w-full space-y-3 pt-2">
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 block text-right pr-1">
                  تغییر تم آواتار کاربری
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {AVATARS.map((avatar) => (
                    <button
                      key={avatar.id}
                      onClick={() => setSelectedAvatar(avatar.id)}
                      className={`py-2 rounded-xl border text-[10px] font-bold transition-all cursor-pointer ${
                        selectedAvatar === avatar.id
                          ? 'border-primary bg-primary/10 text-amber-600 dark:text-primary'
                          : 'border-slate-100 dark:border-border-dark bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 hover:bg-slate-100'
                      }`}
                    >
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-tr ${avatar.color} mx-auto mb-1`} />
                      {avatar.label}
                    </button>
                  ))}
                </div>
              </div>
            </Card>

            {/* Quick Security Switches */}
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark space-y-6">
              <h3 className="font-bold text-base text-slate-800 dark:text-slate-205 flex items-center gap-2">
                <Key size={18} className="text-primary" />
                <span>تنظیمات پیشرفته امنیت</span>
              </h3>

              <div className="space-y-4">
                {/* Switch 1 */}
                <div className="flex items-center justify-between py-2.5 border-b border-slate-100 dark:border-border-dark">
                  <div className="space-y-1 pl-4">
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">کد دو مرحله‌ای (2FA)</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed block">
                      دریافت کد یکبار مصرف از پیامک/ایمیل برای تایید نهایی واریز و برداشت‌ها.
                    </span>
                  </div>
                  <button
                    onClick={() => setTwoFaEnabled(!twoFaEnabled)}
                    className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 shrink-0 ${
                      twoFaEnabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      twoFaEnabled ? '-translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>

                {/* Switch 2 */}
                <div className="flex items-center justify-between py-2.5">
                  <div className="space-y-1 pl-4">
                    <span className="text-xs font-bold text-slate-800 dark:text-white block">اطلاع‌رسانی ورود از طریق ایمیل</span>
                    <span className="text-[10px] text-slate-400 dark:text-slate-500 leading-relaxed block">
                      ارسال یک پیام هشدار آنی در صورتی که ورود جدیدی به حساب شما ثبت شود.
                    </span>
                  </div>
                  <button
                    onClick={() => setEmailAlertEnabled(!emailAlertEnabled)}
                    className={`w-10 h-6 rounded-full p-1 transition-colors duration-200 shrink-0 ${
                      emailAlertEnabled ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  >
                    <div className={`w-4 h-4 rounded-full bg-white transition-transform duration-200 ${
                      emailAlertEnabled ? '-translate-x-4' : 'translate-x-0'
                    }`} />
                  </button>
                </div>
              </div>
            </Card>

          </div>

          {/* Right Column: Edit Profile Form (7 Cols) */}
          <div className="lg:col-span-7">
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark">
              <form onSubmit={handleSaveProfile} className="space-y-5">
                <h3 className="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2 mb-2">
                  <User size={20} className="text-primary" />
                  <span>اطلاعات هویتی و کاربری</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Full Name */}
                  <Input
                    label="نام و نام خانوادگی"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    error={nameError}
                    placeholder="مثال: سهراب سپهری"
                  />

                  {/* National ID */}
                  <Input
                    label="کد ملی (تایید شده)"
                    type="text"
                    value={nationalId}
                    onChange={(e) => setNationalId(e.target.value)}
                    error={nationalIdError}
                    placeholder="مثال: ۰۰۲۴۸۹۶۵۷۳"
                    className="text-left font-bold bg-slate-50 dark:bg-slate-900 cursor-not-allowed"
                    disabled
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Email */}
                  <Input
                    label="پست الکترونیک (ایمیل)"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    error={emailError}
                    className="text-left font-semibold"
                    placeholder="example@domain.com"
                  />

                  {/* Phone */}
                  <Input
                    label="شماره تلفن همراه"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    error={phoneError}
                    className="text-left font-semibold"
                    placeholder="مثال: ۰۹۱۲۳۴۵۶۷۸۹"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Language Selector */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                      <Globe size={12} />
                      زبان رابط کاربری
                    </label>
                    <select className="w-full px-4 py-3 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 text-right cursor-pointer">
                      <option value="fa">فارسی (Persian)</option>
                      <option value="en">انگلیسی (English)</option>
                    </select>
                  </div>

                  {/* UI Theme preference */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1 flex items-center gap-1">
                      <Palette size={12} />
                      پوسته پیش‌فرض
                    </label>
                    <select className="w-full px-4 py-3 bg-white dark:bg-card-dark border border-slate-200 dark:border-border-dark rounded-xl text-sm transition-all focus:outline-none focus:ring-2 focus:ring-primary/20 text-right cursor-pointer">
                      <option value="dark">پوسته تاریک (Dark Mode)</option>
                      <option value="light">پوسته روشن (Light Mode)</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-100 dark:border-border-dark flex items-center justify-between gap-4">
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full sm:w-auto text-slate-950 px-8"
                    isLoading={isLoading}
                  >
                    ذخیره و ثبت نهایی تغییرات
                  </Button>
                  
                  <div className="hidden sm:flex items-center gap-2 text-[10px] text-slate-400 dark:text-slate-500">
                    <ShieldAlert size={14} className="text-primary" />
                    <span>تغییرات شما در تمام دستگاه‌ها همگام‌سازی می‌شود.</span>
                  </div>
                </div>

              </form>
            </Card>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
