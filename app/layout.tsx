import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; 
// FIX 3: Import the real 'Phone' icon so we can color it White
import { Phone } from "lucide-react"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Mobile Medic | Expert Phone Repairs",
  description: "OLED and Advance repair for iPhone, Samsung, and more.",
  icons: {
    icon: "/logo.png", 
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50`}>
        
        {/* --- NAVBAR --- */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
            
            {/* LEFT: Big Logo & Name */}
            <Link href="/" className="flex items-center gap-5 hover:opacity-90 transition-opacity">
              {/* FIX 1: Logo is now w-20 h-20 (80px) - Much Bigger */}
              <div className="relative w-20 h-20">
                <Image 
                  src="/logo.png" 
                  alt="The Mobile Medic Logo" 
                  fill
                  className="object-contain" 
                />
              </div>
              
              {/* Brand Name & Motto */}
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-3xl md:text-4xl tracking-tight text-slate-900 leading-none">
                  The Mobile Medic
                </span>
                {/* FIX 2: Updated Motto */}
                <span className="text-xs md:text-sm font-bold text-blue-600 tracking-wider uppercase mt-1">
                  OLED & Advance Repair
                </span>
              </div>
            </Link>

            {/* RIGHT: Call Button with WHITE Icon */}
            <div className="hidden md:flex items-center gap-6">
               <a 
                href="tel:+919999999999" 
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all hover:scale-105"
              >
                {/* FIX 3: Real Icon (White) instead of Emoji (Red) */}
                <Phone className="w-5 h-5 text-white fill-current" />
                <span className="text-lg">+91 9999999999</span>
              </a>
            </div>
            
            {/* Mobile-only Icon */}
            <a href="tel:+919999999999" className="md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center">
               <Phone className="w-6 h-6 text-white fill-current" />
            </a>

          </div>
        </nav>
        {/* -------------- */}

        {children}
        <Toaster />
      </body>
    </html>
  );
}