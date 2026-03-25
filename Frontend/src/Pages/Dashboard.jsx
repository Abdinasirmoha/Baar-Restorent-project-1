import { useMemo } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import usePersistedState from "../hooks/usePersistedState";

const metrics = [
  { labelKey: "totalOrders", value: "1,284", trend: "+12.5%", icon: "🧾" },
  { labelKey: "revenue", value: "$42,390", trend: "+8.2%", icon: "💰" },
  { labelKey: "activeOrders", value: "18", trend: "8 Urgent", icon: "🍽" },
];

const feed = [
  {
    title: "Table 12: New High-Value Order",
    body: "2x Wagyu Steak, 1x Vintage Red",
    time: "2 mins ago",
    tone: "from-[#fef3ef] to-[#ffdfd0]",
  },
  {
    title: "Order #4292 Completed",
    body: "Kitchen flagged as ready for pickup",
    time: "14 mins ago",
    tone: "from-[#f7f7f7] to-[#e1e1e5]",
  },
  {
    title: "New 5-Star Review",
    body: '"The Truffle Risotto was divine!"',
    time: "45 mins ago",
    tone: "from-[#fff5d3] to-[#fee8c4]",
  },
];

const viewOptions = [
  { value: "Daily", labelKey: "daily" },
  { value: "Weekly", labelKey: "weekly" },
  { value: "Monthly", labelKey: "monthly" },
  { value: "All Days", labelKey: "allDays" },
];

const revenueDataByView = {
  Daily: [
    { label: "Mon", value: 35 },
    { label: "Tue", value: 45 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 60 },
    { label: "Fri", value: 95, highlight: true },
    { label: "Sat", value: 50 },
    { label: "Sun", value: 40 },
  ],
  Weekly: [
    { label: "W1", value: 280 },
    { label: "W2", value: 340 },
    { label: "W3", value: 395, highlight: true },
    { label: "W4", value: 320 },
  ],
  Monthly: [
    { label: "Jan", value: 1240 },
    { label: "Feb", value: 1380 },
    { label: "Mar", value: 1510 },
    { label: "Apr", value: 1660 },
    { label: "May", value: 1810, highlight: true },
    { label: "Jun", value: 1750 },
  ],
  "All Days": [
    { label: "Mon", value: 35 },
    { label: "Tue", value: 45 },
    { label: "Wed", value: 55 },
    { label: "Thu", value: 60 },
    { label: "Fri", value: 95, highlight: true },
    { label: "Sat", value: 50 },
    { label: "Sun", value: 40 },
    { label: "Mon", value: 30 },
    { label: "Tue", value: 42 },
    { label: "Wed", value: 48 },
    { label: "Thu", value: 57 },
    { label: "Fri", value: 66 },
    { label: "Sat", value: 38 },
    { label: "Sun", value: 34 },
  ],
};

