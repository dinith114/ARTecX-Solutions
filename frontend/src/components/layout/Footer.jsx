import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white text-slate-800 transition-colors duration-300 dark:border-slate-800 dark:bg-[#1e293b] dark:text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <h2 className="text-4xl font-extrabold tracking-tight">
              ARTeCX <span className="text-[#4ea1ff]">Solutions</span>
            </h2>

            <p className="mt-5 max-w-sm text-base leading-8 text-slate-600 dark:text-blue-100/90">
              We build digital products that make everyday workflows simpler,
              smarter, and more human for teams that refuse to settle.
            </p>

            <div className="mt-6 space-y-3 text-base text-slate-700 dark:text-blue-100/95">
              <p>📞 +94 77 123 4567</p>
              <p>📞 +94 11 234 5678</p>
              <p>✉️ info@artecx-solutions.com</p>
              <p>📍 Colombo, Sri Lanka</p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-lg text-slate-700 dark:text-blue-100/95">
              <li>
                <Link to="/about" className="transition hover:text-[#2f80ed] dark:hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/services" className="transition hover:text-[#2f80ed] dark:hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/projects" className="transition hover:text-[#2f80ed] dark:hover:text-white">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition hover:text-[#2f80ed] dark:hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-bold uppercase tracking-wide">
              Projects
            </h3>

            <ul className="mt-5 space-y-3 text-lg text-slate-700 dark:text-blue-100/95">
              <li className="transition hover:text-[#2f80ed] dark:hover:text-white">
                Enterprise Management Platform
              </li>
              <li className="transition hover:text-[#2f80ed] dark:hover:text-white">
                Smart Mobility Application
              </li>
              <li className="transition hover:text-[#2f80ed] dark:hover:text-white">
                Business Analytics Dashboard
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-slate-200 dark:border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-5 text-sm text-slate-500 dark:text-blue-100/70 md:flex-row md:items-center md:justify-between">
          <p>© 2026 ARTeCX Solutions. All rights reserved.</p>

          <div className="flex flex-wrap gap-5">
            <span className="transition hover:text-[#2f80ed] dark:hover:text-white">
              Privacy Policy
            </span>
            <span className="transition hover:text-[#2f80ed] dark:hover:text-white">
              Terms of Use
            </span>
            <span className="transition hover:text-[#2f80ed] dark:hover:text-white">
              Cookies
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;