import React from "react";
import { Link } from "react-router-dom";

function Herosection() {
  return (
    <section className="relative overflow-hidden bg-white px-6 py-12 md:px-12 md:py-16 font-sans">
      <div className="pointer-events-none absolute -left-24 top-12 h-64 w-64 rounded-full bg-[#fbbc04]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-20 bottom-0 h-80 w-80 rounded-full bg-[#e25a27]/20 blur-3xl"></div>

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 md:grid-cols-2 md:gap-16">
        <div className="max-w-xl text-center md:text-left">
          <span className="inline-flex rounded-full border border-orange-200 bg-orange-50 px-4 py-2 text-xs font-bold uppercase tracking-widest text-[#e25a27]">
            Freshly Crafted Flavor
          </span>

          <h1 className="mt-5 text-5xl font-extrabold leading-tight text-gray-900 md:text-7xl tracking-tight">
            The Pleasant Experience
            <span className="block text-[#e25a27] mt-2">
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
              className="rounded-full bg-[#e25a27] px-8 py-3.5 text-lg font-bold text-white shadow-lg shadow-[#e25a27]/20 transition hover:bg-[#c94a1b]"
            >
              Order Now
            </Link>

            <Link
              to="/Menu"
              className="rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-lg font-bold text-gray-700 transition hover:border-[#e25a27] hover:text-[#e25a27]"
            >
              Browse Menu -&gt;
            </Link>
          </div>
        </div>

        <div className="relative flex items-center justify-center p-8">
          {/* Main Hero Image */}
          <div className="relative z-10 w-[280px] h-[280px] sm:w-[360px] sm:h-[360px] md:w-[450px] md:h-[450px] rounded-full p-3 border-[6px] border-[#e25a27]/30 shadow-2xl shadow-[#e25a27]/40 bg-white">
            <img
              src="https://i.pinimg.com/736x/38/bb/96/38bb963a9c08bc4b4894b98b9d5ff32c.jpg"
              alt="Delicious Burger"
              className="w-full h-full object-cover rounded-full"
            />
          </div>

          {/* Floating Card */}
          <div className="absolute -bottom-6 -right-6 md:bottom-4 md:right-0 z-20 w-[240px] rounded-3xl border border-gray-100 bg-white/95 backdrop-blur p-5 shadow-2xl">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-lg font-bold leading-tight text-gray-900">
                Triple Stack Burger
              </h4>
              <p className="text-base font-black text-[#e25a27]">$35</p>
            </div>
            <div className="flex items-center gap-1 mt-2">
              <h3 className="text-xl font-extrabold leading-none text-gray-900">4.9</h3>
              <p className="text-lg text-[#fbbc04]">★★★★★</p>
            </div>
            <p className="text-xs font-semibold text-gray-400 mt-2 uppercase tracking-wider">Chef's Special</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Herosection;