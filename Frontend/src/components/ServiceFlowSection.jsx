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
    <section className="bg-white px-6 py-12 md:px-12 md:py-16 font-sans">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-10 flex items-end justify-between gap-6">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#e25a27]">How It Works</p>
            <h2 className="mt-2 text-3xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
              From Order to Table in 4 Steps
            </h2>
          </div>
          <p className="hidden max-w-md text-right text-sm text-gray-500 md:block leading-relaxed">
            Clean workflow, transparent tracking, and delicious outcomes at every step.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {steps.map((step, index) => (
            <article
              key={step.title}
              className="rounded-3xl border border-gray-100 bg-[#fcfaf8] p-6 transition hover:-translate-y-1 hover:shadow-lg hover:border-[#e25a27]/20"
            >
              <p className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#e25a27] text-white text-sm font-black shadow-sm shadow-[#e25a27]/30">
                {index + 1}
              </p>
              <h3 className="text-xl font-extrabold text-gray-900">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-500">{step.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServiceFlowSection;
