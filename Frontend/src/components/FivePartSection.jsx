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
    text: "Earn points on every order and unlock exclusive offers from our menu.",
  },
];

function FivePartSection() {
  return (
    <section className="relative overflow-hidden bg-[#fcfaf8] px-6 py-12 md:px-12 md:py-16 font-sans">
      <div className="pointer-events-none absolute left-0 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-[#fbbc04]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute right-0 top-20 h-64 w-64 translate-x-1/3 rounded-full bg-[#e25a27]/20 blur-3xl"></div>

      <div className="relative mx-auto w-full max-w-7xl">
        <div className="mb-10 flex flex-col items-center justify-between gap-6 text-center md:mb-12 md:flex-row md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#e25a27]">Our Difference</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
              One Section, Five Strong Parts
            </h2>
          </div>

          <Link
            to="/Menu"
            className="rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-base font-bold text-gray-700 transition hover:border-[#e25a27] hover:text-[#e25a27]"
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
                className={`group relative rounded-3xl border p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg ${
                  highlighted
                    ? "border-[#e25a27]/30 bg-gray-900 text-white shadow-xl shadow-[#e25a27]/10"
                    : "border-gray-100 bg-white text-gray-700 hover:border-[#e25a27]/30"
                }`}
              >
                <div className="mb-5 flex items-center justify-between">
                  <span
                    className={`text-xs font-black tracking-widest ${
                      highlighted ? "text-[#fbbc04]" : "text-[#e25a27]"
                    }`}
                  >
                    PART {part.id}
                  </span>
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      highlighted ? "bg-[#fbbc04]" : "bg-[#e25a27]"
                    }`}
                  ></span>
                </div>

                <h3 className="text-xl font-extrabold leading-tight">{part.title}</h3>
                <p className={`mt-3 text-sm leading-relaxed ${highlighted ? "text-gray-300" : "text-gray-500"}`}>
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
