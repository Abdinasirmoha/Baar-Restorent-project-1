<<<<<<< HEAD
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
=======
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Sidebar from '../components/Sidebar';
import { API_BASE_URL } from '../config/api';
>>>>>>> 4e08181 (project restorent waa dhameystirnay)

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
<<<<<<< HEAD
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
=======
  const [orders, setOrders] = useState([]);
  const [foods, setFoods] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersRes, foodsRes] = await Promise.all([
          axios.get(`${API_BASE_URL}/orders`).catch(() => ({ data: [] })),
          axios.get(`${API_BASE_URL}/food`).catch(() => ({ data: [] }))
        ]);
        setOrders(Array.isArray(ordersRes.data) ? ordersRes.data : []);
        setFoods(Array.isArray(foodsRes.data) ? foodsRes.data : []);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const totalOrders = orders.length;
  const revenue = orders.filter(o => o.status === 'DELIVERED').reduce((sum, order) => sum + (Number(order.total) || 0), 0);
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'COMPLETED').length;
  const urgentOrders = orders.filter(o => o.status === 'PENDING').length;

  const bestSeller = foods.length > 0 ? foods[0] : null;
>>>>>>> 4e08181 (project restorent waa dhameystirnay)

  return (
    <div className="flex bg-[#fcfcfd] min-h-screen font-sans text-[#1c1e27]">
      <Sidebar className="m-6 h-[calc(100vh-3rem)] flex flex-col" />

      <main className="flex-1 p-8 lg:p-12 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-end mb-10">
            <div>
              <h1 className="text-4xl font-extrabold tracking-tight mb-2">Dashboard Overview</h1>
              <p className="text-[#6e7281] font-medium text-lg">Welcome back, Chef. Here's what's cooking today.</p>
            </div>
<<<<<<< HEAD

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
=======
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white border border-[#eaeef3] px-5 py-3 rounded-xl font-semibold shadow-sm text-[#464c5d]">
                <svg className="w-5 h-5 text-[#868a99]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                Mar 28, 2026
              </button>
              <button className="w-12 h-12 flex items-center justify-center bg-white border border-[#eaeef3] rounded-full shadow-sm text-[#464c5d] relative">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
                <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-[#e45a27] rounded-full border-2 border-white"></span>
>>>>>>> 4e08181 (project restorent waa dhameystirnay)
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

<<<<<<< HEAD
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
=======
          {/* KPI Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {/* Total Orders */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9] relative overflow-hidden">
              <h3 className="text-[#9ea4b5] text-sm uppercase font-bold tracking-widest mb-4">Total Orders</h3>
              <div className="flex items-end gap-4 relative z-10">
                <span className="text-4xl font-extrabold">{loading ? "..." : totalOrders.toLocaleString()}</span>
                {totalOrders > 0 && (
                  <span className="bg-[#e7f7ed] text-[#1c9849] font-bold text-sm px-2.5 py-1 rounded-full mb-1 flex items-center gap-0.5">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline></svg>
                    New
                  </span>
                )}
>>>>>>> 4e08181 (project restorent waa dhameystirnay)
              </div>
              <svg className="absolute right-0 bottom-0 w-32 h-32 text-[#f6f8fb] transform translate-x-4 translate-y-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zM9 17H7v-7h2v7zm4 0h-2V7h2v10zm4 0h-2v-4h2v4z"/></svg>
            </div>

            {/* Revenue */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9] relative overflow-hidden">
              <h3 className="text-[#9ea4b5] text-sm uppercase font-bold tracking-widest mb-4">Revenue</h3>
              <div className="flex items-end gap-4 relative z-10">
                <span className="text-4xl font-extrabold">${loading ? "..." : revenue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
                {revenue > 0 && (
                  <span className="bg-[#e7f7ed] text-[#1c9849] font-bold text-sm px-2.5 py-1 rounded-full mb-1 flex items-center gap-0.5">
                    Trending
                  </span>
                )}
              </div>
<<<<<<< HEAD
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
=======
              <svg className="absolute right-0 bottom-0 w-32 h-32 text-[#f6f8fb] transform translate-x-4 translate-y-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.26.24 2.57 1.13 2.76 2.73h-1.94c-.16-.83-.8-1.53-2.16-1.53-1.64 0-2.31.85-2.31 1.55 0 .75.45 1.45 2.75 2.03 2.87.72 4.1 1.85 4.1 3.75 0 1.9-1.54 3.12-3.19 3.61z"/></svg>
            </div>

            {/* Active Orders */}
            <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9] relative overflow-hidden">
              <h3 className="text-[#d88c67] text-sm uppercase font-bold tracking-widest mb-4">Active Orders</h3>
              <div className="flex items-end gap-3 relative z-10">
                <span className="text-4xl font-extrabold text-[#d2541a]">{loading ? "..." : activeOrders}</span>
                <span className="text-[#848796] font-bold text-sm mb-1.5 flex items-center gap-1">
                  <span className="text-[#1a1c29]">{urgentOrders} Urgent</span>
                </span>
              </div>
              <svg className="absolute right-0 bottom-0 w-32 h-32 text-[#fff1eb] transform translate-x-4 translate-y-4" viewBox="0 0 24 24" fill="currentColor"><path d="M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.88 3.75 3.99V22h2.5v-9.01C11.34 12.88 13 11.12 13 9V2h-2v7zm4-7v8h2.5v10H20V2h-5z"/></svg>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
            {/* Revenue Insights Chart */}
            <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9]">
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-xl font-extrabold">Revenue Insights</h2>
                <div className="flex bg-[#f5f6f9] p-1 rounded-full">
                  <button className="px-4 py-1.5 text-sm font-bold bg-white shadow-sm rounded-full text-[#1c1e27]">Daily</button>
                  <button className="px-4 py-1.5 text-sm font-bold text-[#8f94a4] rounded-full hover:text-[#1c1e27] transition">Weekly</button>
                  <button className="px-4 py-1.5 text-sm font-bold text-[#8f94a4] rounded-full hover:text-[#1c1e27] transition">Monthly</button>
                </div>
              </div>
              
              <div className="flex items-end justify-between h-56 mt-6 px-4">
                {[
                  { day: 'MON', val: 35 },
                  { day: 'TUE', val: 55 },
                  { day: 'WED', val: 40 },
                  { day: 'THU', val: 70 },
                  { day: 'FRI', val: 95, active: true },
                  { day: 'SAT', val: 60 },
                  { day: 'SUN', val: 45 },
                  { day: 'MON', val: 50 },
                ].map((item, idx) => (
                  <div key={idx} className="flex flex-col items-center gap-3 w-10">
                    <div className={`w-full rounded-t-xl rounded-b-xl ${item.active ? 'bg-[#ff6e36]' : 'bg-[#f0f2f6]'}`} style={{ height: `${item.val}%` }}></div>
                    <span className="text-[10px] font-bold text-[#b5b8c3]">{item.day}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Live Feed */}
            <div className="bg-[#f5f6fa] rounded-[2rem] p-8 max-h-[400px] overflow-y-auto">
              <h2 className="text-xl font-extrabold mb-6">Live Feed</h2>
              <div className="flex flex-col gap-6">
                {orders.length === 0 && !loading && (
                  <p className="text-[#6d7183] text-sm font-medium">No recent activity.</p>
                )}
                {[...orders].sort((a, b) => new Date(b.updatedAt || b.createdAt || 0) - new Date(a.updatedAt || a.createdAt || 0)).slice(0, 4).map((order) => (
                  <div key={order._id} className="flex gap-4">
                    <div className={`w-10 h-10 rounded-full flex justify-center items-center flex-shrink-0 mt-1 ${
                      order.status === 'PENDING' ? 'bg-[#ffe4e4] text-[#ff4c4c]' : 
                      order.status === 'DELIVERED' ? 'bg-[#e7f7ed] text-[#1c9849]' : 
                      'bg-[#ffe8b9] text-[#f7a915]'
                    }`}>
                      {order.status === 'PENDING' && <span className="font-bold text-lg">!</span>}
                      {order.status === 'DELIVERED' && <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                      {order.status === 'COOKING' && <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>}
                    </div>
                    <div>
                      <h4 className="font-extrabold text-[#1a1c29] uppercase">Order {String(order._id).substring(String(order._id).length - 4)}: {order.status}</h4>
                      <p className="text-[#6d7183] text-sm font-medium mt-1 leading-snug truncate pr-2 max-w-[200px]">
                        {order.items?.map(i => `${i.quantity}x ${i.name}`).join(", ") || "No items"}
                      </p>
                      <p className="text-[#b0b4c2] text-xs font-bold mt-2 uppercase text-[#1a984a]">${Number(order.total || 0).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="w-full mt-6 border border-[#e3e6ec] bg-transparent font-bold text-[#4a4f61] rounded-xl py-3 hover:bg-[#ebeef5] transition text-sm tracking-wider uppercase">
                View Full Log
              </button>
>>>>>>> 4e08181 (project restorent waa dhameystirnay)
            </div>
          </div>

          {/* Performance Leaderboard */}
          <div>
            <h2 className="text-2xl font-extrabold mb-6">Performance Leaderboard</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Best Seller */}
              <div className="bg-white rounded-[2rem] p-2 flex items-stretch shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9]">
                <div className="w-32 bg-[#e2e8f0] rounded-[1.5rem] overflow-hidden flex-shrink-0">
                  <img 
                    src={bestSeller?.image ? (bestSeller.image.startsWith('http') ? bestSeller.image : `${API_BASE_URL}/allimages/${bestSeller.image}`) : "https://placehold.co/200x200?text=Top+Item"}
                    alt={bestSeller?.name || "No data"} 
                    className="w-full h-full object-cover mix-blend-multiply" 
                  />
                </div>
                <div className="p-4 flex flex-col justify-center flex-1 min-w-0">
                  <span className="text-[#d85c2c] text-[10px] font-bold uppercase tracking-widest mb-1.5">Best Seller</span>
                  <h4 className="font-extrabold text-lg leading-tight mb-4 truncate" title={bestSeller?.name || "Pending..."}>{bestSeller?.name || "Pending Data"}</h4>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[#848796] text-[10px] font-bold uppercase mb-0.5">Price</p>
                      <p className="text-xl font-black">${Number(bestSeller?.price || 0).toFixed(2)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[#848796] text-[10px] font-bold uppercase mb-0.5">Margin</p>
                      <p className="text-lg font-bold text-[#1a984a]">68%</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Avg Prep Time */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9]">
                <div className="w-8 h-8 rounded-full bg-[#faebe6] text-[#cc4612] flex justify-center items-center mb-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>
                </div>
                <h4 className="text-[#848796] text-[11px] font-bold uppercase tracking-widest mb-2">Avg Prep Time</h4>
                <p className="text-3xl font-black mb-1">14.2m</p>
                <p className="text-[#1a984a] text-xs font-bold">-2.1m from last week</p>
              </div>

              {/* Table Turnover */}
              <div className="bg-white rounded-[2rem] p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-[#f4f5f9]">
                <div className="w-8 h-8 rounded-full bg-[#f4f1eb] text-[#866e34] flex justify-center items-center mb-6">
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                </div>
                <h4 className="text-[#848796] text-[11px] font-bold uppercase tracking-widest mb-2">Table Turnover</h4>
                <p className="text-3xl font-black mb-1">48m</p>
                <p className="text-[#1c1e27] text-xs font-bold">Optimal Range</p>
              </div>
            </div>
          </div>
          
          {/* Footer inside Dashboard */}
          <div className="mt-16 flex flex-col md:flex-row justify-between items-center text-[10px] font-bold text-[#868a99] uppercase tracking-widest py-8 border-t border-[#f0f2f6]">
            <div className="flex gap-4 items-center">
              <span className="text-[#1a1c29] text-xs tracking-[0.2em] font-black">CULINARY CURATOR</span>
              <span>© 2024 CRAFTED FOR EXCELLENCE.</span>
            </div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-[#1a1c29]">Privacy Policy</a>
              <a href="#" className="hover:text-[#1a1c29]">Terms of Service</a>
              <a href="#" className="hover:text-[#1a1c29]">Contact Support</a>
            </div>
          </div>
          
        </div>
      </main>
    </div>
  );
}
