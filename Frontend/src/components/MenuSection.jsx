import { Link } from "react-router-dom";

function MenuSection() {
  return (
    <section className="bg-[#f4f4f4] px-6 py-14 md:px-12 md:py-18">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">
              Available Now
            </p>
            <h2 className="mt-2 text-3xl font-black text-slate-800 md:text-4xl">
              Menu Section
            </h2>
          </div>

          <Link
            to="/Menu"
            className="rounded-full border border-[#FF6B35]/40 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            Browse All
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          <article className="group relative rounded-3xl bg-white p-5 pt-14 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
              <img src="https://images.unsplash.com/photo-1528207776546-365bb710ee93?auto=format&fit=crop&w=300&q=80" alt="Pancake" className="h-full w-full object-cover" />
            </div>
            <button type="button" aria-label="favorite" className="absolute left-4 top-4 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm text-rose-600">❤️</button>
            <button type="button" className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Available</button>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">Pancake</h3>
              <p className="text-xs font-semibold text-slate-400">10 min</p>
            </div>
            <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-500">Start your day right with our fluffy pancakes, served fresh every morning.</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-3xl font-black text-[#B3261E]">$ 2.00</p>
              <button type="button" className="rounded-xl bg-[#BE1E1E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#a81818]">add to cart +</button>
            </div>
          </article>

          <article className="group relative rounded-3xl bg-white p-5 pt-14 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
              <img src="https://images.unsplash.com/photo-1576577445504-6af96477db52?auto=format&fit=crop&w=300&q=80" alt="Bagel" className="h-full w-full object-cover" />
            </div>
            <button type="button" aria-label="favorite" className="absolute left-4 top-4 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-sm text-rose-600">❤️</button>
            <button type="button" className="absolute right-4 top-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">Unavailable</button>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">Bagel</h3>
              <p className="text-xs font-semibold text-slate-400">5 min</p>
            </div>
            <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-500">Delight in our freshly baked bagels, perfect for any time of day.</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-3xl font-black text-[#B3261E]">$ 2.00</p>
              <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-300 px-5 py-2.5 text-sm font-bold text-white">unavailable</button>
            </div>
          </article>

          <article className="group relative rounded-3xl bg-white p-5 pt-14 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
              <img src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=300&q=80" alt="Cinnamon Roll" className="h-full w-full object-cover" />
            </div>
            <button type="button" aria-label="favorite" className="absolute left-4 top-4 rounded-full border border-rose-200 bg-rose-50 px-2.5 py-1 text-sm text-rose-600">❤️</button>
            <button type="button" className="absolute right-4 top-4 rounded-full bg-emerald-100 px-3 py-1 text-xs font-bold text-emerald-700">Available</button>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">Cinnamon Roll</h3>
              <p className="text-xs font-semibold text-slate-400">30 min</p>
            </div>
            <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-500">Celebrate the sweet indulgence of our cinnamon rolls, baked fresh daily.</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-3xl font-black text-[#B3261E]">$ 2.00</p>
              <button type="button" className="rounded-xl bg-[#BE1E1E] px-5 py-2.5 text-sm font-bold text-white transition hover:bg-[#a81818]">add to cart +</button>
            </div>
          </article>

          <article className="group relative rounded-3xl bg-white p-5 pt-14 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl">
            <div className="absolute left-1/2 top-0 h-20 w-20 -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-full border-4 border-white bg-slate-100 shadow-md">
              <img src="https://images.unsplash.com/photo-1484723091739-30a097e8f929?auto=format&fit=crop&w=300&q=80" alt="French Toast" className="h-full w-full object-cover" />
            </div>
            <button type="button" aria-label="favorite" className="absolute left-4 top-4 rounded-full border border-slate-200 bg-slate-100 px-2.5 py-1 text-sm text-rose-600">❤️</button>
            <button type="button" className="absolute right-4 top-4 rounded-full bg-rose-100 px-3 py-1 text-xs font-bold text-rose-700">Unavailable</button>
            <div className="mt-1 flex items-center justify-between">
              <h3 className="text-2xl font-black text-slate-800">French Toast</h3>
              <p className="text-xs font-semibold text-slate-400">20 min</p>
            </div>
            <p className="mt-3 min-h-20 text-sm leading-relaxed text-slate-500">Savor our French toast, a breakfast classic made to perfection.</p>
            <div className="mt-5 flex items-center justify-between gap-4">
              <p className="text-3xl font-black text-[#B3261E]">$ 2.00</p>
              <button type="button" disabled className="cursor-not-allowed rounded-xl bg-slate-300 px-5 py-2.5 text-sm font-bold text-white">unavailable</button>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
