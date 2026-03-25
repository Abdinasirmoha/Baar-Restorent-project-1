import Sidebar from "../components/Sidebar";

export default function AddNewMenu() {
  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Add New Menu</h1>
            <p className="mt-2 text-gray-500">Create a new menu entry for your restaurant.</p>

            <form className="mt-8 grid gap-4 md:grid-cols-2">
              <input className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none" placeholder="Menu Name" />
              <input className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none" placeholder="Category" />
              <input className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none" placeholder="Price" />
              <input className="rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none" placeholder="Image URL" />
              <textarea className="md:col-span-2 min-h-28 rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none" placeholder="Description" />
              <button type="button" className="md:col-span-2 rounded-xl bg-[#e25a27] px-6 py-3 text-sm font-black text-white hover:bg-[#c94a1b]">
                Save Menu Item
              </button>
            </form>
          </section>
        </main>
      </div>
    </div>
  );
}
