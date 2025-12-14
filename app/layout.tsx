import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; 

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Mobile Medic | Expert Phone Repairs",
  description: "Instant price quotes and doorstep repair for iPhone, Samsung, and more.",
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
        
        {/* --- BIGGER BRAND HEADER (Blue Version) --- */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-6xl mx-auto px-4 h-24 flex items-center justify-between">
            
            {/* LEFT: Big Logo & Name */}
            <Link href="/" className="flex items-center gap-4 hover:opacity-90 transition-opacity">
              {/* Logo Container - Sized to match text */}
              <div className="relative w-16 h-16">
                <Image 
                  src="/logo.png" 
                  alt="The Mobile Medic Logo" 
                  fill
                  className="object-contain" 
                />
              </div>
              
              {/* Brand Name */}
              <div className="flex flex-col justify-center">
                <span className="font-extrabold text-3xl tracking-tight text-slate-900 leading-none">
                  The Mobile Medic
                </span>
                <span className="text-xs font-bold text-blue-600 tracking-wider uppercase mt-1">
                  We Fix It Fast
                </span>
              </div>
            </Link>

            {/* RIGHT: Big Blue Call Button */}
            <div className="hidden md:flex items-center gap-6">
               <a 
                href="tel:+919999999999" 
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold shadow-md hover:bg-blue-700 transition-all hover:scale-105"
              >
                <span className="text-xl">📞</span>
                <span className="text-lg">+91 9999999999</span>
              </a>
            </div>
            
            {/* Mobile-only Icon */}
            <a href="tel:+919999999999" className="md:hidden bg-blue-600 text-white p-3 rounded-full shadow-lg">
               📞
            </a>

          </div>
        </nav>
        {/* -------------------------------------- */}

        {children}
        <Toaster />
      </body>
    </html>
  );
}