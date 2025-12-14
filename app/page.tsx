"use client";

import Link from "next/link";
import { ShieldCheck, Clock, MapPin, Star, Smartphone, ChevronRight } from "lucide-react";

// 1. BRAND DATA (Colors are used by the Logo Generator)
const brands = [
  { name: "Apple", id: "apple", color: "#000000" },
  { name: "Samsung", id: "samsung", color: "#1428A0" },
  { name: "Xiaomi", id: "xiaomi", color: "#FF6900" },
  { name: "Vivo", id: "vivo", color: "#415FFF" },
  { name: "Oppo", id: "oppo", color: "#115D4E" },
  { name: "Realme", id: "realme", color: "#FFC915" },
  { name: "OnePlus", id: "oneplus", color: "#F50514" },
  { name: "Google", id: "google", color: "#4285F4" },
  { name: "Poco", id: "poco", color: "#FFD400" },
  { name: "iQOO", id: "iqoo", color: "#000000" },
  { name: "Motorola", id: "motorola", color: "#001489" },
  { name: "Infinix", id: "infinix", color: "#000000" },
  { name: "Honor", id: "honor", color: "#000000" },
  { name: "Nokia", id: "nokia", color: "#124191" },
  { name: "Asus", id: "asus", color: "#00539B" },
  { name: "Nothing", id: "nothing", color: "#000000" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 backdrop-blur-sm animate-fade-in-up">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-blue-100">Rated #1 in Doorstep Repair</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Broken Phone? <br/>
            <span className="text-blue-400">We Fix It Fast.</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Premium OLED & Advance repair at your doorstep. <br className="hidden md:block" />
            Save up to 40% compared to service centers.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto mt-8 pt-8 border-t border-slate-700/50">
            <div className="flex items-center justify-center gap-3 text-slate-200">
              <Clock className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">30 Min Repair</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-200">
              <ShieldCheck className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">6 Months Warranty</span>
            </div>
            <div className="flex items-center justify-center gap-3 text-slate-200">
              <MapPin className="w-5 h-5 text-blue-400" />
              <span className="font-semibold">Doorstep Service</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- BRAND GRID --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            Select Your Brand
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Link 
                key={brand.id}
                href={`/repair/${brand.id}`}
                className="group flex flex-col items-center justify-center p-6 rounded-xl border border-slate-100 bg-slate-50 hover:bg-white hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer h-32"
              >
                {/* THE MAGIC LOGO COMPONENT */}
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  <BrandLogo id={brand.id} color={brand.color} />
                </div>
                <span className="text-sm font-bold text-slate-700 group-hover:text-blue-700 transition-colors">
                  {brand.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
        <p className="text-center text-slate-400 text-sm mt-8">
          Trusted by 5,000+ happy customers across the city.
        </p>
      </div>
    </main>
  );
}

// --- SPECIAL COMPONENT TO DRAW LOGOS WITH CODE ---
// This replaces missing images with SVG graphics
function BrandLogo({ id, color }: { id: string, color: string }) {
  // 1. APPLE (Special Icon)
  if (id === "apple") {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10 text-slate-800">
        <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.74 1.18 0 2.45-1.02 3.65-.89.65.03 2.13.16 3.06 1.34-2.62 1.34-2.2 4.6.41 5.96-.5 2.16-1.21 4.22-2.2 5.82zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.54 4.5-3.74 4.25z"/>
      </svg>
    );
  }

  // 2. XIAOMI (Orange Box)
  if (id === "xiaomi") {
    return (
      <svg viewBox="0 0 40 40" className="w-10 h-10">
        <rect width="40" height="40" rx="12" fill="#FF6900" />
        <text x="20" y="27" fontFamily="sans-serif" fontWeight="bold" fontSize="22" fill="white" textAnchor="middle">mi</text>
      </svg>
    );
  }

  // 3. GOOGLE (G logo colors)
  if (id === "google") {
    return (
       <svg viewBox="0 0 24 24" className="w-10 h-10">
        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
      </svg>
    );
  }

  // 4. TEXT BASED LOGOS (Vivo, Realme, Poco, etc.)
  // We draw the brand name in its official color using SVG text
  return (
    <svg viewBox="0 0 120 40" className="w-28 h-full">
      <text 
        x="50%" 
        y="55%" 
        dominantBaseline="middle" 
        textAnchor="middle" 
        fontFamily="sans-serif" 
        fontWeight="800" 
        fontSize="32" 
        fill={color}
        className="tracking-tighter"
      >
        {id === "iqoo" ? "iQOO" : id === "poco" ? "POCO" : id.toUpperCase()}
      </text>
    </svg>
  );
}