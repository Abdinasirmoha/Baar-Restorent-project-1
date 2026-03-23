function Register() {
  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-lg rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">Create Account</p>
        <h1 className="mt-2 text-3xl font-black text-slate-800">Register</h1>

        <form className="mt-6 grid gap-4 md:grid-cols-2">
          <div className="md:col-span-1">
            <label className="mb-1 block text-sm font-semibold text-slate-600">First Name</label>
            <input
              type="text"
              placeholder="First name"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-1 block text-sm font-semibold text-slate-600">Last Name</label>
            <input
              type="text"
              placeholder="Last name"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-1 block text-sm font-semibold text-slate-600">Password</label>
            <input
              type="password"
              placeholder="Create password"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <div className="md:col-span-2">
            <button
              type="button"
              className="w-full rounded-xl bg-[#FFB800] py-3 text-sm font-bold text-slate-800 transition hover:bg-[#eda900]"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

export default Register;
