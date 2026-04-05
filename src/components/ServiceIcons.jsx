const ServiceIconsData = {
  brand: (
    <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
  ),
  visual: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="2"/>
      <circle cx="8.5" cy="8.5" r="1.5"/>
      <path d="M21 15l-5-5L5 21"/>
    </>
  ),
  uiux: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2"/>
      <path d="M8 21h8M12 17v4"/>
    </>
  ),
  direction: (
    <>
      <circle cx="12" cy="12" r="10"/>
      <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88" fill="currentColor"/>
    </>
  ),
  '3d': (
    <>
      <path d="M12 2l8 4.5v11L12 22l-8-4.5v-11L12 2z"/>
      <path d="M12 22V11M20 6.5L12 11 4 6.5"/>
    </>
  ),
  ai: (
    <>
      <path d="M12 2a4 4 0 0 1 4 4c0 1.1-.9 2-2 2h-4a2 2 0 0 1-2-2 4 4 0 0 1 4-4z"/>
      <path d="M12 8v4M8 16l4-4 4 4M6 20h12"/>
    </>
  ),
  systems: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </>
  ),
  art: (
    <>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2 0-.5-.2-1-.5-1.3-.3-.4-.5-.8-.5-1.3 0-1.1.9-2 2-2h1.5c3.04 0 5.5-2.46 5.5-5.5C22 5.23 17.52 2 12 2z"/>
      <circle cx="7.5" cy="11.5" r="1.5" fill="currentColor"/>
      <circle cx="10.5" cy="7.5" r="1.5" fill="currentColor"/>
      <circle cx="15.5" cy="7.5" r="1.5" fill="currentColor"/>
    </>
  ),
  editorial: (
    <path d="M4 4h16v16H4zM4 8h16M8 4v16"/>
  ),
  packaging: (
    <>
      <path d="M16.5 9.4l-9-5.19M21 16V8l-9-5.2L3 8v8l9 5.2L21 16z"/>
      <path d="M3.27 6.96L12 12.01l8.73-5.05M12 22.08V12"/>
    </>
  ),
  calligraphy: (
    <>
      <path d="M20 4c-2 0-4 4-6 8s-2 8-2 8M4 20c2 0 4-4 6-8s2-8 2-8"/>
      <path d="M4 4c4 2 8 2 12 0M4 8c4 2 8 2 12 0"/>
    </>
  ),
  motion: (
    <polygon points="5,3 19,12 5,21"/>
  ),
};

export function ServiceIcon({ icon, className = 'w-5 h-5' }) {
  const children = ServiceIconsData[icon] ?? ServiceIconsData.brand;
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className={className}>
      {children}
    </svg>
  );
}
