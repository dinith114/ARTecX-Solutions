import { useState } from "react";
import { NavLink } from "react-router-dom";
import useTheme from "../../hooks/useTheme";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive
        ? "text-[#2f80ed] dark:text-blue-400"
        : "text-slate-700 hover:text-[#1f3a93] dark:text-slate-200 dark:hover:text-blue-400"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm transition-colors duration-300 dark:border-slate-800 dark:bg-slate-950">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-wide text-[#1f3a93] sm:text-2xl dark:text-white"
          onClick={() => setIsOpen(false)}
        >
          ARTeCX <span className="text-[#2f80ed] dark:text-blue-400">Solutions</span>
        </NavLink>

        <div className="hidden items-center gap-6 text-sm md:flex">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>

          <button
            onClick={toggleTheme}
            className="rounded-xl border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>
        </div>

        <div className="flex items-center gap-3 md:hidden">
          <button
            onClick={toggleTheme}
            className="rounded-lg border border-slate-300 px-3 py-1.5 text-sm text-slate-700 dark:border-slate-700 dark:text-slate-200"
          >
            {theme === "light" ? "Dark" : "Light"}
          </button>

          <button
            className="flex flex-col gap-1.5"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="block h-0.5 w-6 bg-[#1f3a93] dark:bg-white"></span>
            <span className="block h-0.5 w-6 bg-[#1f3a93] dark:bg-white"></span>
            <span className="block h-0.5 w-6 bg-[#1f3a93] dark:bg-white"></span>
          </button>
        </div>
      </nav>

      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden dark:border-slate-800 dark:bg-slate-950">
          <div className="mx-auto flex max-w-7xl flex-col px-4 py-4 sm:px-6">
            <NavLink to="/" className={`${linkClass({ isActive: false })} py-2`} onClick={() => setIsOpen(false)}>
              Home
            </NavLink>
            <NavLink to="/about" className={`${linkClass({ isActive: false })} py-2`} onClick={() => setIsOpen(false)}>
              About
            </NavLink>
            <NavLink to="/services" className={`${linkClass({ isActive: false })} py-2`} onClick={() => setIsOpen(false)}>
              Services
            </NavLink>
            <NavLink to="/projects" className={`${linkClass({ isActive: false })} py-2`} onClick={() => setIsOpen(false)}>
              Projects
            </NavLink>
            <NavLink to="/contact" className={`${linkClass({ isActive: false })} py-2`} onClick={() => setIsOpen(false)}>
              Contact
            </NavLink>
          </div>
        </div>
      )}
    </header>
  );
}

export default Navbar;