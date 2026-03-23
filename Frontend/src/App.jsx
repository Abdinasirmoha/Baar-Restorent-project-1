import Header from "./Pages/Header"
 import Home from "./Pages/Home"
import Menu from "./Pages/Menu"
import Cart from "./Pages/Cart"
import Login from "./Pages/Login"
import Register from "./Pages/Register"
import Profile from "./Pages/Profile"
import Footer from "./components/Footer"
import { Routes,Route } from "react-router-dom"

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Cart" element={<Cart/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/Register" element={<Register/>} />
      <Route path="/Profile" element={<Profile/>} />

    </Routes>
    <Footer/>
       
    </>
  )
}

export default App
