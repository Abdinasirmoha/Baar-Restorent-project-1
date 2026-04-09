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
import AdminLogin from "./Pages/AdminLogin"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Dashboard from "./Pages/Dashboard"
import Orders from "./Pages/Orders"
import Messages from "./Pages/Messages"
import POS from "./Pages/POS"
import Analytics from "./Pages/Analytics"
import Settings from "./Pages/Settings"
import Checkout from "./Pages/Checkout"
import Footer from "./components/Footer"
import Receipt from "./Pages/Receipt"
import Contact from "./Pages/Contact"
import { Routes,Route,useLocation } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute"

function App() {
  const location = useLocation();
  const hiddenNavPaths = ["/Dashboard", "/POS", "/Receipt", "/Orders", "/MenuManagement"];
  const hideNavs = hiddenNavPaths.some(p => location.pathname.startsWith(p));

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
    {!hideNavs && <Header/>}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<MenuPage />} />
      <Route path="/Contact" element={<Contact />} />
      <Route path="/MenuManagement" element={<ProtectedRoute><MenuManagement /></ProtectedRoute>} />
      <Route path="/MenuManagement/Add" element={<ProtectedRoute><AddNewMenu /></ProtectedRoute>} />
      <Route path="/MenuManagement/List" element={<ProtectedRoute><MenuList /></ProtectedRoute>} />
      <Route path="/MenuManagement/Categories" element={<ProtectedRoute><MenuCategories /></ProtectedRoute>} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Checkout" element={<Checkout/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/admin" element={<AdminLogin/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Profile" element={<Profile/>} />
      <Route path="/Dashboard" element={<ProtectedRoute><Dashboard/></ProtectedRoute>} />
      <Route path="/Orders" element={<ProtectedRoute><Orders/></ProtectedRoute>} />
      <Route path="/Messages" element={<ProtectedRoute><Messages/></ProtectedRoute>} />
      <Route path="/POS" element={<ProtectedRoute><POS/></ProtectedRoute>} />
      <Route path="/Receipt" element={<ProtectedRoute><Receipt/></ProtectedRoute>} />
      <Route path="/Analytics" element={<ProtectedRoute><Analytics/></ProtectedRoute>} />
      <Route path="/Settings" element={<ProtectedRoute><Settings/></ProtectedRoute>} />
    </Routes>
    {!hideNavs && <Footer/>}
       
    </>
  )
}

export default App
