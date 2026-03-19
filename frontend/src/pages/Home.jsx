import PageWrapper from "../components/common/PageWrapper";

function Home() {
  return (
    <PageWrapper>
      <section className="w-full min-h-[calc(100vh-140px)] bg-[#f8fbff] py-16 transition-colors duration-300 dark:bg-slate-950 sm:py-20 md:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          <div className="max-w-3xl">
            <p className="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-[#2f80ed] dark:text-blue-400 sm:text-sm sm:tracking-[0.3em]">
              Innovative Digital Solutions
            </p>

            <h1 className="mb-6 text-3xl font-bold leading-tight text-[#1f3a93] dark:text-white sm:text-4xl md:text-5xl lg:text-6xl">
              Building scalable software experiences for modern businesses
            </h1>

            <p className="text-base leading-7 text-slate-700 dark:text-slate-300 sm:text-lg sm:leading-8">
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
    </PageWrapper>
  );
}

export default Home;