import siteData from '../data/siteData';

const { hero } = siteData;

export default function Footer() {
  return (
    <footer className="border-t border-slate-800 py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-6 text-center sm:flex-row sm:justify-between sm:text-left">
        <p className="text-sm text-slate-500">
          &copy; {new Date().getFullYear()} {hero.name} - All rights reserved.
        </p>
        <div className="flex gap-4">
          {hero.socials.map((s) => (
            <a
              key={s.platform}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-slate-500 transition-colors hover:text-accent"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
