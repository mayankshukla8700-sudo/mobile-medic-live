import Link from "next/link";
import { Phone, MapPin, Mail, Facebook, Instagram, Twitter } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 py-12 md:py-16">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* COLUMN 1: Brand & Intro */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white tracking-tight">The Mobile Medic</h3>
            <p className="text-sm leading-relaxed text-slate-400">
              India's most trusted repair service. We pick up, repair with expert care, and deliver same-day.
            </p>
            <div className="flex gap-4 pt-2">
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                <Facebook className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                <Instagram className="w-4 h-4" />
              </div>
              <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-sky-500 transition-colors cursor-pointer">
                <Twitter className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About Us</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Track Order</Link></li>
              <li><Link href="/admin" className="hover:text-blue-400 transition-colors">Partner Login</Link></li>
            </ul>
          </div>

          {/* COLUMN 3: Services */}
          <div>
            <h4 className="text-white font-semibold mb-4">Our Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Screen Replacement</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Battery Replacement</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Charging Jack Repair</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Mic & Speaker Fix</Link></li>
              <li><Link href="/" className="hover:text-blue-400 transition-colors">FaceID Diagnostics</Link></li>
            </ul>
          </div>

          {/* COLUMN 4: Contact Info (UPDATED) */}
          <div>
            <h4 className="text-white font-semibold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0" />
                <span>
                  Uttam Nagar,<br />
                  Delhi, India
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="tel:+919354566791" className="hover:text-white transition-colors">+91 8920766791</a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href="mailto:support@mobilemedic.in" className="hover:text-white transition-colors">support@mobilemedic.in</a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          <p>&copy; {new Date().getFullYear()} The Mobile Medic. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}