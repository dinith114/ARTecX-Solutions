import { NavLink } from "react-router-dom";

function Navbar() {
  const linkClass = ({ isActive }) =>
    `transition-colors duration-200 font-medium ${
      isActive
        ? "text-[#2f80ed]"
        : "text-slate-700 hover:text-[#1f3a93]"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white shadow-sm">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4">
        <NavLink to="/" className="text-2xl font-bold tracking-wide text-[#1f3a93]">
          ARTecX <span className="text-[#2f80ed]">Solutions</span>
        </NavLink>

        <div className="flex gap-6 text-sm">
          <NavLink to="/" className={linkClass}>Home</NavLink>
          <NavLink to="/about" className={linkClass}>About</NavLink>
          <NavLink to="/services" className={linkClass}>Services</NavLink>
          <NavLink to="/projects" className={linkClass}>Projects</NavLink>
          <NavLink to="/contact" className={linkClass}>Contact</NavLink>
        </div>
      </nav>
    </header>
  );
}

export default Navbar;