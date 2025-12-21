import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; 
import { Phone } from "lucide-react"; 
import Footer from "./components/Footer"; 
// FIXED: Using ./ instead of @/ to prevent errors
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "The Mobile Medic | Rated #1 Doorstep Repair",
  description: "Instant price quotes for iPhone, Samsung, & OnePlus. Expert technicians come to your home. 6 Months Warranty.",
  
  // UPDATED: Now pointing to your new domain for better Google ranking
  metadataBase: new URL('https://www.themobilemedic.in'), 
  
  icons: {
    icon: "/logo.png", 
  },
  
  openGraph: {
    title: "The Mobile Medic | We Fix It Fast",
    description: "Broken Phone? Get it fixed at your doorstep in 30 mins.",
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'The Mobile Medic Repair Service',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen`}>
        
        {/* --- HEADER --- */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 md:px-8 h-20 flex items-center justify-between">
            
            {/* LEFT: Logo & Name */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative w-14 h-14 md:w-16 md:h-16 flex-shrink-0">
                <Image 
                  src="/logo.png" 
                  alt="The Mobile Medic Logo" 
                  fill
                  className="object-contain scale-110 group-hover:scale-125 transition-transform duration-300" 
                />
              </div>
              <div className="flex flex-col justify-center -space-y-1">
                <span className="font-extrabold text-2xl md:text-3xl text-slate-900 tracking-tight">
                  The Mobile Medic
                </span>
                <span className="text-[10px] md:text-xs font-bold text-blue-600 tracking-wider uppercase pl-0.5">
                  OLED & Advance Repair
                </span>
              </div>
            </Link>

            {/* RIGHT: Call Button */}
            <div className="flex items-center gap-6">
               <a 
                href="tel:+919354566791" 
                className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg font-bold shadow-sm transition-all active:scale-95"
              >
                <Phone className="w-4 h-4 text-white fill-current" />
                <span className="text-base tracking-wide">+91 9354566791</span>
              </a>
              <a href="tel:+919354566791" className="md:hidden bg-blue-600 text-white p-2.5 rounded-lg shadow-sm">
                 <Phone className="w-5 h-5" />
              </a>
            </div>
          </div>
        </nav>

        {/* --- MAIN CONTENT --- */}
        <div className="flex-grow">
            {children}
        </div>

        {/* --- FOOTER --- */}
        <Footer />
        
        {/* The Floating WhatsApp Button */}
        <WhatsAppButton />

        <Toaster />
      </body>
    </html>
  );
}