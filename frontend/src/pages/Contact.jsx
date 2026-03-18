import { useState } from "react";
import { submitContactForm } from "../services/contactService";

function Contact() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [showPopup, setShowPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = {};

    const fullName = formData.fullName.trim();
    const email = formData.email.trim();
    const message = formData.message.trim();

    // Full name validation
if (!fullName) {
  newErrors.fullName = "Full name is required.";
} else if (!/^[A-Za-z\s]+$/.test(fullName)) {
  newErrors.fullName = "Full name can only contain letters and spaces.";
} else {
  const words = fullName.split(/\s+/).filter(Boolean);

  if (words.length < 2) {
    newErrors.fullName = "Please enter your full name (first and last name).";
  } else {
    const invalidWord = words.some((word) => word.length < 2);
    if (invalidWord) {
      newErrors.fullName = "Each part of the name must have at least 2 letters.";
    }
  }
}

    // Email validation
    if (!email) {
      newErrors.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Message validation
    if (!message) {
      newErrors.message = "Message is required.";
    } else if (message.length < 10) {
      newErrors.message = "Message must be at least 10 characters long.";
    } else if (!/[A-Za-z]/.test(message)) {
      newErrors.message =
        "Message must contain meaningful text, not only numbers or symbols.";
    } else {
      const words = message
        .toLowerCase()
        .split(/\s+/)
        .filter(Boolean);

      const uniqueWords = new Set(words);

      // Too few unique words = likely nonsense
      if (words.length >= 3 && uniqueWords.size < 3) {
        newErrors.message =
          "Please enter a more meaningful message.";
      }

      // Reject long random strings without sentence structure
      const meaningfulPattern =
        /[A-Za-z].*\s+[A-Za-z].*\s+[A-Za-z]/.test(message);

      if (!meaningfulPattern) {
        newErrors.message =
          "Please enter a clear and meaningful message.";
      }
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    try {
      const result = await submitContactForm(formData);

      if (result.success) {
        setShowPopup(true);
        setFormData({
          fullName: "",
          email: "",
          message: "",
        });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setErrors({
        general: error.message || "Something went wrong. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <section className="w-full bg-[#f8fbff] py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <h2 className="mb-4 text-center text-3xl font-bold text-[#1f3a93] sm:text-4xl">
          Contact Us
        </h2>

        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-700">
          We would love to hear from you. Reach out to discuss your ideas,
          projects, or business needs.
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-10"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition focus:ring-2 ${
                errors.fullName
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#2f80ed] focus:ring-blue-100"
              }`}
              placeholder="Enter your full name"
            />
            {errors.fullName && (
              <p className="mt-2 text-sm text-red-600">{errors.fullName}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition focus:ring-2 ${
                errors.email
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#2f80ed] focus:ring-blue-100"
              }`}
              placeholder="Enter your email"
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-600">{errors.email}</p>
            )}
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              rows="6"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className={`w-full rounded-xl border bg-white px-4 py-3 text-slate-800 outline-none transition focus:ring-2 ${
                errors.message
                  ? "border-red-500 focus:border-red-500 focus:ring-red-100"
                  : "border-slate-300 focus:border-[#2f80ed] focus:ring-blue-100"
              }`}
              placeholder="Write your message"
            ></textarea>
            {errors.message && (
              <p className="mt-2 text-sm text-red-600">{errors.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-xl bg-[#1f3a93] px-6 py-3 font-semibold text-white transition hover:bg-[#2f80ed] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "Sending..." : "Send Message"}
          </button>

          {errors.general && (
            <p className="text-sm font-medium text-red-600">{errors.general}</p>
          )}
        </form>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 text-center shadow-2xl">
            <h3 className="mb-3 text-2xl font-bold text-[#1f3a93]">
              Message Sent Successfully!
            </h3>
            <p className="mb-6 text-slate-700">
              Thank you for reaching out to us. We will get back to you soon.
            </p>
            <button
              onClick={closePopup}
              className="rounded-xl bg-[#1f3a93] px-5 py-2 font-semibold text-white transition hover:bg-[#2f80ed]"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Contact;