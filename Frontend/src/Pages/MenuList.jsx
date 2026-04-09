import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [editingItem, setEditingItem] = useState(null);
  const [categories, setCategories] = useState([]);
  const [editSaving, setEditSaving] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", category: "", price: "", description: "", image: null });

  const loadMenus = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/food`);
      setMenus(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch (err) {
      setError("Failed to load menu items.");
    } finally {
      setLoading(false);
    }
  };

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      // safe to ignore
    }
  };

  useEffect(() => {
    loadMenus();
    loadCategories();
  }, []);

  const handleEditClick = (item) => {
    setEditingItem(item);
    setEditForm({
      name: item.name || "",
      category: item.category || "",
      price: item.price || "",
      description: item.description || "",
      image: null
    });
  };

  const handleEditChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setEditForm(prev => ({ ...prev, image: files?.[0] || null }));
      return;
    }
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      setEditSaving(true);
      const payload = new FormData();
      payload.append("name", editForm.name);
      payload.append("category", editForm.category);
      payload.append("price", editForm.price);
      if (editForm.description) payload.append("description", editForm.description);
      if (editForm.image) payload.append("image", editForm.image);
      
      await axios.put(`${API_BASE_URL}/food/${editingItem._id}`, payload, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      
      setEditingItem(null);
      loadMenus();
    } catch (err) {
      setError("Failed to update menu item.");
    } finally {
      setEditSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/food/${id}`);
      setMenus((prev) => prev.filter((item) => item._id !== id));
    } catch {
      setError("Failed to delete menu item.");
    }
  };

  const toggleAvailability = async (item) => {
    const currentStatus = String(item.status || "AVAILABLE").toUpperCase();
    const nextStatus = currentStatus === "UNAVAILABLE" ? "AVAILABLE" : "UNAVAILABLE";

    try {
      const res = await axios.put(`${API_BASE_URL}/food/${item._id}`, { status: nextStatus });
      const updated = res.data;

      setMenus((prev) =>
        prev.map((menuItem) =>
          menuItem._id === item._id
            ? { ...menuItem, status: String(updated?.status || nextStatus).toUpperCase() }
            : menuItem
        )
      );
    } catch {
      setError("Failed to update menu availability.");
    }
  };

  const filteredMenus = menus.filter(
    (item) =>
      (item.name || "").toLowerCase().includes(search.toLowerCase()) ||
      (item.category || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex bg-[#f4f6fa] min-h-screen font-sans text-[#1c1e27]">
      {/* Sidebar matching the Dashboard format */}
      <Sidebar className="m-6 h-[calc(100vh-3rem)] shrink-0 shadow-[0_10px_40px_rgba(0,0,0,0.04)]" />

      {/* Main Content Area */}
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto ml-2">
        <div className="max-w-[1400px] mx-auto">
          
          {/* Top Bar matching image design */}
          <div className="flex flex-col mb-10 gap-6">
            <div className="flex justify-between items-end">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight mb-1 text-[#1a1c29]">Menu List</h1>
                <p className="text-[#848796] text-sm font-semibold tracking-wide">Manage your restaurant offerings</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 bg-transparent">
              <div className="flex items-center gap-4 flex-1 max-w-2xl">
                {/* Search Bar */}
                <div className="relative flex-1">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#a5a8b5]">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                    </svg>
                  </span>
                  <input
                    type="text"
                    placeholder="Search menu..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="w-full bg-white border border-[#eaeef3] rounded-full pl-12 pr-6 py-3.5 text-sm font-semibold text-[#1c1e27] placeholder-[#a5a8b5] focus:outline-none focus:border-[#c5c8d2] focus:ring-4 focus:ring-[#f0f2f6] transition-all shadow-sm"
                  />
                </div>
                
                {/* Filters Button */}
                <button className="flex items-center gap-2 bg-white border border-[#eaeef3] rounded-full px-6 py-3.5 text-sm font-bold text-[#464c5d] hover:bg-[#fafafc] transition-all shadow-sm">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                  </svg>
                  Filters
                </button>
              </div>

              {/* Add New Menu Button */}
              <Link
                to="/MenuManagement/Add"
                className="flex items-center gap-2 bg-[#f0f4ff] border-2 border-[#dde7ff] text-[#3b66df] rounded-full px-6 py-3 text-sm font-black tracking-wide hover:bg-[#e0e9ff] transition-all shadow-sm uppercase uppercase"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                New Menu
              </Link>
            </div>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-2xl bg-[#fff0f0] border border-[#ffcccc] text-[#ff4c4c] font-bold text-sm">
              {error}
            </div>
          )}

          {/* Custom Table Layout built with Flex Rows */}
          <div className="flex flex-col gap-4">
            
            {/* Table Header */}
            <div className="flex items-center px-4 py-2 text-[#989dae] text-[11px] font-bold uppercase tracking-widest">
              <div className="w-[5%] flex justify-center"></div>
              <div className="w-[20%] pl-4 pr-2">Menu Title</div>
              <div className="w-[15%] px-2">Category</div>
              <div className="w-[20%] px-2">Description</div>
              <div className="w-[15%] text-center">Status</div>
              <div className="w-[15%] text-right pr-4">Price</div>
              <div className="w-[10%] text-center">Actions</div>
            </div>

            {/* Loading State */}
            {loading && (
              <div className="flex justify-center items-center py-20">
                <div className="w-10 h-10 border-4 border-gray-200 border-t-[#3b66df] rounded-full animate-spin"></div>
              </div>
            )}

            {/* Empty State */}
            {!loading && filteredMenus.length === 0 && (
              <div className="bg-white rounded-[1.5rem] p-12 text-center shadow-sm border border-[#eaeef3]">
                <p className="text-[#848796] font-bold text-base">No menu items found. Try a different search.</p>
              </div>
            )}

            {/* List Rows */}
            {!loading && filteredMenus.map((item) => {
              const isAvailable = !item.status || String(item.status).toUpperCase() === "AVAILABLE";
              return (
              <div 
                key={item._id} 
                className="bg-white rounded-[1.5rem] p-4 flex items-center shadow-[0_4px_15px_rgba(0,0,0,0.02)] border border-[#ffffff] transition-all duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.06)] hover:-translate-y-0.5"
              >
                {/* Image */}
                <div className="w-[5%] flex justify-center">
                  <img
                    src={item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/100x100?text=Food"}
                    alt={item.name}
                    className="w-12 h-12 rounded-[12px] object-cover shadow-sm bg-gray-50 border border-gray-100"
                  />
                </div>
                
                {/* Title */}
                <div className="w-[20%] pl-4 pr-2">
                  <p className="font-extrabold text-[#1a1c29] text-[15px] truncate">{item.name}</p>
                </div>

                {/* Category */}
                <div className="w-[15%] px-2">
                  <p className="font-bold text-[#6d7183] text-sm truncate">{item.category}</p>
                </div>

                {/* Description Mock */}
                <div className="w-[20%] px-2">
                  <p className="font-semibold text-[#a5a8b5] text-[13px] truncate">
                    {item.description || "Fresh and delicious"}
                  </p>
                </div>

                {/* Status */}
                <div className="w-[15%] flex justify-center">
                  <span className={`border font-black text-[10px] px-3.5 py-1.5 rounded-md uppercase tracking-wider shadow-sm ${
                    isAvailable 
                      ? "bg-[#eeffee] border-[#b2f0b2] text-[#009e2a]" 
                      : "bg-[#ffeeee] border-[#ffb2b2] text-[#d40000]"
                  }`}>
                    {isAvailable ? "AVAILABLE" : "UNAVAILABLE"}
                  </span>
                </div>

                {/* Price */}
                <div className="w-[15%] text-right pr-4">
                  <div className="inline-flex items-center gap-2">
                    <span className="font-black text-[#1a1c29] text-[15px]">${Number(item.price || 0).toFixed(2)}</span>
                    <span className="text-[#a5a8b5] text-xs font-bold uppercase">USD</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="w-[10%] flex justify-center items-center gap-2">
                  <button 
                    onClick={() => toggleAvailability(item)}
                    title={isAvailable ? "Mark Unavailable" : "Mark Available"}
                    className="w-9 h-9 flex justify-center items-center rounded-[10px] bg-white border border-[#eaeef3] text-[#6d7183] hover:text-[#f7a915] hover:border-[#f7a915] hover:bg-[#fff9ea] transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18.36 6.64a9 9 0 1 1-12.73 0"></path><line x1="12" y1="2" x2="12" y2="12"></line>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleEditClick(item)}
                    className="w-9 h-9 flex justify-center items-center rounded-[10px] bg-white border border-[#eaeef3] text-[#6d7183] hover:text-[#3b66df] hover:border-[#3b66df] hover:bg-[#f0f4ff] transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 20h9"></path>
                      <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => handleDelete(item._id)}
                    className="w-9 h-9 flex justify-center items-center rounded-[10px] bg-white border border-[#eaeef3] text-[#6d7183] hover:text-[#ff4c4c] hover:border-[#ff4c4c] hover:bg-[#fff0f0] transition-all shadow-sm"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <polyline points="3 6 5 6 21 6"></polyline>
                      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                    </svg>
                  </button>
                </div>
              </div>
            );
            })}
          </div>

        </div>
      </main>

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm p-4">
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-black text-[#1a1c29]">Edit Menu</h2>
              <button onClick={() => setEditingItem(null)} className="text-[#a5a8b5] hover:text-[#ff4c4c] transition">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
            
            <form onSubmit={handleEditSubmit} className="flex flex-col gap-4">
              <div>
                <label className="block text-[11px] font-bold text-[#989dae] uppercase tracking-widest mb-2">Menu Name</label>
                <input required name="name" value={editForm.name} onChange={handleEditChange} className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-3 text-sm font-semibold text-[#1c1e27] focus:outline-none focus:ring-2 focus:ring-[#3b66df]/20 focus:border-[#3b66df]" placeholder="Item name" />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold text-[#989dae] uppercase tracking-widest mb-2">Category</label>
                  <select required name="category" value={editForm.category} onChange={handleEditChange} className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-3 text-sm font-semibold text-[#1c1e27] focus:outline-none focus:ring-2 focus:ring-[#3b66df]/20 focus:border-[#3b66df]">
                    <option value="">Select Category</option>
                    {categories.map(c => <option key={c._id} value={c.name}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] font-bold text-[#989dae] uppercase tracking-widest mb-2">Price ($)</label>
                  <input required type="number" step="0.01" name="price" value={editForm.price} onChange={handleEditChange} className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-3 text-sm font-semibold text-[#1c1e27] focus:outline-none focus:ring-2 focus:ring-[#3b66df]/20 focus:border-[#3b66df]" placeholder="0.00" />
                </div>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-[#989dae] uppercase tracking-widest mb-2">Description</label>
                <textarea name="description" value={editForm.description} onChange={handleEditChange} rows="2" className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-3 text-sm font-semibold text-[#1c1e27] focus:outline-none focus:ring-2 focus:ring-[#3b66df]/20 focus:border-[#3b66df]" placeholder="Optional description..."></textarea>
              </div>
              
              <div>
                <label className="block text-[11px] font-bold text-[#989dae] uppercase tracking-widest mb-2">New Image (Optional)</label>
                <input type="file" name="image" onChange={handleEditChange} accept="image/*" className="w-full bg-[#f4f6fa] border border-[#eaeef3] rounded-xl px-4 py-2 text-sm font-semibold text-[#1c1e27] file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#e0e9ff] file:text-[#3b66df] hover:file:bg-[#dde7ff] transition-all cursor-pointer" />
              </div>
              
              <div className="mt-4 flex gap-3">
                <button type="button" onClick={() => setEditingItem(null)} className="flex-1 bg-white border-2 border-[#eaeef3] text-[#6d7183] hover:bg-[#f4f6fa] rounded-xl py-3.5 font-bold uppercase tracking-wider text-xs transition">
                  Cancel
                </button>
                <button type="submit" disabled={editSaving} className="flex-1 bg-[#3b66df] text-white rounded-xl py-3.5 font-black uppercase tracking-wider text-xs shadow-[0_8px_20px_rgba(59,102,223,0.3)] hover:bg-[#284ebd] transition hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed">
                  {editSaving ? "Saving..." : "Update Item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
