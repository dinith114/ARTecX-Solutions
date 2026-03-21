const testimonials = [
  {
    id: 1,
    name: "Shane Perera",
    role: "CEO, Digital Growth Labs",
    message:
      "ARTeCX Solutions delivered a scalable product foundation with strong technical quality, clear communication, and a practical problem-solving approach throughout the project.",
  },
  {
    id: 2,
    name: "Deepa Fernando",
    role: "Founder, Nova Retail",
    message:
      "Their design and engineering recommendations were modern, thoughtful, and highly practical. The team helped us move forward with confidence and clarity.",
  },
];

function TestimonialsSection() {
  return (
    <section className="bg-white py-20 transition-colors duration-300 dark:bg-slate-900">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
          <span className="text-blue-600">WHAT OUR</span> CLIENTS SAY
        </h2>

        <p className="mx-auto mt-4 max-w-4xl text-center text-2xl italic text-slate-500 dark:text-slate-300 sm:text-3xl">
          Discover how our clients have achieved their business goals and exceeded expectations.
        </p>

        <div className="mt-14 grid gap-8 lg:grid-cols-2">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl border border-slate-200 bg-white p-8 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-950"
            >
              <div className="mb-5 flex items-start gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100 text-xl font-bold text-red-600">
                  {item.name.charAt(0)}
                </div>

                <div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
                    {item.name}
                  </h3>
                  <p className="text-lg italic text-slate-600 dark:text-slate-400">
                    {item.role}
                  </p>
                </div>
              </div>

              <p className="text-lg leading-9 text-slate-700 dark:text-slate-300">
                {item.message}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;