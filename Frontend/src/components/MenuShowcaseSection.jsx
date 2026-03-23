import { Link } from "react-router-dom";

const tiles = [
  { title: "Burgers", tag: "Smoky & Juicy", size: "md:col-span-2" },
  { title: "Grill Platters", tag: "Chef Choice", size: "md:col-span-1" },
  { title: "Crispy Chicken", tag: "Top Seller", size: "md:col-span-1" },
  { title: "Desserts", tag: "Sweet Finish", size: "md:col-span-2" },
];

function MenuShowcaseSection() {
  return (
    <section className="bg-gray-900 px-6 py-12 text-white md:px-12 md:py-16 font-sans">
      <div className="mx-auto grid w-full max-w-7xl gap-8 md:grid-cols-[1fr_1.3fr]">
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-[#fbbc04]">Menu Spotlight</p>
          <h2 className="mt-3 text-4xl font-extrabold leading-tight md:text-5xl tracking-tight">
            A Different Flavor Mood in Every Category
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-gray-400">
            Pick your craving, from grilled classics to crunchy favorites and sweet endings.
            Every category is designed for a premium taste experience.
          </p>

          <Link
            to="/Menu"
            className="mt-8 inline-flex rounded-full bg-[#e25a27] px-8 py-3.5 text-base font-bold text-white transition hover:bg-[#c94a1b] shadow-lg shadow-[#e25a27]/20"
          >
            View Full Categories
          </Link>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          {tiles.map((tile, idx) => (
            <article
              key={tile.title}
              className={`${tile.size} relative overflow-hidden rounded-3xl border border-white/5 bg-gradient-to-br from-gray-800 to-gray-900 p-6 shadow-xl`}
            >
              <div
                className={`absolute -right-8 -top-8 h-24 w-24 rounded-full blur-2xl ${
                  idx % 2 === 0 ? "bg-[#fbbc04]/30" : "bg-[#e25a27]/30"
                }`}
              ></div>
              <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-[#fbbc04]">
                {tile.tag}
              </p>
              <h3 className="relative z-10 mt-2 text-2xl font-extrabold">{tile.title}</h3>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default MenuShowcaseSection;
