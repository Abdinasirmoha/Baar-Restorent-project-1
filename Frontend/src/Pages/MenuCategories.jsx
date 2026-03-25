import Sidebar from "../components/Sidebar";

const categories = ["Main Course", "Starters", "Desserts", "Beverages", "Specials"];

export default function MenuCategories() {
  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Categories</h1>
            <p className="mt-2 text-gray-500">Manage your menu categories.</p>

            <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {categories.map((category) => (
                <div key={category} className="rounded-2xl border border-[#edf0f6] bg-[#fafbff] px-5 py-4 text-sm font-bold text-gray-700">
                  {category}
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
