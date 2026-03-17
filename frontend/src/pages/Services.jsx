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
    <section className="mx-auto max-w-7xl px-6 py-20">
      <h2 className="mb-10 text-4xl font-bold text-[#1f3a93]">Services</h2>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((service, index) => (
          <div
            key={index}
            className="rounded-2xl border border-slate-800 bg-slate-900 p-6 shadow-lg"
          >
            <h3 className="mb-3 text-2xl font-semibold text-cyan-400">
              {service.title}
            </h3>
            <p className="text-slate-300 leading-7">{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Services;