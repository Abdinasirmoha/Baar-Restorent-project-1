import React, { useState } from "react";
import axios from "axios";
import { API_BASE_URL } from "../config/api";

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    try {
      await axios.post(`${API_BASE_URL}/messages`, formData);
      setStatus("success");
      setFormData({ name: "", phone: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    } catch (err) {
      setStatus("error");
      setTimeout(() => setStatus("idle"), 5000);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fc] font-sans text-gray-800 pb-20">
      
      {/* Hero Section */}
      <div 
        className="relative pt-20 pb-32 px-6 md:px-12 text-center text-white overflow-hidden shadow-sm bg-cover"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=2000')", backgroundPosition: "center 60%" }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#e25a27]/90 to-[#c94a1b]/95 mix-blend-multiply"></div>
        
        <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
          <span className="text-sm font-black uppercase tracking-[0.3em] text-[#ffddc2] mb-3">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-sm">
            Contact Us
          </h1>
          <p className="text-lg md:text-xl font-medium text-white/90 max-w-xl leading-relaxed">
            BAAR RESTORENT is ready to provide the best culinary experience. Reach out to us for reservations, catering, or any feedback!
          </p>
        </div>

        {/* Decorative background shapes */}
        <div className="absolute top-[-50px] left-[-50px] w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-100px] right-[-50px] w-96 h-96 bg-black/10 rounded-full blur-3xl"></div>
      </div>

      {/* Main Content Container (Overlapping) */}
      <div className="mx-auto w-full max-w-6xl px-6 md:px-12 -mt-16 relative z-20 mb-16">
        <div className="bg-white rounded-[2rem] shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:shadow-2xl transition-all duration-300 border border-gray-100 overflow-hidden flex flex-col md:flex-row">
          
          {/* Left Column: Get in touch */}
          <div className="md:w-[45%] p-10 lg:p-14 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 mb-3">Get in touch</h2>
              <p className="text-gray-500 text-sm leading-relaxed font-medium mb-12 pr-4">
                We'd love to hear from you. Whether it's a special request, a catering inquiry, or just a quick question about our menu, we are here to help.
              </p>

              <div className="flex flex-col gap-8">
                {/* Location */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fceee8] flex items-center justify-center flex-shrink-0 text-[#e25a27] shadow-[0_4px_10px_rgba(226,90,39,0.15)] mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base mb-1.5">BAAR RESTORENT    </h4>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">Maka Al-Mukarama Road<br/>Mogadishu, Somalia</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fceee8] flex items-center justify-center flex-shrink-0 text-[#e25a27] shadow-[0_4px_10px_rgba(226,90,39,0.15)] mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base mb-1.5">Email Us</h4>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">info@baarrestorent.com<br/>support@baarrestorent.com</p>
                  </div>
                </div>

                {/* Call */}
                <div className="flex gap-5 items-start">
                  <div className="w-12 h-12 rounded-full bg-[#fceee8] flex items-center justify-center flex-shrink-0 text-[#e25a27] shadow-[0_4px_10px_rgba(226,90,39,0.15)] mt-1">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
                  </div>
                  <div>
                    <h4 className="font-extrabold text-gray-900 text-base mb-1.5">Call Us</h4>
                    <p className="text-gray-500 text-sm font-medium leading-relaxed">Phone : +252 61 000 0000<br/>Hotline : +252 770895033</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-16">
              <h4 className="font-extrabold text-gray-900 text-sm mb-4">Follow our social media</h4>
              <div className="flex gap-3">
                <a href="#" className="w-9 h-9 flex justify-center items-center rounded-full bg-[#1877f2] text-white hover:-translate-y-1 transition duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 flex justify-center items-center rounded-full bg-[#e1306c] text-white hover:-translate-y-1 transition duration-300 shadow-md">
                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 flex justify-center items-center rounded-full bg-[#1da1f2] text-white hover:-translate-y-1 transition duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/></svg>
                </a>
                <a href="#" className="w-9 h-9 flex justify-center items-center rounded-full bg-[#ff0000] text-white hover:-translate-y-1 transition duration-300 shadow-md">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Send us a message */}
          <div className="md:w-[55%] p-10 lg:p-14 bg-white">
            <h2 className="text-3xl font-extrabold text-gray-900 mb-8">Send us a message</h2>
            
            {status === "success" && (
              <div className="mb-6 bg-[#e7f7ed] text-[#1c9849] px-6 py-4 rounded-xl font-bold flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                Message sent securely! We'll reply soon.
              </div>
            )}

            {status === "error" && (
              <div className="mb-6 bg-[#ffe4e4] text-[#ff4c4c] px-6 py-4 rounded-xl font-bold flex items-center gap-3">
                <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
                Failed to send. Please check your connection.
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-gray-500 capitalize">Name</label>
                  <input required name="name" value={formData.name} onChange={handleChange} type="text" placeholder="Name" className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e25a27]/20 focus:border-[#e25a27] transition-all" />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[12px] font-bold text-gray-500 capitalize">Phone</label>
                  <input name="phone" value={formData.phone} onChange={handleChange} type="text" placeholder="Phone" className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e25a27]/20 focus:border-[#e25a27] transition-all" />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-gray-500 capitalize">Email</label>
                <input required name="email" value={formData.email} onChange={handleChange} type="email" placeholder="Email Address" className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e25a27]/20 focus:border-[#e25a27] transition-all" />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[12px] font-bold text-gray-500 capitalize">Message</label>
                <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" placeholder="Message" className="w-full bg-gray-50 border border-transparent hover:border-gray-200 rounded-xl px-5 py-3.5 text-sm font-semibold text-gray-900 focus:outline-none focus:bg-white focus:ring-2 focus:ring-[#e25a27]/20 focus:border-[#e25a27] transition-all resize-none"></textarea>
              </div>

              <button disabled={status === "loading"} type="submit" className="mt-4 bg-[#e25a27] text-white font-bold tracking-wide text-[14px] py-4 rounded-xl shadow-[0_8px_20px_rgba(226,90,39,0.25)] hover:-translate-y-0.5 hover:bg-[#c94a1b] hover:shadow-[0_12px_25px_rgba(226,90,39,0.35)] transition-all disabled:opacity-70 disabled:cursor-not-allowed">
                {status === "loading" ? "Sending..." : "Send"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Embedded Map Section */}
      <div className="w-full h-[400px] grayscale opacity-90 transition duration-700 hover:opacity-100 hover:grayscale-0">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127504.42597405233!2d45.247544078734254!3d2.0469345244576365!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3d58425955ce6b53%3A0x62ccbb25bb40428f!2sMogadishu%2C%20Somalia!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
}
