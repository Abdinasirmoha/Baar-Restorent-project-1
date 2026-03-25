import Sidebar from "../components/Sidebar";

const sampleMenus = [
  { name: "Truffle Pasta", category: "Main", price: "$24" },
  { name: "Wagyu Burger", category: "Main", price: "$29" },
  { name: "Chef Dessert", category: "Dessert", price: "$12" },
];

export default function MenuList() {
  return (
    <div className="min-h-screen bg-[#f2f4fb] px-6 py-6">
      <div className="flex items-start gap-6">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0">
          <section className="rounded-[28px] border border-[#e9edf6] bg-white p-8 shadow-[0_20px_45px_rgba(15,23,42,0.08)]">
            <h1 className="text-3xl font-black text-gray-900">Menu List</h1>
            <p className="mt-2 text-gray-500">View available menu items.</p>

            <div className="mt-8 overflow-hidden rounded-2xl border border-[#e8ebf5]">
              <table className="w-full text-left text-sm">
                <thead className="bg-[#f7f8fc] text-gray-500">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Category</th>
                    <th className="px-5 py-3">Price</th>
                  </tr>
                </thead>
                <tbody>
                  {sampleMenus.map((item) => (
                    <tr key={item.name} className="border-t border-[#eef1f7]">
                      <td className="px-5 py-3 font-semibold text-gray-800">{item.name}</td>
                      <td className="px-5 py-3 text-gray-600">{item.category}</td>
                      <td className="px-5 py-3 text-gray-900">{item.price}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
