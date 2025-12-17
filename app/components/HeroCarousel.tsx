"use client";

import { useState, useEffect } from "react";
import { ArrowRight, Star, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";

const slides = [
  {
    id: 1,
    bg: "bg-slate-900",
    text: "text-white",
    badge: "Limited Offer",
    badgeColor: "bg-red-500 text-white",
    title: "Flat 30% OFF Your First Repair",
    desc: "Don't let a broken screen ruin your day. Book now and save big on your first order!",
    cta: "Claim Offer",
    icon: Star
  },
  {
    id: 2,
    bg: "bg-blue-600",
    text: "text-white",
    badge: "Premium Service",
    badgeColor: "bg-white/20 text-white",
    title: "Premium Quality. Affordable Price.",
    desc: "Why pay service center prices? Get original-grade parts with a 6-month warranty.",
    cta: "Check Prices",
    icon: ShieldCheck
  },
  {
    id: 3,
    bg: "bg-emerald-600",
    text: "text-white",
    badge: "Fastest in Delhi",
    badgeColor: "bg-white/20 text-white",
    title: "We Come To You in 30 Mins",
    desc: "Home, office, or cafe. Our technicians fix your phone right in front of your eyes.",
    cta: "Book Repair",
    icon: Zap
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-[500px] md:h-[550px] overflow-hidden bg-slate-900">
      
      {/* SLIDES */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out flex items-center justify-center px-6 ${
            index === current ? "opacity-100 z-10" : "opacity-0 z-0"
          } ${slide.bg}`}
        >
          {/* Background Pattern (Subtle) */}
          <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

          <div className="relative z-20 max-w-4xl text-center space-y-6">
            
            {/* Badge */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-bold uppercase tracking-wider mx-auto ${slide.badgeColor}`}>
              <slide.icon className="w-4 h-4" />
              {slide.badge}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight text-white drop-shadow-sm">
              {slide.title}
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-slate-100 max-w-2xl mx-auto leading-relaxed opacity-90">
              {slide.desc}
            </p>

            {/* CTA Button */}
            <div className="pt-4">
               {/* SCROLL TO BRANDS SECTION ON CLICK */}
               <button 
                 onClick={() => document.getElementById('brands-section')?.scrollIntoView({ behavior: 'smooth' })}
                 className="bg-white text-slate-900 hover:bg-slate-100 px-8 py-4 rounded-full font-bold text-lg transition-all active:scale-95 flex items-center gap-2 mx-auto shadow-xl"
               >
                 {slide.cta} <ArrowRight className="w-5 h-5" />
               </button>
               
               {/* SAFE TEXT REPLACEMENT */}
               <p className="mt-6 text-sm font-medium text-slate-400 uppercase tracking-widest">
                 Certified Experts • 100% Data Safe
               </p>
            </div>
          </div>
        </div>
      ))}

      {/* DOTS INDICATORS */}
      <div className="absolute bottom-8 left-0 right-0 z-30 flex justify-center gap-3">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrent(idx)}
            className={`w-3 h-3 rounded-full transition-all ${
              current === idx ? "bg-white w-8" : "bg-white/30 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}