function Contact() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="mb-10 text-4xl font-bold text-white">Contact Us</h2>

      <form className="space-y-6 rounded-2xl border border-slate-800 bg-slate-900 p-8">
        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Full Name
          </label>
          <input
            type="text"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Enter your full name"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Email Address
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Enter your email"
          />
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-200">
            Message
          </label>
          <textarea
            rows="5"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none focus:border-cyan-400"
            placeholder="Write your message"
          ></textarea>
        </div>

        <button
          type="submit"
          className="rounded-xl bg-cyan-500 px-6 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400"
        >
          Send Message
        </button>
      </form>
    </section>
  );
}

export default Contact;