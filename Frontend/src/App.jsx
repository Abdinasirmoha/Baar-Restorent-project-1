import { useEffect } from "react"
import Header from "./Pages/Header"
import Home from "./Pages/Home"
import MenuManagement from "./Pages/MenuManagement"
import AddNewMenu from "./Pages/AddNewMenu"
import MenuList from "./Pages/MenuList"
import MenuCategories from "./Pages/MenuCategories"
import MenuPage from "./Pages/MenuPage"
import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Dashboard from "./Pages/Dashboard"
import Orders from "./Pages/Orders"
import Messages from "./Pages/Messages"
import POS from "./Pages/POS"
import Analytics from "./Pages/Analytics"
import Settings from "./Pages/Settings"
import Footer from "./components/Footer"
import { Routes,Route,useLocation } from "react-router-dom"

function App() {
  const location = useLocation();
  const isDashboardPage = location.pathname === "/Dashboard";

  useEffect(() => {
    const pagePath = `${location.pathname}${location.search}`;
    window.localStorage.setItem("appLastPage", pagePath);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const storageKey = "appPageData";
    const pageKey = location.pathname;
    const timestamp = new Date().toISOString();

    let pageData = {};
    const stored = window.localStorage.getItem(storageKey);

    if (stored) {
      try {
        pageData = JSON.parse(stored);
      } catch {
        pageData = {};
      }
    }

    const currentPageData = pageData[pageKey] || {};
    const currentMeta = currentPageData.__meta || {};

    pageData[pageKey] = {
      ...currentPageData,
      __meta: {
        ...currentMeta,
        path: pageKey,
        lastSearch: location.search,
        lastVisitedAt: timestamp,
        visitCount: (currentMeta.visitCount || 0) + 1,
      },
    };

    window.localStorage.setItem(storageKey, JSON.stringify(pageData));
  }, [location.pathname, location.search]);
  

  return (
    <>
    {!isDashboardPage && <Header/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<MenuPage />} />
      <Route path="/MenuManagement" element={<MenuManagement />} />
      <Route path="/MenuManagement/Add" element={<AddNewMenu />} />
      <Route path="/MenuManagement/List" element={<MenuList />} />
      <Route path="/MenuManagement/Categories" element={<MenuCategories />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Profile" element={<Profile/>} />
      <Route path="/Dashboard" element={<Dashboard/>} />
      <Route path="/Orders" element={<Orders/>} />
      <Route path="/Messages" element={<Messages/>} />
      <Route path="/POS" element={<POS/>} />
      <Route path="/Analytics" element={<Analytics/>} />
      <Route path="/Settings" element={<Settings/>} />
    </Routes>
    {!isDashboardPage && <Footer/>}
       
    </>
  )
}

export default App
