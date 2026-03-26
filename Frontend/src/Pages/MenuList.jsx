import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

export default function MenuList() {
  const [menus, setMenus] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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

  useEffect(() => {
    loadMenus();
  }, []);

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

  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Menu List</h1>
            <p className="mt-2 text-gray-500">View available menu items.</p>

            {error && <p className="mt-6 text-sm font-semibold text-red-500">{error}</p>}

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#e8ebf5]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f7f8fc] text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Image</th>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Price</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {!loading && menus.map((item) => (
                    (() => {
                      const isAvailable = !item.status || String(item.status).toUpperCase() === "AVAILABLE";
                      return (
                    <tr key={item._id} className="border-t border-[#eef1f7]">
                      <td className="px-5 py-3">
                        <img
                          src={item.image ? `${API_BASE_URL}/allimages/${item.image}` : "https://placehold.co/100x100?text=Food"}
                          alt={item.name}
                          className="h-14 w-14 rounded-xl object-cover border border-[#edf0f6]"
                        />
                      </td>
                      <td className="px-5 py-3 font-semibold text-gray-800">{item.name}</td>
                      <td className="px-5 py-3 text-gray-600">{item.category}</td>
                      <td className="px-5 py-3 text-gray-900">${Number(item.price || 0).toFixed(2)}</td>
                      <td className="px-5 py-3">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-bold ${
                            isAvailable ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"
                          }`}
                        >
                          {isAvailable ? "Available" : "Unavailable"}
                        </span>
                      </td>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => toggleAvailability(item)}
                            className={`rounded-lg px-3 py-2 text-xs font-semibold ${
                              isAvailable
                                ? "bg-amber-100 text-amber-700 hover:bg-amber-200"
                                : "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                            }`}
                          >
                            {isAvailable ? "Mark Unavailable" : "Mark Available"}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(item._id)}
                            className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                            aria-label={`Delete ${item.name}`}
                            title="Delete item"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-4 w-4">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M3 6h18" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8 6V4h8v2" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 6l-1 14H6L5 6" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M10 11v6" />
                              <path strokeLinecap="round" strokeLinejoin="round" d="M14 11v6" />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                      );
                    })()
                  ))}

                  {!loading && menus.length === 0 && (
                    <tr className="border-t border-[#eef1f7]">
                      <td colSpan={6} className="px-5 py-6 text-center text-gray-500">No menu items found.</td>
                    </tr>
                  )}

                  {loading && (
                    <tr className="border-t border-[#eef1f7]">
                      <td colSpan={6} className="px-5 py-6 text-center text-gray-500">Loading menu items...</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
