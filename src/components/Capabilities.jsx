import { useRef, useState, useEffect } from 'react';
import { useTranslation } from '../i18n/LanguageProvider';
import { portfolioData } from '../data/portfolio';
import { ServiceIcon } from './ServiceIcons';

const Capabilities = () => {
  const { t } = useTranslation();
  const services = portfolioData.services;

  // Map icon key → translation key suffix
  const ICON_TO_TRANSLATION = {
    brand: 'brandIdentity',
    visual: 'visualDesign',
    uiux: 'uiuxDesign',
    direction: 'creativeDirection',
    '3d': 'design3d',
    ai: 'aiDesign',
    systems: 'designSystems',
    art: 'artDirection',
    editorial: 'editorialDesign',
    packaging: 'packagingDesign',
    calligraphy: 'arabicCalligraphy',
    motion: 'motionDesign',
  };
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-dark-600/30 to-transparent" aria-hidden="true" />
      <section
        ref={sectionRef}
        id="capabilities"
        className="py-24 md:py-32 px-6 md:px-12"
        aria-label="Capabilities"
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Section header */}
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-16">
            <div
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(24px)',
                transition: 'all 0.7s ease-out',
              }}
            >
              <div className="flex items-center gap-3 mb-6">
                <span className="h-px w-8 bg-accent/40 inline-block" />
                <p className="text-sm uppercase tracking-[0.2em] text-accent">
                  {t('capabilities.label')}
                </p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
                {t('capabilities.title')}
              </h2>
              <div className="mt-4 mb-6 w-16 h-px bg-accent/20" />
              <p className="text-xs text-dark-500 uppercase tracking-wider">
                {services.length} areas of expertise
              </p>
            </div>

            <div className="lg:col-span-2" />
          </div>

          {/* Capabilities grid with descriptions */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {services.map((service, index) => (
              <div
                key={service.icon}
                className="p-5 bg-dark-900/30 border border-dark-800/40 hover:border-accent/30 hover:bg-dark-900/50 transition-all duration-300 cursor-default group"
                style={{
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(16px)',
                  transition: `all 0.5s ease-out ${index * 60 + 200}ms`,
                }}
              >
                <div className="mb-3 text-accent group-hover:text-accent/80 transition-colors">
                  <ServiceIcon icon={service.icon} />
                </div>
                <h3 className="text-sm font-medium text-dark-100 mb-2">
                  {t(`services.${ICON_TO_TRANSLATION[service.icon] || service.icon}.title`)}
                </h3>
                <p className="text-xs text-dark-500 leading-relaxed">
                  {t(`services.${ICON_TO_TRANSLATION[service.icon] || service.icon}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Capabilities;
