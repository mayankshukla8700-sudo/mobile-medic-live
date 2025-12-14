"use client";

import Link from "next/link";
import { ShieldCheck, Clock, MapPin, Star, Smartphone, ChevronRight } from "lucide-react";

// The Brands List
const brands = [
  "Apple", "Samsung", "Xiaomi", "Vivo", "Oppo", "Realme", 
  "OnePlus", "Google", "Poco", "iQOO", "Motorola", 
  "Infinix", "Honor", "Nokia", "Asus", "Nothing"
];

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION: The "Face" of the Brand --- */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-6">
          
          {/* Trust Badge */}
          <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 backdrop-blur-sm animate-fade-in-up">
            <Star className="w-4 h-4 text-yellow-400 fill-current" />
            <span className="text-sm font-medium text-blue-100">Rated #1 in Doorstep Repair</span>
          </div>

          {/* Main Headline */}
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
            Broken Phone? <br/>
            <span className="text-blue-400">We Fix It Fast.</span>
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Premium OLED & Glass replacement at your doorstep. <br className="hidden md:block" />
            Save up to 40% compared to service centers.
          </p>

          {/* Feature Grid (Trust Markers) */}
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

      {/* --- BRAND SELECTION GRID --- */}
      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 p-6 md:p-8">
          
          <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Smartphone className="w-5 h-5 text-blue-600" />
            Select Your Brand
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <Link 
                key={brand}
                href={`/repair/${brand.toLowerCase()}`}
                className="group flex flex-col items-center justify-center p-4 rounded-xl border border-slate-100 bg-slate-50 hover:bg-blue-50 hover:border-blue-200 transition-all cursor-pointer"
              >
                <span className="text-lg font-bold text-slate-700 group-hover:text-blue-700">
                  {brand}
                </span>
                <span className="text-xs text-slate-400 group-hover:text-blue-400 mt-1 flex items-center gap-1">
                  Check Price <ChevronRight className="w-3 h-3" />
                </span>
              </Link>
            ))}
          </div>

        </div>
        
        {/* Bottom Trust Text */}
        <p className="text-center text-slate-400 text-sm mt-8">
          Trusted by 5,000+ happy customers across the city.
        </p>
      </div>

    </main>
  );
}