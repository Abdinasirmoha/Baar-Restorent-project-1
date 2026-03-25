import { createContext, useContext, useEffect, useMemo, useState } from "react";

const LanguageContext = createContext(null);

const STORAGE_KEY = "appLanguage";
const SUPPORTED_LANGUAGES = ["English", "Somalia"];

const translations = {
  English: {
    home: "Home",
    menu: "Menu",
    dashboard: "Dashboard",
    register: "Register",
    login: "Login",
    cart: "Cart",
    kitchenCommand: "Kitchen Command",
    premiumAdmin: "Premium Admin",
    orders: "Orders",
    messages: "Messages",
    posSystem: "POS System",
    analytics: "Analytics",
    settings: "Settings",
    menus: "Menus",
    addNewMenu: "Add New Menu",
    menuList: "Menu List",
    categories: "Categories",
    searchHere: "Search here",
    recipeGuide: "Recipe Guide",
    dashboardOverview: "Dashboard Overview",
    dashboardWelcome: "Welcome back, Chef. Here's what's cooking today.",
    totalOrders: "Total Orders",
    revenue: "Revenue",
    activeOrders: "Active Orders",
    revenueInsights: "Revenue Insights",
    daily: "Daily",
    weekly: "Weekly",
    monthly: "Monthly",
    allDays: "All Days",
    view: "View",
    liveFeed: "Live Feed",
    viewFullLog: "View Full Log",
  },
  Somalia: {
    home: "Hoyga",
    menu: "Liis",
    dashboard: "Dashboard",
    register: "Diiwaangeli",
    login: "Gal",
    cart: "Gaariga",
    kitchenCommand: "Amarka Jikada",
    premiumAdmin: "Maamule Sare",
    orders: "Dalabaad",
    messages: "Farriimo",
    posSystem: "Nidaamka POS",
    analytics: "Falanqayn",
    settings: "Dejinta",
    menus: "Liisaska",
    addNewMenu: "Ku Dar Liis Cusub",
    menuList: "Liiska",
    categories: "Qaybaha",
    searchHere: "Halkan ka raadi",
    recipeGuide: "Hagaha Cuntooyinka",
    dashboardOverview: "Guudmarka Dashboard",
    dashboardWelcome: "Ku soo noqo, Chef. Waa tan waxa maanta socda.",
    totalOrders: "Wadarta Dalabaadka",
    revenue: "Dakhliga",
    activeOrders: "Dalabaad Firfircoon",
    revenueInsights: "Falanqaynta Dakhliga",
    daily: "Maalinle",
    weekly: "Toddobaadle",
    monthly: "Bille",
    allDays: "Dhammaan Maalmaha",
    view: "Arag",
    liveFeed: "War Toos ah",
    viewFullLog: "Arag Diiwaanka oo Dhan",
  },
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const saved = window.localStorage.getItem(STORAGE_KEY);
    return SUPPORTED_LANGUAGES.includes(saved) ? saved : "English";
  });

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, language);
    document.documentElement.lang = language === "Somalia" ? "so" : "en";
  }, [language]);

  const value = useMemo(() => {
    const dictionary = translations[language] || translations.English;
    const t = (key) => dictionary[key] || translations.English[key] || key;

    return {
      language,
      setLanguage,
      t,
      supportedLanguages: SUPPORTED_LANGUAGES,
    };
  }, [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
};
