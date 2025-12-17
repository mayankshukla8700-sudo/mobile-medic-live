import BrandGrid from "./components/BrandGrid";
import { Wrench, Battery, Shield, Zap } from "lucide-react";
import HeroCarousel from "./components/HeroCarousel";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      
      {/* 1. HERO SLIDER SECTION */}
      <HeroCarousel />

      {/* 2. TRUST BADGES (New!) */}
      <section className="w-full bg-white border-b border-slate-100 py-8 shadow-sm relative z-20 -mt-2 rounded-t-3xl md:rounded-none">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-3 gap-2 md:gap-8 divide-x divide-slate-100">
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-full shrink-0">
              <Shield className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs md:text-base font-bold text-slate-900">6 Months Warranty</h3>
              <p className="hidden md:block text-xs text-slate-500">On all screens & batteries</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
            <div className="p-3 bg-green-50 text-green-600 rounded-full shrink-0">
               <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs md:text-base font-bold text-slate-900">30 Mins Repair</h3>
              <p className="hidden md:block text-xs text-slate-500">Done at your doorstep</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs md:text-base font-bold text-slate-900">Expert Techs</h3>
              <p className="hidden md:block text-xs text-slate-500">Verified professionals</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BRAND SELECTION (ID added for scroll link) */}
      <div id="brands-section" className="w-full max-w-7xl px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Your Brand
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We repair all major brands. Premium parts, instant service, and unbeatable prices.
          </p>
        </div>
        
        <BrandGrid />
      </div>

      {/* 4. WHY CHOOSE US (Detailed) */}
      <section className="w-full bg-slate-900 text-white py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Why Delhi Trusts <br/><span className="text-blue-400">The Mobile Medic</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Forget leaving your phone at a shop for days. We bring the repair shop to your living room. 
              Our certified technicians arrive with all the tools needed to bring your device back to life 
              while you sip your coffee.
            </p>
            <ul className="space-y-4 pt-4">
              {['100% Data Safety (No Formatting)', 'Original Grade Quality Parts', 'No Hidden Fees', 'Pay After Repair'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative h-[400px] bg-slate-800 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl">
             {/* Simple visual representation of repair */}
             <div className="absolute inset-0 flex items-center justify-center">
                <Wrench className="w-32 h-32 text-slate-700 opacity-50" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl border border-white/10">
                    <p className="font-bold text-white">"My iPhone 13 looked brand new in 20 mins!"</p>
                    <p className="text-sm text-blue-300 mt-1">- Amit S., South Delhi</p>
                  </div>
                </div>
             </div>
          </div>
        </div>
      </section>

    </main>
  );
}