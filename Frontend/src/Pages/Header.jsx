import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-orange-100/80 bg-white/95 backdrop-blur">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        <Link to="/" className="group inline-flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#FF6B35] shadow-[0_0_0_5px_rgba(255,184,0,0.3)]"></span>
          <h1 className="text-2xl font-black tracking-tight text-slate-800">
            Roast<span className="text-[#FFB800]">Lux</span>
          </h1>
        </Link>

        <ul className="hidden items-center gap-2 rounded-full border border-orange-100 bg-[#fff8ec] p-1.5 text-sm font-semibold text-slate-700 md:flex">
          <li>
            <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#FF6B35]">Home</Link>
          </li>
          <li>
            <Link to="/Menu" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#FF6B35]">Menu</Link>
          </li>
          <li>
            <Link to="/Cart" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#FF6B35]">Cart</Link>
          </li>
          <li>
            <Link to="/" className="rounded-full px-4 py-2 transition hover:bg-white hover:text-[#FF6B35]">Contact</Link>
          </li>
        </ul>

        <div className="flex items-center gap-2">
          <Link
            to="/Register"
            className="hidden rounded-full border border-orange-200 px-4 py-2 text-sm font-bold text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35] md:inline-flex"
          >
            Register
          </Link>
          <Link
            to="/Login"
            className="hidden rounded-full bg-[#FF6B35] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#e95e2c] md:inline-flex"
          >
            Login
          </Link>

          <Link
            to="/Cart"
            aria-label="Cart"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H7" />
            </svg>
          </Link>

          <Link
            to="/Profile"
            aria-label="Profile"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-orange-200 text-slate-700 transition hover:border-[#FF6B35] hover:text-[#FF6B35]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="3.5" />
              <path d="M4.5 19.5a7.5 7.5 0 0 1 15 0" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;