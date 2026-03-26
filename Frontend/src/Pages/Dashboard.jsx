import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";
import { useLanguage } from "../context/LanguageContext";
import { useProfile } from "../context/ProfileContext";
import usePersistedState from "../hooks/usePersistedState";

const viewOptions = [
  { value: "Daily", labelKey: "daily" },
  { value: "Weekly", labelKey: "weekly" },
  { value: "Monthly", labelKey: "monthly" },
  { value: "All Days", labelKey: "allDays" },
];

const CHART_VIEW_CONFIG = {
  Daily: {
    chartHeight: 150,
    containerHeight: 220,
    minWidth: 520,
    emptyRatios: [0.42, 0.56, 0.48, 0.64, 0.58, 0.5, 0.46],
  },
  Weekly: {
    chartHeight: 160,
    containerHeight: 230,
    minWidth: 460,
    emptyRatios: [0.5, 0.66, 0.58, 0.72],
  },
  Monthly: {
    chartHeight: 165,
    containerHeight: 235,
    minWidth: 500,
    emptyRatios: [0.46, 0.62, 0.52, 0.68, 0.57, 0.64],
  },
  "All Days": {
    chartHeight: 145,
    containerHeight: 225,
    minWidth: 700,
    emptyRatios: [0.42, 0.56, 0.48, 0.64, 0.58, 0.5, 0.46, 0.62, 0.54, 0.6, 0.44, 0.66, 0.52, 0.57],
  },
};

const FIXED_REVENUE_CHART_WIDTH = 700;


function formatCurrency(value) {
  return `$${Number(value || 0).toFixed(2)}`;
}

