function Profile() {
  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12">
      <div className="mx-auto w-full max-w-3xl rounded-3xl border border-orange-100 bg-white p-8 shadow-lg md:p-10">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">My Account</p>
            <h1 className="mt-2 text-3xl font-black text-slate-800">Profile</h1>
          </div>
          <button
            type="button"
            className="rounded-xl border border-orange-200 px-5 py-2.5 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            Edit Profile
          </button>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2">
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Name</p>
            <p className="mt-1 text-lg font-bold text-slate-800">Guest User</p>
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Email</p>
            <p className="mt-1 text-lg font-bold text-slate-800">guest@roastlux.com</p>
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Phone</p>
            <p className="mt-1 text-lg font-bold text-slate-800">+88 01234 567890</p>
          </div>
          <div className="rounded-2xl bg-[#fff8ec] p-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">Member Since</p>
            <p className="mt-1 text-lg font-bold text-slate-800">2026</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
