import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const slides = [
  {
    id: 1,
    tag: "ABOUT ARTeCX",
    title: "Building Scalable Intelligent Digital Solutions",
    subtitle: "From enterprise systems to AI-powered platforms",
    description:
      "ARTeCX Solutions specializes in building scalable, intelligent, and user-centric digital solutions that transform ideas into impactful digital experiences.",
    primaryBtnText: "Explore Services",
    primaryBtnLink: "/services",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 2,
    tag: "ENGINEERING EXPERTISE",
    title: "Full Stack Engineering Excellence",
    subtitle: "Frontend, Backend & Cloud Systems",
    description:
      "We deliver web applications, mobile apps, backend systems, and data-driven platforms using modern technologies and best engineering practices.",
    primaryBtnText: "View Projects",
    primaryBtnLink: "/projects",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1600&q=80",
  },
  {
    id: 3,
    tag: "INNOVATION & IMPACT",
    title: "AI, Cloud & DevOps Solutions",
    subtitle: "Driving innovation with modern technologies",
    description:
      "From AI & Machine Learning solutions to cloud deployment and DevOps automation, we help businesses build scalable and efficient systems.",
    primaryBtnText: "Learn More",
    primaryBtnLink: "/about",
    secondaryBtnText: "Contact Us",
    secondaryBtnLink: "/contact",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1600&q=80",
  },
];

function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isDark, setIsDark] = useState(
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-[100vh] min-h-[560px] overflow-hidden transition-colors duration-500">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ${
            index === current
              ? "z-10 scale-100 opacity-100"
              : "z-0 scale-110 opacity-0"
          }`}
        >
          <div
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.image})` }}
          />

          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              isDark ? "bg-black/65" : "bg-white/55"
            }`}
          />

          <div
            className={`absolute inset-0 transition-colors duration-500 ${
              isDark
                ? "bg-gradient-to-r from-slate-950/70 via-slate-900/40 to-transparent"
                : "bg-gradient-to-r from-white/70 via-white/30 to-transparent"
            }`}
          />

          <div className="relative z-10 mx-auto flex h-full max-w-7xl items-center px-6 sm:px-8 lg:px-10">
            <div className="max-w-3xl">
              <p
                className={`mb-4 text-xs font-semibold uppercase tracking-[0.35em] sm:text-sm ${
                  isDark ? "text-blue-300" : "text-[#2563eb]"
                }`}
              >
                {slide.tag}
              </p>

              <h1
                className={`mb-4 text-4xl font-extrabold leading-tight sm:text-5xl lg:text-7xl ${
                  isDark ? "text-white" : "text-[#0f172a]"
                }`}
              >
                {slide.title}
              </h1>

              <h2
                className={`mb-6 text-2xl font-semibold sm:text-3xl ${
                  isDark ? "text-slate-100" : "text-slate-700"
                }`}
              >
                {slide.subtitle}
              </h2>

              <p
                className={`max-w-2xl text-base leading-8 sm:text-lg ${
                  isDark ? "text-slate-200" : "text-slate-700"
                }`}
              >
                {slide.description}
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link
                  to={slide.primaryBtnLink}
                  className="inline-flex items-center justify-center rounded-full bg-blue-600 px-8 py-3 text-base font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-blue-500"
                >
                  {slide.primaryBtnText}
                </Link>

                <Link
                  to={slide.secondaryBtnLink}
                  className={`inline-flex items-center justify-center rounded-full px-8 py-3 text-base font-semibold transition duration-300 hover:scale-[1.02] ${
                    isDark
                      ? "border border-white/40 bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
                      : "border border-slate-400 bg-white/70 text-slate-900 backdrop-blur-sm hover:bg-white"
                  }`}
                >
                  {slide.secondaryBtnText}
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className={`absolute left-4 top-1/2 z-20 -translate-y-1/2 rounded-full px-4 py-3 transition ${
          isDark
            ? "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            : "bg-white/80 text-slate-900 shadow-md hover:bg-white"
        }`}
      >
        ‹
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-4 top-1/2 z-20 -translate-y-1/2 rounded-full px-4 py-3 transition ${
          isDark
            ? "bg-white/10 text-white backdrop-blur-sm hover:bg-white/20"
            : "bg-white/80 text-slate-900 shadow-md hover:bg-white"
        }`}
      >
        ›
      </button>

      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 gap-3">
        {slides.map((slide, index) => (
          <button
            key={slide.id}
            onClick={() => setCurrent(index)}
            className={`h-3 w-3 rounded-full transition ${
              current === index
                ? "scale-110 bg-blue-500"
                : isDark
                ? "bg-white/70"
                : "bg-slate-500/60"
            }`}
          />
        ))}
      </div>
    </section>
  );
}

export default HeroSlider;