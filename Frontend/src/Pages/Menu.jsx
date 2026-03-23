import { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";

export default function Menu() {
  const [product, setproduct] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All");
  const { addToCart } = useCart();

  const Readproduct = async () => {
    try {
      const res = await axios.get("http://localhost:5000/food");
      setproduct(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    Readproduct();
  }, []);

  const categories = ["All", ...new Set(product.map((p) => p.category))];
  const filteredProducts =
    activeCategory === "All"
      ? product
      : product.filter((p) => p.category === activeCategory);

  return (
    <div className="bg-[#fcfaf8] min-h-screen pt-12 pb-24 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
              The Menu
            </h1>
            <p className="text-gray-500 text-lg leading-relaxed">
              Hand-crafted ingredients and generational recipes, curated for
              your palate.
            </p>
          </div>

          {/* Categories */}
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-6 py-2.5 rounded-full font-semibold transition-all duration-300 text-sm ${
                  activeCategory === cat
                    ? "bg-[#e25a27] text-white shadow-md shadow-[#e25a27]/30"
                    : "bg-white text-gray-600 hover:bg-gray-100 hover:text-gray-900 shadow-sm"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((item, index) => {
            // First item gets a prominent wide card layout if there are enough items
            if (index === 0 && activeCategory === "All") {
              return (
                <div
                  key={item._id}
                  className="md:col-span-2 bg-[#1c1c1c] rounded-[2rem] overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row group text-white"
                >
                  <div className="md:w-[50%] h-72 md:h-auto overflow-hidden relative">
                    <img
                      src={`http://localhost:5000/allimages/${item.image}`}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-in-out"
                    />
                  </div>
                  <div className="md:w-[50%] p-8 md:p-12 flex flex-col justify-center bg-white text-gray-900">
                    <span className="text-xs font-bold text-[#e25a27] bg-[#feece6] px-3 py-1.5 rounded-full uppercase tracking-widest w-max mb-5">
                      Chef's Signature
                    </span>
                    <h3 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight text-gray-900">
                      {item.name}
                    </h3>
                    <p className="text-gray-500 mb-8 leading-relaxed max-w-sm">
                      A masterpiece perfectly balanced for an unforgettable
                      experience. Hand-picked ingredients prepared to perfection.
                    </p>
                    <div className="flex items-center gap-6 mt-auto">
                      <span className="text-3xl font-extrabold text-gray-900">
                        ${item.price}
                      </span>
                      <button 
                        onClick={() => addToCart(item)}
                        className="bg-[#e25a27] text-white px-6 py-3.5 rounded-xl font-bold hover:bg-[#c94a1b] transition-colors flex items-center justify-center gap-2 flex-1 max-w-[180px] shadow-lg shadow-[#e25a27]/20 hover:shadow-[#e25a27]/40"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          className="w-5 h-5"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6 5.5A.5.5 0 016.5 5h11a.5.5 0 01.447.276l1.5 3a.5.5 0 01-.447.724H18v5.5A1.5 1.5 0 0116.5 16h-11A1.5 1.5 0 014 14.5v-7L2.618 6.118A1.5 1.5 0 001.276 5.42L.354 5.882a.5.5 0 00.447.894l.922-.461A.5.5 0 012.17 6.3l1.182 2.365V14.5A2.5 2.5 0 005.854 17h10.646a2.5 2.5 0 002.5-2.5v-5.5h.382l-1.118-2.236H6.5v-1.25zM6.5 19a1.5 1.5 0 100-3 1.5 1.5 0 000 3zm9.5-1.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            }

            // Normal cards
            return (
              <div
                key={item._id}
                className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group"
              >
                <div className="h-64 overflow-hidden relative bg-gray-100">
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm text-[#e25a27] text-sm font-extrabold px-4 py-1.5 rounded-full shadow-sm z-10 border border-[#e25a27]/10">
                    ${item.price}
                  </div>
                  <img
                    src={`http://localhost:5000/allimages/${item.image}`}
                    alt={item.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-in-out"
                  />
                </div>

                <div className="p-7 flex flex-col flex-grow">
                  <h3 className="text-xl font-extrabold text-gray-900 mb-2">
                    {item.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-6 flex-grow leading-relaxed">
                    Fresh ingredients carefully crafted into a delicious{" "}
                    {item.category.toLowerCase()} that will leave you craving
                    more.
                  </p>

                  <div className="flex justify-between items-center mt-auto border-t border-gray-100 pt-5">
                    <span className="text-2xl font-extrabold text-gray-900">
                      ${item.price}
                    </span>
                    <button 
                      onClick={() => addToCart(item)}
                      className="bg-[#e25a27] text-white hover:bg-black px-5 py-2.5 rounded-xl font-semibold transition-all flex items-center gap-2 text-sm shadow-sm"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-4 h-4"
                      >
                        <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                      </svg>
                      Add
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-2xl font-bold text-gray-400">
              No items found in this category.
            </h3>
          </div>
        )}
      </div>
    </div>
  );
}