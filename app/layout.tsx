import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; 
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
          {/* Increased Header Height to h-24 (96px) to fit the big logo */}
          <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
            
            {/* LEFT: DOMINANT LOGO & Name */}
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              
              {/* FIX: LOGO SIZE 25 (Approx w-24/w-28) */}
              {/* This makes the logo much larger than the text height */}
              <div className="relative w-24 h-24">
                <Image 
                  src="/logo.png" 
                  alt="The Mobile Medic Logo" 
                  fill
                  className="object-contain py-2" // py-2 adds a tiny breathing room so it doesn't touch edges
                />
              </div>
              
              {/* Name Size Remains Same (text-3xl) */}
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-2xl md:text-3xl text-slate-900 leading-none tracking-tight">
                  The Mobile Medic
                </span>
                <span className="text-[10px] md:text-xs font-bold text-blue-600 tracking-wider uppercase mt-1">
                  OLED & Advance Repair
                </span>
              </div>
            </Link>

            {/* RIGHT: Call Button */}
            <div className="hidden md:flex items-center gap-6">
               <a 
                href="tel:+919999999999" 
                className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all hover:scale-105"
              >
                <Phone className="w-5 h-5 text-white fill-current" />
                <span className="text-lg">+91 9999999999</span>
              </a>
            </div>
            
            {/* Mobile-only Icon */}
            <a href="tel:+919999999999" className="md:hidden bg-blue-600 text-white p-2.5 rounded-full shadow-lg flex items-center justify-center">
               <Phone className="w-5 h-5 text-white fill-current" />
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