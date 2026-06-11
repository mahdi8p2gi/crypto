import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { Menu, X, ArrowUpRight, LogOut, Wallet, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '../common/Button';
import { ThemeToggle } from '../common/ThemeToggle';
import { useCrypto } from '../../hooks/useCrypto';

// Avatar theme colors helper
const AVATAR_COLORS: Record<string, string> = {
  gold: 'from-amber-400 to-primary',
  cyan: 'from-cyan-400 to-blue-600',
  purple: 'from-fuchsia-500 to-purple-650',
  emerald: 'from-emerald-400 to-teal-600'
};

export const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [userAvatar, setUserAvatar] = useState('gold');
  const { tomanRate } = useCrypto();
  const navigate = useNavigate();

  // Check auth state and avatar from localStorage
  useEffect(() => {
    const checkAuth = () => {
      const storedUser = localStorage.getItem('zarrinex_user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      } else {
        setUser(null);
      }
      
      const storedAvatar = localStorage.getItem('zarrinex_avatar');
      if (storedAvatar) {
        setUserAvatar(storedAvatar);
      } else {
        setUserAvatar('gold');
      }
    };
    
    checkAuth();
    // Listen to storage changes to update navbar instantly
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 1000); // Poll for auth state changes as fallback
    
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  // Monitor scroll for glass effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('zarrinex_user');
    setUser(null);
    navigate('/');
  };

  const navLinks = [
    { name: 'خانه', path: '/' },
    { name: 'بازارها', path: '/markets' },
    { name: 'درباره ما', path: '/about' },
    { name: 'تماس با ما', path: '/contact' },
  ];

  const activeAvatarColor = AVATAR_COLORS[userAvatar] || AVATAR_COLORS.gold;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/95 dark:bg-[#0F1115]/95 border-b border-slate-200 dark:border-slate-800 backdrop-blur-lg shadow-md py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Logo and Main Nav */}
          <div className="flex items-center gap-10">
            <Link to="/" className="flex items-center gap-2.5">
              {/* Premium abstract gold logo */}
              <div className="relative w-9 h-9 bg-gradient-to-tr from-primary to-amber-500 rounded-xl flex items-center justify-center shadow-lg shadow-primary/25 overflow-hidden">
                <span className="text-slate-950 font-black text-xl select-none">Z</span>
                <div className="absolute inset-0 bg-white/20 transform rotate-45 translate-y-6"></div>
              </div>
              <span className="text-xl font-black tracking-tight text-slate-900 dark:text-white">
                زرین‌<span className="text-primary">اکس</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-primary'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      {link.name}
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              ))}
              {user && (
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) =>
                    `text-sm font-bold transition-colors relative py-1.5 ${
                      isActive
                        ? 'text-primary'
                        : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      داشبورد من
                      {isActive && (
                        <motion.span
                          layoutId="activeNav"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full"
                          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                        />
                      )}
                    </>
                  )}
                </NavLink>
              )}
            </nav>
          </div>

          {/* Actions & Live Rate (Desktop) */}
          <div className="hidden md:flex items-center gap-4">
            
            {/* Live Toman Rate */}
            <div className="hidden lg:flex items-center gap-2 px-3.5 py-1.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
              <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
              <span className="text-slate-500 dark:text-slate-400">نرخ زنده تتر:</span>
              <span className="font-bold text-slate-755 dark:text-slate-200">
                {tomanRate.toLocaleString('fa-IR')} تومان
              </span>
            </div>

            <ThemeToggle />

            {user ? (
              <div className="flex items-center gap-3">
                {/* User Balance Mock & Profile */}
                <div className="flex flex-col items-end pl-2">
                  <span className="text-xs text-slate-500 dark:text-slate-400">کیف پول ریالی</span>
                  <span className="text-xs font-bold text-primary">۴۸,۵۰۰,۰۰۰ تومان</span>
                </div>
                
                <div className="relative group">
                  <button className="flex items-center gap-2 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${activeAvatarColor} flex items-center justify-center text-slate-950 font-bold`}>
                      {user.name.charAt(0)}
                    </div>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute left-0 mt-2 w-56 bg-white dark:bg-[#13161D] border border-slate-200 dark:border-slate-800 rounded-2xl shadow-xl py-2 invisible group-hover:visible opacity-0 group-hover:opacity-100 transition-all duration-200 z-50">
                    <div className="px-4 py-3 border-b border-slate-150 dark:border-slate-800 flex items-center gap-2.5">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${activeAvatarColor} flex items-center justify-center text-slate-950 font-black text-sm shrink-0`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <p className="text-xs font-bold text-slate-800 dark:text-slate-200 truncate">{user.name}</p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{user.email}</p>
                      </div>
                    </div>

                    <Link to="/dashboard" className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <Wallet size={14} className="text-primary" />
                      داشبورد معاملاتی
                    </Link>
                    
                    <Link to="/profile" className="flex items-center gap-2.5 px-4 py-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                      <User size={14} className="text-primary" />
                      پروفایل و تنظیمات امنیت
                    </Link>
                    
                    <div className="h-px bg-slate-150 dark:bg-slate-800 my-1"></div>
                    
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-2.5 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
                    >
                      <LogOut size={14} />
                      خروج از حساب
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link to="/login">
                  <Button variant="outline" size="sm">ورود</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary" size="sm" icon={<ArrowUpRight size={14} />} iconPosition="left">
                    ثبت نام سریع
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle & Theme Toggle */}
          <div className="flex items-center gap-2.5 md:hidden">
            <ThemeToggle />
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#13161D] text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              aria-label="منو"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 top-[65px] z-30 bg-slate-950/20 dark:bg-slate-950/55 backdrop-blur-sm md:hidden"
            />
            {/* Drawer Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', bounce: 0.1, duration: 0.4 }}
              className="fixed right-0 top-[65px] bottom-0 w-72 z-45 bg-white dark:bg-[#0F1115] border-l border-slate-200 dark:border-slate-800 shadow-xl p-6 md:hidden overflow-y-auto flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                {/* Live Toman Rate in Mobile Drawer */}
                <div className="flex items-center gap-2 px-3.5 py-2.5 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs">
                  <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                  <span className="text-slate-500 dark:text-slate-400">نرخ زنده تتر:</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">
                    {tomanRate.toLocaleString('fa-IR')} تومان
                  </span>
                </div>

                {/* Mobile Navigation Links */}
                <nav className="flex flex-col gap-4">
                  {navLinks.map((link) => (
                    <NavLink
                      key={link.path}
                      to={link.path}
                      onClick={() => setIsOpen(false)}
                      className={({ isActive }) =>
                        `text-base font-bold py-2 transition-colors ${
                          isActive
                            ? 'text-primary'
                            : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                        }`
                      }
                    >
                      {link.name}
                    </NavLink>
                  ))}
                  {user && (
                    <>
                      <NavLink
                        to="/dashboard"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `text-base font-bold py-2 transition-colors ${
                            isActive
                              ? 'text-primary'
                              : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                          }`
                        }
                      >
                        داشبورد معاملاتی
                      </NavLink>
                      <NavLink
                        to="/profile"
                        onClick={() => setIsOpen(false)}
                        className={({ isActive }) =>
                          `text-base font-bold py-2 transition-colors ${
                            isActive
                              ? 'text-primary'
                              : 'text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                          }`
                        }
                      >
                        پروفایل کاربری
                      </NavLink>
                    </>
                  )}
                </nav>
              </div>

              {/* Mobile Auth Actions */}
              <div className="mt-auto pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-3">
                {user ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-[#13161D] rounded-xl border border-slate-150 dark:border-slate-800">
                      <div className={`w-10 h-10 rounded-lg bg-gradient-to-tr ${activeAvatarColor} flex items-center justify-center text-slate-950 font-bold text-lg shrink-0`}>
                        {user.name.charAt(0)}
                      </div>
                      <div className="overflow-hidden">
                        <span className="text-sm font-bold text-slate-850 dark:text-slate-200 truncate block">{user.name}</span>
                        <span className="text-xs text-primary font-medium mt-0.5 block">دارایی: ۴۸,۵۰۰,۰۰۰ تومان</span>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="md"
                      onClick={() => {
                        handleLogout();
                        setIsOpen(false);
                      }}
                      className="w-full text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                      icon={<LogOut size={16} />}
                      iconPosition="left"
                    >
                      خروج از حساب
                    </Button>
                  </div>
                ) : (
                  <>
                    <Link to="/login" onClick={() => setIsOpen(false)} className="w-full">
                      <Button variant="outline" className="w-full">ورود به حساب</Button>
                    </Link>
                    <Link to="/register" onClick={() => setIsOpen(false)} className="w-full">
                      <Button variant="primary" className="w-full">ثبت نام در زرین‌اکس</Button>
                    </Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};
