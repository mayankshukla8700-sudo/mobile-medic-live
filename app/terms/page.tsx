import Link from "next/link";
import { ArrowLeft, ScrollText } from "lucide-react";

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        
        {/* Header */}
        <div className="mb-8 border-b pb-6">
           <Link href="/" className="inline-flex items-center text-sm text-slate-500 hover:text-blue-600 mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
          </Link>
          <div className="flex items-center gap-3">
             <div className="p-3 bg-blue-50 rounded-full">
               <ScrollText className="w-6 h-6 text-blue-600" />
             </div>
             <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
          </div>
          <p className="text-slate-500 mt-2 ml-14">Last Updated: December 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            By booking a repair with <strong>The Mobile Medic</strong>, you agree to the following terms.
          </p>

          <h3 className="text-xl font-bold text-slate-900">1. Warranty Policy</h3>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Screens & Batteries:</strong> 6 Months Warranty against manufacturing defects (touch issues, dead pixels).</li>
            <li><strong>Warranty Void if:</strong> The device suffers physical damage (cracks), water damage, or is opened by another technician after our repair.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900">2. Data Safety & Liability</h3>
          <p>
            While we take every precaution, <strong>we are not responsible for data loss.</strong> We strongly recommend backing up your device before pickup. If a device is dead or stuck on logo, data recovery is not guaranteed.
          </p>

          <h3 className="text-xl font-bold text-slate-900">3. Pickup & Delivery</h3>
          <p>
            Our "Same Day Delivery" applies to 90% of repairs (Screens, Batteries). Complex motherboard issues may take 24-48 hours. If you cancel the order after our executive reaches your location, a small visitation fee (₹149) may apply.
          </p>

          <h3 className="text-xl font-bold text-slate-900">4. Unclaimed Devices</h3>
          <p>
            Devices not claimed or paid for within 60 days of repair completion will be recycled to recover costs.
          </p>
        </div>

      </div>
    </main>
  );
}