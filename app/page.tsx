"use client";

import Link from "next/link";
import { ShieldCheck, Clock, MapPin, Star, Smartphone, ChevronRight } from "lucide-react";

// 1. BRAND DATA (Pointing to your LOCAL 'public/brands' folder)
const brands = [
  { name: "Apple", id: "apple", logo: "/brands/apple.png" },
  { name: "Samsung", id: "samsung", logo: "/brands/samsung.png" },
  { name: "Xiaomi", id: "xiaomi", logo: "/brands/xiaomi.png" },
  { name: "Vivo", id: "vivo", logo: "/brands/vivo.png" },
  { name: "Oppo", id: "oppo", logo: "/brands/oppo.png" },
  { name: "Realme", id: "realme", logo: "/brands/realme.png" },
  { name: "OnePlus", id: "oneplus", logo: "/brands/oneplus.png" },
  { name: "Google", id: "google", logo: "/brands/google.png" },
  { name: "Poco", id: "poco", logo: "/brands/poco.png" },
  { name: "iQOO", id: "iqoo", logo: "/brands/iqoo.png" },
  { name: "Motorola", id: "motorola", logo: "/brands/motorola.png" },
  { name: "Infinix", id: "infinix", logo: "/brands/infinix.png" },
  { name: "Honor", id: "honor", logo: "/brands/honor.png" },
  { name: "Nokia", id: "nokia", logo: "/brands/nokia.png" },
  { name: "Asus", id: "asus", logo: "/brands/asus.png" },
  { name: "Nothing", id: "nothing", logo: "/brands/nothing.png" },
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 backdrop-blur-sm animate-fade-in-up">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-blue-100">Rated #1 in Doorstep Repair</span>
          </div>

          {/* Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Broken Phone? <br/>
            <span className="text-blue-400">We Fix It Fast.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Premium OLED & Advance repair at your doorstep. <br className="hidden md:block" />
            Save up to 40% compared to service centers.
          </p>

          {/* Features */}
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

      {/* --- BRAND GRID (Powered by Local Files) --- */}
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
                {/* LOGO IMAGE */}
                <div className="h-12 w-full flex items-center justify-center mb-3">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-full max-w-[80%] object-contain opacity-90 group-hover:opacity-100 group-hover:scale-110 transition-all"
                  />
                </div>
                
                {/* Brand Name */}
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