export default function Dashboard() {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const { profile } = useProfile();

  const [selectedView, setSelectedView] = usePersistedState("dashboardRevenueView", "Daily");
  const [dashboardSearch, setDashboardSearch] = usePersistedState("dashboardSearch", "");

  const safeSelectedView = viewOptions.some((item) => item.value === selectedView)
    ? selectedView
    : "Daily";

  const barData = useMemo(() => {
    return revenueDataByView[safeSelectedView] || revenueDataByView.Daily;
  }, [safeSelectedView]);

  const maxValue = Math.max(...barData.map((item) => item.value));
  const tallestValue = maxValue;
  const chartHeight = 170;
  const profileInitials = useMemo(() => {
    const words = (profile.name || "").trim().split(" ").filter(Boolean);
    if (words.length === 0) return "GU";
    if (words.length === 1) return words[0].slice(0, 2).toUpperCase();
    return `${words[0][0]}${words[1][0]}`.toUpperCase();
  }, [profile.name]);

  return (
    <div className="min-h-screen bg-[#f2f4fb]">
      <div className="border-b border-[#eef1f7] bg-white pl-[300px]">
        <div className="mx-auto flex w-full items-center gap-4 px-6 py-3">
            <button
              type="button"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-[#5b6278] transition hover:bg-[#f3f5fb]"
              aria-label="Open menu"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.3}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M4 7h16" />
                <path d="M4 12h16" />
                <path d="M4 17h16" />
              </svg>
            </button>

            <div className="relative w-full max-w-md">
              <input
                type="text"
                value={dashboardSearch}
                onChange={(event) => setDashboardSearch(event.target.value)}
                placeholder={t("searchHere")}
                className="h-11 w-full rounded-full border border-[#edf0f7] bg-[#f9fafc] pl-12 pr-10 text-sm font-medium text-gray-700 outline-none placeholder:text-[#a9afbf] focus:border-[#d8deee]"
              />
              <svg
                className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#afb5c4]"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="11" cy="11" r="7" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>

            <button className="h-11 rounded-full bg-[#f36a3d] px-7 text-sm font-black text-white shadow-[0_10px_24px_rgba(243,106,61,0.35)] transition hover:bg-[#e25a27]">
              {t("recipeGuide")}
            </button>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#a0a7bb] transition hover:bg-[#f5f7fc]"
              aria-label="Notifications"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.1}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M18 8a6 6 0 1 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
                <path d="M13.73 21a2 2 0 0 1-3.46 0" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#f36a3d] text-[10px] font-black text-white">
                4
              </span>
            </button>

            <button
              type="button"
              className="relative flex h-10 w-10 items-center justify-center rounded-full text-[#a0a7bb] transition hover:bg-[#f5f7fc]"
              aria-label="Messages"
            >
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2.1}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
              </svg>
              <span className="absolute -right-0.5 -top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-[#f36a3d] text-[10px] font-black text-white">
                21
              </span>
            </button>

            <div className="ml-1 flex items-center gap-3 border-l border-[#eceff6] pl-4">
              <Link
                to="/Profile"
                className="rounded-full transition hover:opacity-90"
                aria-label="Open profile"
              >
                {profile.avatar ? (
                  <img
                    src={profile.avatar}
                    alt={profile.name}
                    className="h-11 w-11 rounded-full border-2 border-[#f6c3a8] object-cover"
                  />
                ) : (
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border-2 border-[#f6c3a8] bg-gradient-to-br from-[#ffe6d8] to-[#ffd1bb] text-xs font-black text-[#b04a25]">
                    {profileInitials}
                  </div>
                )}
              </Link>
              <button
                type="button"
                className="flex items-center gap-2 text-sm font-semibold text-[#6a7085]"
              >
                <span className="text-sm font-black text-[#5f667a]">{language === "Somalia" ? "SO" : "US"}</span>
                <select
                  value={language}
                  onChange={(event) => setLanguage(event.target.value)}
                  className="bg-transparent pr-1 text-sm font-semibold text-[#5f667a] outline-none"
                >
                  {supportedLanguages.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              </button>
            </div>
          </div>
        </div>

      <div className="flex items-start gap-6 px-6 pb-6 pt-4">
        <Sidebar className="shrink-0" />
        <main className="flex-1 min-w-0 pl-[55px]">
          <div className="max-w-6xl space-y-10">
          <header className="space-y-3">
            <h1 className="text-4xl font-black text-gray-900">{t("dashboardOverview")}</h1>
            <p className="text-lg font-medium text-gray-500">
              {t("dashboardWelcome")}
            </p>
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {metrics.map((metric) => (
              <div
                key={metric.labelKey}
                className="flex flex-col gap-4 rounded-[28px] border border-[#eceef6] bg-white/70 p-6 shadow-[0_20px_45px_rgba(15,23,42,0.08)]"
              >
                <div className="text-sm font-semibold uppercase tracking-[0.4em] text-gray-400">
                  {t(metric.labelKey)}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-gray-900">{metric.value}</span>
                  <span className="text-sm font-black text-[#10b981]">{metric.trend}</span>
                </div>
                <div className="text-3xl">{metric.icon}</div>
              </div>
            ))}
          </section>

          <section className="grid gap-6 lg:grid-cols-[2fr_minmax(0,320px)]">
            <div className="rounded-[32px] border border-[#edf0f6] bg-white p-6 shadow-[0_25px_45px_rgba(15,23,42,0.08)]">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{t("revenueInsights")}</h2>
                  <p className="text-xs text-gray-400">{`${t("daily")} · ${t("weekly")} · ${t("monthly")} · ${t("allDays")}`}</p>
                </div>
                <label className="flex items-center gap-2 rounded-full border border-[#e4e7f4] bg-[#f6f7fb] px-3 py-1 text-xs font-black text-gray-500">
                  <span>{t("view")}</span>
                  <select
                    value={safeSelectedView}
                    onChange={(event) => setSelectedView(event.target.value)}
                    className="rounded-full border border-[#d8dced] bg-white px-3 py-1 text-xs font-black text-gray-700 outline-none"
                  >
                    {viewOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {t(option.labelKey)}
                      </option>
                    ))}
                  </select>
                </label>
              </div>
              <div className="mt-8 flex h-56 items-end justify-between gap-4">
                {barData.map((bar) => (
                  <div key={`${bar.label}-${bar.value}`} className="flex h-full flex-col items-center justify-end gap-2">
                    <div
                      className={`w-10 rounded-[24px] ${bar.value === tallestValue
                        ? "bg-gradient-to-b from-[#16a34a] to-[#4ade80] shadow-[0_0_40px_rgba(22,163,74,0.35)]"
                        : "bg-[#e25a27] shadow-[0_0_16px_rgba(226,90,39,0.25)]"
                        }`}
                      style={{ height: `${Math.max((bar.value / maxValue) * chartHeight, 18)}px` }}
                    />
                    <span className="text-[11px] font-black uppercase tracking-[0.4em] text-gray-500">
                      {bar.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {feed.map((item) => (
                <div
                  key={item.title}
                  className={`rounded-[28px] border border-[#f5f5f8] bg-gradient-to-br ${item.tone} p-4 shadow-[0_15px_30px_rgba(15,23,42,0.08)]`}
                >
                  <h3 className="text-sm font-black text-gray-900">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.body}</p>
                  <div className="mt-3 flex items-center justify-between text-xs font-semibold text-gray-500">
                    <span>{t("liveFeed")}</span>
                    <span>{item.time}</span>
                  </div>
                </div>
              ))}
              <button className="rounded-[24px] border border-[#ff7a18] bg-white px-4 py-3 text-sm font-black text-[#ff7a18]">
                {t("viewFullLog")}
              </button>
            </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}
