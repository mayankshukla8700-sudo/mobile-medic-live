import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; 
import { Phone } from "lucide-react"; 
import Footer from "./components/Footer"; 
import WhatsAppButton from "./components/WhatsAppButton";

const inter = Inter({ subsets: ["latin"] });

// 🚀 1. SUPERCHARGED SEO METADATA
export const metadata: Metadata = {
  title: {
    default: "The Mobile Medic | #1 Doorstep Mobile Repair in Delhi NCR",
    template: "%s | The Mobile Medic"
  },
  description: "Expert mobile repair at your doorstep in 30 mins. We fix iPhone, Samsung, OnePlus & more. Screen replacement, battery change & motherboard repair in Delhi, Noida & Gurugram.",
  keywords: [
    "Mobile Repair Delhi", "iPhone Screen Repair", "Samsung Mobile Repair", 
    "Doorstep Mobile Repair", "Mobile Medic", "Phone Repair Near Me", 
    "Cheap iPhone Screen", "OnePlus Battery Replacement", "Mobile Repair Home Service"
  ],
  metadataBase: new URL('https://www.themobilemedic.in'),
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: "/logo.png", 
  },
  openGraph: {
    title: "The Mobile Medic - Instant Mobile Repair at Home",
    description: "Don't go to the shop. We come to you! 30-min mobile repair service in Delhi NCR.",
    url: 'https://www.themobilemedic.in',
    siteName: 'The Mobile Medic',
    images: [
      {
        url: '/logo.png', // Fallback to logo if you don't have a specific OG image yet
        width: 800,
        height: 600,
        alt: 'The Mobile Medic Logo',
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
  // 🚀 2. LOCAL BUSINESS SCHEMA (Makes you show up on Google Maps/Search properly)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "MobilePhoneRepair",
    "name": "The Mobile Medic",
    "image": "https://www.themobilemedic.in/logo.png",
    "description": "Premium doorstep mobile repair service in Delhi NCR.",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Serving Delhi NCR",
      "addressLocality": "New Delhi",
      "addressRegion": "Delhi",
      "postalCode": "110001",
      "addressCountry": "IN"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 28.6139,
      "longitude": 77.2090
    },
    "url": "https://www.themobilemedic.in",
    "telephone": "+919354566791",
    "priceRange": "₹₹",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
        ],
        "opens": "09:00",
        "closes": "21:00"
      }
    ]
  };

  return (
    <html lang="en">
      <body className={`${inter.className} bg-slate-50 flex flex-col min-h-screen`}>
        
        {/* Inject Schema for Google */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

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