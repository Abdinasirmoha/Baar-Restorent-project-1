const steps = [
  {
    title: "Choose Your Meal",
    detail: "Browse curated dishes and pick your favorites in seconds.",
  },
  {
    title: "Kitchen Preparation",
    detail: "Our chefs prepare every order fresh with quality ingredients.",
  },
  {
    title: "Fast Delivery",
    detail: "Your food is packed with care and delivered hot and on time.",
  },
  {
    title: "Enjoy & Repeat",
    detail: "Rate your meal and earn rewards for your next order.",
  },
];

function ServiceFlowSection() {
  return (
    <section className="bg-white px-6 py-14 md:px-12 md:py-18">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-[#FF6B35]">How It Works</p>
            <h2 className="mt-2 text-3xl font-black text-slate-800 md:text-4xl">
              From Order to Table in 4 Steps
            </h2>
          </div>
          <p className="hidden max-w-md text-right text-sm text-slate-500 md:block">
            Clean workflow, transparent tracking, and delicious outcomes at every step.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-2xl border border-orange-100 bg-[#fffaf3] p-5 transition hover:-translate-y-1 hover:shadow-lg"
            >
              <p className="mb-4 inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#FFB800] text-sm font-black text-slate-800">
                {index + 1}
              </p>
              <h3 className="text-lg font-extrabold text-slate-800">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFlowSection;
