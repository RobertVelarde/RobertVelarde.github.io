import siteData from '../data/siteData';
import ScrollReveal from './ui/ScrollReveal';

const { hero, education } = siteData;

function SocialIcon({ platform }) {
  if (platform === 'linkedin') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    );
  }
  if (platform === 'github') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
        <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
      </svg>
    );
  }
  return null;
}

export default function Hero() {
  return (
    <section className="relative flex min-h-screen items-center overflow-hidden pt-20">
      {/* Subtle gradient background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-accent-amber/5 blur-3xl" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2 lg:gap-16">
        {/* Text */}
        <ScrollReveal className="flex flex-col justify-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
            {hero.headline}
          </p>
          <h1 className="font-heading text-5xl font-extrabold leading-tight md:text-7xl">
            {hero.name}
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-400">
            {hero.tagline}
          </p>

          {/* Education badges */}
          <div className="mt-6 flex flex-wrap gap-3">
            {education.map((ed) => (
              <span
                key={ed.degree}
                className="rounded-full border border-slate-700 bg-surface px-4 py-1.5 text-xs font-medium text-slate-300"
              >
                {ed.degree} — {ed.institution}
              </span>
            ))}
          </div>

          {/* Social links */}
          <div className="mt-8 flex gap-4">
            {hero.socials.map((s) => (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex items-center gap-2 rounded-lg border border-slate-700 bg-surface px-4 py-2.5 text-sm font-medium text-slate-300 transition-all hover:border-accent/50 hover:text-accent"
              >
                <SocialIcon platform={s.platform} />
                {s.label}
              </a>
            ))}
          </div>
        </ScrollReveal>

        {/* Headshot */}
        <ScrollReveal delay={200} className="flex items-center justify-center">
          <div className="relative">
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-accent/20 to-accent-amber/20 blur-2xl" />
            <img
              src={hero.headshot}
              alt={hero.name}
              className="relative h-72 w-72 rounded-full border-4 border-slate-800 object-cover shadow-2xl ring-4 ring-accent/20 md:h-96 md:w-96"
            />
          </div>
        </ScrollReveal>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-slate-500">
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </div>
    </section>
  );
}
