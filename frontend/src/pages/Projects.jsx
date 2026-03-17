function Projects() {
  const projects = [
    {
      title: "Enterprise Management Platform",
      description: "A centralized system for managing operations, reporting, and workflows.",
    },
    {
      title: "Smart Mobility Application",
      description: "A user-focused mobile platform designed to improve transport accessibility.",
    },
    {
      title: "Business Analytics Dashboard",
      description: "Interactive dashboards for tracking KPIs and operational insights.",
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-4xl font-bold text-white">Projects</h2>

      <div className="grid gap-6 md:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6"
          >
            <h3 className="mb-3 text-xl font-semibold text-cyan-400">
              {project.title}
            </h3>
            <p className="text-slate-300 leading-7">{project.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Projects;