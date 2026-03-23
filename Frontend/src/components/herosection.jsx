import React from "react";
import { Link } from "react-router-dom";

function Herosection() {
  return (
    <section className="relative overflow-hidden bg-[#fffaf3] px-6 py-14 md:px-12 md:py-20">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#FFB800]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#FF6B35]/20 blur-3xl"></div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-[#FF6B35]">
            Freshly Crafted Flavor
          </span>

          <h1 className="mt-5 text-4xl font-black leading-tight text-slate-800 md:text-6xl">
            The Pleasant Experience
            <span className="block bg-gradient-to-r from-[#FFB800] to-[#FF6B35] bg-clip-text text-transparent">
              to Your Taste Buds
            </span>
          </h1>

          <p className="mt-6 max-w-lg text-lg leading-relaxed text-slate-500 md:text-xl">
            Exquisite food for your special dining experience. Discover bold taste,
            warm service, and dishes made to satisfy every craving.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4 md:justify-start">
            <Link
              to="/Cart"
              className="rounded-full bg-[#FFB800] px-7 py-3 text-base font-bold text-slate-800 shadow-lg shadow-amber-200 transition hover:bg-[#f1aa00]"
            >
              Order Now
            </Link>

            <Link
              to="/Menu"
              className="rounded-full border border-orange-200 bg-white px-7 py-3 text-base font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              Browse Menu -&gt;
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center">
          <div className="absolute h-[320px] w-[320px] rounded-full border-[30px] border-[#FFB800] sm:h-[420px] sm:w-[420px] md:h-[560px] md:w-[560px]"></div>

          <img
            src="https://i.pinimg.com/736x/38/bb/96/38bb963a9c08bc4b4894b98b9d5ff32c.jpg"
            alt="food"
            className="relative z-10 w-[280px] rounded-full shadow-2xl shadow-orange-200 sm:w-[360px] md:w-[470px]"
          />

          <div className="absolute bottom-2 right-0 z-20 w-[220px] rounded-2xl border border-orange-100 bg-white/95 p-4 shadow-xl sm:bottom-8 sm:right-4 md:right-6">
            <p className="text-sm font-medium text-slate-400">$35</p>
            <h3 className="text-2xl font-extrabold leading-none text-[#FF6B35]">4.9</h3>
            <p className="mt-1 text-xl text-[#FFB800]">*****</p>
            <h4 className="mt-2 text-lg font-bold leading-tight text-slate-800">
              Honey Sauce Roasted Chicken
            </h4>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;