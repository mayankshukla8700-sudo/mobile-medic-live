import Link from "next/link";
import { ArrowLeft, ShieldCheck, Lock } from "lucide-react";

export default function PrivacyPage() {
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
               <Lock className="w-6 h-6 text-blue-600" />
             </div>
             <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
          </div>
          <p className="text-slate-500 mt-2 ml-14">Last Updated: December 2025</p>
        </div>

        {/* Content */}
        <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
          <p>
            At <strong>The Mobile Medic</strong>, we value your trust. This policy explains how we handle your data when you use our repair services.
          </p>

          <h3 className="text-xl font-bold text-slate-900">1. Information We Collect</h3>
          <p>We only collect information necessary to complete your repair and pickup:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Personal Details:</strong> Name, Phone Number, Email Address.</li>
            <li><strong>Location Data:</strong> Address for Pickup and Delivery.</li>
            <li><strong>Device Information:</strong> Brand, Model, Passcode (if required for testing), and issues description.</li>
          </ul>

          <h3 className="text-xl font-bold text-slate-900">2. How We Use Your Data</h3>
          <p>
            We strictly use your data for:
            <br />
            ✓ Scheduling pickups and drops.
            <br />
            ✓ Communicating repair status updates.
            <br />
            ✓ Generating invoices and warranty cards.
          </p>

          <h3 className="text-xl font-bold text-slate-900">3. Data Security</h3>
          <p>
            Your device data (Photos, Contacts, Chats) is <strong>strictly off-limits</strong> to our technicians. We recommend backing up your device before handing it over, but we maintain strict "No-Snoop" policies in our labs. We do not sell your phone number to third parties.
          </p>

          <h3 className="text-xl font-bold text-slate-900">4. Contact Us</h3>
          <p>
            For privacy concerns, email us at: <a href="mailto:support@themobilemedic.in" className="text-blue-600 font-bold">support@themobilemedic.in</a>
          </p>
        </div>

      </div>
    </main>
  );
}