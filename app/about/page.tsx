import { MapPin, Phone, Mail, Clock, CheckCircle2 } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HERO SECTION --- */}
      <section className="bg-slate-900 text-white py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            We Are <span className="text-blue-500">The Mobile Medic</span>
          </h1>
          <p className="text-lg text-slate-300 leading-relaxed">
            Founded with a simple mission: To make smartphone repair <span className="text-white font-semibold">fast, transparent, and affordable</span> for everyone in India. We don't just fix phones; we bring them back to life.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 space-y-12">
        
        {/* --- STATS / HIGHLIGHTS --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">30 Min Repair</h3>
            <p className="text-slate-500 text-sm mt-2">Most repairs are done right before your eyes in under 30 minutes.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">6 Months Warranty</h3>
            <p className="text-slate-500 text-sm mt-2">We stand by our quality. If it breaks again, we fix it for free.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <MapPin className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Doorstep Service</h3>
            <p className="text-slate-500 text-sm mt-2">You don't come to us; we come to you. Home, office, or cafe.</p>
          </div>
        </div>

        {/* --- CONTACT & LOCATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          
          {/* Contact Details */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Visit Our Shop</h2>
            <p className="text-slate-500">Prefer to visit us? Walk-ins are always welcome.</p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900">Address</h4>
                  <p className="text-slate-600">Vijay Vihar, Loni<br/>Ghaziabad, Uttar Pradesh</p>
                </div>
              </div>
              
              <div className="flex items-start gap-4">
                <Phone className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900">Phone</h4>
                  <p className="text-slate-600">+91 8920766791</p>
                  <p className="text-xs text-slate-400">Mon - Sat (10 AM - 8 PM)</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Mail className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900">Email</h4>
                  <p className="text-slate-600">support@mobilemedic.in</p>
                </div>
              </div>
            </div>
          </div>

          {/* Embed Map (Optional Visual Placeholder) */}
          <div className="h-full min-h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-300">
             {/* This is a placeholder for a Google Map. You can embed a real iframe here later! */}
             <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
                <MapPin className="w-12 h-12 mb-2 opacity-50" />
                <span className="font-medium">Map Location Loading...</span>
             </div>
             {/* If you have a Google Maps Embed link, paste the iframe here! */}
          </div>

        </div>

      </div>
    </main>
  );
}