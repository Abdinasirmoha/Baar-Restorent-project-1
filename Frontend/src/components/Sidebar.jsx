import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  {
    labelKey: "dashboard",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 13h6V5H4z" />
        <path d="M4 21h6v-6H4z" />
        <path d="M14 13h6V5h-6z" />
        <path d="M14 21h6v-6h-6z" />
      </svg>
    ),
    path: "/Dashboard",
  },
  {
    labelKey: "orders",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 6h14" />
        <path d="M5 10h14" />
        <path d="M5 14h14" />
        <path d="M5 18h14" />
      </svg>
    ),
    path: "/Orders",
  },
  {
    labelKey: "messages",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    path: "/Messages",
  },
  {
    labelKey: "posSystem",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 11h6" />
        <path d="M9 16h6" />
      </svg>
    ),
    path: "/POS",
  },
  {
    labelKey: "analytics",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 19v-6h3v6" />
        <path d="M12 19V9h3v10" />
        <path d="M19 19v-3" />
      </svg>
    ),
    path: "/Analytics",
  },
  {
    labelKey: "settings",
    icon: (
      <svg
        className="w-5 h-5"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.76 1.76 0 0 0 .3-1.4l-1.4-5a1.75 1.75 0 0 0-1.6-.8l-3.5.3a2.5 2.5 0 0 0-.6-1.4l.9-3.5a1.75 1.75 0 0 0-1.4-2h-5a1.75 1.75 0 0 0-1.4 2l.9 3.5a2.5 2.5 0 0 0-.6 1.4l-3.5-.3a1.75 1.75 0 0 0-1.6.8l-1.4 5a1.76 1.76 0 0 0 .3 1.4l3 2.2a1.75 1.75 0 0 0 2.1 0l3-2.2a2.5 2.5 0 0 0 1.4.4h2.8a2.5 2.5 0 0 0 1.4-.4l3 2.2a1.75 1.75 0 0 0 2.1 0z" />
      </svg>
    ),
    path: "/Settings",
  },
];

const menuSubItems = [
  { labelKey: "addNewMenu", path: "/MenuManagement/Add", section: "add" },
  { labelKey: "menuList", path: "/MenuManagement/List", section: "list" },
  { labelKey: "categories", path: "/MenuManagement/Categories", section: "categories" },
];

const getSectionFromPath = (path) => {
  const lowerPath = path.toLowerCase();
  if (lowerPath.includes("/add")) return "add";
  if (lowerPath.includes("/categories")) return "categories";
  return "list";
};

