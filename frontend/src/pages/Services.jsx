import PageWrapper from "../components/common/PageWrapper";

function Services() {
  const services = [
    {
      title: "Web Development",
      description: "Responsive and modern web applications tailored to business goals.",
    },
    {
      title: "Backend Engineering",
      description: "Robust APIs, database design, and scalable server-side systems.",
    },
    {
      title: "UI/UX Design",
      description: "Clean, intuitive, and user-focused interfaces for digital products.",
    },
    {
      title: "System Integration",
      description: "Connecting platforms, services, and data flows efficiently.",
    },
  ];

  return (
    <PageWrapper>
      <section className="w-full min-h-[calc(100vh-140px)] bg-[#f8fbff] py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <h2 className="mb-10 text-3xl font-bold text-[#1f3a93] dark:text-white sm:text-4xl">
            Services
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {services.map((service, index) => (
              <div
                key={index}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
              >
                <h3 className="mb-3 text-2xl font-semibold text-[#2f80ed] dark:text-blue-400">
                  {service.title}
                </h3>

                <p className="text-base leading-7 text-slate-700 dark:text-slate-300">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}

export default Services;