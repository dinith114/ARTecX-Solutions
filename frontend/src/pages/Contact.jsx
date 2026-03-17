function Contact() {
  return (
    <section className="w-full bg-[#f8fbff] py-20">
      <div className="mx-auto max-w-5xl px-6">
        <h2 className="mb-4 text-center text-4xl font-bold text-[#1f3a93]">
          Contact Us
        </h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-slate-600">
          We would love to hear from you. Reach out to discuss your ideas,
          projects, or business needs.
        </p>

        <form className="space-y-6 rounded-3xl border border-slate-200 bg-white p-8 shadow-lg md:p-10">
          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Full Name
            </label>
            <input
              type="text"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your full name"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Email Address
            </label>
            <input
              type="email"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              Message
            </label>
            <textarea
              rows="6"
              className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-slate-800 outline-none transition focus:border-[#2f80ed] focus:ring-2 focus:ring-blue-100"
              placeholder="Write your message"
            ></textarea>
          </div>

          <button
            type="submit"
            className="rounded-xl bg-[#1f3a93] px-6 py-3 font-semibold text-white transition hover:bg-[#2f80ed]"
          >
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}

export default Contact;