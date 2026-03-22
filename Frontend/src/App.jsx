import Header from "./Pages/Header"
 import Home from "./Pages/Home"
import Menu from "./Pages/Menu"
import Cart from "./Pages/Cart"
import { Routes,Route } from "react-router-dom"

function App() {
  

  return (
    <>
    <Header/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Menu" element={<Menu />} />
      <Route path="/Cart" element={<Cart/>} />

    </Routes>
       
    </>
  )
}

export default App
