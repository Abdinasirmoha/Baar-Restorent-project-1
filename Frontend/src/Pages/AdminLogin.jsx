import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/admin/login`, {
        email,
        password,
      });

      // Save token and admin data
      localStorage.setItem("adminToken", res.data.token);
      localStorage.setItem("adminUser", JSON.stringify(res.data.admin));

      // Redirect to Kitchen Command (Dashboard)
      navigate("/Dashboard");
      
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to login. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-md rounded-[2rem] border border-orange-100 bg-white p-10 shadow-[0_15px_60px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6B35] mb-2">Kitchen Command</p>
            <h1 className="text-3xl font-black text-[#1a1c29]">Admin Portal</h1>
        </div>

        {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#fff0f0] border border-[#ffcccc] text-[#ff4c4c] font-bold text-xs text-center">
              {error}
            </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@baar.com"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 rounded-xl bg-[#FF6B35] py-4 text-[15px] font-black text-white transition-all hover:bg-[#e95d2b] shadow-[0_8px_20px_rgba(255,107,53,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(255,107,53,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
          >
            {loading ? "Authenticating..." : "SECURE LOGIN"}
          </button>
        </form>
      </div>
    </section>
  );
}

export default AdminLogin;
