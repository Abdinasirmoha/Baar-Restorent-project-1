import { Link } from "react-router-dom";

function ReservationSection() {
  return (
    <section className="bg-[#fcfaf8] px-6 py-12 md:px-12 md:py-16 font-sans">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1.1fr_1fr]">
        <div className="rounded-[2.5rem] border border-gray-100 bg-white p-8 shadow-xl md:p-12">
          <p className="text-sm font-bold uppercase tracking-widest text-[#e25a27]">Book a Table</p>
          <h2 className="mt-3 text-4xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
            Reserve Your Spot for a Perfect Evening
          </h2>
          <p className="mt-5 max-w-xl text-lg leading-relaxed text-gray-500">
            Ideal for family dinners, celebrations, and private events. Book now and
            let us prepare an unforgettable dining experience.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/Cart"
              className="rounded-full bg-[#e25a27] text-white px-8 py-4 text-base font-bold transition hover:bg-[#c94a1b] shadow-lg shadow-[#e25a27]/20"
            >
              Book Now
            </Link>
            <Link
              to="/Menu"
              className="rounded-full border-2 border-gray-200 px-8 py-4 text-base font-bold text-gray-700 transition hover:border-[#e25a27] hover:text-[#e25a27]"
            >
              See Packages
            </Link>
          </div>
        </div>

        <div className="grid gap-6">
          <article className="rounded-[2rem] bg-gray-900 p-8 text-white shadow-xl">
            <p className="text-sm text-gray-400 font-semibold tracking-widest uppercase">Guest Story</p>
            <p className="mt-4 text-xl leading-relaxed font-medium">
              "Beautiful ambiance, fast service, and the most flavorful grilled chicken in town."
            </p>
            <p className="mt-6 font-bold text-[#fbbc04]">- Samira Hossain</p>
          </article>

          <article className="rounded-[2rem] border border-gray-100 bg-white p-8 shadow-md">
            <p className="text-sm font-semibold text-gray-500 tracking-widest uppercase">Average Satisfaction</p>
            <div className="mt-3 flex items-end gap-3">
              <p className="text-5xl font-extrabold text-[#e25a27]">4.9</p>
              <p className="pb-1 text-base font-bold text-[#fbbc04]">+3,200 Reviews</p>
            </div>
            <div className="mt-5 h-2 rounded-full bg-gray-100 overflow-hidden">
              <div className="h-2 w-[95%] rounded-full bg-gradient-to-r from-[#fbbc04] to-[#e25a27]"></div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

export default ReservationSection;
