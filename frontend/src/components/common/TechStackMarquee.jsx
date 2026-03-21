const techItems = [
  "Node.js",
  "Python",
  ".NET",
  "Java",
  "React",
  "Angular",
  "Vue",
  "AI & Machine Learning",
  "Azure",
  "AWS",
  "GCP",
  "DevOps",
  "CI/CD",
  "Infrastructure Automation",
];

function TechStackMarquee() {
  const repeatedItems = [...techItems, ...techItems];

  return (
    <section className="overflow-hidden bg-[#f8fbff] py-20 transition-colors duration-300 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="text-center text-4xl font-extrabold text-slate-900 dark:text-white sm:text-5xl">
          <span className="text-blue-600">TECHNOLOGY</span> STACK
        </h2>
      </div>

      <div className="mt-12 overflow-hidden">
        <div className="tech-marquee flex min-w-max gap-8">
          {repeatedItems.map((item, index) => (
            <div
              key={`${item}-${index}`}
              className="flex min-w-[190px] items-center justify-center rounded-2xl border border-slate-200 bg-white px-8 py-5 text-xl font-semibold text-slate-800 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100"
            >
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackMarquee;