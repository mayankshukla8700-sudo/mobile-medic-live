import BrandGrid from "./components/BrandGrid"; 
import HeroCarousel from "./components/HeroCarousel"; 
import { Wrench, Shield, Zap } from "lucide-react";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center bg-slate-50">
      
      {/* 1. HERO SLIDER SECTION */}
      <HeroCarousel />

      {/* 2. TRUST BADGES */}
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
              <h3 className="text-xs md:text-base font-bold text-slate-900">Same Day Delivery</h3>
              <p className="hidden md:block text-xs text-slate-500">Free Pickup & Drop</p>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-3 text-center md:text-left px-2">
            <div className="p-3 bg-purple-50 text-purple-600 rounded-full shrink-0">
              <Wrench className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xs md:text-base font-bold text-slate-900">Expert Techs</h3>
              <p className="hidden md:block text-xs text-slate-500">Lab-tested quality</p>
            </div>
          </div>

        </div>
      </section>

      {/* 3. BRAND SELECTION */}
      <div id="brands-section" className="w-full max-w-7xl px-4 py-16 space-y-12">
        <div className="text-center space-y-4">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 tracking-tight">
            Select Your Brand
          </h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            We repair all major brands. Premium parts, instant service, and unbeatable prices.
          </p>
        </div>
        
        {/* THIS IS THE COMPONENT THAT SHOWS ICONS */}
        <BrandGrid />
      </div>

      {/* 4. WHY CHOOSE US */}
      <section className="w-full bg-slate-900 text-white py-20 mt-10">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">Why Delhi Trusts <br/><span className="text-blue-400">The Mobile Medic</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              We know how busy you are. That is why we offer a hassle-free <strong>Pick & Drop Service</strong>. 
              We collect your device, repair it in our specialized lab with advanced tools, and deliver it 
              back to you the same day. Safe, simple, and secure.
            </p>
            <ul className="space-y-4 pt-4">
              {['100% Data Safety (No Formatting)', 'Original Grade Quality Parts', 'No Hidden Fees', 'Pay After Delivery'].map((item, i) => (
                <li key={i} className="flex items-center gap-3 font-medium">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">✓</div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          
          {/* OPTION 3: LIFETIME WARRANTY BOX */}
          <div className="relative h-[400px] bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl overflow-hidden border border-slate-700 shadow-2xl flex flex-col items-center justify-center p-8 text-center">
            <div className="w-24 h-24 bg-blue-500/20 rounded-full flex items-center justify-center mb-6 ring-4 ring-blue-500/10">
              <Shield className="w-12 h-12 text-blue-400" />
            </div>
            
            <h3 className="text-2xl font-bold text-white mb-2">6 Months Warranty</h3>
            <p className="text-slate-400 mb-8 max-w-xs">We stand by our quality. If our part fails, we replace it for free.</p>
            
            <div className="grid grid-cols-2 gap-4 w-full max-w-sm">
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-2xl font-bold text-green-400">Fast</div>
                <div className="text-xs text-slate-500">Same Day Delivery</div>
              </div>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700">
                <div className="text-2xl font-bold text-yellow-400">Reliable</div>
                <div className="text-xs text-slate-500">Best In Budget</div>
              </div>
            </div>
          </div>
          {/* END OPTION 3 */}

        </div>
      </section>

    </main>
  );
}