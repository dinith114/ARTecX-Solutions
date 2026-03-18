import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginAdmin } from "../services/authService";
import logo from "../assets/logo.png";

function AdminLogin() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await loginAdmin(formData);
      localStorage.setItem("adminToken", result.token);
      navigate("/admin/messages");
    } catch (error) {
      setErrorMessage(error.message || "Login failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#f4f8fc] px-4">
      {/* Watermark background */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <img
          src={logo}
          alt="ARTeCX watermark"
          className="w-72 opacity-10 sm:w-96 md:w-[28rem]"
        />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl border border-slate-200 bg-white/95 p-8 shadow-xl backdrop-blur-sm">
        <div className="mb-6 flex flex-col items-center">
          <img src={logo} alt="ARTeCX logo" className="mb-4 h-20 w-20 object-contain" />
          <h2 className="text-center text-3xl font-bold text-[#1f3a93]">
            Admin Login
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter admin email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 text-slate-800 outline-none focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter password"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-xl bg-[#1f3a93] px-6 py-3 font-semibold text-white transition hover:bg-[#2f80ed] disabled:opacity-70"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>

          {errorMessage && (
            <p className="text-sm font-medium text-red-600">{errorMessage}</p>
          )}
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;