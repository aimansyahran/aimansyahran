import { portfolioData } from '../data/portfolio';

const SocialIcons = {
  linkedin: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
    </svg>
  ),
  behance: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.97c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.493 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.108 5.58 5.443 2.72 6.906 3.461 1.26 3.577 8.056-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.055 0 2.868-3.016.05-3.016z"/>
    </svg>
  ),
  instagram: () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="5"/><circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none"/>
    </svg>
  ),
};

function SocialLink({ platform, url }) {
  const Icon = SocialIcons[platform];
  if (!Icon) return null;
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="w-11 h-11 flex items-center justify-center text-dark-500 hover:text-accent border border-dark-800 hover:border-accent/20 transition-all duration-300 focus:outline-none focus-visible:ring-1 focus-visible:ring-accent"
      aria-label={`Follow us on ${platform}`}
    >
      <Icon />
    </a>
  );
}

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="contact" className="py-24 px-6 md:px-12 bg-dark-900 border-t border-dark-800">
      <div className="max-w-[1600px] mx-auto">
        {/* CTA Banner */}
        <div className="mb-16 p-10 md:p-14 border border-accent/20 bg-accent/5 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-accent/5 via-transparent to-accent/5" />
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-end justify-between gap-8">
            <div>
              <h2 className="font-display text-4xl md:text-5xl font-medium mb-4">
                Let&rsquo;s Work Together
              </h2>
              <p className="text-dark-400 max-w-lg">
                Available for freelance projects, brand collaborations, and design partnerships that push creative boundaries.
              </p>
            </div>
            <a
              href={`mailto:${portfolioData.designer.email}`}
              className="shrink-0 px-8 py-4 bg-accent text-dark-950 font-semibold uppercase tracking-[0.15em] text-[11px] hover:shadow-lg hover:shadow-accent/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Get in Touch
            </a>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-12 lg:gap-12 mb-16">
          {/* Contact */}
          <div className="lg:col-span-2 space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-dark-500 mb-6">
                Contact
              </p>
              <div className="space-y-4">
                <a
                  href={`mailto:${portfolioData.designer.email}`}
                  className="block text-xl md:text-2xl text-dark-300 hover:text-accent transition-colors duration-300"
                >
                  {portfolioData.designer.email}
                </a>
                <a
                  href={`tel:${portfolioData.designer.phone.replace(/\s/g, '')}`}
                  className="block text-lg text-dark-400 hover:text-accent transition-colors duration-300"
                >
                  {portfolioData.designer.phone}
                </a>
              </div>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-dark-500 mb-4">
                Follow
              </p>
              <div className="flex gap-3">
                <SocialLink platform="linkedin" url={portfolioData.designer.social.linkedin} />
                <SocialLink platform="behance" url={portfolioData.designer.social.behance} />
                <SocialLink platform="instagram" url={portfolioData.designer.social.instagram} />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-dark-500 mb-6">
              Navigation
            </p>
            <div className="space-y-3">
              {['Work', 'About', 'Services', 'Skills'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  className="block text-sm text-dark-400 hover:text-accent transition-colors duration-300 py-1"
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          {/* Location & Availability */}
          <div className="space-y-8">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-dark-500 mb-6">
                Location
              </p>
              <p className="text-dark-300 leading-relaxed">
                {portfolioData.designer.location}
              </p>
            </div>

            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-dark-500 mb-6">
                Availability
              </p>
              <div className="space-y-2 text-sm text-dark-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  <span>Open for projects</span>
                </div>
                <p className="text-dark-500 text-xs">
                  Response within 24 hours
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-dark-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4">
            <img
              src="/logo.png"
              alt={portfolioData.designer.name}
              className="h-8 w-auto"
            />
            <p className="text-sm text-dark-400">
              &copy; {currentYear} {portfolioData.designer.name}. All rights reserved.
            </p>
          </div>
          <p className="text-sm text-dark-400">
            Designed with precision and purpose.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
