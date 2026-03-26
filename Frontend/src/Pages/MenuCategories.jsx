import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

export default function MenuCategories() {
  const [categories, setCategories] = useState([]);
  const [newCategory, setNewCategory] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadCategories = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_BASE_URL}/categories`);
      setCategories(Array.isArray(res.data) ? res.data : []);
      setError("");
    } catch {
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const addCategory = async (event) => {
    event.preventDefault();
    if (!newCategory.trim()) {
      return;
    }

    try {
      setSaving(true);
      const res = await axios.post(`${API_BASE_URL}/categories`, {
        name: newCategory.trim(),
      });

      setCategories((prev) => [...prev, res.data].sort((a, b) => a.name.localeCompare(b.name)));
      setNewCategory("");
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to add category.");
    } finally {
      setSaving(false);
    }
  };

  const deleteCategory = async (id) => {
    try {
      await axios.delete(`${API_BASE_URL}/categories/${id}`);
      setCategories((prev) => prev.filter((category) => category._id !== id));
      setError("");
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to delete category.");
    }
  };

  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-500">Manage your menu categories.</p>

            <form onSubmit={addCategory} className="mt-6 flex flex-wrap gap-3">
              <input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="New category name"
                className="min-w-64 flex-1 rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
              />
              <button
                type="submit"
                disabled={saving}
                className="rounded-xl bg-[#e25a27] px-5 py-3 text-sm font-black text-white hover:bg-[#c94a1b] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {saving ? "Adding..." : "Add Category"}
              </button>
            </form>

            {error && <p className="mt-4 text-sm font-semibold text-red-500">{error}</p>}

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {loading && (
                <div className="rounded-2xl border border-[#edf0f6] bg-[#fafbff] px-5 py-4 text-sm text-gray-500">
                  Loading categories...
                </div>
              )}

              {!loading && categories.map((category) => (
                <div key={category._id} className="flex items-center justify-between rounded-2xl border border-[#edf0f6] bg-[#fafbff] px-5 py-4">
                  <span className="text-sm font-bold text-gray-700">{category.name}</span>
                  <button
                    type="button"
                    onClick={() => deleteCategory(category._id)}
                    className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                    aria-label={`Delete ${category.name}`}
                    title="Delete category"
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
              ))}

              {!loading && categories.length === 0 && (
                <div className="rounded-2xl border border-[#edf0f6] bg-[#fafbff] px-5 py-4 text-sm text-gray-500">
                  No categories found.
                </div>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
