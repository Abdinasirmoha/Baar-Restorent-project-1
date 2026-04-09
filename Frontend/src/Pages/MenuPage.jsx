import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../config/api";

export default function MenuPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState(["All"]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/food`);
        const items = Array.isArray(res.data) ? res.data : [];
        setProducts(items);
        
        // Extract unique categories from items dynamically
        const uniqueCategories = ["All", ...new Set(items.map(item => item.category))];
        setCategories(uniqueCategories);
        setError("");
      } catch (err) {
        setError("Failed to load menu items. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = activeCategory === "All" 
    ? products 
    : products.filter(item => item.category === activeCategory);

  return (
    <div className="bg-[#f9fafb] min-h-screen font-sans text-gray-800 pb-24">
      
      {/* 1. Header Section */}
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12 pt-16 pb-12 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-md">
          <h1 className="text-5xl lg:text-[3.5rem] font-black text-[#1a1c29] mb-4 tracking-tight leading-none">The Menu</h1>
          <p className="text-[#6d7183] text-base font-medium leading-relaxed">
            Hand-crafted ingredients and generational recipes, curated for your palate.
          </p>
        </div>
        
        {/* Category Navigation (Tabs) */}
        <div className="flex flex-wrap gap-3 md:justify-end pb-1">
          {categories.map((category, index) => (
            <button
              key={index}
              onClick={() => setActiveCategory(category)}
              className={`px-5 py-2.5 rounded-full text-[13px] font-extrabold transition-all duration-300 ${
                activeCategory === category
                  ? "bg-[#d85c2c] text-white shadow-[0_8px_20px_rgba(216,92,44,0.3)]"
                  : "bg-white text-[#6d7183] border border-gray-100 hover:border-gray-300 hover:text-[#1a1c29]"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Main Content Grid */}
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        
        {loading && (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-gray-200 border-t-[#d85c2c] mb-4"></div>
            <p className="text-gray-500 font-bold text-lg animate-pulse">Loading amazing food...</p>
          </div>
        )}

        {!loading && error && (
          <div className="bg-red-50 border border-red-100 rounded-3xl p-8 text-center max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-red-700 mb-2">Oops! Something went wrong</h3>
            <p className="text-red-600 font-medium">{error}</p>
          </div>
        )}

        {!loading && !error && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 auto-rows-max pb-10">
            {filteredProducts.map((item, index) => {
              const isLarge = index === 0; // First item gets the featured huge card style

              if (isLarge) {
                return (
                  <div key={item._id} className="md:col-span-2 bg-white rounded-[2rem] border border-gray-100/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col md:flex-row group mb-2 md:mb-0">
                    <div className="md:w-1/2 h-72 md:h-auto overflow-hidden bg-gray-50 relative">
                      <img src={item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/800x800"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    <div className="md:w-1/2 p-8 md:p-12 lg:p-14 flex flex-col justify-center bg-white relative">
                      <span className="self-start text-[10px] font-black uppercase tracking-widest text-[#d85c2c] bg-[#fff0e8] px-3.5 py-1.5 rounded-lg mb-6 inline-block border border-orange-100/50">Chef's Signature</span>
                      <h2 className="text-3xl lg:text-[2.5rem] font-black text-[#1a1c29] mb-5 leading-[1.15]">{item.name}</h2>
                      <p className="text-[#6d7183] font-medium text-[15px] leading-relaxed mb-10 line-clamp-3">
                        {item.description || `San Marzano tomatoes, fresh mozzarella, earthy wild mushrooms, and a drizzle of white truffle oil. A masterpiece of culinary storytelling.`}
                      </p>
                      <div className="flex items-center gap-6 mt-auto">
                        <span className="text-3xl font-black text-[#1a1c29]">${item.price.toFixed(2)}</span>
                        <button onClick={() => addToCart(item)} className="ml-auto px-7 py-4 bg-[#d85c2c] text-white font-black text-sm rounded-xl shadow-[0_8px_20px_rgba(216,92,44,0.35)] hover:-translate-y-1 hover:bg-[#c44e21] hover:shadow-[0_12px_25px_rgba(216,92,44,0.45)] transition-all transform active:scale-95 flex items-center gap-2">
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M7 18c-1.1 0-1.99.9-1.99 2S5.9 22 7 22s2-.9 2-2-.9-2-2-2zM1 2v2h2l3.6 7.59-1.35 2.45c-.16.28-.25.61-.25.96 0 1.1.9 2 2 2h12v-2H7.42c-.14 0-.25-.11-.25-.25l.03-.12.9-1.63h7.45c.75 0 1.41-.41 1.75-1.03l3.58-6.49c.08-.14.12-.31.12-.48 0-.55-.45-1-1-1H5.21l-.94-2H1zm16 16c-1.1 0-1.99.9-1.99 2s.89 2 1.99 2 2-.9 2-2-.9-2-2-2z"/></svg>
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              // Normal Card Design
              return (
                <div key={item._id} className="bg-white rounded-[2rem] border border-gray-100/60 shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-500 overflow-hidden flex flex-col group">
                  <div className="h-[260px] overflow-hidden relative bg-gray-50">
                    <img src={item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/600x600"} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    {/* Optional floating category tag */}
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-xl border border-gray-100 shadow-sm">
                      <span className="text-[10px] font-extrabold tracking-widest text-[#d85c2c] uppercase">{item.category}</span>
                    </div>
                  </div>
                  <div className="p-6 md:p-7 flex flex-col flex-grow bg-white relative">
                    <h3 className="text-[1.35rem] font-black text-[#1a1c29] mb-3 leading-snug">{item.name}</h3>
                    <p className="text-[#6d7183] text-[14px] font-medium line-clamp-2 leading-relaxed mb-8 flex-grow">
                       {item.description || `Fresh ingredients and delicate preparation make this ${item.category} a delight.`}
                    </p>
                    
                    {/* Bottom Action Area */}
                    <div className="flex items-center justify-between mt-auto">
                      <div className="flex flex-col">
                        <span className="text-[10px] uppercase font-bold text-gray-400 mb-0.5 tracking-wider">Price</span>
                        <span className="text-[1.3rem] font-black text-[#1a1c29]">${item.price.toFixed(2)}</span>
                      </div>
                      <button onClick={() => addToCart(item)} className="px-6 py-3.5  text-[#1a1c29] font-black text-[13px] rounded-xl bg-[#d85c2c] text-white hover:shadow-[0_8px_20px_rgba(216,92,44,0.25)] transition-all duration-300 transform active:scale-95 flex items-center gap-2">
                        <span>Add</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredProducts.length === 0 && (
          <div className="bg-white rounded-[2rem] p-16 text-center max-w-2xl mx-auto border border-gray-100 shadow-sm mt-8">
            <h3 className="text-2xl font-black text-[#1a1c29] mb-3">No items found</h3>
            <p className="text-[#6d7183] text-lg font-medium">
              We couldn't find anything in the <span className="font-extrabold text-[#d85c2c]">{activeCategory}</span> category.
            </p>
            <button onClick={() => setActiveCategory("All")} className="mt-8 px-8 py-3 bg-[#1a1c29] text-white rounded-xl font-bold hover:bg-[#2c2f42] transition">
              View All Menu
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
