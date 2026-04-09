import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const MOCK_CATEGORIES = ["All Items", "Signature Mains", "Small Plates", "Garden Selection"];

// Fallback items that perfectly match the design if the database is empty
const MOCK_ITEMS = [
  { _id: '1', name: 'Atlantic Salmon Bowl', price: 24.50, category: 'Signature Mains', image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=800&q=80' },
  { _id: '2', name: 'Artisan Truffle Stack', price: 18.00, category: 'Signature Mains', image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=800&q=80' },
  { _id: '3', name: 'Wild Forest Pizza', price: 21.90, category: 'Signature Mains', image: 'https://images.unsplash.com/photo-1565299507177-b0ac66763828?auto=format&fit=crop&w=800&q=80' },
  { _id: '4', name: 'Detox Greens Salad', price: 16.20, category: 'Garden Selection', image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80' },
  { _id: '5', name: 'Smoked Ribs Platter', price: 32.00, category: 'Signature Mains', image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&w=800&q=80' },
  { _id: '6', name: 'Nonna\'s Lasagna', price: 19.50, category: 'Signature Mains', image: 'https://images.unsplash.com/photo-1574894709920-11b28e7367e3?auto=format&fit=crop&w=800&q=80' },
  { _id: '7', name: 'Nitro Cold Brew', price: 6.50, category: 'All Items', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=800&q=80' },
  { _id: '8', name: 'Red Velvet Petite', price: 8.00, category: 'All Items', image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=800&q=80' }
];

export default function POS() {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(MOCK_CATEGORIES);
  const [activeCategory, setActiveCategory] = useState("All Items");
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();
  
  // Load Menu Items connecting to Real Data or Fallback
  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/food`);
        if (res.data && res.data.length > 0) {
          setItems(res.data);
          // Dynamically set categories based on DB items if available
          const uniqueCats = ["All Items", ...new Set(res.data.map(item => item.category).filter(Boolean))];
          setCategories(uniqueCats.length > 1 ? uniqueCats : MOCK_CATEGORIES);
        } else {
          setItems(MOCK_ITEMS);
        }
      } catch (err) {
        console.error("Failed to load products, using fallback data");
        setItems(MOCK_ITEMS);
      }
    };
    fetchItems();
  }, []);

  // Cart Operations
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find(item => item._id === product._id);
      if (existing) {
        return prevCart.map(item => item._id === product._id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prevCart, { 
        ...product, 
        quantity: 1, 
        // Adding a mock modifier purely for UI look
        note: product.category === 'Signature Mains' ? '+ Extra Avocado' : '' 
      }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter(item => item._id !== id));
  };

  // Filter Items
  const filteredItems = activeCategory === "All Items" 
    ? items 
    : items.filter(i => i.category === activeCategory);

  // Math totals
  const subtotal = cart.reduce((sum, item) => sum + (Number(item.price) * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="flex bg-[#fafafc] min-h-screen font-sans text-slate-800 overflow-hidden">
      
      {/* 1. Sidebar Panel */}
      <Sidebar className="shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-20" />

      {/* 2. Main Middle Section */}
      <main className="flex-1 flex flex-col h-screen overflow-hidden relative">
        <div className="p-10 pb-4 shrink-0">
          
          {/* Header Row */}
          <div className="flex justify-between items-center mb-10">
            <div>
              <h1 className="text-[2.5rem] font-bold tracking-tight text-[#1a1c29] mb-1">Main Kitchen</h1>
              <p className="text-[11px] font-black uppercase tracking-[0.2em] text-slate-400">SELECT ITEMS FOR TABLE #12</p>
            </div>
            {/* Top Toolbar Actions */}
            <div className="flex gap-4">
              <button className="w-12 h-12 bg-slate-200/60 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-600 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
              </button>
              <button className="w-12 h-12 bg-slate-200/60 hover:bg-slate-300 rounded-full flex items-center justify-center text-slate-600 transition">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="4" y1="12" x2="20" y2="12"></line><line x1="4" y1="6" x2="20" y2="6"></line><line x1="4" y1="18" x2="20" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Categories Horizontal Menu */}
          <div className="flex gap-3 overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] mb-8 pb-2">
            {categories.map((cat) => (
              <button 
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`whitespace-nowrap px-8 py-3.5 rounded-full font-bold text-[14px] transition-all duration-300 shadow-sm ${
                  activeCategory === cat 
                    ? "bg-[#c84b24] text-white" 
                    : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-100"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

        </div>

        {/* Item Grid (Scrollable) */}
        <div className="flex-1 overflow-y-auto px-10 pb-32 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => {
              // Properly render image if it's from db vs unsplash
              const imgSource = item.image && item.image.startsWith('http') 
                  ? item.image 
                  : item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/400x400?text=Food";
                  
              return (
                <div 
                  key={item._id}
                  onClick={() => addToCart(item)}
                  className="bg-white rounded-[2rem] p-4 pb-6 flex flex-col cursor-pointer transition-all duration-300 hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] shadow-sm border border-slate-50 group"
                >
                  <div className="overflow-hidden rounded-[1.5rem] mb-5 aspect-square bg-slate-100">
                     <img 
                       src={imgSource} 
                       alt={item.name} 
                       className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                       onError={(e)=>{e.target.src="https://placehold.co/400x400?text=Dish"}}
                     />
                  </div>
                  <h3 className="text-[17px] font-black text-[#1a1c29] leading-tight mb-2 px-1 line-clamp-2">{item.name}</h3>
                  <p className="text-[#c84b24] font-black text-xl mt-auto px-1">${Number(item.price).toFixed(2)}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Pill at bottom center */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white px-6 py-3.5 rounded-full flex items-center gap-5 text-xs font-black shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-slate-50 z-30">
          <div className="flex items-center gap-3 text-slate-700 uppercase tracking-widest text-[10px]">
            <span className="w-2.5 h-2.5 rounded-full bg-[#ec5f5f] animate-pulse"></span>
            3 Rush Orders
          </div>
          <div className="w-[1.5px] bg-slate-200 h-4"></div>
          <div className="flex items-center gap-2 text-slate-700 uppercase tracking-widest text-[10px]">
            <span className="text-sm">⏱</span>
            Avg prep: 12m
          </div>
        </div>
      </main>

      {/* 3. Right Sidebar Panel - Current Order */}
      <aside className="w-[380px] bg-[#fafafc] flex flex-col h-screen shrink-0 border-l border-slate-200/60 relative z-30">
        
        {/* Cart Header */}
        <div className="px-8 pt-10 pb-6 flex items-start justify-between shrink-0">
          <div>
            <h2 className="text-[1.7rem] font-bold text-[#1a1c29] leading-none mb-2.5">Current Order</h2>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-[#8ba2b8]">DINE-IN • TABLE 12</p>
          </div>
          <button className="text-[#c84b24] hover:bg-[#c84b24]/10 p-2.5 rounded-xl transition">
            <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"></polyline>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
              <rect x="6" y="14" width="12" height="8"></rect>
            </svg>
          </button>
        </div>

        {/* Cart Item List Component */}
        <div className="flex-1 overflow-y-auto px-8 py-2 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-4">
          {cart.length === 0 ? (
            <div className="text-center py-20 opacity-50 flex flex-col items-center">
              <svg className="w-16 h-16 text-slate-300 mb-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
              <p className="font-bold text-slate-500">Order is empty</p>
              <p className="text-xs text-slate-400 mt-2 font-medium">Click items from the menu to add.</p>
            </div>
          ) : (
             cart.map((item, index) => (
                <div key={`${item._id}-${index}`} className="bg-white rounded-[1.25rem] p-4 flex gap-4 shadow-[0_4px_20px_rgba(0,0,0,0.03)] border border-slate-50 items-center transition-all">
                  
                  {/* Item Quantity Box */}
                  <div className="w-[3.25rem] h-[3.25rem] rounded-[1rem] bg-[#fdf2ee] text-[#c84b24] font-black flex items-center justify-center text-lg shrink-0">
                    {item.quantity}
                  </div>
                  
                  {/* Item Title & Note */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-extrabold text-[#1a1c29] text-[15px] truncate block">{item.name}</h4>
                    {item.note && <p className="text-[11px] font-semibold text-slate-400 italic mt-0.5 truncate">{item.note}</p>}
                  </div>
                  
                  {/* Price & Remove Logic */}
                  <div className="flex flex-col items-end pl-2 shrink-0">
                    <span className="font-black text-[#1a1c29] text-[15px]">${(item.price * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeFromCart(item._id)} className="text-[9px] text-[#ec5f5f] font-black uppercase tracking-wider mt-1 hover:underline cursor-pointer">
                      REMOVE
                    </button>
                  </div>
                  
                </div>
             ))
          )}
        </div>

        {/* Big Checkout Summary Box */}
        <div className="bg-white rounded-[2rem] p-8 pb-10 m-5 mt-2 shadow-[0_-5px_40px_rgba(0,0,0,0.03)] border border-slate-100 shrink-0 relative z-40">
          <div className="flex justify-between items-center text-[15px] font-bold text-slate-500 mb-3">
            <span>Subtotal</span>
            <span className="text-[#1a1c29]">${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center text-[15px] font-bold text-slate-500 mb-5">
            <span>Tax (8%)</span>
            <span className="text-[#1a1c29]">${tax.toFixed(2)}</span>
          </div>
          
          <div className="w-full border-t-[2px] border-dashed border-slate-200 mb-5 w-full"></div>
          
          <div className="flex justify-between items-end mb-8">
            <span className="text-2xl font-black text-[#1a1c29]">Total</span>
            <span className="text-3xl font-black text-[#c84b24]">${total.toFixed(2)}</span>
          </div>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-white border border-slate-200 text-[#1a1c29] font-black text-[13px] py-4.5 px-2 rounded-[1.25rem] shadow-sm hover:bg-slate-50 transition uppercase tracking-wide text-center">
              Save<br/>Order
            </button>
            <button 
              onClick={() => navigate('/Receipt', { state: { cart } })}
              className="flex-[1.2] bg-[#c84b24] text-white font-black text-[13px] py-4.5 px-4 rounded-[1.25rem] shadow-[0_10px_20px_rgba(200,75,36,0.2)] hover:bg-[#b0401d] transition hover:-translate-y-0.5 uppercase tracking-wide text-center"
            >
              Quick<br/>Checkout
            </button>
          </div>
        </div>

      </aside>

    </div>
  );
}
