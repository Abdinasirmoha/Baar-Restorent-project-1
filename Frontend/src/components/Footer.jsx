import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#111319] px-6 py-14 text-slate-300 md:px-12">
      <div className="pointer-events-none absolute -left-20 top-0 h-48 w-48 rounded-full bg-[#FF6B35]/20 blur-3xl"></div>
      <div className="pointer-events-none absolute -right-12 bottom-0 h-56 w-56 rounded-full bg-[#FFB800]/20 blur-3xl"></div>

      <div className="relative mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-[1.1fr_1fr_1fr]">
        <div>
          <div className="mb-5 flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border border-[#FF6B35]/40 bg-[#1b1f27] text-[#FFB800]">
              RL
            </div>
            <div>
              <p className="text-xl font-extrabold text-white">RoastLux</p>
              <p className="text-sm text-slate-400">Exquisite Restaurant</p>
            </div>
          </div>

          <p className="max-w-sm text-sm leading-relaxed text-slate-400">
            We create memorable dining moments with crafted flavors, elegant
            service, and a warm atmosphere for your family and friends.
          </p>

          <Link
            to="/Cart"
            className="mt-7 inline-flex items-center rounded-full bg-gradient-to-r from-[#FF6B35] to-[#FFB800] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-orange-900/30 transition hover:brightness-110"
          >
            Schedule Reservation
          </Link>
        </div>

        <div>
          <h3 className="text-base font-bold uppercase tracking-wider text-white">Quick Links</h3>
          <ul className="mt-4 space-y-3 text-sm">
            <li><Link to="/" className="transition hover:text-[#FFB800]">Home</Link></li>
            <li><Link to="/Menu" className="transition hover:text-[#FFB800]">Menu</Link></li>
            <li><Link to="/Cart" className="transition hover:text-[#FFB800]">Cart</Link></li>
            <li><Link to="/" className="transition hover:text-[#FFB800]">Contact</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-base font-bold uppercase tracking-wider text-white">Support</h3>
          <ul className="mt-4 space-y-3 text-sm text-slate-400">
            <li>Opening Hours: 08:00 AM - 11:30 PM</li>
            <li>Location: City Center, Bangladesh</li>
            <li>Reservation: +88 01234 567890</li>
            <li>Email: hello@roastlux.com</li>
          </ul>

          <div className="mt-6">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-slate-500">Newsletter</p>
            <div className="flex rounded-full border border-slate-700 bg-[#1b1f27] p-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-transparent px-3 text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none"
              />
              <button
                type="button"
                className="rounded-full bg-[#FF6B35] px-4 py-2 text-xs font-bold text-white transition hover:bg-[#e85b29]"
              >
                Join
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-10 flex w-full max-w-7xl flex-col items-center justify-between gap-3 border-t border-slate-800 pt-5 text-xs text-slate-500 md:flex-row">
        <p>Copyright 2026 RoastLux. All rights reserved.</p>
        <p>Designed with colors #FFB800 and #FF6B35</p>
      </div>
    </footer>
  );
}

export default Footer;
