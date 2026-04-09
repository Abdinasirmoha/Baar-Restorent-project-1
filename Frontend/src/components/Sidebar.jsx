import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";

const navItems = [
  {
    labelKey: "dashboard",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="3" width="7" height="9" rx="1.5"></rect>
        <rect x="14" y="3" width="7" height="5" rx="1.5"></rect>
        <rect x="14" y="12" width="7" height="9" rx="1.5"></rect>
        <rect x="3" y="16" width="7" height="5" rx="1.5"></rect>
      </svg>
    ),
    path: "/Dashboard",
  },
  {
    labelKey: "orders",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 6h14" /><path d="M5 10h14" /><path d="M5 14h14" /><path d="M5 18h14" />
      </svg>
    ),
    path: "/Orders",
  },
  {
    labelKey: "messages",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
      </svg>
    ),
    path: "/Messages",
  },
  {
    labelKey: "posSystem",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="5" y="4" width="14" height="16" rx="2" />
        <path d="M9 11h6" /><path d="M9 16h6" />
      </svg>
    ),
    path: "/POS",
  },
  {
    labelKey: "analytics",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 19v-6h3v6" /><path d="M12 19V9h3v10" /><path d="M19 19v-3" />
      </svg>
    ),
    path: "/Analytics",
  },
  {
    labelKey: "settings",
    icon: (
      <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="3" />
        <path d="M19.4 15a1.76 1.76 0 0 0 .3-1.4l-1.4-5a1.75 1.75 0 0 0-1.6-.8l-3.5.3a2.5 2.5 0 0 0-.6-1.4l.9-3.5a1.75 1.75 0 0 0-1.4-2h-5a1.75 1.75 0 0 0-1.4 2l.9 3.5a2.5 2.5 0 0 0-.6 1.4l-3.5-.3a1.75 1.75 0 0 0-1.6.8l-1.4 5a1.76 1.76 0 0 0 .3 1.4l3 2.2a1.75 1.75 0 0 0 2.1 0l3-2.2a2.5 2.5 0 0 0 1.4.4h2.8a2.5 2.5 0 0 0 1.4-.4l3 2.2a1.75 1.75 0 0 0 2.1 0z" />
      </svg>
    ),
    path: "/Settings",
  },
];

const menuSubItems = [
  { labelKey: "addNewMenu", path: "/MenuManagement/Add", label: "Add New Menu" },
  { labelKey: "menuList", path: "/MenuManagement/List", label: "Menu List" },
  { labelKey: "categories", path: "/MenuManagement/Categories", label: "Categories" },
];

