import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

const STATUSES = ["PENDING", "COOKING", "DELIVERED"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingOrder, setEditingOrder] = useState(null);
  const [editStatus, setEditStatus] = useState("");

  const loadOrders = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/orders`);
      setOrders(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch {
      setError("Failed to load orders.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      const res = await axios.put(`${API_BASE_URL}/orders/${id}`, { status });
      setOrders((prev) => prev.map((order) => (order._id === id ? res.data : order)));
    } catch {
      setError("Failed to update order status.");
    }
  };

  const deleteOrder = async (id) => {
    if (!window.confirm("Are you sure you want to delete this order?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch {
      setError("Failed to delete order.");
    }
  };

  const filteredOrders = orders.filter((order) => {
    const term = search.toLowerCase();
    const orderId = order._id.toLowerCase();
    const address = (order.address || "").toLowerCase();
    const itemsText = (order.items || []).map(i => i.name).join(" ").toLowerCase();
    return orderId.includes(term) || address.includes(term) || itemsText.includes(term);
  });

  const getBadgeStyle = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#fff3cc] text-[#d49a15]";
      case "COOKING":
        return "bg-[#feece5] text-[#d85c2c]";
      case "DELIVERED":
        return "bg-[#f1f3f7] text-[#868a99]";
      default:
        return "bg-gray-100 text-gray-500";
    }
  };

  // Helper to format ID to look like #CC-9821
  const formatId = (id) => {
    const str = String(id);
    return `#CC-${str.substring(str.length - 4)}`;
  };

  return (
    <div className="flex bg-[#f4f6fa] min-h-screen font-sans text-[#1c1e27]">
      <Sidebar className="m-6 h-[calc(100vh-3rem)] shrink-0 shadow-[0_10px_40px_rgba(0,0,0,0.04)]" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto ml-2">
        <div className="max-w-[1400px] mx-auto relative">
          
          {/* Breadcrumb & Header */}
          <div className="flex justify-between items-end mb-8 relative z-10 w-full pl-2">
            <div>
              <p className="text-[10px] font-black tracking-[0.2em] text-[#848796] mb-3 uppercase">
                KITCHEN COMMAND <span className="mx-1 text-[#d8d9de]">/</span> <span className="text-[#d85c2c]">ORDERS</span>
              </p>
              <h1 className="text-[2.5rem] font-bold tracking-tight text-[#1a1c29] leading-none mb-1">Daily Manifest</h1>
            </div>
            <button className="flex items-center gap-2 bg-[#fffcfb] border border-[#ffebd6] px-5 py-2.5 rounded-full font-bold text-sm shadow-sm text-[#d85c2c] hover:bg-[#fff5ee] transition">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
              Oct 24, 2024
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-[#fff0f0] border border-[#ffcccc] text-[#ff4c4c] font-bold text-sm">
              {error}
            </div>
          )}

          {/* Global White Card wrapping table */}
          <div className="bg-white rounded-[2rem] shadow-[0_20px_60px_rgba(0,0,0,0.04)] overflow-hidden border border-[#ffffff] relative flex flex-col">
            
            {/* Decorative top glow matching image */}
            <div className="absolute top-0 left-[35%] w-[400px] h-[150px] bg-[#ffd5b8] blur-[90px] rounded-full opacity-40 pointer-events-none"></div>
            
            {/* Top Toolbar */}
            <div className="px-8 py-6 border-b border-[#f4f5f9] flex flex-wrap items-center justify-between gap-4 relative z-10 bg-white/50 backdrop-blur-sm">
              <div className="relative flex-1 min-w-[300px] max-w-2xl">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5a8b5]">
                  <svg className="w-5 h-5 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                  </svg>
                </span>
                <input 
                  type="text" 
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by order ID, customer name, or items..." 
                  className="w-full bg-[#f9fafc] border border-[#eaeef3] rounded-xl pl-12 pr-6 py-3.5 text-sm font-semibold text-[#1c1e27] placeholder-[#adb1bf] focus:outline-none focus:border-[#c5c8d2] focus:ring-2 focus:ring-[#f0f2f6] transition-all shadow-inner" 
                />
              </div>
              
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-2 border border-[#eaeef3] bg-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#f4f6fa] transition text-[#464c5d] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filter
                </button>
                <button className="flex items-center gap-2 border border-[#eaeef3] bg-white px-6 py-3.5 rounded-xl font-bold text-sm hover:bg-[#f4f6fa] transition text-[#464c5d] shadow-[0_2px_8px_rgba(0,0,0,0.02)]">
                  <svg className="w-4 h-4 opacity-70" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="12" y1="5" x2="12" y2="19"></line>
                    <polyline points="19 12 12 19 5 12"></polyline>
                  </svg>
                  Sort
                </button>
              </div>
            </div>

            {/* Table Header */}
            <div className="flex items-center px-8 py-5 text-[#989dae] text-[10px] font-bold uppercase tracking-widest border-b border-[#f4f5f9] relative z-10 bg-white">
              <div className="w-[12%]">Order ID</div>
              <div className="w-[20%] pr-4">Customer Info</div>
              <div className="w-[30%] pr-4">Items</div>
              <div className="w-[15%]">Status</div>
              <div className="w-[13%]">Total Amount</div>
              <div className="w-[10%] text-center">Action</div>
            </div>

            {/* Loading & Empty States */}
            {loading && (
              <div className="flex justify-center items-center py-24 relative z-10 bg-white">
                <div className="w-10 h-10 border-4 border-[#f0f2f6] border-t-[#d85c2c] rounded-full animate-spin"></div>
              </div>
            )}

            {!loading && filteredOrders.length === 0 && (
              <div className="py-24 text-center relative z-10 bg-white">
                <p className="text-[#848796] font-bold text-base">No orders matching your criteria.</p>
              </div>
            )}

            {/* Table Rows */}
            <div className="flex flex-col relative z-10 bg-white">
              {!loading && filteredOrders.map(order => (
                <div key={order._id} className="flex items-center px-8 py-6 border-b border-[#f4f5f9] hover:bg-[#fafbfd] transition-colors group">
                  
                  {/* Order ID */}
                  <div className="w-[12%]">
                    <span className="text-[#8ba2b8] font-bold text-xs tracking-wider font-mono bg-[#f4f6fa] px-2 py-1 rounded-md">{formatId(order._id)}</span>
                  </div>
                  
                  {/* Customer Info */}
                  <div className="w-[20%] pr-4 flex flex-col">
                    <span className="font-extrabold text-[#1a1c29] text-[15px] truncate flex items-center gap-2">
                      {order.fullName || (order.address && order.address.length > 3 ? order.address.split(',')[0] : "Walk-in Customer")}
                    </span>
                    <span className="text-[#6d7183] font-black text-[10px] tracking-wide mt-0.5">
                      {order.phone && order.phone !== "N/A" ? order.phone : "No Phone Recorded"}
                    </span>
                    <div className="flex flex-wrap items-center gap-2 mt-[6px]">
                      <span className="text-[#a5a8b5] font-bold text-[9px] uppercase tracking-widest">
                        {order.address ? "DELIVERY" : "TAKEAWAY"}
                      </span>
                      <span className={`text-[8px] font-black uppercase tracking-widest px-1.5 py-0.5 rounded-sm ${order.paymentMethod === 'card' ? 'bg-[#e8f5e9] text-[#2e7d32]' : 'bg-[#fff3cc] text-[#d49a15]'}`}>
                        {order.paymentMethod === 'card' ? 'PAID VIA CARD' : 'CASH ON DELIVERY'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Items */}
                  <div className="w-[30%] pr-4 flex items-center gap-4">
                    <div className="flex -space-x-3 shrink-0 relative z-0">
                       {order.items?.map((i, idx) => {
                           if (idx < 3) {
                               return (
                                   <div key={idx} className="w-11 h-11 rounded-full border-2 border-white bg-gray-50 flex-shrink-0 overflow-hidden shadow-sm relative" style={{ zIndex: 10 - idx }} title={i.name}>
                                       <img src={i.image ? `${API_BASE_URL}/allimages/${i.image}` : "https://placehold.co/100x100?text=Food"} alt={i.name} className="w-full h-full object-cover" />
                                   </div>
                               );
                           }
                           return null;
                       })}
                       {order.items?.length > 3 && (
                           <div className="w-11 h-11 rounded-full border-2 border-white bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500 shadow-sm relative z-0">
                               +{order.items.length - 3}
                           </div>
                       )}
                    </div>
                    <p className="font-semibold text-[#6d7183] text-[13px] leading-snug line-clamp-2 pr-4 flex-1">
                      {order.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "No items recorded"}
                    </p>
                  </div>
                  
                  {/* Status */}
                  <div className="w-[15%]">
                    <span className={`inline-block font-black text-[9px] uppercase tracking-[0.1em] px-3.5 py-1.5 rounded-full ${getBadgeStyle(order.status)}`}>
                      {order.status}
                    </span>
                  </div>
                  
                  {/* Total Amount */}
                  <div className="w-[13%]">
                    <span className="font-black text-[#1a1c29] text-base">${Number(order.total || 0).toFixed(2)}</span>
                  </div>
                  
                  {/* Actions */}
                  <div className="w-[10%] flex justify-center items-center gap-4">
                    <button onClick={() => { setEditingOrder(order); setEditStatus(order.status); }} className="text-[#d85c2c] hover:text-[#c44e21] hover:scale-110 transition-transform" title="Update Status">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                      </svg>
                    </button>
                    <button onClick={() => deleteOrder(order._id)} className="text-[#a5a8b5] hover:text-[#ff4c4c] hover:scale-110 transition-transform" title="Delete Order">
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path><line x1="10" y1="11" x2="10" y2="17"></line><line x1="14" y1="11" x2="14" y2="17"></line>
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Pagination matching image */}
            <div className="px-8 py-5 bg-white relative z-10 flex justify-between items-center rounded-b-[2rem]">
              <p className="text-[10px] font-bold uppercase tracking-widest text-[#a5a8b5]">
                SHOWING 1 TO {Math.min(filteredOrders.length, 5)} OF {filteredOrders.length} ORDERS
              </p>
              <div className="flex items-center gap-1">
                <button className="w-8 h-8 flex items-center justify-center text-[#a5a8b5] hover:text-[#1a1c29] transition">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
                </button>
                <button className="w-8 h-8 rounded-full bg-[#d85c2c] text-white font-extrabold text-xs flex items-center justify-center mx-1 shadow-[0_4px_10px_rgba(216,92,44,0.3)]">
                  1
                </button>
                <button className="w-8 h-8 rounded-full text-[#1a1c29] font-extrabold text-xs flex items-center justify-center hover:bg-[#f4f6fa] transition">
                  2
                </button>
                <button className="w-8 h-8 rounded-full text-[#1a1c29] font-extrabold text-xs flex items-center justify-center hover:bg-[#f4f6fa] transition">
                  3
                </button>
                <button className="w-8 h-8 flex items-center justify-center text-[#a5a8b5] hover:text-[#1a1c29] transition">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                </button>
              </div>
            </div>

          </div>

          {/* Footer outside the box */}
          <div className="mt-8 mb-4 px-4 flex flex-col md:flex-row justify-between items-center text-[9px] font-bold text-[#a5a8b5] uppercase tracking-widest">
            <div className="flex items-center gap-3">
              <span className="text-[#1a1c29] font-black text-xs">Culinary Curator</span>
              <span className="opacity-50">© 2024 CRAFTED FOR EXCELLENCE.</span>
            </div>
            <div className="flex items-center gap-8 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#1a1c29] transition">PRIVACY POLICY</a>
              <a href="#" className="hover:text-[#1a1c29] transition">TERMS OF SERVICE</a>
              <a href="#" className="hover:text-[#1a1c29] transition">CONTACT SUPPORT</a>
            </div>
          </div>

        </div>
      </main>

      {/* Edit Status Modal */}
      {editingOrder && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-sm p-8 shadow-2xl">
            <h2 className="text-2xl font-black text-[#1a1c29] mb-6">Update Status</h2>
            <div className="flex flex-col gap-4">
              <label className="text-[11px] font-bold text-[#989dae] uppercase tracking-widest">Select Status</label>
              <select 
                value={editStatus}
                onChange={(e) => setEditStatus(e.target.value)}
                className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-3.5 text-sm font-semibold text-[#1c1e27] focus:outline-none focus:ring-2 focus:ring-[#d85c2c]/20 focus:border-[#d85c2c]"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
              
              <div className="mt-6 flex gap-3">
                <button 
                  onClick={() => setEditingOrder(null)} 
                  className="flex-1 bg-white border-2 border-[#eaeef3] text-[#6d7183] hover:bg-[#f4f6fa] rounded-xl py-3.5 font-bold uppercase tracking-wider text-xs transition"
                >
                  Cancel
                </button>
                <button 
                  onClick={() => { updateStatus(editingOrder._id, editStatus); setEditingOrder(null); }}
                  className="flex-1 bg-[#d85c2c] text-white rounded-xl py-3.5 font-black uppercase tracking-wider text-xs shadow-[0_8px_20px_rgba(216,92,44,0.3)] hover:bg-[#b0401d] transition hover:-translate-y-0.5"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
