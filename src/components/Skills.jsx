import { useRef, useState, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';

function SkillBar({ name, level, index, isVisible }) {
  return (
    <div
      className="group"
      style={{
        animation: `fade-in-up 0.4s ease-out ${index * 40 + 100}ms both`,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm text-dark-300 group-hover:text-white transition-colors duration-300">
          {name}
        </span>
        <span className="text-xs text-dark-600 font-mono">{level}%</span>
      </div>
      <div className="h-px bg-dark-800 relative overflow-hidden">
        <div
          className="absolute inset-y-0 left-0 bg-accent transition-all duration-1000 ease-out"
          style={{ width: isVisible ? `${level}%` : '0%' }}
        />
      </div>
    </div>
  );
}

function ToolCategory({ category, index }) {
  return (
    <div
      style={{
        animation: `fade-in-up 0.4s ease-out ${index * 80 + 200}ms both`,
      }}
    >
      <h4 className="text-xs uppercase tracking-[0.15em] text-accent/70 mb-3">
        {category.name}
      </h4>
      <div className="flex flex-wrap gap-2">
        {category.tools.map((tool) => (
          <span
            key={tool}
            className="px-3 py-1.5 text-xs text-dark-300 bg-dark-900/50 border border-dark-800/50 hover:border-accent/20 hover:text-accent transition-all duration-300"
          >
            {tool}
          </span>
        ))}
      </div>
    </div>
  );
}

const Skills = () => {
  const { skills } = portfolioData;
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
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div className="h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" aria-hidden="true" />
      <section
        ref={sectionRef}
        id="skills"
        className="py-24 md:py-32 px-6 md:px-12 relative"
        aria-label="Skills & Tools"
      >
        <div className="max-w-[1600px] mx-auto">
          {/* Header */}
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
                  Skills &amp; Tools
                </p>
              </div>
              <h2 className="font-display text-4xl md:text-5xl font-medium leading-tight">
                Proficiency
              </h2>
              <div className="mt-4 mb-6 w-16 h-px bg-accent/20" />
            </div>
            <div className="lg:col-span-2" />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left: Skill bars */}
            <div>
              <p className="text-xs text-dark-500 uppercase tracking-[0.15em] mb-6">
                Design Expertise
              </p>
              <div className="space-y-4">
                {skills.design.items.map((skill, i) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    index={i}
                    isVisible={isVisible}
                  />
                ))}
              </div>
            </div>

            {/* Right: Tools categories */}
            <div>
              <p className="text-xs text-dark-500 uppercase tracking-[0.15em] mb-6">
                Software &amp; Tools
              </p>
              <div className="space-y-6">
                {skills.tools.categories.map((cat, i) => (
                  <ToolCategory key={cat.name} category={cat} index={i} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Skills;
