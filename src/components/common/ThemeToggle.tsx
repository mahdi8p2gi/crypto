import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <motion.button
      whileTap={{ scale: 0.9 }}
      whileHover={{ scale: 1.05 }}
      onClick={toggleTheme}
      className="relative p-2.5 rounded-xl border border-slate-200 dark:border-border-dark bg-white dark:bg-card-dark text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors cursor-pointer"
      aria-label="تغییر تم"
    >
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          initial={false}
          animate={{
            y: theme === 'dark' ? 0 : -25,
            opacity: theme === 'dark' ? 1 : 0,
            rotate: theme === 'dark' ? 0 : 90
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Sun size={20} className="text-primary" />
        </motion.div>
        <motion.div
          initial={false}
          animate={{
            y: theme === 'light' ? 0 : 25,
            opacity: theme === 'light' ? 1 : 0,
            rotate: theme === 'light' ? 0 : -90
          }}
          transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Moon size={20} className="text-slate-600" />
        </motion.div>
      </div>
    </motion.button>
  );
};
