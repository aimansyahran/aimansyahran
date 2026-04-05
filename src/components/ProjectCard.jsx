import { useState } from 'react';

const gradients = [
  'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)',
  'linear-gradient(135deg, #2d1b69 0%, #11998e 100%)',
  'linear-gradient(135deg, #0d0d0d 0%, #34495e 100%)',
  'linear-gradient(135deg, #232526 0%, #414345 100%)',
  'linear-gradient(135deg, #1f4037 0%, #99f2c8 100%)',
  'linear-gradient(135deg, #0c0c0c 0%, #c5e431 200%)',
  'linear-gradient(135deg, #2c3e50 0%, #4ca1af 100%)',
  'linear-gradient(135deg, #200122 0%, #6f0000 100%)',
  'linear-gradient(135deg, #2d2d2d 0%, #c5e431 300%)',
  'linear-gradient(135deg, #141e30 0%, #243b55 100%)',
  'linear-gradient(135deg, #1a1a2e 0%, #c5e431 250%)',
  'linear-gradient(135deg, #0f2027 0%, #2c5364 100%)',
  'linear-gradient(135deg, #0c0c0c 0%, #3a1c71 100%)',
];

const logos = {
  1: 'KSG',
  2: 'DGDA',
  3: 'NEOM',
  4: 'KAFD',
  5: 'RH',
  6: 'RD',
  7: 'RS',
  8: 'JS',
  9: 'JEDCO',
  10: 'AMR',
  11: 'Goody',
  12: 'NAI',
  13: 'RIYALI',
};

const ProjectCard = ({ project, index, onOpen }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [logoError, setLogoError] = useState(false);
  const gradient = gradients[index % gradients.length];
  const logoText = logos[project.id] || project.title.substring(0, 2).toUpperCase();
  const hasLogo = project.logo && !logoError;

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      onOpen(project);
    }
  };

  // Determine font size for logo based on text length
  const logoSize = logoText.length > 5 ? 'text-lg' : logoText.length > 3 ? 'text-xl' : 'text-2xl';

  return (
    <div
      className="group relative cursor-pointer"
      style={{
        animation: `fade-in-up 0.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 80}ms both`,
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onOpen(project)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`View project: ${project.title}`}
    >
      <span
        className="absolute -top-4 left-4 z-10 text-[4rem] md:text-[6rem] leading-none font-display text-dark-800/80 group-hover:text-accent/30 transition-colors duration-500 pointer-events-none select-none hidden md:block"
        aria-hidden="true"
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative aspect-[4/3] overflow-hidden bg-dark-900 ring-1 ring-dark-800/30 group-hover:ring-accent/20 transition-all duration-500 mt-4 md:mt-0">
        {/* Gradient background — always visible */}
        <div
          className="absolute inset-0 transition-opacity duration-700"
          style={{ background: gradient }}
        />

        {/* Logo mark — centered on the card */}
        <div className="absolute inset-0 flex items-center justify-center z-[2]">
          {hasLogo ? (
            <img
              src={project.logo}
              alt={project.title}
              className="w-[45%] h-auto object-contain transition-all duration-500 group-hover:scale-105"
              onError={() => setLogoError(true)}
            />
          ) : (
            <div
              className={`px-4 py-2 border border-white/20 backdrop-blur-sm ${logoSize} font-medium text-white/90 tracking-wider transition-all duration-500 group-hover:border-accent/40 group-hover:text-accent/90 group-hover:scale-105`}
            >
              {logoText}
            </div>
          )}
        </div>

        {/* Hover overlay with slide-up reveal */}
        <div
          className="absolute inset-0 bg-gradient-to-t from-dark-950/90 via-dark-950/40 to-transparent flex flex-col justify-end p-6 transition-opacity duration-500"
          style={{
            opacity: isHovered ? 1 : 0,
            transform: isHovered ? 'translateY(0)' : 'translateY(8px)',
            transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 3,
          }}
        >
          <p className="text-xs uppercase tracking-[0.25em] text-accent mb-2">
            {project.category}
          </p>
          <h3 className="font-display text-2xl md:text-3xl font-medium leading-tight">
            {project.title}
          </h3>
          <p className="text-xs text-dark-400 mt-2 line-clamp-2">
            {project.description}
          </p>
          <div className="mt-4 flex items-center gap-2 text-[10px] uppercase tracking-wider text-dark-400">
            <span>View Details</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
              <path d="M1 11L11 1M11 1H3M11 1V9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Corner accent on hover */}
        <div className="absolute top-0 right-0 w-0 h-0 bg-accent/20 group-hover:w-16 group-hover:h-16 transition-all duration-500" />
        <div className="absolute bottom-0 left-0 w-0 h-px bg-accent/40 group-hover:w-full transition-all duration-700" />
      </div>

      {/* Card info */}
      <div className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-medium text-dark-200 group-hover:text-accent transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-xs text-dark-500 mt-0.5">{project.category}</p>
        </div>
        <span className="text-xs text-dark-600 tabular-nums shrink-0">{project.year}</span>
      </div>

      <div className="mt-2 h-px bg-dark-800 group-hover:bg-accent/20 transition-colors duration-500" />
    </div>
  );
};

export default ProjectCard;
