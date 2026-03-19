import PageWrapper from "../components/common/PageWrapper";

function Projects() {
  const projects = [
    {
      title: "Enterprise Management Platform",
      description:
        "A centralized system for managing operations, reporting, and workflows.",
    },
    {
      title: "Smart Mobility Application",
      description:
        "A user-focused mobile platform designed to improve transport accessibility.",
    },
    {
      title: "Business Analytics Dashboard",
      description:
        "Interactive dashboards for tracking KPIs and operational insights.",
    },
  ];

  return (
    <PageWrapper>
      <section className="w-full min-h-[calc(100vh-140px)] bg-[#f8fbff] py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-bold text-[#1f3a93] dark:text-white sm:text-4xl">
            Projects
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="mb-3 text-2xl font-semibold text-[#2f80ed] dark:text-blue-400">
                  {project.title}
                </h3>

                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                  {project.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Projects;