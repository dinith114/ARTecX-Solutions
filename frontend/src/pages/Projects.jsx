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
    <section className="w-full bg-[#f8fbff] py-16 sm:py-20 md:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <h2 className="mb-10 text-3xl font-bold text-[#1f3a93] sm:text-4xl">
          Projects
        </h2>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
          {projects.map((project, index) => (
            <div
              key={index}
              className="rounded-2xl bg-[#0f1d46] p-6 shadow-lg"
            >
              <h3 className="mb-3 text-2xl font-semibold text-[#2f80ed]">
                {project.title}
              </h3>
              <p className="text-base leading-7 text-white">
                {project.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;