import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { API_BASE_URL } from "../config/api";

function Checkout() {
    const { cart, totalPrice, clearCart } = useCart();
    const navigate = useNavigate();
    const [address, setAddress] = useState("");
    const [placingOrder, setPlacingOrder] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const placeOrder = async () => {
        setMessage("");
        setError("");

        if (cart.length === 0) {
            setError("Your cart is empty.");
            return;
        }

        if (!address.trim()) {
            setError("Delivery address is required.");
            return;
        }

        try {
            setPlacingOrder(true);
            await axios.post(`${API_BASE_URL}/orders`, {
                address: address.trim(),
                items: cart.map((item) => ({
                    foodId: item._id,
                    quantity: item.quantity,
                })),
            });

            clearCart();
            setMessage("Order placed successfully.");
            setTimeout(() => navigate("/Orders"), 800);
        } catch (err) {
            setError(err?.response?.data?.message || "Failed to place order.");
        } finally {
            setPlacingOrder(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#fcfaf8] px-4 py-12 sm:px-8">
            <div className="mx-auto max-w-3xl rounded-3xl border border-[#f0e6df] bg-white p-8 shadow-[0_25px_45px_rgba(15,23,42,0.08)]">
                <h1 className="text-3xl font-black text-gray-900">Checkout</h1>
                <p className="mt-2 text-sm text-gray-500">Confirm your address and place your order.</p>

                <div className="mt-8 space-y-4">
                    <label className="block text-sm font-semibold text-gray-700">Delivery Address</label>
                    <textarea
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="min-h-32 w-full rounded-xl border border-[#e5e8f2] px-4 py-3 text-sm outline-none"
                        placeholder="Enter full delivery address"
                    />
                </div>

                <div className="mt-8 rounded-2xl border border-[#f1f3f7] bg-[#fafbfd] p-5">
                    <p className="text-sm text-gray-500">Items in cart: {cart.length}</p>
                    <p className="mt-2 text-2xl font-black text-gray-900">Total: ${(totalPrice * 1.1).toFixed(2)}</p>
                    <p className="mt-1 text-xs text-gray-400">Includes estimated 10% tax.</p>
                </div>

                {message && <p className="mt-5 text-sm font-semibold text-green-600">{message}</p>}
                {error && <p className="mt-5 text-sm font-semibold text-red-500">{error}</p>}

                <button
                    type="button"
                    disabled={placingOrder}
                    onClick={placeOrder}
                    className="mt-8 w-full rounded-xl bg-[#e25a27] px-6 py-3 text-sm font-black text-white hover:bg-[#c94a1b] disabled:cursor-not-allowed disabled:opacity-70"
                >
                    {placingOrder ? "Placing Order..." : "Place Order"}
                </button>
            </div>
        </div>
    );
}

export default Checkout;