import siteData from '../data/siteData';
import SectionHeading from './ui/SectionHeading';
import ScrollReveal from './ui/ScrollReveal';

const { skills } = siteData;

export default function Skills() {
  return (
    <section id="skills" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="Skills"
            subtitle="Technologies and tools I work with"
          />
        </ScrollReveal>

        <div className="grid gap-8 md:grid-cols-3">
          {Object.entries(skills).map(([category, items], i) => (
            <ScrollReveal key={category} delay={i * 100}>
              <div className="rounded-xl border border-slate-700/50 bg-surface p-6">
                <h3 className="mb-4 font-heading text-lg font-bold text-accent">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="rounded-full border border-slate-600/50 bg-slate-800 px-3 py-1.5 text-sm text-slate-300 transition-colors hover:border-accent/50 hover:text-accent"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
