import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './context/ThemeContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';

// Pages
import { Home } from './pages/Home';
import { Markets } from './pages/Markets';
import { AboutUs } from './pages/AboutUs';
import { ContactUs } from './pages/ContactUs';
import { Login } from './pages/Login';
import { Register } from './pages/Register';
import { CoinDetails } from './pages/CoinDetails';
import { Dashboard } from './pages/Dashboard';
import { UserProfile } from './pages/UserProfile';
import { NotFound } from './pages/NotFound';

// Scroll to Top on Page Navigation hook/component
const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Animated Page Routes Wrapper
const AnimatedRoutes: React.FC = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/markets" element={<Markets />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/coin/:id" element={<CoinDetails />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <Router>
        <ScrollToTop />
        <div className="flex flex-col min-h-screen bg-slate-50 dark:bg-[#0F1115] text-slate-900 dark:text-slate-100 transition-colors duration-300">
          
          {/* Sticky Premium Navbar */}
          <Navbar />
          
          {/* Main Content Area */}
          <main className="flex-grow">
            <AnimatedRoutes />
          </main>
          
          {/* Global Premium Footer */}
          <Footer />

        </div>
      </Router>
    </ThemeProvider>
  );
}
