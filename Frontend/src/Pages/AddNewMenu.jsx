import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

export default function AddNewMenu() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: null,
    status: "AVAILABLE",
  });
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [categories, setCategories] = useState([]);

  const loadCategories = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
    } catch {
      setCategories([]);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const onChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "image") {
      setForm((prev) => ({ ...prev, image: files?.[0] || null }));
      return;
    }

    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!form.name || !form.category || !form.price) {
      setError("Name, category and price are required.");
      return;
    }

    try {
      setSaving(true);
      const payload = new FormData();
      payload.append("name", form.name);
      payload.append("category", form.category);
      payload.append("price", form.price);
      payload.append("status", form.status);
      if (form.image) {
        payload.append("image", form.image);
      }

      await axios.post(`${API_BASE_URL}/food`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Menu item created successfully.");
      setForm({ name: "", category: "", price: "", image: null, status: "AVAILABLE" });
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to create menu item.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h1 className="text-3xl font-black text-gray-900">Add New Menu</h1>
                <p className="mt-2 text-gray-500">Create a new menu entry for your restaurant.</p>
              </div>
              <Link
                to="/MenuManagement/Categories"
                className="rounded-xl border border-[#e5e8f2] px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-[#f7f8fc]"
              >
                Manage Categories
              </Link>
            </div>

            <form onSubmit={onSubmit} className="mt-8 grid gap-4 md:grid-cols-2">
              <input
                name="name"
                value={form.name}
                onChange={onChange}
                className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
                placeholder="Menu Name"
              />
              <select
                name="category"
                value={form.category}
                onChange={onChange}
                className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option key={category._id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
              <input
                name="price"
                value={form.price}
                onChange={onChange}
                type="number"
                min="0"
                step="0.01"
                className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
                placeholder="Price"
              />
              <select
                name="status"
                value={form.status}
                onChange={onChange}
                className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
              >
                <option value="AVAILABLE">Available</option>
                <option value="UNAVAILABLE">Unavailable</option>
              </select>
              <input
                name="image"
                onChange={onChange}
                type="file"
                accept="image/*"
                className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
              />

              {message && <p className="md:col-span-2 text-sm font-semibold text-green-600">{message}</p>}
              {error && <p className="md:col-span-2 text-sm font-semibold text-red-500">{error}</p>}

              <button
                disabled={saving}
                type="submit"
                className="md:col-span-2 rounded-xl bg-[#e25a27] px-6 py-3 text-sm font-black text-white hover:bg-[#c94a1b] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Saving..." : "Save Menu Item"}
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
