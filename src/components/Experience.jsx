import siteData from '../data/siteData';
import SectionHeading from './ui/SectionHeading';
import ScrollReveal from './ui/ScrollReveal';

const { experience } = siteData;

export default function Experience() {
  return (
    <section id="experience" className="py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading title="Experience" subtitle="My professional journey" />
        </ScrollReveal>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 hidden h-full w-0.5 bg-slate-700 md:left-1/2 md:-translate-x-px md:block" />
          <div className="absolute left-4 top-0 block h-full w-0.5 bg-slate-700 md:hidden" />

          <div className="space-y-12">
            {experience.map((job, i) => (
              <ScrollReveal key={i} delay={i * 100}>
                <div
                  className={`relative flex flex-col md:flex-row md:gap-8 ${
                    i % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline dot */}
                  <div className="absolute left-4 top-6 z-10 hidden h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-900 bg-accent md:left-1/2 md:block" />
                  <div className="absolute left-4 top-6 z-10 block h-4 w-4 -translate-x-1/2 rounded-full border-4 border-slate-900 bg-accent md:hidden" />

                  {/* Card */}
                  <div className="ml-10 md:ml-0 md:w-1/2">
                    <div
                      className={`rounded-xl border border-slate-700/50 bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5 ${
                        i % 2 === 0 ? 'md:mr-8' : 'md:ml-8'
                      }`}
                    >
                      <div className="mb-1 text-xs font-semibold uppercase tracking-wider text-accent">
                        {job.startDate} — {job.endDate || job.startDate}
                      </div>
                      <h3 className="font-heading text-lg font-bold">
                        {job.title}
                      </h3>
                      <p className="text-sm text-slate-400">{job.company}</p>
                      <ul className="mt-4 space-y-2">
                        {job.bullets.map((bullet, j) => (
                          <li
                            key={j}
                            className="flex gap-2 text-sm leading-relaxed text-slate-300"
                          >
                            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Spacer for the other side */}
                  <div className="hidden md:block md:w-1/2" />
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
