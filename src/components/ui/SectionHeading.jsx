export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="mb-12 text-center">
      <h2 className="font-heading text-3xl font-bold md:text-4xl">{title}</h2>
      {subtitle && (
        <p className="mt-3 text-slate-400">{subtitle}</p>
      )}
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-accent" />
    </div>
  );
}
