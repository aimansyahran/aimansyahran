import { useState, useRef, useEffect } from 'react';
import { portfolioData } from '../data/portfolio';
import ProjectCard from './ProjectCard';

const categories = ['All', ...new Set(portfolioData.projects.map(p => p.category))];

const WorkGrid = ({ onProjectOpen }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [showAll, setShowAll] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredProjects = activeCategory === 'All'
    ? portfolioData.projects
    : portfolioData.projects.filter(p => p.category === activeCategory);

  const limit = isMobile ? 4 : 6;
  const hasMore = filteredProjects.length > limit;
  const displayedProjects = showAll ? filteredProjects : filteredProjects.slice(0, limit);

  const handleCategoryChange = (cat) => {
    setActiveCategory(cat);
  };

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 px-6 md:px-12 relative"
      aria-label="Selected Work"
    >
      <div className="max-w-[1600px] mx-auto">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
          <div
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(24px)',
              transition: 'all 0.7s ease-out',
            }}
          >
            <div className="flex items-center gap-3 mb-6">
              <span className="h-px w-8 bg-accent/40 inline-block" />
              <p className="text-sm uppercase tracking-[0.2em] text-accent">
                Selected Work
              </p>
            </div>
            <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-medium leading-[0.95] tracking-tight">
              Featured
              <br />
              <span className="italic text-dark-400">Projects</span>
            </h2>
          </div>

          {/* Category filter */}
          <div
            className="flex flex-wrap gap-2"
            style={{
              opacity: sectionVisible ? 1 : 0,
              transform: sectionVisible ? 'translateY(0)' : 'translateY(16px)',
              transition: 'all 0.7s ease-out 0.2s',
            }}
          >
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => handleCategoryChange(cat)}
                className={`px-5 py-2.5 text-xs uppercase tracking-[0.15em] border transition-all duration-400 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent ${
                  activeCategory === cat
                    ? 'bg-accent text-dark-950 border-accent'
                    : 'border-dark-700 text-dark-400 hover:border-dark-500 hover:text-dark-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Counter display */}
        <div
          className="flex items-baseline gap-2 mb-10 text-dark-600 text-sm tabular-nums"
          style={{
            opacity: sectionVisible ? 1 : 0,
            transition: 'opacity 0.5s ease 0.3s',
          }}
        >
          <span className="text-accent text-lg">{filteredProjects.length}</span>
          <span>/ {portfolioData.projects.length} projects</span>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayedProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              onOpen={onProjectOpen}
            />
          ))}
        </div>

        {/* Load more */}
        {hasMore && !showAll && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setShowAll(true)}
              className="px-8 py-3 text-xs uppercase tracking-[0.15em] border border-dark-700 text-dark-400 hover:border-accent hover:text-accent transition-all duration-300 focus:outline-none"
            >
              Show All Projects
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default WorkGrid;
