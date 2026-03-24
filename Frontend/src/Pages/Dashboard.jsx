import { useEffect, useState } from "react";
import axios from "axios";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("Orders");
  const [foods, setFoods] = useState([]);
  const [orders, setOrders] = useState([]);

  // Orders Pagination & Search
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 5;

  // Status Edit State
  const [editingOrderId, setEditingOrderId] = useState(null);

  // Form State for New Order
  const [isNewOrderOpen, setIsNewOrderOpen] = useState(false);
  const [newOrderItems, setNewOrderItems] = useState([]);
  const [newOrderAddress, setNewOrderAddress] = useState("");

  // POS State
  const [posItems, setPosItems] = useState([]);
  const [posCategory, setPosCategory] = useState("All Items");
  const TAX_RATE = 0.08;

  // Form State for Food Management
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [receiptOrder, setReceiptOrder] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: null,
  });

  // Allowed Categories
  const categories = ["Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"];

  // ============================
  // FETCH DATA
  // ============================
  const fetchData = async () => {
    try {
      const foodRes = await axios.get("http://localhost:5000/food");
      setFoods(foodRes.data);

      const orderRes = await axios.get("http://localhost:5000/orders");
      setOrders(orderRes.data);
    } catch (err) {
      console.log("Error fetching data:", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // reset page to 1 when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // ============================
  // FOOD MANAGEMENT
  // ============================
  const handleFoodInput = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageInput = (e) => {
    setFormData((prev) => ({ ...prev, image: e.target.files[0] }));
  };

  const openForm = (item = null) => {
    if (item) {
      setEditingItem(item);
      setFormData({
        name: item.name,
        price: item.price,
        category: item.category,
        image: null,
      });
    } else {
      setEditingItem(null);
      setFormData({ name: "", price: "", category: "Breakfast", image: null });
    }
    setIsFormOpen(true);
  };

  const closeForm = () => {
    setIsFormOpen(false);
    setEditingItem(null);
    setFormData({ name: "", price: "", category: "Breakfast", image: null });
  };

  const submitFood = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("category", formData.category);
    if (formData.image) {
      data.append("image", formData.image);
    }

    try {
      if (editingItem) {
        await axios.put(`http://localhost:5000/food/${editingItem._id}`, data);
      } else {
        await axios.post("http://localhost:5000/food", data);
      }
      closeForm();
      fetchData(); // Refresh the data list
    } catch (err) {
      console.log("Error saving food:", err);
    }
  };

  const deleteFood = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu item?")) {
      try {
        await axios.delete(`http://localhost:5000/food/${id}`);
        fetchData(); // Refresh list after deletion
      } catch (err) {
        console.log("Error deleting food:", err);
      }
    }
  };

  // ============================
  // ORDER MANAGEMENT
  // ============================
  const handleStatusChange = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/orders/${id}`, { status: newStatus });
      setEditingOrderId(null);
      fetchData(); // Refresh the latest orders
    } catch (err) {
      console.log("Error updating order status:", err);
    }
  };

  const deleteOrder = async (id) => {
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        await axios.delete(`http://localhost:5000/orders/${id}`);
        fetchData();
      } catch (err) {
        console.log("Error deleting order:", err);
      }
    }
  };

  const openNewOrder = () => {
    setIsNewOrderOpen(true);
    setNewOrderItems([]);
    setNewOrderAddress("");
  };

  const submitNewOrder = async (e) => {
    e.preventDefault();
    if (newOrderItems.length === 0) return alert("Please add at least one item.");

    const itemsPayload = newOrderItems.map(item => ({
      foodId: item.food._id,
      quantity: item.quantity
    }));

    try {
      await axios.post("http://localhost:5000/orders", {
        items: itemsPayload,
        address: newOrderAddress || "Walk-in Guest"
      });
      setIsNewOrderOpen(false);
      setNewOrderItems([]);
      fetchData(); // Refresh list
    } catch (err) {
      console.log("Error creating new order:", err);
    }
  };

  const handleOrderAddFood = (food) => {
    setNewOrderItems(prev => {
      const existing = prev.find(i => i.food._id === food._id);
      if (existing) {
        return prev.map(i => i.food._id === food._id ? { ...i, quantity: i.quantity + 1 } : i);
      }
      return [...prev, { food, quantity: 1 }];
    });
  };

  const handleOrderRemoveFood = (foodId) => {
    setNewOrderItems(prev => prev.filter(i => i.food._id !== foodId));
  };

  const handleOrderUpdateQuantity = (foodId, q) => {
    if (q < 1) return handleOrderRemoveFood(foodId);
    setNewOrderItems(prev => prev.map(i => i.food._id === foodId ? { ...i, quantity: q } : i));
  };

  // derived state for orders tab
  const filteredOrders = orders.filter(
    (o) =>
      (o._id && o._id.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (o.address && o.address.toLowerCase().includes(searchTerm.toLowerCase())) ||
      o.items?.some((i) => i.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const activeOrdersCount = orders.filter((o) => o.status !== "DELIVERED").length;
  const pendingOrdersCount = orders.filter((o) => o.status === "PENDING").length;
  const totalRevenue = orders.reduce((total, order) => total + (order.total || 0), 0);

  // Status mapping for styling visually
  const getStatusColor = (status) => {
    switch (status) {
      case "PENDING":
        return "bg-[#feece6] text-[#e25a27]";
      case "COOKING":
        return "bg-red-100 text-red-600";
      case "DELIVERED":
        return "bg-gray-200 text-gray-600";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "PENDING":
        return "PENDING";
      case "COOKING":
        return "PREPARING";
      case "DELIVERED":
        return "DELIVERED";
      default:
        return "UNKNOWN";
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f8f9fa] font-sans text-gray-800">
      {/* Sidebar Navigation */}
      <aside className="w-64 bg-white border-r border-gray-100 flex flex-col shadow-sm hidden md:flex min-h-screen">
        <div className="p-8 pb-4">
          <h2 className="text-xl font-black tracking-tight text-gray-900 uppercase opacity-90">
            Kitchen<span className="text-[#e25a27]">Command</span>
          </h2>
          <p className="text-[10px] font-bold text-gray-400 mt-1 uppercase tracking-widest">
            Premium Admin Access
          </p>
        </div>

        <nav className="flex-1 py-4 flex flex-col gap-2 px-4">
          {["Dashboard", "Orders", "Menu Management", "POS System", "Analytics", "Settings"].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center gap-4 px-4 py-3.5 rounded-2xl w-full text-left font-bold transition-all duration-300 ${
                activeTab === tab
                  ? "bg-[#feece6] text-[#e25a27] shadow-sm"
                  : "text-gray-500 hover:bg-gray-50 hover:text-gray-900"
              }`}
            >
              {tab === "Dashboard" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>}
              {tab === "Orders" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm14 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" /></svg>}
              {tab === "Menu Management" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2v1" /></svg>}
              {tab === "POS System" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              {tab === "Analytics" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              {tab === "Settings" && <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
              
              <span className={tab === "Orders" ? "" : "ml-2"}>{tab}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="p-6 border-t border-gray-100 flex flex-col gap-5 mt-auto bg-white">
          <button onClick={openNewOrder} className="w-full bg-[#e25a27] text-white py-3.5 rounded-xl font-bold hover:bg-[#c94a1b] transition-colors shadow-lg shadow-[#e25a27]/20 flex items-center justify-center gap-2">
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4"/></svg>
            New Order
          </button>
          <div className="flex items-center gap-3 bg-gray-50/50 p-2 rounded-2xl">
            <div className="w-10 h-10 rounded-full bg-gray-200 overflow-hidden shadow-sm flex-shrink-0 flex items-center justify-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
            </div>
            <div>
              <p className="text-sm font-extrabold text-gray-900 leading-none">Marco Rossi</p>
              <p className="text-xs font-semibold text-gray-500 mt-1">Executive Chef</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className={`flex-1 overflow-y-auto w-full ${activeTab === "POS System" ? "p-4 lg:p-6" : "p-6 lg:p-12"}`}>
        <div className={`mx-auto w-full h-full ${activeTab === "POS System" ? "max-w-[1400px]" : "max-w-6xl"}`}>
          {/* Dashboard Header */}
          {activeTab !== "POS System" && (
            <header className="mb-10 flex flex-wrap gap-4 items-center justify-between w-full">
            <div>
              {activeTab === "Orders" ? (
                <>
                  <p className="text-xs font-extrabold text-gray-400 uppercase tracking-widest mb-2">
                    Kitchen Command / <span className="text-[#e25a27] font-black">Orders</span>
                  </p>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">Daily Manifest</h1>
                </>
              ) : (
                <>
                  <h1 className="text-4xl font-black text-gray-900 tracking-tight">
                    {activeTab} Overview
                  </h1>
                  <p className="text-gray-500 text-lg mt-1 font-medium">
                    Welcome back, Chef. Here's what's cooking today.
                  </p>
                </>
              )}
            </div>
            
            {/* Quick Actions / Date */}
            <div className="flex items-center gap-4">
              <span className="bg-[#feece6] text-[#e25a27] px-5 py-3 rounded-2xl text-sm font-black flex items-center gap-3">
                <svg className="w-5 h-5 text-[#e25a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                {new Date().toLocaleDateString('en-US', {month: 'short', day: 'numeric', year: 'numeric'})}
              </span>
            </div>
          </header>
          )}

          {/* New Order Modal */}
          {isNewOrderOpen && (
            <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
              <div className="bg-white rounded-[2rem] w-full max-w-5xl h-[85vh] shadow-2xl animate-fade-in flex flex-col relative overflow-hidden border border-gray-100">
                <button onClick={() => setIsNewOrderOpen(false)} className="absolute top-6 right-6 z-10 text-gray-400 hover:text-[#e25a27] bg-gray-50 hover:bg-[#feece6] p-2 rounded-full transition-colors flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
                
                <div className="flex h-full">
                  {/* Left: Menu Selection */}
                  <div className="w-2/3 bg-gray-50/50 p-8 overflow-y-auto">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Select Menu Items</h3>
                    <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                      {foods.map(food => (
                        <div key={food._id} onClick={() => handleOrderAddFood(food)} className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 cursor-pointer hover:border-[#e25a27] hover:shadow-md transition-all group flex flex-col justify-between h-48">
                          <div className="h-24 bg-gray-100 rounded-xl overflow-hidden mb-3 flex-shrink-0 relative">
                            <img src={`http://localhost:5000/allimages/${food.image}`} alt={food.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform"/>
                            <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                              <span className="text-white font-black text-sm uppercase tracking-wider bg-[#e25a27] px-3 py-1.5 rounded-full">Add Item</span>
                            </div>
                          </div>
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm truncate">{food.name}</h4>
                            <p className="text-[#e25a27] font-black">${food.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Cart & Submit */}
                  <div className="w-1/3 bg-white p-8 flex flex-col border-l border-gray-100 shadow-[-10px_0_20px_-10px_rgba(0,0,0,0.05)] relative z-10">
                    <h3 className="text-2xl font-black text-gray-900 mb-6">Current Order</h3>
                    
                    <form id="newOrderForm" onSubmit={submitNewOrder} className="flex flex-col h-full">
                      <div className="mb-6">
                        <label className="block text-xs font-black text-gray-400 mb-2 uppercase tracking-wide">Customer Name / Address</label>
                        <input
                          type="text"
                          value={newOrderAddress}
                          onChange={(e) => setNewOrderAddress(e.target.value)}
                          placeholder="e.g. Walk-in Guest / Table 12"
                          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 font-bold text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#e25a27]/30"
                          required
                        />
                      </div>

                      <div className="flex-1 overflow-y-auto pr-2 mb-6 space-y-4">
                        {newOrderItems.length === 0 ? (
                          <div className="text-center text-gray-400 font-bold mt-10">No items selected yet.</div>
                        ) : (
                          newOrderItems.map(item => (
                            <div key={item.food._id} className="flex items-center justify-between border-b border-gray-50 pb-4">
                              <div className="flex-1 pr-4">
                                <h4 className="font-bold text-gray-900 text-[13px] leading-tight mb-1">{item.food.name}</h4>
                                <p className="text-[#e25a27] font-black">${(item.food.price * item.quantity).toFixed(2)}</p>
                              </div>
                              <div className="flex items-center gap-3 bg-gray-50 rounded-lg p-1">
                                <button type="button" onClick={() => handleOrderUpdateQuantity(item.food._id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-gray-600 font-bold shadow-sm hover:text-[#e25a27]">-</button>
                                <span className="font-black text-sm w-4 text-center">{item.quantity}</span>
                                <button type="button" onClick={() => handleOrderUpdateQuantity(item.food._id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center rounded-md bg-white text-gray-600 font-bold shadow-sm hover:text-[#e25a27]">+</button>
                              </div>
                            </div>
                          ))
                        )}
                      </div>

                      <div className="mt-auto pt-6 border-t border-gray-100">
                        <div className="flex justify-between items-center mb-6">
                          <span className="text-gray-500 font-bold">Total Amount</span>
                          <span className="text-3xl font-black text-gray-900">${newOrderItems.reduce((acc, curr) => acc + curr.food.price * curr.quantity, 0).toFixed(2)}</span>
                        </div>
                        <button type="submit" form="newOrderForm" className="w-full bg-[#e25a27] text-white py-4 rounded-2xl font-black hover:bg-[#c94a1b] transition-all shadow-lg shadow-[#e25a27]/30 flex items-center justify-center gap-3">
                          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/></svg>
                          Confirm Order
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Receipt Modal */}
          {receiptOrder && (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[150] flex items-center justify-center p-6">
              <div className="max-w-4xl w-full max-h-[90vh] flex gap-10 relative">
                <button onClick={() => setReceiptOrder(null)} className="absolute -top-4 -right-4 z-10 text-gray-400 hover:text-gray-900 bg-white shadow-md p-2 rounded-full transition-colors w-10 h-10 flex items-center justify-center">
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                </button>

                {/* Left Side: Kitchen Command Actions */}
                <div className="flex flex-col gap-6 w-[300px] shrink-0 pt-10">
                  <div className="bg-[#f0f2f5] rounded-3xl p-8 shadow-sm">
                    <h3 className="text-[17px] font-black text-gray-900 mb-4 tracking-tight">Kitchen Command</h3>
                    <p className="text-[13px] font-medium text-gray-500 mb-8 leading-relaxed">Order #{receiptOrder._id.slice(-5).toUpperCase()} is ready for printing and dispatch.</p>
                    <button className="w-full bg-[#d95325] text-white py-3.5 rounded-[12px] font-bold text-[14px] mb-3 hover:bg-[#c94a1b] shadow-md shadow-[#d95325]/20 flex items-center justify-center gap-2">
                       <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" /></svg>
                       Print Receipt
                    </button>
                    <button className="w-full bg-[#e2e6eb] text-gray-800 py-3.5 rounded-[12px] font-bold text-[14px] hover:bg-gray-300 transition-colors flex items-center justify-center gap-2">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg>
                      Digital Copy
                    </button>
                  </div>
                  <div className="bg-white rounded-xl p-6 shadow-sm border-l-4 border-l-[#d95325]">
                    <p className="text-[10px] font-black text-[#d95325] uppercase tracking-widest mb-2">Status</p>
                    <p className="text-[15px] font-black text-gray-900 leading-none">{receiptOrder.status === 'DELIVERED' ? 'Completed & Paid' : 'Pending Payment'}</p>
                  </div>
                </div>

                {/* Right Side: The Receipt Printer Roll */}
                <div className="flex-1 bg-[#fcfcfc] shadow-2xl h-full overflow-y-auto px-12 py-12 font-mono text-gray-800 border-x border-[#ebebeb] relative max-w-[450px]">
                  <div className="text-center mb-6">
                    <h2 className="text-3xl font-black italic text-[#d95325] mb-4" style={{fontFamily: 'Georgia, serif'}}>BAAR RESTORENT</h2>
                    <p className="text-[11px] leading-relaxed font-bold text-gray-500 uppercase tracking-widest">
                      123 Gastronomy Boulevard,<br/>Suite 500<br/>Muqdishu Somalia, Waberi<br/>Ph: +252 770895033
                    </p>
                    <div className="my-8">
                      <p className="text-[12px] font-black text-gray-900 tracking-widest uppercase mb-2">Order ID: #{receiptOrder._id.slice(-5).toUpperCase()}</p>
                      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{new Date(receiptOrder.createdAt || Date.now()).toLocaleString('en-US', {month: 'short', day: 'numeric', year: 'numeric', hour: '2-digit', minute: '2-digit'})}</p>
                    </div>
                  </div>
                  
                  <div className="border-b-2 border-dashed border-gray-300 mb-8 w-full"></div>

                  <table className="w-full text-left text-[12px] mb-8">
                    <thead>
                      <tr className="uppercase tracking-widest border-b border-gray-900 font-bold">
                        <th className="pb-3 w-12 text-gray-900">Qty</th>
                        <th className="pb-3 text-gray-900">Item</th>
                        <th className="pb-3 text-right w-16 text-gray-900">Price</th>
                      </tr>
                    </thead>
                    <tbody className="font-semibold text-gray-600">
                      {receiptOrder.items?.map((item, idx) => (
                        <tr key={idx}>
                          <td className="py-5 align-top pt-6">0{item.quantity}</td>
                          <td className="py-5 align-top pr-4 pt-6">
                            <span className="block">{item.name}</span>
                          </td>
                          <td className="py-5 align-top text-right pt-6">${(item.price * item.quantity).toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="border-t-2 border-gray-900 pt-6 space-y-3 text-[11px] font-bold text-gray-600 uppercase tracking-widest">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${(receiptOrder.total || receiptOrder.items?.reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0) || 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sales Tax (8%)</span>
                      <span>${((receiptOrder.total || receiptOrder.items?.reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0) || 0) * 0.08).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Gratuity (Optional)</span>
                      <span>$0.00</span>
                    </div>
                  </div>

                  <div className="flex justify-between items-end mt-8 mb-10 uppercase tracking-widest">
                    <span className="text-xl font-black text-gray-900">Total</span>
                    <span className="text-2xl font-black text-gray-900">${((receiptOrder.total || receiptOrder.items?.reduce((acc, i) => acc + (Number(i.price) || 0) * (Number(i.quantity) || 1), 0) || 0) * 1.08).toFixed(2)}</span>
                  </div>

                  <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest space-y-1.5 mb-10 text-left">
                    <p>Payment Method: VISA **** 9012</p>
                    <p>Auth Code: {Math.floor(100000 + Math.random() * 900000)}</p>
                  </div>

                  <div className="text-center font-bold text-[12px] mb-10 text-gray-900">
                    <p className="mb-2">Thank You for Dining With Us</p>
                    <p className="mb-3 tracking-[0.3em]">★★★★★</p>
                    <p className="text-gray-400 text-[9px] tracking-widest uppercase mt-4">Follow our journey @TheCulinaryCurator</p>
                  </div>

                  {/* Fake Barcode */}
                  <div className="w-full h-12 flex justify-center mt-6">
                    <div className="w-[85%] h-full opacity-70 flex flex-col items-center">
                      <svg className="w-full h-12" preserveAspectRatio="none" viewBox="0 0 100 20">
                         <rect x="0" y="0" width="2" height="20" fill="currentColor"/>
                         <rect x="3" y="0" width="1" height="20" fill="currentColor"/>
                         <rect x="5" y="0" width="4" height="20" fill="currentColor"/>
                         <rect x="10" y="0" width="2" height="20" fill="currentColor"/>
                         <rect x="13" y="0" width="5" height="20" fill="currentColor"/>
                         <rect x="19" y="0" width="1" height="20" fill="currentColor"/>
                         <rect x="22" y="0" width="3" height="20" fill="currentColor"/>
                         <rect x="27" y="0" width="8" height="20" fill="currentColor"/>
                         <rect x="37" y="0" width="2" height="20" fill="currentColor"/>
                         <rect x="41" y="0" width="1" height="20" fill="currentColor"/>
                         <rect x="44" y="0" width="4" height="20" fill="currentColor"/>
                         <rect x="50" y="0" width="2" height="20" fill="currentColor"/>
                         <rect x="54" y="0" width="7" height="20" fill="currentColor"/>
                         <rect x="63" y="0" width="1" height="20" fill="currentColor"/>
                         <rect x="65" y="0" width="3" height="20" fill="currentColor"/>
                         <rect x="70" y="0" width="5" height="20" fill="currentColor"/>
                         <rect x="77" y="0" width="2" height="20" fill="currentColor"/>
                         <rect x="81" y="0" width="4" height="20" fill="currentColor"/>
                         <rect x="87" y="0" width="1" height="20" fill="currentColor"/>
                         <rect x="89" y="0" width="3" height="20" fill="currentColor"/>
                         <rect x="94" y="0" width="6" height="20" fill="currentColor"/>
                      </svg>
                      <p className="text-[7px] tracking-[0.4em] mt-2 text-gray-500 font-bold">12345678901234</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 1: OVERVIEW DASHBOARD */}
          {/* ========================================================== */}
          {activeTab === "Dashboard" && (
            <div className="space-y-8 animate-fade-in">
              {/* Stat Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Total Orders */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Total Orders</p>
                      <h3 className="text-4xl font-black text-gray-900">{orders.length}</h3>
                    </div>
                    <div className="bg-[#feece6] p-3 rounded-2xl">
                      <svg className="w-6 h-6 text-[#e25a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/></svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-500 bg-green-50 w-max px-3 py-1 rounded-full">
                    <span>↗ +12.5%</span>
                  </div>
                </div>

                {/* Revenue */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Revenue</p>
                      <h3 className="text-4xl font-black text-gray-900">${totalRevenue.toFixed(2)}</h3>
                    </div>
                    <div className="bg-green-50 p-3 rounded-2xl">
                      <svg className="w-6 h-6 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-green-500 bg-green-50 w-max px-3 py-1 rounded-full">
                    <span>↗ +8.2%</span>
                  </div>
                </div>

                {/* Pending */}
                <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-gray-50 flex flex-col justify-between hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Active Orders</p>
                      <h3 className="text-4xl font-black text-[#e25a27]">{activeOrdersCount}</h3>
                    </div>
                    <div className="bg-orange-50 p-3 rounded-2xl">
                      <svg className="w-6 h-6 text-orange-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                    </div>
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-sm font-semibold text-gray-600">
                    <span className="font-bold">{pendingOrdersCount}</span> pending delivery
                  </div>
                </div>
              </div>

              {/* Placeholder Chart Section */}
              <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-50 w-full flex items-center justify-center min-h-[300px]">
                <div className="text-center">
                  <div className="inline-flex bg-[#feece6] p-4 rounded-full mb-4">
                    <svg className="w-8 h-8 text-[#e25a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Revenue Insights</h3>
                  <p className="text-gray-500 font-medium max-w-sm mx-auto">Visual analytics integration goes here. Monitor your daily and weekly performance gracefully.</p>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 2: ORDERS MANAGEMENT / DAILY MANIFEST                 */}
          {/* ========================================================== */}
          {activeTab === "Orders" && (
            <div className="animate-fade-in space-y-6 w-full">
              {/* Search and Filters on top of the table */}
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:w-3/5">
                  <svg className="w-6 h-6 absolute left-5 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                  <input
                    type="text"
                    placeholder="Search by order ID, customer name, or items..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-white border border-gray-100/50 rounded-2xl pl-14 pr-6 py-4 font-semibold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#feece6] shadow-sm transition-shadow rounded-[1.5rem]"
                  />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                  <button className="flex-1 md:flex-none justify-center bg-white border border-gray-50 text-gray-700 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-sm hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                    Filter
                  </button>
                  <button className="flex-1 md:flex-none justify-center bg-white border border-gray-50 text-gray-700 px-6 py-4 rounded-2xl font-bold flex items-center gap-3 shadow-sm hover:bg-gray-50 transition-colors">
                    <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h6m4 0l4-4m0 0l4 4m-4-4v12"/></svg>
                    Sort
                  </button>
                </div>
              </div>

              {/* Table Container */}
              <div className="bg-white rounded-[2rem] shadow-sm border border-gray-50 flex flex-col pt-8 overflow-hidden w-full relative">
                <div className="overflow-x-auto px-8">
                  <table className="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                      <tr className="text-gray-500 text-xs uppercase tracking-wider font-bold border-b border-gray-200">
                        <th className="pb-5 w-24">Order ID</th>
                        <th className="pb-5 w-48">Customer Name</th>
                        <th className="pb-5 max-w-sm">Items</th>
                        <th className="pb-5 w-32">Status</th>
                        <th className="pb-5 w-32">Total Amount</th>
                        <th className="pb-5 text-center w-24">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-50">
                      {currentOrders.length === 0 ? (
                        <tr>
                          <td colSpan="6" className="py-16 text-center text-gray-400 font-bold text-lg">No orders found.</td>
                        </tr>
                      ) : (
                        currentOrders.map((order) => (
                          <tr key={order._id} className="hover:bg-gray-50 transition-colors group">
                            {/* Format order ID to start with #CC- for visual likeness */}
                            <td className="py-6 font-mono text-sm font-bold text-gray-600">
                              #CC-{order._id?.slice(-4).toUpperCase() || '0000'}
                            </td>
                            {/* User details */}
                            <td className="py-6">
                              <p className="text-base font-black text-gray-900 leading-tight">
                                {order.address && order.address.length > 3 ? order.address.split(',')[0].substring(0,20) : "Walk-in Guest"}
                              </p>
                              <p className="text-[11px] font-bold text-gray-500 mt-1 uppercase tracking-widest">
                                {order.address || "TAKEAWAY"}
                              </p>
                            </td>
                            {/* Items inline truncated */}
                            <td className="py-6 pr-6">
                              <p className="text-sm font-bold text-gray-600 truncate max-w-[280px]">
                                {order.items?.map(i => `${i.name}`).join(', ')}
                              </p>
                            </td>
                            {/* Status Pill or Dropdown if Editing */}
                            <td className="py-6">
                              {editingOrderId === order._id ? (
                                <select
                                  value={order.status || "PENDING"}
                                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                                  className="text-xs font-bold bg-white border border-gray-300 rounded-full px-4 py-2 focus:outline-none focus:border-[#e25a27] cursor-pointer shadow-sm text-gray-800"
                                >
                                  <option value="PENDING">PENDING</option>
                                  <option value="COOKING">PREPARING</option>
                                  <option value="DELIVERED">DELIVERED</option>
                                </select>
                              ) : (
                                <span className={`text-[11px] font-black px-4 py-2 rounded-full uppercase tracking-widest whitespace-nowrap ${getStatusColor(order.status)}`}>
                                  {getStatusLabel(order.status)}
                                </span>
                              )}
                            </td>
                            {/* Amount */}
                            <td className="py-6 text-lg font-black text-gray-900">
                              ${order.total?.toFixed(2)}
                            </td>
                            {/* Action Icons */}
                            <td className="py-6 text-center">
                              <div className="flex bg-white items-center justify-center gap-3">
                                {/* Edit Status toggle */}
                                <button
                                  onClick={() => setEditingOrderId(editingOrderId === order._id ? null : order._id)}
                                  className="text-[#e25a27] hover:text-white bg-[#feece6] hover:bg-[#e25a27] p-2.5 rounded-full transition-colors shadow-sm"
                                  title="Edit Status"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                                </button>
                                {/* View Receipt toggle */}
                                <button
                                  onClick={() => setReceiptOrder(order)}
                                  className="text-gray-500 hover:text-white bg-gray-100 hover:bg-gray-800 p-2.5 rounded-full transition-colors shadow-sm"
                                  title="View Receipt"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/></svg> 
                                </button>
                                {/* Delete toggle */}
                                <button
                                  onClick={() => deleteOrder(order._id)}
                                  className="text-red-500 hover:text-white bg-red-50 hover:bg-red-500 p-2.5 rounded-full transition-colors shadow-sm"
                                  title="Delete Order"
                                >
                                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
                
                {/* Pagination Footer */}
                <div className="bg-gray-50/70 p-6 border-t border-gray-200 mt-auto flex items-center justify-between">
                  <div className="text-xs font-bold text-gray-500 uppercase tracking-widest">
                    Showing {filteredOrders.length > 0 ? startIndex + 1 : 0} to {Math.min(startIndex + ITEMS_PER_PAGE, filteredOrders.length)} of {filteredOrders.length} orders
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 disabled:opacity-50 font-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const page = idx + 1;
                      return (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-9 h-9 flex items-center justify-center rounded-full font-black text-sm transition-all duration-300 ${
                            currentPage === page
                              ? "bg-[#e25a27] text-white shadow-md shadow-[#e25a27]/30"
                              : "text-gray-500 hover:bg-white hover:shadow-sm"
                          }`}
                        >
                          {page}
                        </button>
                      );
                    })}
                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-800 disabled:opacity-50 font-black transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 3: MENU MANAGEMENT */}
          {/* ========================================================== */}
          {activeTab === "Menu Management" && (
            <div className="animate-fade-in space-y-8">
              {/* Toolbar */}
              <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-gray-50 shadow-sm">
                <div>
                  <h3 className="text-2xl font-black text-gray-900">Food Catalog</h3>
                  <p className="text-gray-500 font-semibold text-sm mt-1">Manage all your menu items.</p>
                </div>
                <button
                  onClick={() => openForm()}
                  className="bg-[#e25a27] text-white px-6 py-3.5 rounded-2xl font-bold hover:bg-[#c94a1b] transition-all shadow-md shadow-[#e25a27]/20 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" /></svg>
                  New Menu Item
                </button>
              </div>

              {/* Form Modal (Overlayed) */}
              {isFormOpen && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                  <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 shadow-2xl animate-fade-in relative border border-gray-100">
                    <button onClick={closeForm} className="absolute top-6 right-6 text-gray-400 hover:text-[#e25a27] bg-gray-50 hover:bg-[#feece6] p-2 rounded-full transition-colors flex items-center justify-center">
                      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                    
                    <div className="mb-6 border-b border-gray-100 pb-5">
                      <h3 className="text-3xl font-black text-gray-900 tracking-tight">{editingItem ? "Edit Menu Item" : "Create Menu Item"}</h3>
                      <p className="text-gray-500 font-bold text-sm mt-2">Configure your dish details below.</p>
                    </div>

                    <form onSubmit={submitFood} className="space-y-5">
                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Item Name</label>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleFoodInput}
                          className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#feece6] transition-shadow"
                          placeholder="e.g. Wagyu Beef Burger"
                          required
                        />
                      </div>
                      
                      <div className="flex gap-4">
                        <div className="w-1/2">
                          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Price ($)</label>
                          <input
                            type="number"
                            name="price"
                            value={formData.price}
                            onChange={handleFoodInput}
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#feece6] transition-shadow"
                            placeholder="0.00"
                            required
                          />
                        </div>
                        <div className="w-1/2">
                          <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Category</label>
                          <select
                            name="category"
                            value={formData.category}
                            onChange={handleFoodInput}
                            className="w-full bg-gray-50/50 border border-gray-200 rounded-2xl px-5 py-3.5 font-bold text-gray-900 focus:outline-none focus:ring-4 focus:ring-[#feece6] transition-shadow"
                          >
                            {categories.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-black text-gray-700 mb-2 uppercase tracking-wide">Upload Image</label>
                        <div className="border border-dashed border-gray-300 bg-gray-50/30 rounded-2xl p-7 text-center hover:bg-gray-50 transition-colors cursor-pointer relative">
                          <input
                            type="file"
                            name="image"
                            onChange={handleImageInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                            {...(!editingItem && { required: true })}
                          />
                          <svg className="mx-auto h-12 w-12 text-[#e25a27] mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>
                          <span className="text-sm font-black text-gray-900">Click to upload</span>
                          <p className="text-xs font-bold text-gray-400 mt-1">{formData.image ? formData.image.name : 'PNG, JPG or JPEG'}</p>
                        </div>
                      </div>

                      <div className="pt-5 flex gap-3">
                        <button type="button" onClick={closeForm} className="flex-1 bg-gray-100 text-gray-700 font-black tracking-wide py-4 rounded-2xl hover:bg-gray-200 transition-colors text-sm">
                          CANCEL
                        </button>
                        <button type="submit" className="flex-1 bg-[#e25a27] text-white font-black tracking-wide py-4 rounded-2xl hover:bg-[#c94a1b] transition-colors shadow-lg shadow-[#e25a27]/20 text-sm uppercase">
                          {editingItem ? "Update Item" : "Save Item"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* Food Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {foods.length === 0 ? (
                  <div className="col-span-full bg-white p-12 text-center rounded-[2rem] border border-gray-50 shadow-sm">
                    <p className="text-xl font-bold text-gray-400">Your menu is currently empty.</p>
                  </div>
                ) : (
                  foods.map((food) => (
                    <div key={food._id} className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-300 border border-gray-50 group flex flex-col">
                      <div className="h-48 overflow-hidden relative bg-gray-100">
                        <img
                          src={`http://localhost:5000/allimages/${food.image}`}
                          alt={food.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                        <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md text-[#e25a27] px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border border-[#e25a27]/10">
                          {food.category}
                        </div>
                      </div>
                      <div className="p-6 flex-1 flex flex-col">
                        <h4 className="text-xl font-black text-gray-900 mb-1 leading-tight">{food.name}</h4>
                        <p className="text-[#e25a27] font-black text-2xl mb-6">${food.price}</p>
                        
                        <div className="mt-auto pt-5 border-t border-gray-100 flex justify-between items-center gap-3">
                          <button
                            onClick={() => editFood(food)}
                            className="bg-gray-100 w-full text-gray-700 py-2.5 rounded-xl text-sm font-black tracking-wide hover:bg-gray-200 transition-colors flex justify-center items-center gap-2 uppercase"
                          >
                           <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                            Edit
                          </button>
                          <button
                            onClick={() => deleteFood(food._id)}
                            className="bg-red-50 text-red-600 px-4 py-2.5 rounded-xl text-sm font-black hover:bg-red-100 transition-colors flex justify-center items-center"
                            title="Delete Item"
                          >
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          {/* ========================================================== */}
          {/* TAB 4: POS SYSTEM */}
          {/* ========================================================== */}
          {activeTab === "POS System" && (
            <div className="flex flex-col lg:flex-row h-[calc(100vh-3rem)] gap-6 animate-fade-in">
              {/* Left Side: Main Kitchen Menu */}
              <div className="flex-1 flex flex-col h-full bg-[#f8f9fa] rounded-3xl">
                <header className="mb-6 flex justify-between items-end">
                  <div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Main Kitchen</h2>
                    <p className="text-[11px] font-bold text-gray-500 mt-2 uppercase tracking-widest">Select items for Table #12</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-12 h-12 rounded-full bg-white flex justify-center items-center shadow-sm text-gray-900 hover:bg-gray-50 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    </button>
                    <button className="w-12 h-12 rounded-full bg-gray-200 border border-transparent flex justify-center items-center text-gray-900 hover:bg-gray-300 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}><path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"/></svg>
                    </button>
                  </div>
                </header>

                {/* Categories */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2 shrink-0 hide-scrollbar">
                  {["All Items", "Breakfast", "Lunch", "Dinner", "Drinks", "Desserts"].map(cat => (
                    <button
                      key={cat}
                      onClick={() => setPosCategory(cat)}
                      className={`px-6 py-2.5 rounded-full font-bold text-sm whitespace-nowrap transition-all shadow-sm ${
                        posCategory === cat
                          ? "bg-[#c94a1b] text-white"
                          : "bg-white text-gray-600 hover:bg-gray-50"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Grid */}
                <div className="flex-1 overflow-y-auto pr-2 pb-10">
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {foods.filter(f => posCategory === "All Items" || f.category === posCategory).map(food => (
                      <div key={food._id} onClick={() => {
                        setPosItems(prev => {
                          const ex = prev.find(i => i.food._id === food._id);
                          if(ex) return prev.map(i => i.food._id === food._id ? {...i, quantity: i.quantity + 1} : i);
                          return [...prev, { food, quantity: 1 }];
                        });
                      }} className="bg-white rounded-3xl p-4 shadow-sm border border-gray-100 cursor-pointer hover:shadow-lg hover:border-[#e25a27]/30 transition-all group flex flex-col h-full active:scale-[0.98]">
                        <div className="h-36 bg-gray-100 rounded-2xl overflow-hidden mb-4 shrink-0 relative">
                          <img src={`http://localhost:5000/allimages/${food.image}`} alt={food.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"/>
                        </div>
                        <h4 className="font-bold text-gray-900 text-sm leading-snug group-hover:text-[#e25a27] transition-colors">{food.name}</h4>
                        <div className="mt-auto pt-3 flex justify-between items-center">
                          <p className="text-[#c94a1b] font-black text-[17px]">${food.price.toFixed(2)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Floating pill order info */}
                <div className="mt-auto flex justify-center pb-4 shrink-0">
                  <div className="bg-white shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] px-8 py-4 rounded-full flex items-center gap-6 border border-gray-100">
                    <div className="flex items-center gap-2"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-xs font-black text-gray-800">3 Rush Orders</span></div>
                    <div className="w-px h-5 bg-gray-200"></div>
                    <div className="flex items-center gap-2 text-xs font-black text-gray-800">⏱ Avg prep: 12m</div>
                  </div>
                </div>
              </div>

              {/* Right Side: Current Order Sidebar */}
              <div className="w-full lg:w-[400px] bg-white rounded-[2.5rem] shadow-sm flex flex-col h-full shrink-0 relative overflow-hidden">
                <div className="px-8 py-8 border-b border-gray-50 flex justify-between items-start shrink-0">
                  <div>
                    <h3 className="text-3xl font-black text-gray-900">Current Order</h3>
                    <p className="text-[11px] font-bold text-blue-500 uppercase tracking-widest mt-1">Dine-In • Table 12</p>
                  </div>
                  <button className="text-[#c94a1b] hover:bg-[#feece6] p-2 rounded-xl transition-colors">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 8H5c-1.66 0-3 1.34-3 3v6h4v4h12v-4h4v-6c0-1.66-1.34-3-3-3zm-3 11H8v-5h8v5zm3-7c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm-1-9H6v4h12V3z"/></svg>
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4 bg-[#fcfcfc]">
                  {posItems.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center">
                      <div className="w-20 h-20 bg-gray-100 rounded-full flex justify-center items-center mb-4"><svg className="w-10 h-10 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"/></svg></div>
                      <p className="text-gray-400 font-bold text-sm">Select items from <br/>the left menu to start</p>
                    </div>
                  ) : (
                    posItems.map(item => (
                      <div key={item.food._id} className="bg-white border border-gray-100 rounded-[1.5rem] p-4 flex gap-5 shadow-[0_2px_10px_-4px_rgba(0,0,0,0.03)] items-start">
                        <div className="w-12 h-12 rounded-[0.8rem] bg-[#feece6] text-[#c94a1b] font-black text-lg flex items-center justify-center shrink-0">
                          {item.quantity}
                        </div>
                        <div className="flex-1 pt-1">
                          <div className="flex justify-between items-start">
                            <h4 className="font-bold text-gray-900 text-[15px] leading-tight w-36">{item.food.name}</h4>
                            <div className="text-right">
                              <p className="font-black text-gray-900 text-base">${(item.food.price * item.quantity).toFixed(2)}</p>
                              <button onClick={() => setPosItems(prev => prev.filter(i => i.food._id !== item.food._id))} className="text-[9px] font-black text-[#c94a1b] uppercase tracking-widest mt-1 hover:underline">Remove</button>
                            </div>
                          </div>
                          <p className="text-[11px] font-bold text-gray-400 italic mt-1">+ No extra</p>
                        </div>
                      </div>
                    ))
                  )}
                </div>

                <div className="px-8 pb-8 pt-6 bg-white shrink-0 shadow-[0_-15px_30px_-15px_rgba(0,0,0,0.05)] rounded-t-[2.5rem]">
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-[15px] font-bold text-gray-600">
                      <span>Subtotal</span>
                      <span>${posItems.reduce((sum, i) => sum + i.food.price * i.quantity, 0).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-[15px] font-bold text-gray-600 border-b border-gray-200 border-dashed pb-4">
                      <span>Tax ({(TAX_RATE * 100).toFixed(0)}%)</span>
                      <span>${(posItems.reduce((sum, i) => sum + i.food.price * i.quantity, 0) * TAX_RATE).toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between items-end pt-3">
                      <span className="text-2xl font-black text-gray-900">Total</span>
                      <span className="text-4xl font-black text-[#c94a1b]">
                        ${(posItems.reduce((sum, i) => sum + i.food.price * i.quantity, 0) * (1 + TAX_RATE)).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <button onClick={() => { setPosItems([]); }} className="w-1/3 border border-gray-200 text-gray-900 font-bold py-4 rounded-2xl hover:bg-gray-50 transition-colors text-sm">
                      Save<br/>Order
                    </button>
                    <button onClick={async () => {
                      if(posItems.length === 0) return alert("Add items to checkout.");
                      try {
                        const payload = {
                          items: posItems.map(i => ({ foodId: i.food._id, quantity: i.quantity })),
                          address: "Table 12"
                        };
                        const res = await axios.post("http://localhost:5000/orders", payload);
                        
                        // Grab the created ID, or fallback to a generated ID
                        const createdId = res.data?._id || res.data?.order?._id || Math.random().toString(36).substr(2, 9);
                        
                        // Construct a synthetic order to render the receipt immediately without waiting for populate
                        const syntheticOrder = {
                           _id: createdId,
                           createdAt: new Date().toISOString(),
                           status: 'DELIVERED', // Assume delivered at POS
                           total: posItems.reduce((sum, i) => sum + i.food.price * i.quantity, 0),
                           items: posItems.map(i => ({ 
                             name: i.food.name, 
                             price: i.food.price, 
                             quantity: i.quantity 
                           }))
                        };
                        
                        setPosItems([]);
                        fetchData();
                        
                        // Show the Receipt Modal automatically!
                        setReceiptOrder(syntheticOrder);
                        
                      } catch (err) { 
                        console.log(err); 
                        alert("Failed to place order."); 
                      }
                    }} className="flex-1 bg-[#d95325] text-white font-black py-4 rounded-2xl hover:bg-[#b04017] transition-all shadow-lg shadow-[#d95325]/30 text-[15px]">
                      Quick Checkout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ========================================================== */}
          {/* TAB 5: SETTINGS PLACEHOLDER */}
          {/* ========================================================== */}
          {(activeTab === "Settings" || activeTab === "Analytics") && (
            <div className="bg-white p-16 rounded-[2rem] shadow-sm border border-gray-50 text-center animate-fade-in flex flex-col items-center justify-center min-h-[500px]">
                <div className="bg-[#feece6] p-6 rounded-full mb-6 relative">
                  <svg className="w-16 h-16 text-[#e25a27]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /></svg>
                  <svg className="w-8 h-8 text-[#e25a27] absolute bottom-4 right-4 bg-white rounded-full p-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" /></svg>
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight">{activeTab} Module Locked</h3>
                <p className="text-gray-500 font-semibold max-w-sm mx-auto">This module is currently in development. It will be available in the upcoming software update cycle.</p>
                <div className="mt-8 flex gap-3">
                  <button onClick={() => setActiveTab("Orders")} className="bg-gray-100 text-gray-700 px-6 py-3 rounded-xl font-black text-sm uppercase hover:bg-gray-200 transition-colors">
                    Back to Orders
                  </button>
                </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}
