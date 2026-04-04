import siteData from '../data/siteData';
import SectionHeading from './ui/SectionHeading';
import ScrollReveal from './ui/ScrollReveal';
import ProjectCard from './ui/ProjectCard';

const { projects } = siteData;
const featured = projects.filter((p) => p.featured);
const supporting = projects.filter((p) => !p.featured);

export default function Projects() {
  return (
    <section id="projects" className="bg-slate-800/30 py-24">
      <div className="mx-auto max-w-6xl px-6">
        <ScrollReveal>
          <SectionHeading
            title="Projects"
            subtitle="Selected personal and open-source work"
          />
        </ScrollReveal>

        {/* Featured projects */}
        <div className="space-y-8">
          {featured.map((project) => (
            <ScrollReveal key={project.id}>
              <ProjectCard project={project} featured />
            </ScrollReveal>
          ))}
        </div>

        {/* Supporting projects */}
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {supporting.map((project, i) => (
            <ScrollReveal key={project.id} delay={i * 100}>
              <ProjectCard project={project} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
