import { Link } from "react-router-dom";

function Header() {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between">
      
      {/* Logo / Brand */}
      <h1 className="text-xl font-bold tracking-wide">
        Restaurant
      </h1>

      {/* Nav Links */}
      <ul className="flex gap-6">
        <li>
          <Link
            to="/"
            className="hover:text-yellow-400 transition duration-200"
          >
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/Menu"
            className="hover:text-yellow-400 transition duration-200"
          >
            Menu
          </Link>
        </li>

        <li>
          <Link
            to="/Cart"
            className="hover:text-yellow-400 transition duration-200"
          >
            Cart
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Header;