export default function Sidebar({ className = "" }) {
  const location = useLocation();
  const { t } = useLanguage();
  const isMenuSectionActive = location.pathname.startsWith("/MenuManagement");
  const menusOpenStorageKey = `sidebarMenusOpen:${location.pathname}`;
  const menuSectionStorageKey = `sidebarMenuSection:${location.pathname}`;
  const activeMenuSection =
    getSectionFromPath(location.pathname) ||
    window.localStorage.getItem(menuSectionStorageKey) ||
    "list";
  const dashboardItem = navItems.find((item) => item.path === "/Dashboard");
  const otherNavItems = navItems.filter((item) => item.path !== "/Dashboard");
  const [isMenusOpen, setIsMenusOpen] = useState(false);

  useEffect(() => {
    const savedMenusOpen = window.localStorage.getItem(menusOpenStorageKey);
    if (savedMenusOpen === null) {
      setIsMenusOpen(isMenuSectionActive);
      return;
    }

    setIsMenusOpen(savedMenusOpen === "true");
  }, [menusOpenStorageKey, isMenuSectionActive]);

  useEffect(() => {
    window.localStorage.setItem(menusOpenStorageKey, String(isMenusOpen));
  }, [menusOpenStorageKey, isMenusOpen]);

  useEffect(() => {
    if (isMenuSectionActive) {
      window.localStorage.setItem(menuSectionStorageKey, activeMenuSection);
    }
  }, [isMenuSectionActive, activeMenuSection, menuSectionStorageKey]);

  const handleLogout = () => {
    window.localStorage.removeItem("adminProfile");
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("appLastPage");
  };

  return (
    <aside
      className={`sticky top-0 self-start w-64 rounded-[2.5rem] border border-[#f1f2f6] bg-white px-5 py-8 shadow-[0_25px_60px_rgba(15,23,42,0.08)] ${className}`}
    >
      <div>
        <p className="text-sm uppercase tracking-[0.4em] text-[#9ea5b6] font-bold">
          {t("kitchenCommand")}
        </p>
        <h2 className="mt-3 text-2xl font-black text-gray-900">{t("premiumAdmin")}</h2>
      </div>

      <nav className="mt-8 flex flex-col gap-3">
        {dashboardItem && (
          <Link
            key={dashboardItem.labelKey}
            to={dashboardItem.path}
            className={`flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition ${
              location.pathname === dashboardItem.path
                ? "bg-[#ffe2d5] text-[#d4551b] shadow-[0_10px_30px_rgba(226,90,39,0.25)]"
                : "text-[#5f667a]"
            }`}
          >
            <span
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                location.pathname === dashboardItem.path
                  ? "border-transparent bg-[#ffe2d5]"
                  : "border-[#ececf3] bg-white"
              }`}
            >
              {dashboardItem.icon}
            </span>
            <span>{t(dashboardItem.labelKey)}</span>
          </Link>
        )}

        <div className="rounded-[18px] px-2 py-1">
          <button
            type="button"
            onClick={() => setIsMenusOpen((prev) => !prev)}
            className={`flex w-full items-center gap-3 rounded-[18px] px-3 py-2 text-sm font-semibold transition ${
              isMenuSectionActive
                ? "text-[#5f667a]"
                : "text-[#a5a8b5]"
            }`}
          >
            <span className="flex h-7 w-7 items-center justify-center rounded-md border border-[#efeff3] bg-[#fafafd]">
              <svg
                className="h-4 w-4"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="4" y="4" width="6" height="6" rx="1" />
                <rect x="14" y="4" width="6" height="6" rx="1" />
                <rect x="4" y="14" width="6" height="6" rx="1" />
                <rect x="14" y="14" width="6" height="6" rx="1" />
              </svg>
            </span>
            <span className="flex-1 text-left">{t("menus")}</span>
            <svg
              className={`h-4 w-4 transition-transform ${isMenusOpen ? "rotate-180" : ""}`}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="m6 9 6 6 6-6" />
            </svg>
          </button>

          {isMenusOpen && (
            <div className="ml-11 mt-2 flex flex-col gap-1">
              {menuSubItems.map((item) => {
                const section = item.section;
                const isActiveSubItem = isMenuSectionActive && activeMenuSection === section;

                return (
                  <Link
                    key={item.labelKey}
                    to={item.path}
                    onClick={() => window.localStorage.setItem(menuSectionStorageKey, section)}
                    className={`rounded-lg px-2 py-1.5 text-sm transition ${
                      isActiveSubItem
                        ? "text-[#5f667a] font-semibold"
                        : "text-[#c5c7cf]"
                    }`}
                  >
                    {t(item.labelKey)}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {otherNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.labelKey}
              to={item.path}
              className={`flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold transition ${
                isActive
                  ? "bg-[#ffe2d5] text-[#d4551b] shadow-[0_10px_30px_rgba(226,90,39,0.25)]"
                  : "text-[#5f667a]"
              }`}
            >
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                  isActive
                    ? "border-transparent bg-[#ffe2d5]"
                    : "border-[#ececf3] bg-white"
                }`}
              >
                {item.icon}
              </span>
              <span>{t(item.labelKey)}</span>
            </Link>
          );
        })}

        <Link
          to="/Login"
          onClick={handleLogout}
          className="mt-2 flex items-center gap-3 rounded-[18px] px-4 py-3 text-sm font-semibold text-[#d4551b] transition hover:bg-[#ffe2d5]"
        >
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-[#f7c7b3] bg-[#fff4ef]">
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2.2}
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
              <path d="m16 17 5-5-5-5" />
              <path d="M21 12H9" />
            </svg>
          </span>
          <span>Logout</span>
        </Link>
      </nav>
    </aside>
  );
}
