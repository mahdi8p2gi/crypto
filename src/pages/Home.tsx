import React from 'react';
import { motion } from 'framer-motion';
import { Hero } from '../features/home/components/Hero';
import { MarketOverview } from '../features/home/components/MarketOverview';
import { PopularCoins } from '../features/home/components/PopularCoins';
import { WhyChooseUs } from '../features/home/components/WhyChooseUs';
import { Features } from '../features/home/components/Features';
import { FAQ } from '../features/home/components/FAQ';
import { CTA } from '../features/home/components/CTA';
import { ScrollReveal } from '../components/common/ScrollReveal';

export const Home: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="min-h-screen"
    >
      <Hero />
      
      <ScrollReveal direction="up" duration={0.5}>
        <MarketOverview />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.5}>
        <PopularCoins />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.5}>
        <WhyChooseUs />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.5}>
        <Features />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.5}>
        <FAQ />
      </ScrollReveal>
      
      <ScrollReveal direction="up" duration={0.5}>
        <CTA />
      </ScrollReveal>
    </motion.div>
  );
};
