import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import Link from "next/link";
import { Toaster } from "sonner"; // We keep the notification toaster

const inter = Inter({ subsets: ["latin"] });

// POLISH 1: Better Title & Description for Google/WhatsApp sharing
export const metadata: Metadata = {
  title: "Mobile Medic | Expert Phone Repairs",
  description: "Instant price quotes and doorstep repair for iPhone, Samsung, and more.",
  icons: {
    icon: "/logo.png", // This puts the logo in the browser tab!
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
        
        {/* --- THE NEW NAVBAR --- */}
        <nav className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md">
          <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
            
            {/* Logo & Name (Clickable -> Goes Home) */}
            <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <div className="relative w-10 h-10 overflow-hidden rounded-lg shadow-sm border border-slate-100">
                {/* Make sure your file is named 'logo.png' in the public folder */}
                <Image 
                  src="/logo.png" 
                  alt="Mobile Medic Logo" 
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-extrabold text-xl tracking-tight text-slate-900">
                Mobile Medic
              </span>
            </Link>

            {/* Optional: 'Call Us' Button for mobile users */}
            <a 
              href="tel:+919999999999" 
              className="text-sm font-semibold text-blue-600 bg-blue-50 px-4 py-2 rounded-full hover:bg-blue-100 transition-colors"
            >
              📞 Call Now
            </a>
          </div>
        </nav>
        {/* ---------------------- */}

        {children}
        <Toaster />
      </body>
    </html>
  );
}