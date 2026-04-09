import React, { useState, useEffect } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";
import { API_BASE_URL } from "../config/api";

export default function Messages() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await axios.get(`${API_BASE_URL}/messages`);
        setMessages(res.data);
      } catch (error) {
        console.error("Failed to load messages", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMessages();
  }, []);

  const formatTime = (dateString) => {
    const options = { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex bg-[#fcfcfd] min-h-screen font-sans text-[#1c1e27]">
      <Sidebar className="m-6 h-[calc(100vh-3rem)] shrink-0" />
      <main className="flex-1 p-8 lg:p-12 overflow-y-auto ml-2">
        <div className="max-w-[1400px] mx-auto relative">
          <div className="mb-8 relative z-10">
            <p className="text-[10px] font-black tracking-[0.2em] text-[#848796] mb-3 uppercase">
              COMMUNICATIONS <span className="mx-1 text-[#d8d9de]">/</span> <span className="text-[#d85c2c]">INBOX</span>
            </p>
            <h1 className="text-[2.5rem] font-bold tracking-tight text-[#1a1c29] leading-none mb-1">Messages</h1>
          </div>

          <section className="mt-8 space-y-4 relative z-10 w-full max-w-4xl">
            {loading ? (
              <div className="flex justify-center py-10">
                <div className="w-8 h-8 border-4 border-[#f0f2f6] border-t-[#d85c2c] rounded-full animate-spin"></div>
              </div>
            ) : messages.length === 0 ? (
              <p className="text-[#848796] font-medium text-sm">No messages available.</p>
            ) : (
              messages.map((message) => (
                <article
                  key={message._id}
                  className="rounded-[2rem] border border-[#f4f5f9] bg-white p-8 shadow-[0_8px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.06)] transition-all"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#f4f6fa] text-[#4a4f61] font-black flex items-center justify-center uppercase">
                        {message.name.charAt(0)}
                      </div>
                      <div>
                        <h2 className="text-base font-black text-[#1a1c29]">{message.name}</h2>
                        <p className="text-[#a5a8b5] font-medium text-xs">{message.email}</p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#a5a8b5] bg-[#f9fafc] px-3 py-1.5 rounded-lg border border-[#eaeef3]">
                      {formatTime(message.createdAt)}
                    </span>
                  </div>
                  {message.phone && (
                    <p className="text-[#e25a27] font-black text-xs mb-3 uppercase tracking-wide border-b border-[#f4f5f9] pb-3">📞 {message.phone}</p>
                  )}
                  <p className="mt-2 text-sm text-[#1a1c29] leading-relaxed font-semibold">{message.message}</p>
                </article>
              ))
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
