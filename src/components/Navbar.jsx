import { useState, useEffect } from 'react';
import useScrollSpy from '../hooks/useScrollSpy';

const NAV_LINKS = [
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const active = useScrollSpy();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-slate-900/95 shadow-lg shadow-black/20 backdrop-blur-md'
          : 'bg-transparent'
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a
          href="#"
          className="font-heading text-xl font-bold text-white transition-colors hover:text-accent"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        >
          RV<span className="text-accent">.</span>
        </a>

        {/* Desktop links */}
        <div className="hidden gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm font-medium transition-colors ${
                active === link.id
                  ? 'text-accent'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span
            className={`h-0.5 w-6 bg-white transition-all ${
              menuOpen ? 'translate-y-2 rotate-45' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all ${
              menuOpen ? 'opacity-0' : ''
            }`}
          />
          <span
            className={`h-0.5 w-6 bg-white transition-all ${
              menuOpen ? '-translate-y-2 -rotate-45' : ''
            }`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`overflow-hidden transition-all duration-300 md:hidden ${
          menuOpen ? 'max-h-64' : 'max-h-0'
        }`}
      >
        <div className="flex flex-col gap-4 bg-slate-900/95 px-6 pb-6 backdrop-blur-md">
          {NAV_LINKS.map((link) => (
            <a
              key={link.id}
              href={`#${link.id}`}
              className={`text-sm font-medium transition-colors ${
                active === link.id
                  ? 'text-accent'
                  : 'text-slate-400 hover:text-white'
              }`}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}
