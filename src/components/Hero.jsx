import { useEffect, useState, useRef } from 'react';
import { portfolioData } from '../data/portfolio';

// Pre-computed word spans (plain constant, no hooks)
const WordSpan = portfolioData.hero.headline.split(' ').map((word, i) => ({
  text: word,
  delay: i * 120,
}));

const Hero = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [imageError, setImageError] = useState(false);

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

  const handleImageError = () => setImageError(true);

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center px-6 md:px-12 pt-24"
      aria-label="Hero section"
    >
      {/* Main content */}
      <div className="max-w-[1600px] w-full relative z-10">
        {/* Intro text */}
        <div
          className="mb-8 transition-all duration-700 delay-100"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(16px)' }}
        >
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-accent/40 inline-block" />
            <p className="text-xs uppercase tracking-[0.25em] text-dark-500">
              Graphic Designer & Creative Director
            </p>
          </div>
        </div>

        <div
          className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center transition-all duration-1000 delay-200"
          style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateY(0)' : 'translateY(24px)' }}
        >
          {/* Text column */}
          <div className="lg:col-span-7 space-y-8">
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.15] tracking-tight">
              {WordSpan.map((word, i) => (
                <span
                  key={i}
                  className="inline-block mr-[0.2em] overflow-visible align-bottom"
                >
                  <span
                    className="inline-block transition-all duration-700"
                    style={{
                      opacity: isVisible ? 1 : 0,
                      transform: isVisible ? 'translateY(0) rotateX(0)' : 'translateY(110%) rotateX(-40deg)',
                      transitionDelay: `${word.delay + 300}ms`,
                      transformOrigin: 'bottom center',
                    }}
                  >
                    {word.text}
                  </span>
                </span>
              ))}
            </h1>

            <p className="text-base md:text-lg text-dark-300 leading-relaxed max-w-2xl">
              {portfolioData.hero.subtext}
            </p>

            <div className="pt-4 flex flex-col sm:flex-row gap-4">
              <button
                onClick={scrollToWork}
                className="px-8 py-4 bg-accent text-dark-950 font-medium uppercase tracking-[0.1em] text-sm transition-all duration-300 hover:bg-accent-light focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
              >
                {portfolioData.hero.cta.primary}
              </button>

              <button
                onClick={scrollToContact}
                className="px-8 py-4 border border-dark-600 hover:border-dark-400 transition-colors duration-300 font-medium uppercase tracking-[0.1em] text-sm text-dark-400 hover:text-dark-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950"
              >
                {portfolioData.hero.cta.secondary}
              </button>
            </div>
          </div>

          {/* Image column */}
          <div className="lg:col-span-5 relative transition-all duration-1000 delay-400"
            style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? 'translateX(0) translateY(0)' : 'translateX(16px) translateY(8px)' }}
          >
            <div className="aspect-[4/5] relative">
              {/* Fallback gradient when image fails */}
              <div className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900" />
              {!imageError && (
                <img
                  src="/hero.jpg"
                  alt={portfolioData.designer.name}
                  onError={handleImageError}
                  loading="eager"
                  className="w-full h-full object-cover origin-bottom grayscale hover:grayscale-0 transition-all duration-700"
                  style={{
                    transform: isVisible ? 'scaleY(1)' : 'scaleY(0)',
                    opacity: isVisible ? 1 : 0,
                    transition: 'transform 0.7s ease-out 0.4s, opacity 0.5s ease-out 0.4s',
                  }}
                />
              )}
            </div>

            {/* Year badge */}
            <div
              className="absolute -left-3 bottom-20 px-3 py-1.5 bg-dark-900 border border-dark-800 text-[10px] uppercase tracking-[0.1em] text-dark-400 hidden lg:block"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(8px)',
                transition: 'all 0.5s ease 1.4s',
              }}
            >
              Est. 2014
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-6 md:left-12 hidden lg:flex items-center gap-3" aria-hidden="true">
        <span className="text-[10px] uppercase tracking-[0.2em] text-dark-600">Scroll to explore</span>
        <div className="w-px h-10 relative overflow-hidden">
          <div className="w-full h-3 bg-accent/40 rounded-full" style={{ animation: 'scroll-indicator 2s ease-in-out infinite' }} />
        </div>
      </div>
    </section>
  );
};

export default Hero;
