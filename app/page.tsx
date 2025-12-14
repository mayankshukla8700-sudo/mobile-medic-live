"use client";

import Link from "next/link";
import { ShieldCheck, Clock, MapPin, Star, Smartphone, ChevronRight } from "lucide-react";

// 1. BRAND DATA WITH MANUAL FIXES FOR BROKEN LOGOS
const brands = [
  { 
    name: "Apple", 
    id: "apple", 
    logo: "https://cdn.simpleicons.org/apple/000000" 
  },
  { 
    name: "Samsung", 
    id: "samsung", 
    logo: "https://cdn.simpleicons.org/samsung/1428A0" 
  },
  { 
    name: "Xiaomi", 
    id: "xiaomi", 
    logo: "https://cdn.simpleicons.org/xiaomi/FF6900" 
  },
  { 
    name: "Vivo", 
    id: "vivo", 
    // FIXED: Direct PNG link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/Vivo_mobile_logo.png/2560px-Vivo_mobile_logo.png" 
  },
  { 
    name: "Oppo", 
    id: "oppo", 
    logo: "https://cdn.simpleicons.org/oppo/115D4E" 
  },
  { 
    name: "Realme", 
    id: "realme", 
    // FIXED: Direct PNG link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Realme_logo.png/1200px-Realme_logo.png" 
  },
  { 
    name: "OnePlus", 
    id: "oneplus", 
    logo: "https://cdn.simpleicons.org/oneplus/F50514" 
  },
  { 
    name: "Google", 
    id: "google", 
    logo: "https://cdn.simpleicons.org/google/4285F4" 
  },
  { 
    name: "Poco", 
    id: "poco", 
    // FIXED: Direct PNG link (Yellow/Black)
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b8/POCO_Logo.svg/2560px-POCO_Logo.svg.png" 
  },
  { 
    name: "iQOO", 
    id: "iqoo", 
    // FIXED: Direct PNG link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/52/IQOO_logo.png/1200px-IQOO_logo.png" 
  },
  { 
    name: "Motorola", 
    id: "motorola", 
    logo: "https://cdn.simpleicons.org/motorola/001489" 
  },
  { 
    name: "Infinix", 
    id: "infinix", 
    // FIXED: Direct PNG link
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Infinix_Mobility_logo.png/2560px-Infinix_Mobility_logo.png" 
  },
  { 
    name: "Honor", 
    id: "honor", 
    logo: "https://cdn.simpleicons.org/honor/000000" 
  },
  { 
    name: "Nokia", 
    id: "nokia", 
    logo: "https://cdn.simpleicons.org/nokia/124191" 
  },
  { 
    name: "Asus", 
    id: "asus", 
    logo: "https://cdn.simpleicons.org/asus/00539B" 
  },
  { 
    name: "Nothing", 
    id: "nothing", 
    // FIXED: Direct PNG link (Black Text)
    logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Nothing_%28technology_company%29_Logo.svg/1200px-Nothing_%28technology_company%29_Logo.svg.png" 
  },
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

      {/* --- BRAND GRID (Fixed Logos) --- */}
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
                <div className="h-10 w-full flex items-center justify-center mb-3">
                  <img 
                    src={brand.logo} 
                    alt={brand.name} 
                    className="h-full max-w-[80%] object-contain opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all"
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