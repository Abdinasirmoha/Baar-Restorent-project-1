import Sidebar from "../components/Sidebar";

const messages = [
  {
    id: 1,
    sender: "Kitchen",
    text: "Order #4301 needs pickup in 5 minutes.",
    time: "2 mins ago",
  },
  {
    id: 2,
    sender: "Service",
    text: "Table 7 requested allergy-safe updates.",
    time: "9 mins ago",
  },
  {
    id: 3,
    sender: "Manager",
    text: "Review tonight's staffing before 6 PM.",
    time: "20 mins ago",
  },
];

export default function Messages() {
  return (
    <div className="min-h-screen bg-[#f2f4fb] flex">
      <Sidebar />
      <main className="flex-1 px-6 py-10">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-black text-gray-900">Messages</h1>
          <p className="mt-2 text-gray-500">Recent updates from your team.</p>

          <section className="mt-8 space-y-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="rounded-[24px] border border-[#edf0f6] bg-white p-5 shadow-[0_20px_35px_rgba(15,23,42,0.08)]"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-black text-gray-900">{message.sender}</h2>
                  <span className="text-xs font-semibold text-gray-400">{message.time}</span>
                </div>
                <p className="mt-2 text-sm text-gray-600">{message.text}</p>
              </article>
            ))}
          </section>
        </div>
      </main>
    </div>
  );
}