function getRelativeTime(timestamp) {
  if (!timestamp) return "now";
  const diffMs = Date.now() - new Date(timestamp).getTime();
  const minutes = Math.max(Math.floor(diffMs / 60000), 0);
  if (minutes < 1) return "just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function Dashboard() {
  const { language, setLanguage, t, supportedLanguages } = useLanguage();
  const { profile } = useProfile();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [selectedView, setSelectedView] = usePersistedState("dashboardRevenueViewV2", "All Days");
  const [dashboardSearch, setDashboardSearch] = usePersistedState("dashboardSearch", "");

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${API_BASE_URL}/orders`);
        setOrders(Array.isArray(response.data) ? response.data : []);
        setError("");
      } catch {
        setError("Unable to load dashboard data.");
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  const safeSelectedView = viewOptions.some((item) => item.value === selectedView)
    ? selectedView
    : "All Days";

  const handleLogout = () => {
    window.localStorage.removeItem("adminProfile");
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("appLastPage");
  };

  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  }, [orders]);

  const pendingOrders = useMemo(() => {
    return orders.filter((order) => order.status !== "DELIVERED");
  }, [orders]);

  const urgentOrders = useMemo(() => {
    return orders.filter((order) => order.status === "PENDING");
  }, [orders]);

  const totalRevenue = useMemo(() => {
    return orders.reduce((sum, order) => sum + Number(order.total || 0), 0);
  }, [orders]);

  const metricCards = useMemo(() => {
    const avgOrder = orders.length ? totalRevenue / orders.length : 0;
    return [
      {
        labelKey: "totalOrders",
        value: orders.length.toString(),
        trend: `${pendingOrders.length} pending`,
        icon: "🧾",
      },
      {
        labelKey: "revenue",
        value: formatCurrency(totalRevenue),
        trend: `Avg ${formatCurrency(avgOrder)}`,
        icon: "💰",
      },
      {
        labelKey: "activeOrders",
        value: pendingOrders.length.toString(),
        trend: `${urgentOrders.length} urgent`,
        icon: "🍽",
      },
    ];
  }, [orders.length, pendingOrders.length, totalRevenue, urgentOrders.length]);

  const barData = useMemo(() => {
    const items = [];
    const now = new Date();
    const totals = new Map();

    const putValue = (key, value) => {
      totals.set(key, (totals.get(key) || 0) + Number(value || 0));
    };

    orders.forEach((order) => {
      const date = new Date(order.createdAt);
      if (safeSelectedView === "Monthly") {
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        putValue(key, order.total);
      } else if (safeSelectedView === "Weekly") {
        const weekStart = new Date(date);
        const weekday = (weekStart.getDay() + 6) % 7;
        weekStart.setDate(weekStart.getDate() - weekday);
        weekStart.setHours(0, 0, 0, 0);
        const key = weekStart.toISOString().slice(0, 10);
        putValue(key, order.total);
      } else {
        const key = date.toISOString().slice(0, 10);
        putValue(key, order.total);
      }
    });

    if (safeSelectedView === "Monthly") {
      for (let i = 5; i >= 0; i -= 1) {
        const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
        const key = `${date.getFullYear()}-${date.getMonth()}`;
        items.push({
          label: date.toLocaleDateString("en-US", { month: "short" }),
          value: totals.get(key) || 0,
        });
      }
    } else if (safeSelectedView === "Weekly") {
      for (let i = 3; i >= 0; i -= 1) {
        const date = new Date(now);
        date.setDate(now.getDate() - (i * 7));
        const weekday = (date.getDay() + 6) % 7;
        date.setDate(date.getDate() - weekday);
        date.setHours(0, 0, 0, 0);
        const key = date.toISOString().slice(0, 10);
        const weekNumber = 4 - i;
        items.push({
          label: `W${weekNumber}`,
          value: totals.get(key) || 0,
        });
      }
    } else {
      const days = safeSelectedView === "All Days" ? 14 : 7;
      for (let i = days - 1; i >= 0; i -= 1) {
        const date = new Date(now);
        date.setDate(now.getDate() - i);
        date.setHours(0, 0, 0, 0);
        const key = date.toISOString().slice(0, 10);
        items.push({
          label: safeSelectedView === "Daily"
            ? date.toLocaleDateString("en-US", { weekday: "short" })
            : date.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          value: totals.get(key) || 0,
        });
      }
    }

    return items;
  }, [orders, safeSelectedView]);

  const feed = useMemo(() => {
    return sortedOrders.slice(0, 6).map((order) => {
      const statusTone = order.status === "DELIVERED"
        ? "from-[#f4f7ee] to-[#dff7d6]"
        : order.status === "COOKING"
          ? "from-[#fff7e4] to-[#ffe9bf]"
          : "from-[#fef3ef] to-[#ffdfd0]";

      const itemsText = (order.items || [])
        .slice(0, 2)
        .map((item) => `${item.quantity}x ${item.name}`)
        .join(", ");

      return {
        id: order._id,
        title: `Order #${String(order._id || "").slice(-6).toUpperCase()} · ${order.status}`,
        body: itemsText || "No items",
        time: getRelativeTime(order.createdAt),
        tone: statusTone,
      };
    });
  }, [sortedOrders]);

  const filteredFeed = useMemo(() => {
    const query = (dashboardSearch || "").trim().toLowerCase();
    if (!query) {
      return feed;
    }

    return feed.filter((item) => {
      return item.title.toLowerCase().includes(query) || item.body.toLowerCase().includes(query);
    });
  }, [dashboardSearch, feed]);

  const viewChartConfig = CHART_VIEW_CONFIG[safeSelectedView] || CHART_VIEW_CONFIG["All Days"];
  const chartHeight = viewChartConfig.chartHeight;
  const hasRevenueData = barData.some((item) => item.value > 0);
  const chartMinWidth = FIXED_REVENUE_CHART_WIDTH;
  const chartValues = useMemo(() => {
    if (hasRevenueData) {
      return barData.map((item) => Number(item.value || 0));
    }

    return barData.map((_, index) => {
      const ratio = viewChartConfig.emptyRatios[index % viewChartConfig.emptyRatios.length];
      return Math.round(ratio * 100);
    });
  }, [barData, hasRevenueData, viewChartConfig.emptyRatios]);

  const revenueTotalForView = useMemo(() => {
    return barData.reduce((sum, item) => sum + Number(item.value || 0), 0);
  }, [barData]);

  const trendInfo = useMemo(() => {
    if (chartValues.length < 2) {
      return { percent: "0.0", positive: true };
    }

    const first = chartValues[0];
    const last = chartValues[chartValues.length - 1];
    if (first === 0) {
      return { percent: "0.0", positive: true };
    }

    const change = ((last - first) / first) * 100;
    return {
      percent: Math.abs(change).toFixed(1),
      positive: change >= 0,
    };
  }, [chartValues]);

  const yMax = useMemo(() => {
    const peak = Math.max(...chartValues, 1);
    const rounded = Math.ceil(peak / 10) * 10;
    return Math.max(rounded, 50);
  }, [chartValues]);

  const chartGeometry = useMemo(() => {
    const width = chartMinWidth;
    const height = viewChartConfig.containerHeight;
    const padding = { top: 10, right: 16, bottom: 34, left: 30 };
    const plotWidth = width - padding.left - padding.right;
    const plotHeight = chartHeight;

    const points = chartValues.map((value, index) => {
      const denominator = Math.max(chartValues.length - 1, 1);
      const x = padding.left + (index / denominator) * plotWidth;
      const y = padding.top + (1 - (value / yMax)) * plotHeight;
      return { x, y };
    });

    const linePath = points
      .map((point, index) => `${index === 0 ? "M" : "L"}${point.x},${point.y}`)
      .join(" ");

    const areaPath = `${linePath} L${padding.left + plotWidth},${padding.top + plotHeight} L${padding.left},${padding.top + plotHeight} Z`;

    return {
      width,
      height,
      padding,
      plotWidth,
      plotHeight,
      points,
      linePath,
      areaPath,
    };
  }, [chartMinWidth, viewChartConfig.containerHeight, chartHeight, chartValues, yMax]);
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

            <Link
              to="/MenuManagement/Add"
              className="inline-flex h-11 items-center rounded-full bg-[#f36a3d] px-7 text-sm font-black text-white shadow-[0_10px_24px_rgba(243,106,61,0.35)] transition hover:bg-[#e25a27]"
            >
              {t("recipeGuide")}
            </Link>

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
                {pendingOrders.length}
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
                {Math.min(filteredFeed.length, 99)}
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

              <Link
                to="/Login"
                onClick={handleLogout}
                className="rounded-full border border-[#f2c9b7] px-3 py-1 text-xs font-black uppercase tracking-wide text-[#d4551b] hover:bg-[#fff2ec]"
              >
                Logout
              </Link>
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
              {loading ? "Loading dashboard data..." : t("dashboardWelcome")}
            </p>
            {error && <p className="text-sm font-semibold text-red-500">{error}</p>}
          </header>

          <section className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {metricCards.map((metric) => (
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
              <div className="mt-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-[#e25a27]">{safeSelectedView} Revenue</p>
                  <p className="text-[11px] text-gray-400">Lorem ipsum dolor</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-black text-gray-900">{formatCurrency(revenueTotalForView)}</p>
                  <p className={`text-xs font-bold ${trendInfo.positive ? "text-[#e25a27]" : "text-red-500"}`}>
                    {trendInfo.positive ? "+" : "-"}{trendInfo.percent}% than last week
                  </p>
                </div>
              </div>

              <div className="mt-4 overflow-x-auto pb-2">
                <div
                  className="w-full"
                  style={{
                    width: "100%",
                    minWidth: `${chartMinWidth}px`,
                    height: `${viewChartConfig.containerHeight}px`,
                  }}
                >
                  <svg
                    width="100%"
                    height={chartGeometry.height}
                    viewBox={`0 0 ${chartGeometry.width} ${chartGeometry.height}`}
                    className="block"
                    role="img"
                    aria-label="Revenue trend chart"
                  >
                    <defs>
                      <linearGradient id="revenueAreaGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#e25a27" stopOpacity="0.35" />
                        <stop offset="100%" stopColor="#e25a27" stopOpacity="0.05" />
                      </linearGradient>
                    </defs>

                    {[0, 1, 2, 3, 4].map((step) => {
                      const y = chartGeometry.padding.top + (step / 4) * chartGeometry.plotHeight;
                      const value = Math.round(yMax - (step / 4) * yMax);
                      return (
                        <g key={`grid-${step}`}>
                          <line
                            x1={chartGeometry.padding.left}
                            y1={y}
                            x2={chartGeometry.padding.left + chartGeometry.plotWidth}
                            y2={y}
                            stroke="#e7edf6"
                            strokeWidth="1"
                          />
                          <text
                            x={chartGeometry.padding.left - 6}
                            y={y + 4}
                            textAnchor="end"
                            className="fill-[#93a0b5] text-[10px]"
                          >
                            {value}
                          </text>
                        </g>
                      );
                    })}

                    <path d={chartGeometry.areaPath} fill="url(#revenueAreaGradient)" />
                    <path d={chartGeometry.linePath} fill="none" stroke="#e25a27" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

                    {chartGeometry.points.map((point, index) => (
                      <g key={`x-${barData[index].label}`}>
                        <circle cx={point.x} cy={point.y} r="2.8" fill="#e25a27" />
                        <text
                          x={point.x}
                          y={chartGeometry.padding.top + chartGeometry.plotHeight + 18}
                          textAnchor="middle"
                          className="fill-[#6f7d93] text-[10px] font-semibold"
                        >
                          {barData[index].label}
                        </text>
                      </g>
                    ))}
                  </svg>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {filteredFeed.map((item) => (
                <div
                  key={item.id}
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

              {!loading && filteredFeed.length === 0 && (
                <div className="rounded-[24px] border border-dashed border-[#e3e6ef] bg-[#fafbfd] px-4 py-5 text-sm font-semibold text-gray-500">
                  No matching activity.
                </div>
              )}

              <Link
                to="/Orders"
                className="rounded-[24px] border border-[#ff7a18] bg-white px-4 py-3 text-center text-sm font-black text-[#ff7a18]"
              >
                {t("viewFullLog")}
              </Link>
            </div>
          </section>
          </div>
        </main>
      </div>
    </div>
  );
}
