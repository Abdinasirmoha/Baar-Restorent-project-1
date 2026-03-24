import { Link, useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";

function Header() {
  const location = useLocation();
  const { totalItems } = useCart();

  const isActive = (path) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
      <nav className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-4 md:px-12">
        {/* Left Section: Logo */}
        <Link to="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity w-auto md:w-1/4 group">
          <div className="bg-gradient-to-br from-[#e25a27] to-[#c94a1b] p-2 rounded-xl shadow-md shadow-[#e25a27]/20 flex items-center justify-center transform group-hover:rotate-6 transition-transform">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
              <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/>
              <path d="M7 2v20"/>
              <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
            </svg>
          </div>
          <span className="text-2xl sm:text-3xl font-black italic tracking-tight text-gray-900 leading-none">
            <span className="ml-2">BAAR </span><span className="text-[#e25a27]">RESTORENT</span>
          </span>
        </Link>

        {/* Center Section: Nav Links */}
        <ul className="hidden flex-1 items-center justify-center gap-10 text-base font-semibold text-gray-600 md:flex mt-1">
          <li>
            <Link 
              to="/" 
              className={`transition hover:text-[#e25a27] pb-1 ${isActive('/') ? 'text-[#e25a27] border-b-2 border-[#e25a27]' : ''}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link 
              to="/Menu" 
              className={`transition hover:text-[#e25a27] pb-1 ${isActive('/Menu') ? 'text-[#e25a27] border-b-2 border-[#e25a27]' : ''}`}
            >
              Menu
            </Link>
          </li>
          
          <li>
            <Link 
              to="/Dashboard" 
              className={`transition hover:text-[#e25a27] pb-1 ${isActive('/Dashboard') ? 'text-[#e25a27] border-b-2 border-[#e25a27]' : ''}`}
            >
              Dashboard
            </Link>
          </li>
        </ul>

        {/* Right Section: Icons & Auth Buttons */}
        <div className="flex items-center gap-5 w-1/4 justify-end">
          {/* Cart Icon */}
          <Link
            to="/Cart"
            aria-label="Cart"
            className="relative inline-flex h-12 w-12 items-center justify-center rounded-full text-slate-700 transition hover:bg-gray-100 hover:text-[#e25a27]"
          >
            <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="20" r="1.5" />
              <circle cx="18" cy="20" r="1.5" />
              <path d="M3 4h2l2.4 10.2a1 1 0 0 0 1 .8h9.8a1 1 0 0 0 1-.8L21 7H7" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute top-0 right-0 flex h-5 w-5 items-center justify-center rounded-full bg-[#e25a27] text-xs font-bold text-white">
                {totalItems}
              </span>
            )}
          </Link>

          {/* Auth Buttons */}
          <Link
            to="/Register"
            className="hidden text-base font-bold text-gray-600 hover:text-[#e25a27] transition md:inline-flex"
          >
            Register
          </Link>
          <Link
            to="/Login"
            className="hidden rounded-full bg-[#e25a27] px-6 py-2.5 text-base font-bold text-white transition hover:bg-[#c94a1b] md:inline-flex shadow-sm shadow-[#e25a27]/20"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}

export default Header;