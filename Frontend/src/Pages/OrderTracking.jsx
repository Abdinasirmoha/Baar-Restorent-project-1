import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

function OrderTracking() {
    // For demonstration purposes, we will mock the tracking state.
    // In a real app, this would use the Order context or fetch from the backend via order ID.

    const [progress, setProgress] = useState(1); // 0=Pending, 1=Preparing, 2=Ready, 3=Delivered

    useEffect(() => {
        // Auto-progress demo
        const timer1 = setTimeout(() => setProgress(1), 3000);
        const timer2 = setTimeout(() => setProgress(2), 7000);
        return () => { clearTimeout(timer1); clearTimeout(timer2); }
    }, []);

    return (
        <div className="bg-[#fcfbf9] min-h-screen pt-12 pb-24 px-4 sm:px-8 lg:px-16 font-sans text-gray-800">
            {/* Top Banner */}
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
                <div>
                    <span className="inline-block px-4 py-1.5 bg-[#fceee8] text-[#c94a1b] text-[10px] font-extrabold uppercase tracking-widest rounded-full mb-4">Active Journey</span>
                    <h1 className="text-4xl md:text-5xl font-black text-[#1a1c29] mb-2 tracking-tight">Order #12345 Status</h1>
                    <p className="text-[#6d7183] text-[15px] font-medium">Your gourmet experience is being curated with precision.</p>
                </div>
                
                <div className="bg-white rounded-full p-4 px-6 md:px-8 shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-gray-100 flex items-center gap-5">
                    <div className="w-12 h-12 rounded-full bg-[#fceee8] flex items-center justify-center text-[#c94a1b]">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zm3.3 14.71L11 12.41V7h2v4.59l3.71 3.71-1.42 1.41z"/></svg>
                    </div>
                    <div>
                        <p className="text-[10px] font-black tracking-widest text-gray-400 uppercase mb-0.5">Estimated Arrival</p>
                        <p className="text-2xl font-black text-[#c94a1b]">12:45 PM</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12">
                
                {/* Left side: Timeline and Map */}
                <div className="lg:w-[65%] flex flex-col gap-8">
                    {/* Timeline Box */}
                    <div className="bg-white rounded-[2.5rem] p-10 shadow-[0_15px_60px_rgba(0,0,0,0.05)] border border-gray-100 flex justify-center items-center relative min-h-[160px]">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-1 bg-gray-200 z-0"></div>
                        <div className="absolute top-1/2 left-[15%] h-1 bg-[#c94a1b] z-0 transition-all duration-1000" style={{ width: progress === 0 ? "0%" : progress === 1 ? "35%" : progress === 2 ? "70%" : "100%" }}></div>
                        
                        <div className="w-[85%] flex justify-between relative z-10">
                            {/* Step 0: Pending */}
                            <div className="flex flex-col items-center gap-3 w-20">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${progress >= 0 ? "bg-[#c43a04] text-white shadow-xl" : "bg-gray-100 text-gray-400 border border-white"}`}>
                                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/></svg>
                                </div>
                                <div className="text-center">
                                    <p className={`text-[13px] font-black ${progress >= 0 ? "text-[#1a1c29]" : "text-gray-400"}`}>Pending</p>
                                    {progress >= 0 && <p className="text-[10px] text-gray-400 font-bold">12:10 PM</p>}
                                </div>
                            </div>
                            {/* Step 1: Preparing */}
                            <div className="flex flex-col items-center gap-3 w-20">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${progress >= 1 ? "bg-[#e25a27] text-white shadow-xl shadow-orange-500/30" : "bg-gray-100 text-gray-400 border-[3px] border-white"}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>
                                </div>
                                <div className="text-center">
                                    <p className={`text-[13px] font-black ${progress >= 1 ? "text-[#e25a27]" : "text-gray-400"}`}>Preparing</p>
                                    {progress === 1 && <p className="text-[10px] text-gray-400 font-bold">In Progress</p>}
                                </div>
                            </div>
                            {/* Step 2: Ready */}
                            <div className="flex flex-col items-center gap-3 w-20">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${progress >= 2 ? "bg-[#cca768] text-white shadow-xl shadow-yellow-500/30" : "bg-gray-100 text-gray-400 border-[3px] border-white"}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path strokeLinecap="round" strokeLinejoin="round" d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4m5-4l4 4 4-4M12 15V3" /></svg>
                                </div>
                                <div className="text-center">
                                    <p className={`text-[13px] font-black ${progress >= 2 ? "text-[#cca768]" : "text-gray-500"}`}>Ready</p>
                                </div>
                            </div>
                            {/* Step 3: Delivered */}
                            <div className="flex flex-col items-center gap-3 w-20">
                                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${progress >= 3 ? "bg-[#38a169] text-white shadow-xl shadow-green-500/30" : "bg-gray-100 text-gray-400 border-[3px] border-white"}`}>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"><path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>
                                </div>
                                <div className="text-center">
                                    <p className={`text-[13px] font-black ${progress >= 3 ? "text-[#38a169]" : "text-gray-500"}`}>Delivered</p>
                                </div>
                            </div>
                        </div>
                        {progress === 1 && <div className="absolute top-4 right-4 bg-[#c8a14d] text-white text-[10px] font-bold px-3 py-1 rounded-full">PREPARING</div>}
                    </div>

                    {/* Map Box */}
                    <div className="bg-[#e4ebdb] rounded-[2.5rem] h-[400px] shadow-[0_15px_60px_rgba(0,0,0,0.05)] border border-[#d2dcc4] overflow-hidden relative flex flex-col justify-end">
                        <div className="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cartographer.png')] opacity-30"></div>
                        {/* Map Vector Mockup */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-80 z-0">
                            <div className="w-[80%] h-[70%] border-[6px] border-white/40 rounded-3xl relative">
                                <div className="absolute left-1/4 top-1/4 w-4 h-4 rounded-full bg-[#e25a27] border-[4px] border-white shadow-xl shadow-[#e25a27]"></div>
                                <div className="absolute right-1/4 bottom-1/4 w-4 h-4 rounded-full bg-[#1a1c29] border-[4px] border-white shadow-xl"></div>
                                {/* Path */}
                                <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M25 25 L 25 60 L 40 60 L 75 75" fill="none" stroke="white" strokeWidth="2.5" strokeDasharray="5,5"></path>
                                </svg>
                            </div>
                        </div>

                        {/* Courier Info Floating Island */}
                        <div className="bg-white/90 backdrop-blur-md rounded-[2rem] mx-6 mb-6 p-4 px-6 flex items-center shadow-lg relative z-10 border border-white">
                            <div className="w-12 h-12 bg-[#ffecca] rounded-full border-2 border-white overflow-hidden shadow-sm mr-4 flex-shrink-0 flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#1a1c29]" fill="currentColor" viewBox="0 0 24 24"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
                            </div>
                            <div>
                                <p className="text-[10px] font-black tracking-widest text-[#d85c2c] uppercase">Your Courier</p>
                                <h4 className="text-[16px] font-bold text-[#1a1c29]">Marco Rossi</h4>
                            </div>
                            <div className="mx-auto"></div>
                            <div className="flex gap-3">
                                <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center text-[#c94a1b] hover:bg-[#c94a1b] hover:text-white transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20.01 15.38c-1.23 0-2.42-.2-3.53-.56a.977.977 0 00-1.01.24l-1.57 1.97c-2.83-1.35-5.48-3.9-6.89-6.83l1.95-1.66c.27-.28.35-.67.24-1.02-.37-1.11-.56-2.3-.56-3.53 0-.54-.45-.99-.99-.99H4.19C3.65 3 3 3.24 3 3.99 3 13.28 10.73 21 20.01 21c.71 0 .99-.63.99-1.18v-3.45c0-.54-.45-.99-.99-.99z"/></svg>
                                </button>
                                <button className="w-10 h-10 rounded-full bg-white shadow-md border border-gray-50 flex items-center justify-center text-[#c94a1b] hover:bg-[#c94a1b] hover:text-white transition-colors">
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.17L4 17.17V4h16v12z"/></svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Right side: Order Details */}
                <div className="lg:w-[35%] space-y-6">
                    {/* Order Details Card */}
                    <div className="bg-[#f5f4ef] rounded-[2.5rem] p-8 sm:p-10 shadow-sm border border-[#edebe4]">
                        <h3 className="text-[20px] font-black text-[#1a1c29] mb-8">Order Details</h3>
                        
                        <div className="space-y-6 mb-8">
                            <div className="flex justify-between items-center bg-transparent">
                                <div className="flex gap-4 items-center">
                                    <span className="text-[13px] font-black text-[#c94a1b]">1x</span>
                                    <span className="text-[14px] font-bold text-[#1a1c29]">Truffle Tagliatelle</span>
                                </div>
                                <span className="text-[14px] font-black text-[#1a1c29]">$28.00</span>
                            </div>
                            <div className="flex justify-between items-center bg-transparent">
                                <div className="flex gap-4 items-center">
                                    <span className="text-[13px] font-black text-[#c94a1b]">2x</span>
                                    <span className="text-[14px] font-bold text-[#1a1c29]">Burrata Salad</span>
                                </div>
                                <span className="text-[14px] font-black text-[#1a1c29]">$34.00</span>
                            </div>
                            <div className="flex justify-between items-center bg-transparent">
                                <div className="flex gap-4 items-center">
                                    <span className="text-[13px] font-black text-[#c94a1b]">1x</span>
                                    <span className="text-[14px] font-bold text-[#1a1c29]">Barolo Reserva</span>
                                </div>
                                <span className="text-[14px] font-black text-[#1a1c29]">$85.00</span>
                            </div>
                        </div>

                        <div className="border-t border-[#e2dfd4] pt-8 space-y-4">
                            <div className="flex justify-between text-[13px] font-bold text-[#6d7183]">
                                <span>Subtotal</span>
                                <span>$147.00</span>
                            </div>
                            <div className="flex justify-between text-[13px] font-bold text-[#6d7183]">
                                <span>Delivery Fee</span>
                                <span>$4.50</span>
                            </div>
                            <div className="flex justify-between items-center pt-4">
                                <span className="text-xl font-black text-[#1a1c29]">Total</span>
                                <span className="text-2xl font-black text-[#c94a1b]">$151.50</span>
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <button className="w-full bg-[#d85c2c] text-white py-4 flex items-center justify-center gap-3 rounded-xl font-bold hover:bg-[#c94a1b] shadow-[0_8px_20px_rgba(216,92,44,0.3)] hover:-translate-y-1 transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Contact Support
                    </button>
                    <button className="w-full bg-white text-[#1a1c29] py-4 flex items-center justify-center gap-3 rounded-xl font-bold border border-gray-200 shadow-sm hover:bg-gray-50 hover:-translate-y-1 transition-all">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"><path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                        Download Invoice
                    </button>

                    {/* Delivery Block */}
                    <div className="bg-[#f9f9fa] rounded-3xl p-6 border border-[#eceef1] flex items-center gap-5 mt-8">
                        <div className="w-10 h-10 rounded-full bg-gray-200 text-[#1a1c29] flex items-center justify-center flex-shrink-0">
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>
                        </div>
                        <div>
                            <h4 className="font-bold text-[#1a1c29] text-[13px] mb-1">Delivery Address</h4>
                            <p className="text-[12px] text-gray-500 font-medium">452 Artisan Way, Penthouse B<br/>Culinary District, Gastronomy City<br/>90210</p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default OrderTracking;