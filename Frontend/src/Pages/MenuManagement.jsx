const menuOptions = [
  { label: "Menus", description: "Browse active menus and quick actions" },
  { label: "Add New Menu", description: "Create a fresh menu with curated dishes" },
  { label: "Menu List", description: "View all menus with statuses and tags" },
  { label: "Categories", description: "Organize dishes by sections, diets, and tags" },
];

export default function MenuManagement() {
  return (
    <div className="min-h-screen bg-[#f4f5fb] px-6 py-10 font-sans text-gray-700">
      <div className="max-w-xs rounded-[28px] border border-[#ebeef5] bg-white p-8 shadow-[0_25px_45px_rgba(15,23,42,0.08)]">
        <div className="mb-4 flex items-center justify-between text-gray-500">
          <div className="grid grid-cols-2 gap-1 rounded-2xl border border-dashed border-[#e2e5f7] p-3 text-[#9ea3c1] shadow-inner">
            <span className="h-2 w-2 rounded-full bg-[#dfe2f4]" />
            <span className="h-2 w-2 rounded-full bg-[#dfe2f4]" />
            <span className="h-2 w-2 rounded-full bg-[#dfe2f4]" />
            <span className="h-2 w-2 rounded-full bg-[#dfe2f4]" />
          </div>
          <button className="rounded-full border border-[#eceff5] px-3 py-1 text-[11px] font-black uppercase tracking-[0.4em] text-[#b6bbd8]">
            Menu
          </button>
        </div>

        <h2 className="text-xl font-black text-gray-900">Menu Management</h2>
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-gray-400">
          Organize everything
        </p>

        <div className="mt-6 space-y-3">
          {menuOptions.map((option) => (
            <div
              key={option.label}
              className="flex items-center justify-between rounded-2xl border border-transparent bg-[#f6f7fc] px-4 py-3 text-sm font-semibold text-gray-600 transition hover:border-[#e1e3f1] hover:bg-white hover:text-gray-900"
            >
              <div>
                <p>{option.label}</p>
                <p className="text-[10px] font-semibold text-gray-400">
                  {option.description}
                </p>
              </div>
              <span className="text-xs font-black text-[#ced1e7]">›</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
