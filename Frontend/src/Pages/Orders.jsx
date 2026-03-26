import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

const STATUSES = ["PENDING", "COOKING", "DELIVERED"];

export default function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
    try {
      await axios.delete(`${API_BASE_URL}/orders/${id}`);
      setOrders((prev) => prev.filter((order) => order._id !== id));
    } catch {
      setError("Failed to delete order.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Orders</h1>
            <p className="mt-2 text-gray-500">Track and manage customer orders.</p>

            {error && <p className="mt-6 text-sm font-semibold text-red-500">{error}</p>}

            <div className="mt-8 grid gap-4">
              {loading && <p className="text-gray-500">Loading orders...</p>}

              {!loading && orders.length === 0 && (
                <div className="rounded-2xl border border-[#eef1f7] p-5 text-gray-500">No orders found.</div>
              )}

              {!loading && orders.map((order) => (
                <div key={order._id} className="rounded-2xl border border-[#eef1f7] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#8a90a2]">Order ID</p>
                      <p className="text-sm font-bold text-gray-900">{order._id}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#8a90a2]">Total</p>
                      <p className="text-lg font-black text-gray-900">${Number(order.total || 0).toFixed(2)}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold tracking-wide text-[#8a90a2]">Address</p>
                      <p className="text-sm text-gray-700">{order.address}</p>
                    </div>

                    <div className="flex items-center gap-3">
                      <select
                        value={order.status}
                        onChange={(e) => updateStatus(order._id, e.target.value)}
                        className="rounded-lg border border-[#e5e8f2] px-3 py-2 text-sm"
                      >
                        {STATUSES.map((status) => (
                          <option key={status} value={status}>{status}</option>
                        ))}
                      </select>

                      <button
                        type="button"
                        onClick={() => deleteOrder(order._id)}
                        className="rounded-lg border border-red-200 px-3 py-2 text-xs font-semibold text-red-500 hover:bg-red-50"
                      >
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-4 rounded-xl bg-[#fafbfd] p-4">
                    <p className="mb-2 text-xs font-semibold tracking-wide text-[#8a90a2]">Items</p>
                    <ul className="space-y-1 text-sm text-gray-700">
                      {order.items?.map((item, index) => (
                        <li key={`${item.foodId}-${index}`}>
                          {item.name} x {item.quantity} - ${Number(item.price || 0).toFixed(2)} each
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
