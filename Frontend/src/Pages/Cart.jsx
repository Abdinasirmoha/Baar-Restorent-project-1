import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();

  if (cart.length === 0) {
    return (
      <div className="bg-[#fcfaf8] min-h-screen pt-20 pb-24 px-4 sm:px-8 font-sans text-gray-800 flex flex-col items-center">
        <div className="max-w-lg text-center">
          <div className="bg-orange-50 w-40 h-40 rounded-full flex items-center justify-center mx-auto mb-10">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#e25a27" className="w-20 h-20">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-5">Your cart is empty</h2>
          <p className="text-gray-500 text-lg mb-10 leading-relaxed">Looks like you haven't added any delicious items to your cart yet.</p>
          <Link to="/Menu" className="bg-[#e25a27] text-white px-10 py-5 text-lg rounded-2xl font-bold hover:bg-[#c94a1b] transition-colors inline-block shadow-xl shadow-[#e25a27]/20">
            Explore Our Menu
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#fcfaf8] min-h-screen pt-12 pb-24 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-12 tracking-tight">Your Cart</h1>
        
        <div className="flex flex-col lg:flex-row gap-16">
          {/* Cart Items */}
          <div className="lg:w-2/3 space-y-6">
            <div className="bg-white rounded-[2rem] p-8 sm:p-10 shadow-sm border border-gray-50">
              <div className="flex justify-between items-center mb-8 pb-8 border-b border-gray-100">
                <h3 className="text-2xl font-bold text-gray-900">Order Items ({cart.length})</h3>
                <button onClick={clearCart} className="text-base font-bold text-gray-400 hover:text-red-500 transition-colors">
                  Clear Cart
                </button>
              </div>

              <div className="space-y-8">
                {cart.map((item) => (
                  <div key={item._id} className="flex flex-col sm:flex-row items-center gap-6 group">
                    <img 
                      src={`http://localhost:5000/allimages/${item.image}`} 
                      alt={item.name} 
                      className="w-36 h-36 rounded-[1.5rem] object-cover bg-gray-100 shadow-sm"
                    />
                    <div className="flex-1 flex flex-col w-full h-full py-2">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <p className="text-[#e25a27] text-sm font-bold uppercase tracking-widest mb-2">{item.category}</p>
                          <h4 className="text-2xl font-extrabold text-gray-900">{item.name}</h4>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item._id)}
                          className="text-gray-400 hover:text-red-500 transition-colors bg-gray-50 hover:bg-red-50 p-3 rounded-full"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex justify-between items-center mt-auto pt-6">
                        <div className="flex items-center gap-4 bg-gray-50 rounded-full px-4 py-2 border border-gray-100 shadow-sm">
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12h-15" /></svg>
                          </button>
                          <span className="text-xl font-black text-gray-900 w-6 text-center">{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-10 h-10 flex items-center justify-center text-gray-500 hover:text-gray-900 hover:bg-white rounded-full transition-all"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" /></svg>
                          </button>
                        </div>
                        <span className="text-2xl font-black text-gray-900">${(item.price * item.quantity).toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
            <div className="bg-[#1c1c1c] text-white rounded-[2rem] p-10 shadow-2xl sticky top-28">
              <h3 className="text-3xl font-extrabold mb-10 text-white tracking-wide">Order Summary</h3>
              
              <div className="space-y-6 mb-10 text-gray-300 text-lg">
                <div className="flex justify-between items-center pb-5 border-b border-gray-700/50">
                  <span>Subtotal</span>
                  <span className="font-bold text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center pb-5 border-b border-gray-700/50">
                  <span>Taxes (10%)</span>
                  <span className="font-bold text-white">${(totalPrice * 0.1).toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center mt-8 pt-2">
                  <span className="text-2xl font-bold">Total</span>
                  <span className="text-4xl font-black text-white">${(totalPrice * 1.1).toFixed(2)}</span>
                </div>
              </div>

              <button className="w-full bg-[#e25a27] text-white py-5 rounded-2xl font-bold text-xl hover:bg-[#c94a1b] transition-colors shadow-2xl shadow-[#e25a27]/30 hover:shadow-[#e25a27]/50 flex justify-center items-center gap-3">
                Proceed to Checkout
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}