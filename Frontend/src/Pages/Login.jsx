function Login() {
  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-md rounded-3xl border border-orange-100 bg-white p-8 shadow-lg">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">Welcome Back</p>
        <h1 className="mt-2 text-3xl font-black text-slate-800">Login</h1>

        <form className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-semibold text-slate-600">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full rounded-xl border border-orange-100 px-4 py-3 text-sm outline-none transition focus:border-[#FF6B35]"
            />
          </div>

          <button
            type="button"
            className="w-full rounded-xl bg-[#FF6B35] py-3 text-sm font-bold text-white transition hover:bg-[#e95d2b]"
          >
            Login
          </button>
        </form>
      </div>
    </section>
  );
}

export default Login;
