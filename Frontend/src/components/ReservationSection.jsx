import { Link } from "react-router-dom";

function ReservationSection() {
  return (
    <section className="bg-[#fff8ec] px-6 py-16 md:px-12 md:py-20">
      <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-3xl border border-orange-200 bg-white p-8 shadow-lg md:p-10">
          <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">Book a Table</p>
          <h2 className="mt-3 text-3xl font-black text-slate-800 md:text-4xl">
            Reserve Your Spot for a Perfect Evening
          </h2>
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-slate-500">
            Ideal for family dinners, celebrations, and private events. Book now and
            let us prepare an unforgettable dining experience.
          </p>

          <div className="mt-7 flex flex-wrap gap-4">
            <Link
              to="/Cart"
              className="rounded-full bg-[#FFB800] px-6 py-3 text-sm font-bold text-slate-800 transition hover:bg-[#f1aa00]"
            >
              Book Now
            </Link>
            <Link
              to="/Menu"
              className="rounded-full border border-[#FF6B35]/40 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
            >
              See Packages
            </Link>
          </div>
        </div>

        <div className="grid gap-4">
          <article className="rounded-3xl bg-[#1a2133] p-6 text-white shadow-xl">
            <p className="text-sm text-slate-300">Guest Story</p>
            <p className="mt-3 text-base leading-relaxed">
              "Beautiful ambiance, fast service, and the most flavorful grilled chicken in town."
            </p>
            <p className="mt-4 font-bold text-[#FFB800]">- Samira Hossain</p>
          </article>

          <article className="rounded-3xl border border-orange-100 bg-white p-6 shadow-sm">
            <p className="text-sm font-semibold text-slate-500">Average Satisfaction</p>
            <div className="mt-2 flex items-end gap-3">
              <p className="text-4xl font-black text-[#FF6B35]">4.9</p>
              <p className="pb-1 text-sm font-bold text-[#FFB800]">+3,200 Reviews</p>
            </div>
            <div className="mt-3 h-2 rounded-full bg-orange-100">
              <div className="h-2 w-[90%] rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800]"></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ReservationSection;
