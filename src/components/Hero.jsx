import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from '../i18n/LanguageProvider';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: 'easeInOut',
    },
  },
};

const Hero = () => {
  const { t } = useTranslation();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToWork = () => {
    const element = document.getElementById('work');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToContact = () => {
    const element = document.getElementById('contact');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative flex h-screen min-h-[700px] w-full items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image */}
      <div
        className="absolute inset-0 z-[-1] bg-cover bg-center bg-no-repeat grayscale"
        style={{ backgroundImage: 'url(/links/IMG_5124.webp)' }}
        aria-hidden="true"
      />

      {/* Overlay for text readability */}
      <div className="absolute inset-0 z-0 bg-black/50" aria-hidden="true" />

      {/* Content Container */}
      <motion.div
        className="z-10 flex max-w-5xl flex-col items-center justify-center px-6 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isVisible ? 'visible' : 'hidden'}
      >
        {/* Animated Title — Playfair Display, forced 2-line layout */}
        <motion.h1
          className="font-display text-[clamp(2.25rem,5.5vw,5rem)] font-semibold leading-[1.08] tracking-tight text-white"
          variants={itemVariants}
        >
          <span className="block">I Design Visuals</span>
          <span className="block">That Move Brands.</span>
        </motion.h1>

        {/* Animated Subtitle — Inter body, relaxed line-height for dark background readability */}
        <motion.p
          className="mt-8 max-w-[50ch] text-balance text-base leading-relaxed text-white/60 sm:max-w-[60ch] sm:text-lg md:text-lg md:leading-[1.7]"
          variants={itemVariants}
        >
          Aiman Syahran — {t('hero.subtext')}
        </motion.p>

        {/* Animated Button Group */}
        <motion.div className="mt-12 flex items-center gap-4 sm:gap-6" variants={itemVariants}>
          <button
            onClick={scrollToWork}
            className="px-8 py-3.5 bg-accent text-dark-950 font-medium uppercase tracking-[0.12em] text-[0.8rem] leading-none transition-all duration-300 hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
          >
            {t('hero.viewWork')}
          </button>

          <button
            onClick={scrollToContact}
            className="px-8 py-3.5 border border-white/20 hover:border-white/40 transition-colors duration-300 font-medium uppercase tracking-[0.12em] text-[0.8rem] leading-none text-white/60 hover:text-white/80 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
          >
            {t('hero.contact')}
          </button>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3"
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 1.5 }}
      >
        <span className="text-[0.625rem] font-medium uppercase tracking-[0.25em] text-white/30">{t('hero.scrollToExplore')}</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="w-full h-3 bg-white/20 rounded-full" style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }} />
        </div>
      </motion.div>
    </section>
  );
};

export default Hero;
