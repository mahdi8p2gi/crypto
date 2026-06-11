import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock, Send, MessageSquare, ShieldAlert, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Button } from '../components/common/Button';

export const ContactUs: React.FC = () => {
  // Form States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Validation States
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [subjectError, setSubjectError] = useState('');
  const [messageError, setMessageError] = useState('');

  const validateForm = (): boolean => {
    let isValid = true;
    setNameError('');
    setEmailError('');
    setSubjectError('');
    setMessageError('');

    if (!name.trim()) {
      setNameError('لطفاً نام خود را وارد کنید.');
      isValid = false;
    }

    if (!email) {
      setEmailError('لطفاً ایمیل خود را وارد کنید.');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('آدرس ایمیل وارد شده نامعتبر است.');
      isValid = false;
    }

    if (!subject.trim()) {
      setSubjectError('لطفاً موضوع پیام را مشخص کنید.');
      isValid = false;
    }

    if (!message.trim()) {
      setMessageError('لطفاً متن پیام خود را بنویسید.');
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    // Simulate sending message
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      // Clear form
      setName('');
      setEmail('');
      setSubject('');
      setMessage('');
    }, 1500);
  };

  const contactCards = [
    {
      icon: <Phone className="text-primary" size={20} />,
      title: 'تماس تلفنی با پشتیبانی',
      value: '+۹۸ ۲۱ ۹۱۰۱ ۸۸۸۸',
      sub: 'پاسخگویی ۲۴ ساعته در ۷ روز هفته',
      link: 'tel:+982191018888'
    },
    {
      icon: <Mail className="text-primary" size={20} />,
      title: 'ارسال ایمیل رسمی',
      value: 'support@zarrinex.com',
      sub: 'پاسخگویی حداکثر ظرف ۴ ساعت کاری',
      link: 'mailto:support@zarrinex.com'
    },
    {
      icon: <MapPin className="text-primary" size={20} />,
      title: 'دفتر مرکزی صرافی',
      value: 'تهران، بلوار فناوری، پارک علم و فناوری دانشگاه تهران',
      sub: 'پذیرش مراجعات حضوری فقط با هماهنگی قبلی',
      link: '#'
    },
    {
      icon: <Clock className="text-primary" size={20} />,
      title: 'ساعات کاری رسمی',
      value: 'شنبه تا چهارشنبه ۹:۰۰ الی ۱۸:۰۰',
      sub: 'پنجشنبه‌ها از ساعت ۹:۰۰ الی ۱۴:۰۰',
      link: '#'
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
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full text-xs font-semibold text-amber-600 dark:text-primary mb-3">
            <MessageSquare size={12} />
            <span>پشتیبانی و ارتباط مستقیم</span>
          </div>
          <h1 className="text-3xl font-black text-slate-900 dark:text-white">
            با ما در تماس باشید
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            تیم پشتیبانی زرین‌اکس آماده پاسخگویی به تمام ابهامات، پیشنهادات و سوالات شما عزیزان است.
          </p>
        </div>

        {/* Contact Info Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactCards.map((card, idx) => (
            <Card
              key={idx}
              variant="default"
              hoverEffect={true}
              className="border border-slate-100 dark:border-border-dark flex flex-col items-start gap-4 bg-white dark:bg-card-dark"
            >
              <div className="p-3 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-border-dark rounded-2xl flex items-center justify-center">
                {card.icon}
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 dark:text-slate-500">{card.title}</h4>
                {card.link !== '#' ? (
                  <a href={card.link} className="block text-sm font-black text-slate-800 dark:text-white mt-1 hover:text-primary transition-colors" dir="ltr">
                    {card.value}
                  </a>
                ) : (
                  <p className="text-sm font-black text-slate-850 dark:text-white mt-1 leading-relaxed">
                    {card.value}
                  </p>
                )}
                <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-1.5">{card.sub}</p>
              </div>
            </Card>
          ))}
        </div>

        {/* Form and Map/Faq Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Contact Form */}
          <div className="lg:col-span-7">
            <Card variant="default" padding="lg" className="border border-slate-150 dark:border-border-dark bg-white dark:bg-card-dark">
              {isSuccess ? (
                <div className="flex flex-col items-center justify-center py-12 text-center space-y-4">
                  <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center text-emerald-500 animate-bounce">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-800 dark:text-white">پیام شما با موفقیت دریافت شد!</h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
                    کارشناسان پشتیبانی زرین‌اکس پیام شما را بررسی کرده و در اسرع وقت پاسخ را به آدرس ایمیل شما ارسال خواهند کرد.
                  </p>
                  <Button variant="outline" size="md" onClick={() => setIsSuccess(false)} className="mt-4">
                    ارسال پیام جدید
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <h3 className="text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">
                    ارسال پیام به پشتیبانی
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input
                      label="نام و نام خانوادگی"
                      type="text"
                      placeholder="مثال: سهراب سپهری"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      error={nameError}
                    />
                    <Input
                      label="پست الکترونیک (ایمیل)"
                      type="email"
                      placeholder="example@domain.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      error={emailError}
                      className="text-left font-semibold"
                    />
                  </div>

                  <Input
                    label="موضوع پیام"
                    type="text"
                    placeholder="مثال: راهنمایی برای ثبت‌نام سازمانی"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    error={subjectError}
                  />

                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-slate-600 dark:text-slate-400 mr-1">
                      متن پیام شما
                    </label>
                    <textarea
                      rows={5}
                      placeholder="جزئیات پیام خود را در اینجا بنویسید..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className={`w-full px-4 py-3 bg-white dark:bg-card-dark border rounded-xl text-sm transition-all duration-200 focus:outline-none focus:ring-2 outline-none text-right resize-none ${
                        messageError
                          ? 'border-red-500/50 focus:border-red-500 focus:ring-red-500/20'
                          : 'border-slate-200 dark:border-border-dark focus:border-primary focus:ring-primary/20 hover:border-slate-300 dark:hover:border-slate-700'
                      }`}
                    />
                    {messageError && <span className="text-xs text-red-500 mr-1 mt-0.5">{messageError}</span>}
                  </div>

                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full text-slate-950 shadow-lg shadow-primary/15"
                    isLoading={isLoading}
                    icon={<Send size={16} />}
                    iconPosition="left"
                  >
                    ارسال پیام
                  </Button>
                </form>
              )}
            </Card>
          </div>

          {/* Right Column: Mini Map & FAQ Prompt */}
          <div className="lg:col-span-5 space-y-6">
            {/* Quick response note */}
            <Card variant="gradient" padding="lg" className="border border-slate-150 dark:border-border-dark">
              <div className="flex items-start gap-3.5">
                <div className="p-2.5 bg-amber-550/15 rounded-xl shrink-0">
                  <ShieldAlert className="text-amber-500" size={20} />
                </div>
                <div className="space-y-1.5">
                  <h4 className="text-sm font-bold text-slate-800 dark:text-white">تضمین حل سریع مشکلات</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    تمام پیام‌های ارسال شده از این بخش مستقیماً در کارتابل مدیران ارشد صرافی ثبت شده و تضمین می‌شود که ظرف حداکثر ۲۴ ساعت پاسخی قانع‌کننده و جامع دریافت کنید.
                  </p>
                </div>
              </div>
            </Card>

            {/* Interactive Mock Map */}
            <Card variant="default" padding="none" className="border border-slate-150 dark:border-border-dark h-[280px] overflow-hidden relative flex items-center justify-center">
              {/* Fake Map Image with overlay pointer */}
              <div className="absolute inset-0 bg-slate-200 dark:bg-slate-900 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=600&auto=format&fit=crop')` }}>
                {/* dark overlay */}
                <div className="absolute inset-0 bg-slate-950/45" />
              </div>
              
              <div className="relative z-10 text-center p-6 space-y-3">
                <div className="w-12 h-12 bg-primary text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-lg shadow-primary/25 animate-bounce">
                  <MapPin size={24} />
                </div>
                <h4 className="font-bold text-white text-sm">موقعیت دفتر تهران روی نقشه</h4>
                <p className="text-[11px] text-slate-300">پارک علم و فناوری دانشگاه تهران، ساختمان امیرکبیر</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block text-xs font-bold text-primary hover:underline pt-1"
                >
                  مسیریابی در گوگل مپ
                </a>
              </div>
            </Card>
          </div>

        </div>

      </div>
    </motion.div>
  );
};
