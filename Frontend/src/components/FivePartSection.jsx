import { Link } from "react-router-dom";

const parts = [
  {
    id: "01",
    title: "Chef's Signature",
    text: "Premium recipes crafted by expert chefs with bold, balanced flavor in every bite.",
  },
  {
    id: "02",
    title: "Fresh Daily Prep",
    text: "We use high-quality ingredients prepared fresh each day for consistent taste.",
  },
  {
    id: "03",
    title: "Fast Delivery",
    text: "Quick kitchen workflow and smooth dispatch to get your order hot and fresh.",
  },
  {
    id: "04",
    title: "Live Order Flow",
    text: "Track your meal from confirmation to doorstep with real-time status updates.",
  },
  {
    id: "05",
    title: "Loyalty Rewards",
    text: "Earn points on every order and unlock exclusive offers from RoastLux.",
  },
];

function FivePartSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#fffaf3] to-[#fff3de] px-6 py-16 md:px-12 md:py-20">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#FFB800]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 translate-x-1/3 rounded-full bg-[#FF6B35]/20 blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:mb-12 md:flex-row md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">Our Difference</p>
            <h2 className="mt-2 text-3xl font-black text-slate-800 md:text-5xl">
              One Section, Five Strong Parts
            </h2>
          </div>

          <Link
            to="/Menu"
            className="rounded-full border border-[#FF6B35]/40 bg-white px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            Explore Full Menu
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {parts.map((part, idx) => {
            const highlighted = idx === 2;

            return (
              <article
                key={part.id}
                className={`group relative rounded-3xl border p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl ${
                  highlighted
                    ? "border-[#FF6B35]/25 bg-[#1a2133] text-white"
                    : "border-orange-100 bg-white/90 text-slate-700"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`text-xs font-black tracking-[0.18em] ${
                      highlighted ? "text-[#FFB800]" : "text-[#FF6B35]"
                    }`}
                  >
                    PART {part.id}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      highlighted ? "bg-[#FFB800]" : "bg-[#FF6B35]"
                    }`}
                  ></span>
                </div>

                <h3 className="text-xl font-extrabold leading-tight">{part.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${highlighted ? "text-slate-300" : "text-slate-500"}`}>
                  {part.text}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default FivePartSection;
