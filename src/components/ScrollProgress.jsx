import { useState, useEffect, useRef } from 'react';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (tickingRef.current) return;
      tickingRef.current = true;
      requestAnimationFrame(() => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrolled = (window.scrollY / totalHeight) * 100;
        setProgress(scrolled);
        tickingRef.current = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-px bg-transparent">
      <div
        className="h-full bg-accent origin-left"
        style={{
          transform: `scaleX(${progress / 100})`,
          transition: 'transform 100ms linear',
        }}
      />
    </div>
  );
};

export default ScrollProgress;
