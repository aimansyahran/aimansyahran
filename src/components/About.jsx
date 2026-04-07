import { useEffect, useRef, useState } from 'react';
import { useTranslation } from '../i18n/LanguageProvider';
import { portfolioData } from '../data/portfolio';

const About = () => {
  const { t, lang } = useTranslation();
  const projectCount = portfolioData.projects.length;
  const serviceCount = portfolioData.services.length;

  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const [counters, setCounters] = useState({ exp: 0, svc: 0, proj: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          const startTime = performance.now();

          const animate = (now) => {
            const elapsed = now - startTime;
            const next = {};
            let changed = false;

            if (elapsed < 1400) {
              next.exp = Math.round((1 - Math.pow(1 - elapsed / 1400, 3)) * 10);
              changed = true;
            }
            if (elapsed < 1000) {
              next.svc = Math.round((1 - Math.pow(1 - elapsed / 1000, 3)) * 12);
              changed = true;
            }
            if (elapsed < 1200) {
              next.proj = Math.round((1 - Math.pow(1 - elapsed / 1200, 3)) * 13);
              changed = true;
            }
            if (changed) setCounters((prev) => ({ ...prev, ...next }));
            if (elapsed < 1400) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);

          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [projectCount, serviceCount]);

  const aboutSentences = lang === 'ar'
    ? ['مصمم جرافيك أول يقود مشاريع عالية التأثير واسعة النطاق، أنجز أعمالاً للجهات الحكومية الكبرى والمشاريع الضخمة والعلامات الراقية مثل بوابة الدرعية وبوابة الملك سلمان وموسم الرياض', 'أدمج التوجيه الإبداعي والتصميم ثلاثي الأبعاد والذكاء الاصطناعي لتقديم تصاميم مبتكرة ومستقبلية ترفع قيمة العلامات التجارية وتحقق النتائج']
    : portfolioData.about.split('. ');
  const pullQuote = aboutSentences[0];
  const bodySentences = aboutSentences.slice(1);

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />
      <section
        id="about"
        ref={sectionRef}
        className="py-24 md:py-32 px-6 md:px-12"
        aria-label="About"
      >
        <div className="max-w-[1600px] mx-auto">
          <div className="grid lg:grid-cols-3 gap-12 lg:gap-20 mb-24">
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
                  {t('about.label')}
                </p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
                {t('about.title')}
              </h2>
              <div className="mt-4 mb-6 w-16 h-px bg-accent/20" />
              <p className="text-xs text-dark-500 uppercase tracking-wider">
                {portfolioData.designer.location}
              </p>
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 mt-4 px-5 py-2.5 bg-accent text-dark-950 text-xs font-semibold uppercase tracking-[0.1em] transition-all duration-300 hover:shadow-lg hover:shadow-accent/20 hover:-translate-y-0.5"
              >
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M7 1.5V9M7 9L3 5.5M7 9L11 5.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M1.5 10.5V12C1.5 12.2761 1.72386 12.5 2 12.5H12C12.2761 12.5 12.5 12.2761 12.5 12V10.5" stroke="currentColor" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span>{t('about.downloadResume')}</span>
              </a>
            </div>

            <div
              className="lg:col-span-2 space-y-8"
              style={{
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
                transition: 'all 0.7s ease-out 0.2s',
              }}
            >
              <div className="relative">
                <blockquote className={`font-display text-2xl md:text-3xl text-dark-200 leading-snug ${lang === 'ar' ? 'pr-6 border-r-2 border-accent/40' : 'pl-6 border-l-2 border-accent/40'}`}>
                  {pullQuote}.
                </blockquote>
                <span className={`absolute -top-4 ${lang === 'ar' ? 'right-5' : 'left-5'} font-display text-6xl text-accent/10 leading-none`} aria-hidden="true">
                  &ldquo;
                </span>
              </div>

              <div className="space-y-6">
                {bodySentences.map((sentence, i, arr) => (
                  <p key={i} className="text-base md:text-lg text-dark-400 leading-relaxed max-w-2xl">
                    {sentence}{i < arr.length - 1 ? '.' : ''}
                  </p>
                ))}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div
            className="grid grid-cols-2 md:grid-cols-4 gap-px bg-dark-800/50"
            style={{
              opacity: isVisible ? 1 : 0,
              transition: 'opacity 0.6s ease 0.6s',
            }}
          >
            {[
              { value: `${counters.exp}+`, label: t('about.stats.yearsOfExperience') },
              { value: `${counters.svc}+`, label: t('about.stats.servicesOffered') },
              { value: counters.proj, label: t('about.stats.featuredProjects') },
              { value: '50+', label: t('about.stats.brandsElevated') },
            ].map((stat) => (
              <div
                key={stat.label}
                className="bg-dark-900 p-8 flex flex-col items-center justify-center text-center"
              >
                <span className="font-display text-5xl text-white">{stat.value}</span>
                <span className="text-xs text-dark-500 mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
