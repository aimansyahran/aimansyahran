import { useState, useEffect, useRef, useCallback } from 'react';
import { useTranslation } from '../i18n/LanguageProvider';
import { portfolioData } from '../data/portfolio';

const Navbar = () => {
  const { t, lang } = useTranslation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [mobileOpen]);

  const scrollToSection = useCallback((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileOpen(false);
  }, []);

  const navItems = [
    { id: 'about', label: t('nav.about') },
    { id: 'capabilities', label: t('nav.services') },
    { id: 'skills', label: t('nav.skills') },
    { id: 'work', label: t('nav.work') },
  ];

  return (
    <>
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-md border-b border-dark-800 py-4'
          : 'bg-transparent py-6'
      }`}
      aria-label="Main navigation"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 flex items-center justify-between">
        <button
          onClick={() => scrollToSection('hero')}
          className="relative h-10 w-auto hover:opacity-80 transition-opacity duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
        >
          <img
            src="/logo.png"
            alt={portfolioData.designer.name}
            className="h-full object-contain"
          />
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => scrollToSection(item.id)}
              className="text-sm uppercase tracking-widest text-dark-300 hover:text-white transition-colors duration-300 focus:outline-none focus-visible:text-white"
              tabIndex={0}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => scrollToSection('contact')}
            className="hidden md:block text-sm uppercase tracking-widest px-6 py-2 border border-dark-700 hover:border-white hover:bg-white hover:text-dark-950 transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            {t('nav.contact')}
          </button>

          {/* Hamburger - mobile only */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden w-10 h-10 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" className="transition-transform duration-300">
              <line
                y1="5" x1="1" y2="5" x2="19"
                stroke="currentColor" strokeWidth="1.5"
                className={`transition-all duration-300 ${mobileOpen ? 'translate-y-[3px] rotate-45 origin-center' : ''}`}
              />
              <line
                y1="10" x1="1" y2="10" x2="19"
                stroke="currentColor" strokeWidth="1.5"
                className={`transition-opacity duration-200 ${mobileOpen ? 'opacity-0' : 'opacity-100'}`}
              />
              <line
                y1="15" x1="1" y2="15" x2="19"
                stroke="currentColor" strokeWidth="1.5"
                className={`transition-all duration-300 ${mobileOpen ? '-translate-y-[3px] -rotate-45 origin-center' : ''}`}
              />
            </svg>
          </button>
        </div>
      </div>
    </nav>

    {/* Mobile menu overlay */}
    <div
      ref={menuRef}
      className={`fixed inset-0 z-40 transition-all duration-500 md:hidden ${
        mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-md" onClick={() => setMobileOpen(false)} />
      <nav className="relative z-10 flex flex-col items-center justify-center h-full gap-10">
        {navItems.map((item, index) => (
          <button
            key={item.id}
            onClick={() => scrollToSection(item.id)}
            className="font-display text-4xl md:text-5xl font-medium text-dark-200 hover:text-white transition-all duration-300"
            style={{
              opacity: mobileOpen ? 1 : 0,
              transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
              transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
              transitionDelay: mobileOpen ? `${index * 80 + 100}ms` : '0ms',
            }}
          >
            {item.label}
          </button>
        ))}
        <button
          onClick={() => scrollToSection('contact')}
          className="mt-4 text-sm uppercase tracking-widest px-8 py-3 border border-dark-600 text-dark-300 hover:text-white hover:border-white transition-all duration-300"
          style={{
            opacity: mobileOpen ? 1 : 0,
            transform: mobileOpen ? 'translateY(0)' : 'translateY(16px)',
            transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
            transitionDelay: mobileOpen ? '340ms' : '0ms',
          }}
        >
          {t('nav.contact')}
        </button>
      </nav>
    </div>
    </>
  );
};

export default Navbar;
