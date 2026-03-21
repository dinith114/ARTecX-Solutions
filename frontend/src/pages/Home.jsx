import PageWrapper from "../components/common/PageWrapper";
import HomeHeroSlider from "../components/common/HeroSlider";
import TestimonialsSection from "../components/common/TestimonialsSection";
import TechStackMarquee from "../components/common/TechStackMarquee";

function Home() {
  return (
    <PageWrapper>
      <HomeHeroSlider />

      <section className="bg-[#f8fbff] py-20 transition-colors duration-300 dark:bg-slate-950">
        <div className="mx-auto max-w-7xl px-6">
          <div className="max-w-4xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.3em] text-blue-500">
              Innovative Digital Solutions
            </p>

            <h2 className="mb-6 text-4xl font-bold leading-tight text-[#1f3a93] dark:text-white sm:text-5xl lg:text-6xl">
              Building scalable software experiences for modern businesses
            </h2>

            <p className="text-lg leading-9 text-slate-700 dark:text-slate-300">
              ARTeCX Solutions delivers modern web, backend, and product engineering
              services focused on performance, reliability, and business growth.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <a
                href="/services"
                className="rounded-xl bg-[#1f3a93] px-6 py-3 text-center font-semibold text-white transition duration-300 hover:scale-[1.02] hover:bg-[#2f80ed]"
              >
                Explore Services
              </a>

              <a
                href="/contact"
                className="rounded-xl border border-[#1f3a93] px-6 py-3 text-center font-semibold text-[#1f3a93] transition duration-300 hover:scale-[1.02] hover:bg-blue-50 dark:border-blue-400 dark:text-blue-400 dark:hover:bg-slate-900"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <TechStackMarquee />
    </PageWrapper>
  );
}

export default Home;