export default function Sidebar({ className = "" }) {
  const location = useLocation();
  const { t } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);
  
  const isMenuActive = location.pathname.startsWith("/MenuManagement");
  const [isMenusOpen, setIsMenusOpen] = useState(isMenuActive);
  
  useEffect(() => {
    if (isMenuActive) {
      setIsMenusOpen(true);
    }
  }, [isMenuActive]);

  useEffect(() => {
    if (isCollapsed) setIsMenusOpen(false);
  }, [isCollapsed]);

  const dashboardItem = navItems.find((item) => item.path === "/Dashboard");
  const otherNavItems = navItems.filter((item) => item.path !== "/Dashboard");

  // Premium, unified styling for all primary navigation items
  const getItemClass = (isActive) => {
    if (isCollapsed) {
      return `mx-auto flex items-center justify-center w-11 h-11 rounded-xl transition-all duration-200 group ${
        isActive
          ? "bg-[#e35a28] text-white shadow-md shadow-[#e35a28]/25"
          : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
      }`;
    }
    return `flex items-center gap-3.5 w-full rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 group ${
      isActive
        ? "bg-[#e35a28] text-white shadow-md shadow-[#e35a28]/25 tracking-wide"
        : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a]"
    }`;
  };

  const SubItemLink = ({ item }) => {
    const isActive = location.pathname === item.path || location.pathname.startsWith(item.path);
    return (
      <Link
        to={item.path}
        className={`flex items-center w-full rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 ${
          isActive
            ? "bg-[#e35a28] text-white shadow-md shadow-[#e35a28]/25 tracking-wide"
            : "text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] hover:translate-x-1"
        }`}
      >
        <span className={`w-1.5 h-1.5 rounded-full bg-current ${isActive ? 'opacity-100' : 'opacity-60'} mr-3 shrink-0`} />
        {t(item.labelKey, item.label)}
      </Link>
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("adminProfile");
    window.localStorage.removeItem("cart");
    window.localStorage.removeItem("appLastPage");
  };

  return (
    <aside
      className={`sticky top-0 self-start bg-white h-screen border-r border-[#f1f5f9] flex flex-col transition-all duration-300 ease-in-out z-40 ${
        isCollapsed ? "w-[85px] px-3" : "w-[260px] px-5"
      } ${className}`}
    >
      {/* Collapse Toggle */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3.5 top-9 w-7 h-7 bg-white border border-[#e2e8f0] rounded-full flex items-center justify-center text-[#64748b] shadow-sm hover:text-[#0f172a] hover:shadow transition-all z-50 hover:scale-105"
      >
        <svg className={`w-3.5 h-3.5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
      </button>

      {/* Header / Logo */}
      <div className={`flex items-center mt-8 mb-8 transition-all duration-300 ${isCollapsed ? "justify-center" : "gap-3 px-1"}`}>
        <div className="w-10 h-10 rounded-[12px] bg-gradient-to-br from-[#0f172a] to-[#334155] flex items-center justify-center text-white shrink-0 shadow-lg shadow-slate-900/10">
          <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"/>
          </svg>
        </div>
        {!isCollapsed && (
          <div className="flex flex-col whitespace-nowrap animate-fade-in">
            <h2 className="text-xl font-black text-[#0f172a] tracking-tight leading-none mb-0.5">Kitchen<span className="text-[#e35a28]">.</span></h2>
            <p className="text-[10px] uppercase font-bold tracking-widest text-[#94a3b8]">Command</p>
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-col flex-1 overflow-y-auto no-scrollbar pb-6">
        <nav className="flex flex-col gap-1.5 w-full">
          
          {/* Dashboard */}
          {dashboardItem && (
             <Link
               to={dashboardItem.path}
               className={getItemClass(location.pathname === dashboardItem.path)}
               title={isCollapsed ? t(dashboardItem.labelKey, "Dashboard") : ""}
             >
               {dashboardItem.icon}
               {!isCollapsed && <span>{t(dashboardItem.labelKey, "Dashboard")}</span>}
             </Link>
          )}

          {/* Menus Dropdown */}
          <div className="flex flex-col w-full">
            <button
              type="button"
              onClick={() => {
                if (isCollapsed) {
                  setIsCollapsed(false);
                  setIsMenusOpen(true);
                } else {
                  setIsMenusOpen(!isMenusOpen);
                }
              }}
              // If menu is open and a child is active, keep this button styled as inactive so only the child is orange
              className={getItemClass(isMenuActive && !isMenusOpen)} 
              title={isCollapsed ? t("menus", "Menus") : ""}
            >
              <span className="shrink-0">
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="4" width="6" height="6" rx="1" /><rect x="14" y="4" width="6" height="6" rx="1" />
                  <rect x="4" y="14" width="6" height="6" rx="1" /><rect x="14" y="14" width="6" height="6" rx="1" />
                </svg>
              </span>
              {!isCollapsed && (
                <>
                  <span className="flex-1 text-left">{t("menus", "Menus")}</span>
                  <svg className={`w-4 h-4 transition-transform duration-300 ${isMenusOpen ? "rotate-90" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m9 18 6-6-6-6" />
                  </svg>
                </>
              )}
            </button>

            {/* Sub Items list */}
            {!isCollapsed && (
              <div 
                className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ease-in-out ${
                  isMenusOpen ? "max-h-[300px] mt-1.5 opacity-100 pl-3" : "max-h-0 opacity-0"
                }`}
              >
                {menuSubItems.map((item) => (
                  <SubItemLink key={item.labelKey} item={item} />
                ))}
              </div>
            )}
          </div>

          {/* Other Links */}
          {otherNavItems.map((item) => (
            <Link
              key={item.labelKey}
              to={item.path}
              className={getItemClass(location.pathname.startsWith(item.path))}
              title={isCollapsed ? t(item.labelKey) : ""}
            >
              {item.icon}
              {!isCollapsed && <span>{t(item.labelKey)}</span>}
            </Link>
<<<<<<< HEAD
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
=======
          ))}
        </nav>
      </div>

      {/* Footer Nav */}
      <div className="mt-auto py-6 flex flex-col gap-1 border-t border-slate-100 w-full mb-0">
         <Link to="/Help" className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 text-[#64748b] hover:bg-[#f1f5f9] hover:text-[#0f172a] ${isCollapsed ? 'justify-center px-0' : ''}`} title="Help">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            {!isCollapsed && <span>Help</span>}
         </Link>
         
         <button className={`flex items-center gap-3 w-full rounded-xl px-4 py-3 text-[14px] font-medium transition-all duration-200 text-[#64748b] hover:bg-red-50 hover:text-red-500 ${isCollapsed ? 'justify-center px-0' : ''}`} title="Log out">
            <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line>
            </svg>
            {!isCollapsed && <span>Log out</span>}
         </button>
      </div>
>>>>>>> 4e08181 (project restorent waa dhameystirnay)
    </aside>
  );
}
