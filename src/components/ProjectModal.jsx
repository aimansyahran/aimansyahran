import { useEffect, useRef, useState, useCallback } from 'react';

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

const ProjectModal = ({ project, allProjects, onClose, onNavigate }) => {
  const closeButtonRef = useRef(null);
  const modalRef = useRef(null);
  const galleryScrollRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false);

  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const gradient = gradients[currentIndex % gradients.length];

  // Gallery items - blend images with gradient slide
  const gallery = project.gallery
    ? [...project.gallery.map(url => ({ type: 'image', src: url })),
       { type: 'gradient', gradient }]
    : [{ type: 'gradient', gradient }];

  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : null;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : null;

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [project]);

  useEffect(() => {
    if (closeButtonRef.current) closeButtonRef.current.focus();
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') { handleClose(); return; }
      if (e.key === 'Tab') {
        const list = modalRef.current?.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        if (!list || list.length === 0) return;
        if (e.shiftKey && document.activeElement === list[0]) {
          e.preventDefault(); list[list.length - 1].focus();
        } else if (!e.shiftKey && document.activeElement === list[list.length - 1]) {
          e.preventDefault(); list[0].focus();
        }
      }
      if (e.key === 'ArrowLeft' && prevProject) navigateTo(prevProject);
      if (e.key === 'ArrowRight' && nextProject) navigateTo(nextProject);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [project, prevProject, nextProject]);

  const handleClose = useCallback(() => {
    setIsClosing(true);
    setTimeout(onClose, 400);
  }, [onClose]);

  const navigateTo = useCallback((targetProject) => {
    onNavigate(targetProject);
  }, [onNavigate]);

  const handleContactClick = useCallback(() => {
    handleClose();
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  }, [handleClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) handleClose();
  };

  return (
    <div
      className="fixed inset-0 z-50"
      role="dialog"
      aria-modal="true"
      aria-label={`${project.title} project details`}
      style={{
        opacity: isClosing ? 0 : 1,
        transition: 'opacity 0.4s ease',
      }}
      onClick={handleOverlayClick}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-lg" aria-hidden="true" />

      {/* Modal content */}
      <div
        ref={modalRef}
        className="relative z-10 w-full h-full flex flex-col"
        style={{
          opacity: isClosing ? 0 : 1,
          transform: isClosing ? 'translateY(30px) scale(0.97)' : 'translateY(0) scale(1)',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        }}
      >
        {/* Top bar */}
        <div className="absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-6 md:px-12 pt-6 md:pt-8">
          <div className="flex items-center gap-4">
            <span className="text-xs tabular-nums text-dark-500 uppercase tracking-wider">
              {String(currentIndex + 1).padStart(2, '0')} / {String(allProjects.length).padStart(2, '0')}
            </span>
            <div className="hidden md:flex items-center gap-px">
              {allProjects.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => navigateTo(p)}
                  className={`h-0.5 transition-all duration-300 ${
                    i === currentIndex ? 'w-8 bg-accent' : 'w-4 bg-dark-700 hover:bg-dark-500'
                  }`}
                  aria-label={`Go to ${p.title}`}
                />
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              ref={closeButtonRef}
              onClick={handleClose}
              className="w-10 h-10 flex items-center justify-center border border-dark-700 hover:border-white transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
              aria-label="Close modal"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
        </div>

        {/* Main content — image left, details right */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* LEFT: Gallery */}
          <div className="lg:w-[65%] relative bg-dark-900 flex flex-col">
            {/* Scrollable gallery */}
            <div
              ref={galleryScrollRef}
              className="flex-1 overflow-y-auto overflow-x-hidden snap-y snap-mandatory"
              style={{ scrollBehavior: 'smooth' }}
            >
              {gallery.map((item, i) => (
                <div key={i} className="snap-start w-full h-[85vh] lg:h-[90vh] relative flex-shrink-0">
                  {item.type === 'gradient' ? (
                    <div
                      className="w-full h-full"
                      style={{
                        background: item.gradient,
                        animation: `fade-in 0.6s ease-out both`,
                      }}
                    />
                  ) : (
                    <img
                      src={item.src}
                      alt={`${project.title} — Image ${i + 1}`}
                      className="w-full h-full object-cover"
                      style={{
                        animation: `fade-in 0.6s ease-out ${i * 0.15}s both`,
                      }}
                      loading={i === 0 ? 'eager' : 'lazy'}
                      decoding="async"
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Thumbnail strip */}
            {gallery.length > 1 && (
              <div className="absolute bottom-0 left-0 right-0 z-10 px-4 pb-4 flex gap-2 overflow-x-auto hide-scrollbar">
                {gallery.map((item, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      if (galleryScrollRef.current?.children[i]) {
                        galleryScrollRef.current.children[i].scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="relative w-14 h-14 flex-shrink-0 overflow-hidden border border-dark-600/50 hover:border-dark-400 transition-colors duration-300"
                    style={item.type === 'gradient' ? { background: item.gradient } : {}}
                  >
                    {item.type === 'image' ? (
                      <img src={item.src} alt="" className="w-full h-full object-cover" />
                    ) : (
                      <span className="absolute inset-0 flex items-center justify-center text-[10px] text-dark-400 font-display">+</span>
                    )}
                  </button>
                ))}
              </div>
            )}

            {/* Logo mark - centered */}
            <div className="absolute inset-0 flex items-center justify-center z-[2] pointer-events-none">
              <div className="px-5 py-3 border border-white/20 backdrop-blur-sm text-xl font-medium text-white/90 tracking-wider">
                {logos[project.id] || project.title.substring(0, 2).toUpperCase()}
              </div>
            </div>

            {/* Project badge */}
            <div
              className="absolute top-20 left-6 md:left-8 px-5 py-2 bg-dark-950/80 backdrop-blur-sm border border-dark-700/50 text-xs uppercase tracking-[0.2em] text-accent"
              style={{
                animation: 'modal-badge-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s both',
              }}
            >
              {project.category} — {project.year}
            </div>

            {/* Large watermark number */}
            <span
              className="absolute bottom-24 right-6 md:right-8 text-[8rem] md:text-[10rem] font-display leading-none text-white/[0.06] pointer-events-none select-none hidden lg:block"
              aria-hidden="true"
            >
              {String(currentIndex + 1).padStart(2, '0')}
            </span>
          </div>

          {/* RIGHT: Details panel */}
          <div className="lg:w-[35%] bg-dark-950 overflow-y-auto border-l border-dark-800/50">
            <div className="p-8 md:p-10 lg:p-12 space-y-10">
              <div
                style={{
                  animation: 'modal-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.15s both',
                }}
              >
                <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-medium leading-[0.95] tracking-tight">
                  {project.title}
                </h2>
                <div className="flex items-center gap-3 mt-4">
                  <span className="h-px w-6 bg-accent/40" />
                  <p className="text-[10px] uppercase tracking-[0.2em] text-dark-500">
                    {project.category}
                  </p>
                </div>
              </div>

              <div
                className="space-y-4"
                style={{
                  animation: 'modal-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.25s both',
                }}
              >
                <h3 className="text-xs uppercase tracking-[0.25em] text-dark-500">Overview</h3>
                <p className="text-base text-dark-300 leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div
                style={{
                  animation: 'modal-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.35s both',
                }}
              >
                <h3 className="text-xs uppercase tracking-[0.25em] text-dark-500 mb-4">Expertise</h3>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-dark-900 border border-dark-800 text-[11px] text-dark-400 uppercase tracking-wider"
                      style={{
                        animation: `modal-tag-in 0.3s ease-out ${0.4 + i * 0.05}s both`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="h-px bg-dark-800" />

              <div
                className="flex items-center justify-between text-xs text-dark-600"
                style={{
                  animation: 'modal-slide-up 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.45s both',
                }}
              >
                <button
                  onClick={() => prevProject && navigateTo(prevProject)}
                  className={`flex items-center gap-2 transition-colors duration-300 group ${
                    prevProject ? 'hover:text-dark-300' : 'opacity-30 cursor-default'
                  }`}
                  disabled={!prevProject}
                >
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M10 6H2M2 6L5 3M2 6L5 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  <span className="hover:underline">{prevProject ? prevProject.title : '—'}</span>
                </button>
                <span className="text-dark-800">/</span>
                <button
                  onClick={() => nextProject && navigateTo(nextProject)}
                  className={`flex items-center gap-2 transition-colors duration-300 group ${
                    nextProject ? 'hover:text-dark-300' : 'opacity-30 cursor-default'
                  }`}
                  disabled={!nextProject}
                >
                  <span className="hover:underline">{nextProject ? nextProject.title : '—'}</span>
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6H10M10 6L7 3M10 6L7 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectModal;
