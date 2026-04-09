import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

function Register() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    if (!firstName || !lastName || !email || !password) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(`${API_BASE_URL}/users/register`, {
        firstName,
        lastName,
        email,
        password,
      });

      // Send them to Login rather than Home
      navigate("/Login");
    } catch (err) {
      setError(err.response?.data?.message || "Failed to register. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-[70vh] bg-[#fffaf3] px-6 py-14 md:px-12 flex items-center justify-center">
      <div className="mx-auto w-full max-w-lg rounded-[2rem] border border-orange-100 bg-white p-10 shadow-[0_15px_60px_rgba(0,0,0,0.06)]">
        <div className="text-center mb-8">
            <p className="text-[11px] font-black uppercase tracking-[0.2em] text-[#FF6B35] mb-2">Create Account</p>
            <h1 className="text-3xl font-black text-[#1a1c29]">Register</h1>
        </div>

        {error && (
            <div className="mb-6 p-4 rounded-xl bg-[#fff0f0] border border-[#ffcccc] text-[#ff4c4c] font-bold text-xs text-center">
              {error}
            </div>
        )}

        <form onSubmit={handleRegister} className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="md:col-span-1 border-transparent focus-within:border-transparent">
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">First Name</label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder="First name"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="md:col-span-1">
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">Last Name</label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder="Last name"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="md:col-span-2">
            <label className="mb-2 block text-[11px] font-black tracking-widest text-[#6d7183] uppercase">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              className="w-full bg-[#f6f5f1] rounded-xl px-5 py-4 text-[15px] font-semibold text-[#1a1c29] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#FF6B35] transition-all placeholder:text-gray-400"
            />
          </div>

          <div className="md:col-span-2 mt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-[#FFB800] py-4 text-[15px] font-black text-slate-800 transition-all hover:bg-[#eda900] shadow-[0_8px_20px_rgba(255,184,0,0.3)] hover:-translate-y-1 hover:shadow-[0_12px_25px_rgba(255,184,0,0.4)] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
            >
              {loading ? "REGISTERING..." : "REGISTER"}
            </button>
          </div>
        </form>

        <p className="mt-6 text-center text-[13px] font-bold text-[#6d7183]">
           Already have an account? <Link to="/Login" className="text-[#FF6B35] hover:underline">Login here</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
