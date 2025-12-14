import { MapPin, Phone, Mail, Truck, CheckCircle2, ShieldCheck } from "lucide-react";

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
            We know you are busy. That is why we don't ask you to travel.
            <br />
            We pick up your phone, fix it with <span className="text-white font-semibold">expert care</span>, and deliver it back to you the 
            <span className="text-blue-400 font-bold"> very same day</span>.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-10 relative z-10 space-y-12">
        
        {/* --- STATS / HIGHLIGHTS (Updated for Pickup Model) --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Truck className="w-6 h-6" /> {/* Changed Icon to Truck */}
            </div>
            <h3 className="font-bold text-xl text-slate-900">Same Day Delivery</h3>
            <p className="text-slate-500 text-sm mt-2">We pick it up, fix it, and drop it back. Fast, safe, and convenient.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">Skilled Technicians</h3>
            <p className="text-slate-500 text-sm mt-2">Your device is handled only by qualified experts with years of experience.</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-100 text-center">
            <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-xl text-slate-900">6 Months Warranty</h3>
            <p className="text-slate-500 text-sm mt-2">We stand by our quality. If it breaks again, we fix it for free.</p>
          </div>
        </div>

        {/* --- CONTACT & LOCATION --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start mt-12">
          
          {/* Contact Details */}
          <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm space-y-6">
            <h2 className="text-2xl font-bold text-slate-900">Headquarters</h2>
            <p className="text-slate-500">
              This is our dispatch center. We operate via pickup & delivery to save your time.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
                <div>
                  <h4 className="font-semibold text-slate-900">Main Office</h4>
                  <p className="text-slate-600">Uttam Nagar,<br/>Delhi, India</p>
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

          {/* REAL MAP (Google Maps Embed) */}
          <div className="h-full min-h-[300px] bg-slate-200 rounded-2xl overflow-hidden relative border border-slate-300 shadow-inner">
             {/* This iframe loads the real map for Uttam Nagar */}
             <iframe 
               src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28018.47368625696!2d77.04276965000001!3d28.62067755!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d04b66c041a99%3A0xf6f697088941423e!2sUttam%20Nagar%2C%20Delhi!5e0!3m2!1sen!2sin!4v1715534888000!5m2!1sen!2sin" 
               width="100%" 
               height="100%" 
               style={{ border: 0, minHeight: "350px" }} 
               allowFullScreen={true} 
               loading="lazy" 
               referrerPolicy="no-referrer-when-downgrade"
             ></iframe>
          </div>

        </div>

      </div>
    </main>
  );
}