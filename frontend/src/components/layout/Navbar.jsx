import { useState } from "react";
import { NavLink } from "react-router-dom";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive ? "text-[#2f80ed]" : "text-slate-700 hover:text-[#1f3a93]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
        <NavLink
          to="/"
          className="text-xl font-bold tracking-wide text-[#1f3a93] sm:text-2xl"
          onClick={() => setIsOpen(false)}
        >
          ARTeCX <span className="text-[#2f80ed]">Solutions</span>
        </NavLink>

        {/* Desktop menu */}
        <div className="hidden md:flex gap-6 text-sm">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </div>

        {/* Mobile menu button */}
        <button
          className="flex md:hidden flex-col gap-1.5"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle menu"
        >
          <span className="block h-0.5 w-6 bg-[#1f3a93]"></span>
          <span className="block h-0.5 w-6 bg-[#1f3a93]"></span>
          <span className="block h-0.5 w-6 bg-[#1f3a93]"></span>
        </button>
      </nav>

      {/* Mobile dropdown */}
      {isOpen && (
        <div className="border-t border-slate-200 bg-white md:hidden">
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