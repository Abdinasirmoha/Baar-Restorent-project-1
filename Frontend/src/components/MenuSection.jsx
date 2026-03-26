import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../config/api";

function MenuSection({ showAll = false }) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const handleCardClick = () => {
    if (!showAll) {
      navigate("/Menu");
    }
  };

  const handleCardKeyDown = (event) => {
    if (showAll) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      navigate("/Menu");
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/food`);
        const items = Array.isArray(res.data) ? res.data : [];
        setProducts(showAll ? items : items.slice(0, 4));
        setError("");
      } catch (err) {
        setError("Failed to load menu items.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [showAll]);

  return (
    <section className="bg-white px-6 py-12 md:px-12 md:py-16 font-sans text-gray-800">
      <div className="mx-auto w-full max-w-7xl">
        <div className="mb-12 flex flex-col items-center justify-between gap-6 text-center md:flex-row md:text-left">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-[#e25a27] mb-2">
              Available Now
            </p>
            <h2 className="text-4xl font-extrabold text-gray-900 md:text-5xl tracking-tight">
              Featured Menu
            </h2>
          </div>

          {!showAll && (
            <Link
              to="/Menu"
              className="rounded-full border-2 border-gray-200 bg-white px-8 py-3.5 text-base font-bold text-gray-700 transition-all hover:border-[#e25a27] hover:text-[#e25a27] shadow-sm hover:shadow-md"
            >
              Browse All Menu
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((item) => {
            const isAvailable = !item.status || String(item.status).toUpperCase() === "AVAILABLE";

            return (
            <div
              key={item._id}
              className="bg-white rounded-4xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group border border-gray-50"
              onClick={handleCardClick}
              onKeyDown={handleCardKeyDown}
              role={!showAll ? "button" : undefined}
              tabIndex={!showAll ? 0 : undefined}
            >
              <div className="h-56 overflow-hidden relative bg-gray-100">
                <div
                  className={`absolute top-4 left-4 text-[11px] font-extrabold px-3 py-1 rounded-full shadow-sm z-10 border ${
                    isAvailable
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : "bg-rose-50 text-rose-700 border-rose-200"
                  }`}
                >
                  {isAvailable ? "Available" : "Unavailable"}
                </div>
                <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-[#e25a27] text-sm font-extrabold px-4 py-1.5 rounded-full shadow-sm z-10 border border-[#e25a27]/10">
                  ${item.price.toFixed(2)}
                </div>
                <img
                  src={item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/600x400?text=Food"}
                  alt={item.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                />
              </div>

              <div className="p-6 flex flex-col grow">
                <p className="text-[#e25a27] text-xs font-bold uppercase tracking-wider mb-2">
                  {item.category}
                </p>
                <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                  {item.name}
                </h3>
                <p className="text-gray-500 text-sm mb-6 grow leading-relaxed">
                  Carefully crafted {item.category.toLowerCase()} with the freshest ingredients to satisfy your cravings.
                </p>

                <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-5">
                  <span className="text-2xl font-black text-gray-900">
                    ${item.price.toFixed(2)}
                  </span>
                  <button
                    onClick={(event) => {
                      event.stopPropagation();
                      addToCart(item);
                    }}
                    disabled={!isAvailable}
                    className="bg-[#e25a27] text-white hover:bg-[#c94a1b] disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 text-sm shadow-sm hover:shadow-md"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      className="w-4 h-4"
                    >
                      <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                    </svg>
                    {isAvailable ? "Add" : "Unavailable"}
                  </button>
                </div>
              </div>
            </div>
          )})}

          {loading && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">Loading featured items...</p>
            </div>
          )}

          {!loading && error && (
            <div className="col-span-full py-12 text-center">
              <p className="text-red-500 text-lg">{error}</p>
            </div>
          )}

          {!loading && !error && products.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <p className="text-gray-500 text-lg">No menu items found.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default MenuSection;
