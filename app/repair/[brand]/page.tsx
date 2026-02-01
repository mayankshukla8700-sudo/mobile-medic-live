"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RepairForm from "../../components/RepairForm"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Smartphone, Battery, Zap, Volume2, Mic, Camera, PhoneCall, Search, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";

// Helper to clean strings for image filenames
const toSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-").replace(/[()]/g, "");
};

// ==============================================================================
// 1. MASTER PRICING DATABASE (Derived from Rate Card)
// ==============================================================================
const modelDatabase: Record<string, { [key: string]: number }> = {
  // --- APPLE ---
  "iphone-15-pro-max": { screen: 29999, battery: 8499, charging: 5499, speaker: 6499, receiver: 6499, mic: 5499, back_camera: 13999, front_camera: 5499 },
  "iphone-15-pro": { screen: 25999, battery: 7499, charging: 4999, speaker: 5499, receiver: 5999, mic: 4999, back_camera: 9499, front_camera: 3999 },
  "iphone-15-plus": { screen: 21999, battery: 7999, charging: 4999, speaker: 4999, receiver: 4999, mic: 4999, back_camera: 8999, front_camera: 5499 },
  "iphone-15": { screen: 19999, battery: 6499, charging: 4499, speaker: 4999, receiver: 4499, mic: 4499, back_camera: 8499, front_camera: 4499 },
  "iphone-14-pro-max": { screen: 34999, battery: 6499, charging: 4499, speaker: 6499, receiver: 5499, mic: 4499, back_camera: 8499, front_camera: 3999 },
  "iphone-14-pro": { screen: 20999, battery: 6999, charging: 4499, speaker: 2999, receiver: 3999, mic: 3499, back_camera: 7499, front_camera: 3999 },
  "iphone-14-plus": { screen: 18999, battery: 7499, charging: 4999, speaker: 5999, receiver: 5999, mic: 4999, back_camera: 9499, front_camera: 3999 },
  "iphone-14": { screen: 8999, battery: 5999, charging: 3999, speaker: 4499, receiver: 3999, mic: 3999, back_camera: 7499, front_camera: 3999 },
  "iphone-13-pro-max": { screen: 24999, battery: 5999, charging: 4999, speaker: 5499, receiver: 3499, mic: 4999, back_camera: 8499, front_camera: 3999 },
  "iphone-13-pro": { screen: 19999, battery: 5999, charging: 4499, speaker: 4999, receiver: 3499, mic: 4499, back_camera: 7499, front_camera: 3999 },
  "iphone-13": { screen: 7999, battery: 4499, charging: 3999, speaker: 4499, receiver: 2999, mic: 3999, back_camera: 6499, front_camera: 3999 },
  "iphone-13-mini": { screen: 6999, battery: 4999, charging: 3499, speaker: 3499, receiver: 2999, mic: 3499, back_camera: 6499, front_camera: 3999 },
  "iphone-12-pro-max": { screen: 13999, battery: 3399, charging: 4999, speaker: 2999, receiver: 3299, mic: 4999, back_camera: 7999, front_camera: 3499 },
  "iphone-12-pro": { screen: 8499, battery: 3799, charging: 4499, speaker: 4499, receiver: 2999, mic: 3499, back_camera: 7499, front_camera: 2999 },
  "iphone-12": { screen: 8499, battery: 3999, charging: 3999, speaker: 3999, receiver: 2499, mic: 3999, back_camera: 6999, front_camera: 2999 },
  "iphone-12-mini": { screen: 9499, battery: 3999, charging: 3499, speaker: 3499, receiver: 2499, mic: 3499, back_camera: 6799, front_camera: 2599 },
  "iphone-11-pro-max": { screen: 9999, battery: 5999, charging: 4135, speaker: 2499, receiver: 1999, mic: 2999, back_camera: 6999, front_camera: 2999 },
  "iphone-11-pro": { screen: 9499, battery: 5499, charging: 2499, speaker: 2399, receiver: 1999, mic: 2499, back_camera: 6499, front_camera: 2499 },
  "iphone-11": { screen: 3499, battery: 2799, charging: 2999, speaker: 1999, receiver: 1999, mic: 1799, back_camera: 5999, front_camera: 2249 },
  "iphone-xs-max": { screen: 5499, battery: 2399, charging: 1899, speaker: 1999, receiver: 1899, mic: 2499, back_camera: 5999, front_camera: 4199 },
  "iphone-xs": { screen: 5999, battery: 2399, charging: 1999, speaker: 2099, receiver: 1999, mic: 2034, back_camera: 6199, front_camera: 3799 },
  "iphone-xr": { screen: 3499, battery: 2399, charging: 1999, speaker: 2299, receiver: 1999, mic: 2400, back_camera: 5199, front_camera: 1999 },
  "iphone-x": { screen: 3999, battery: 2299, charging: 1899, speaker: 1999, receiver: 1999, mic: 1879, back_camera: 5299, front_camera: 4199 },
  "iphone-8-plus": { screen: 2299, battery: 1999, charging: 1799, speaker: 1699, receiver: 1699, mic: 1799, back_camera: 5199, front_camera: 2599 },
  "iphone-8": { screen: 2799, battery: 2099, charging: 1999, speaker: 1699, receiver: 1699, mic: 1899, back_camera: 4299, front_camera: 1699 },
  "iphone-7-plus": { screen: 2499, battery: 2049, charging: 1549, speaker: 1899, receiver: 1799, mic: 1999, back_camera: 4099, front_camera: 1699 },
  "iphone-7": { screen: 2299, battery: 1999, charging: 1699, speaker: 1599, receiver: 499, mic: 1599, back_camera: 2199, front_camera: 1549 },
  "iphone-6s-plus": { screen: 1999, battery: 1549, charging: 1699, speaker: 1699, receiver: 1799, mic: 1799, back_camera: 2999, front_camera: 2049 },
  "iphone-6s": { screen: 2299, battery: 1699, charging: 799, speaker: 1599, receiver: 599, mic: 1699, back_camera: 2599, front_camera: 1899 },
  "iphone-6-plus": { screen: 2399, battery: 1799, charging: 1899, speaker: 1699, receiver: 1799, mic: 1799, back_camera: 2299, front_camera: 2099 },
  "iphone-6": { screen: 2299, battery: 1549, charging: 599, speaker: 1549, receiver: 699, mic: 1599, back_camera: 2049, front_camera: 2049 },
  "iphone-se-2022": { screen: 2999, battery: 2299, charging: 599, speaker: 1599, receiver: 699, mic: 1499, back_camera: 2299, front_camera: 2199 },
  "iphone-se-2020": { screen: 2799, battery: 2299, charging: 1999, speaker: 1699, receiver: 1549, mic: 1999, back_camera: 5299, front_camera: 2699 },

  // --- SAMSUNG ---
  "galaxy-s24-ultra": { screen: 23999, battery: 3199, charging: 3999, speaker: 3499, receiver: 2499, mic: 3099, back_camera: 9999, front_camera: 9499 },
  "galaxy-s24-plus": { screen: 19999, battery: 2699, charging: 2499, speaker: 2999, receiver: 2399, mic: 2999, back_camera: 8499, front_camera: 7999 },
  "galaxy-s24": { screen: 15999, battery: 2799, charging: 2399, speaker: 2899, receiver: 2349, mic: 2799, back_camera: 8210, front_camera: 7699 },
  "galaxy-s23-ultra": { screen: 23999, battery: 3099, charging: 3799, speaker: 3299, receiver: 2199, mic: 2999, back_camera: 9699, front_camera: 8999 },
  "galaxy-s23-plus": { screen: 15999, battery: 2599, charging: 2499, speaker: 2899, receiver: 2299, mic: 2899, back_camera: 8299, front_camera: 7699 },
  "galaxy-s23": { screen: 15499, battery: 2299, charging: 2299, speaker: 2699, receiver: 2099, mic: 2699, back_camera: 8099, front_camera: 7499 },
  "galaxy-s23-fe": { screen: 14999, battery: 2199, charging: 2149, speaker: 2499, receiver: 2049, mic: 2499, back_camera: 7999, front_camera: 7299 },
  "galaxy-s22-ultra": { screen: 23999, battery: 3099, charging: 3799, speaker: 3299, receiver: 2799, mic: 2999, back_camera: 9699, front_camera: 8999 },
  "galaxy-s22-plus": { screen: 15999, battery: 2599, charging: 2499, speaker: 2899, receiver: 2299, mic: 2899, back_camera: 8299, front_camera: 7699 },
  "galaxy-s22": { screen: 15499, battery: 2299, charging: 2299, speaker: 2699, receiver: 2099, mic: 2699, back_camera: 8099, front_camera: 7499 },
  "galaxy-s21-ultra": { screen: 22999, battery: 3099, charging: 3799, speaker: 3299, receiver: 2199, mic: 2999, back_camera: 9699, front_camera: 8999 },
  "galaxy-s21-plus": { screen: 15999, battery: 2599, charging: 2499, speaker: 2899, receiver: 2299, mic: 2899, back_camera: 8299, front_camera: 7699 },
  "galaxy-s21": { screen: 15499, battery: 2299, charging: 2299, speaker: 2699, receiver: 2099, mic: 2699, back_camera: 8099, front_camera: 7499 },
  "galaxy-s21-fe": { screen: 9499, battery: 1799, charging: 1799, speaker: 2199, receiver: 1999, mic: 2199, back_camera: 6999, front_camera: 6899 },
  "galaxy-s20-ultra": { screen: 21999, battery: 2999, charging: 3599, speaker: 3099, receiver: 2499, mic: 2499, back_camera: 5399, front_camera: 4999 },
  "galaxy-s20-plus": { screen: 14999, battery: 2199, charging: 2299, speaker: 2299, receiver: 2199, mic: 2299, back_camera: 3499, front_camera: 2499 },
  "galaxy-s20": { screen: 14999, battery: 2199, charging: 2199, speaker: 2499, receiver: 1999, mic: 2499, back_camera: 7899, front_camera: 7099 },
  "galaxy-s20-fe": { screen: 6499, battery: 1599, charging: 1799, speaker: 2199, receiver: 1999, mic: 2199, back_camera: 6999, front_camera: 6899 },
  "galaxy-s10-plus": { screen: 14999, battery: 1599, charging: 2299, speaker: 2199, receiver: 2199, mic: 2199, back_camera: 5999, front_camera: 3199 },
  "galaxy-s10": { screen: 13999, battery: 1999, charging: 2299, speaker: 2299, receiver: 2199, mic: 2199, back_camera: 6199, front_camera: 2399 },
  "galaxy-s10e": { screen: 10999, battery: 2199, charging: 2299, speaker: 2299, receiver: 2199, mic: 2199, back_camera: 5499, front_camera: 1899 },
  "galaxy-note-20-ultra": { screen: 21999, battery: 2199, charging: 2999, speaker: 2899, receiver: 2899, mic: 2899, back_camera: 11999, front_camera: 2999 },
  "galaxy-note-20": { screen: 16999, battery: 1899, charging: 2799, speaker: 2799, receiver: 2599, mic: 2599, back_camera: 6199, front_camera: 2599 },
  "galaxy-note-10-plus": { screen: 18999, battery: 2299, charging: 2299, speaker: 2299, receiver: 2299, mic: 2299, back_camera: 9999, front_camera: 2199 },
  "galaxy-note-10": { screen: 18999, battery: 1599, charging: 2599, speaker: 2599, receiver: 2299, mic: 2299, back_camera: 7999, front_camera: 2199 },
  "galaxy-z-fold-5": { screen: 50999, battery: 2999, charging: 2899, speaker: 3299, receiver: 2999, mic: 2499, back_camera: 8999, front_camera: 4999 },
  "galaxy-z-flip-5": { screen: 32999, battery: 2999, charging: 2899, speaker: 3299, receiver: 2999, mic: 2499, back_camera: 8999, front_camera: 4999 },
  "galaxy-z-fold-4": { screen: 49999, battery: 2999, charging: 2899, speaker: 3299, receiver: 2999, mic: 2499, back_camera: 8999, front_camera: 4999 },
  "galaxy-z-flip-4": { screen: 32999, battery: 2999, charging: 2899, speaker: 3299, receiver: 2999, mic: 2499, back_camera: 8999, front_camera: 4999 },
  "galaxy-a55": { screen: 7299, battery: 2199, charging: 1999, speaker: 899, receiver: 999, mic: 1299, back_camera: 4599, front_camera: 3299 },
  "galaxy-a54": { screen: 6999, battery: 2199, charging: 1999, speaker: 899, receiver: 999, mic: 1299, back_camera: 4599, front_camera: 3299 },
  "galaxy-a35": { screen: 5999, battery: 1999, charging: 1999, speaker: 1299, receiver: 1299, mic: 1399, back_camera: 4599, front_camera: 3299 },
  "galaxy-a34": { screen: 5999, battery: 1699, charging: 1599, speaker: 1399, receiver: 1099, mic: 1299, back_camera: 4599, front_camera: 3299 },
  "galaxy-a25": { screen: 5499, battery: 2099, charging: 1499, speaker: 1399, receiver: 1099, mic: 1199, back_camera: 4599, front_camera: 3299 },
  "galaxy-a24": { screen: 6599, battery: 1999, charging: 899, speaker: 899, receiver: 899, mic: 1099, back_camera: 4599, front_camera: 3299 },
  "galaxy-a15": { screen: 4399, battery: 1699, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 3999, front_camera: 2999 },
  "galaxy-a14-5g": { screen: 2499, battery: 2199, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 3999, front_camera: 2999 },
  "galaxy-a14-4g": { screen: 2499, battery: 2199, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 3999, front_camera: 2999 },
  "galaxy-a05s": { screen: 3299, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a05": { screen: 2999, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a04s": { screen: 3299, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a04": { screen: 2999, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a04e": { screen: 2299, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a03s": { screen: 3299, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a03": { screen: 2449, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 2999 },
  "galaxy-a73-5g": { screen: 6599, battery: 1999, charging: 999, speaker: 899, receiver: 899, mic: 899, back_camera: 5999, front_camera: 1999 },
  "galaxy-a53-5g": { screen: 6199, battery: 1499, charging: 999, speaker: 899, receiver: 899, mic: 899, back_camera: 4999, front_camera: 1999 },
  "galaxy-a33-5g": { screen: 5599, battery: 1599, charging: 999, speaker: 899, receiver: 899, mic: 899, back_camera: 3499, front_camera: 1999 },
  "galaxy-a23": { screen: 2299, battery: 1799, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3499, front_camera: 1999 },
  "galaxy-a13": { screen: 2999, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2499, front_camera: 1999 },
  "galaxy-a72": { screen: 6999, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3299, front_camera: 1999 },
  "galaxy-a52s-5g": { screen: 6899, battery: 1599, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 4999, front_camera: 1999 },
  "galaxy-a52": { screen: 4999, battery: 1599, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2999, front_camera: 1999 },
  "galaxy-a32": { screen: 4399, battery: 1099, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3199, front_camera: 2099 },
  "galaxy-a22": { screen: 3899, battery: 1599, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2499, front_camera: 1999 },
  "galaxy-a12": { screen: 2899, battery: 999, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2199, front_camera: 1999 },
  "galaxy-m55": { screen: 6299, battery: 2499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3299, front_camera: 1999 },
  "galaxy-m54": { screen: 7799, battery: 1999, charging: 2299, speaker: 2299, receiver: 2299, mic: 2299, back_camera: 3299, front_camera: 1999 },
  "galaxy-m34": { screen: 4799, battery: 1749, charging: 2299, speaker: 2299, receiver: 2299, mic: 2299, back_camera: 3199, front_camera: 1299 },
  "galaxy-m14-5g": { screen: 3299, battery: 2199, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 3199, front_camera: 1299 },
  "galaxy-m04": { screen: 3199, battery: 2299, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 3199, front_camera: 1299 },
  "galaxy-m53-5g": { screen: 4699, battery: 2099, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 3199, front_camera: 1299 },
  "galaxy-m33-5g": { screen: 6499, battery: 1599, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 4899, front_camera: 999 },
  "galaxy-m13": { screen: 3299, battery: 1999, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 4899, front_camera: 999 },
  "galaxy-m52-5g": { screen: 6699, battery: 1549, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 3199, front_camera: 1999 },
  "galaxy-m32": { screen: 5399, battery: 1199, charging: 1999, speaker: 1299, receiver: 1299, mic: 1299, back_camera: 1999, front_camera: 999 },
  "galaxy-m12": { screen: 2299, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 1599, front_camera: 1399 },
  "galaxy-m02s": { screen: 2999, battery: 1099, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 2199, front_camera: 1299 },
  "galaxy-m02": { screen: 2299, battery: 1099, charging: 899, speaker: 899, receiver: 899, mic: 999, back_camera: 2399, front_camera: 1299 },
  "galaxy-m51": { screen: 5299, battery: 1399, charging: 899, speaker: 899, receiver: 699, mic: 899, back_camera: 3199, front_camera: 1799 },
  "galaxy-m31s": { screen: 3999, battery: 999, charging: 899, speaker: 899, receiver: 699, mic: 899, back_camera: 4399, front_camera: 1999 },
  "galaxy-m31": { screen: 3199, battery: 999, charging: 899, speaker: 899, receiver: 699, mic: 899, back_camera: 2399, front_camera: 1299 },
  "galaxy-f54": { screen: 5499, battery: 2999, charging: 999, speaker: 999, receiver: 999, mic: 999, back_camera: 4299, front_camera: 1399 },
  "galaxy-f34": { screen: 4699, battery: 2199, charging: 999, speaker: 999, receiver: 999, mic: 999, back_camera: 3999, front_camera: 1399 },
  "galaxy-f15": { screen: 3999, battery: 2299, charging: 999, speaker: 999, receiver: 999, mic: 999, back_camera: 3699, front_camera: 1399 },
  "galaxy-f14": { screen: 2399, battery: 2199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3499, front_camera: 1399 },
  "galaxy-f04": { screen: 2399, battery: 1799, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3299, front_camera: 1399 },
  "galaxy-f23-5g": { screen: 1999, battery: 1799, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2499, front_camera: 1299 },
  "galaxy-f13": { screen: 3299, battery: 1999, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2349, front_camera: 1299 },
  "galaxy-f42-5g": { screen: 3599, battery: 1599, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3099, front_camera: 1299 },
  "galaxy-f22": { screen: 2499, battery: 1399, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 1799, front_camera: 1299 },
  "galaxy-f12": { screen: 2599, battery: 1399, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 1799, front_camera: 1299 },
  "galaxy-f62": { screen: 5399, battery: 1999, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 4199, front_camera: 2299 },

  // --- XIAOMI ---
  "xiaomi-14-ultra": { screen: 17999, battery: 2399, charging: 2599, speaker: 899, receiver: 899, mic: 1499, back_camera: 21999, front_camera: 2999 },
  "xiaomi-14": { screen: 15999, battery: 1999, charging: 2399, speaker: 899, receiver: 899, mic: 1499, back_camera: 8999, front_camera: 2999 },
  "xiaomi-13-pro": { screen: 13999, battery: 2299, charging: 2399, speaker: 899, receiver: 899, mic: 1499, back_camera: 6999, front_camera: 2599 },
  "xiaomi-13": { screen: 11999, battery: 2199, charging: 2199, speaker: 899, receiver: 899, mic: 1299, back_camera: 5999, front_camera: 2599 },
  "xiaomi-12-pro": { screen: 13999, battery: 3299, charging: 1999, speaker: 899, receiver: 899, mic: 1299, back_camera: 3999, front_camera: 2399 },
  "xiaomi-11t-pro": { screen: 7999, battery: 2099, charging: 1299, speaker: 899, receiver: 899, mic: 1299, back_camera: 3299, front_camera: 1999 },
  "xiaomi-11i-hypercharge": { screen: 9999, battery: 1799, charging: 999, speaker: 899, receiver: 899, mic: 1299, back_camera: 3299, front_camera: 1999 },
  "mi-11x-pro": { screen: 4599, battery: 1599, charging: 999, speaker: 899, receiver: 899, mic: 1299, back_camera: 5999, front_camera: 2199 },
  "mi-11x": { screen: 4399, battery: 1999, charging: 899, speaker: 899, receiver: 899, mic: 1299, back_camera: 3199, front_camera: 1999 },
  "mi-10t-pro": { screen: 3999, battery: 2199, charging: 899, speaker: 899, receiver: 899, mic: 1299, back_camera: 2999, front_camera: 1299 },
  "mi-10": { screen: 11999, battery: 2199, charging: 1299, speaker: 899, receiver: 899, mic: 899, back_camera: 7499, front_camera: 2199 },
  "redmi-note-13-pro+": { screen: 6199, battery: 1899, charging: 1299, speaker: 899, receiver: 899, mic: 899, back_camera: 5499, front_camera: 1699 },
  "redmi-note-13-pro": { screen: 5999, battery: 1499, charging: 1299, speaker: 899, receiver: 899, mic: 899, back_camera: 3999, front_camera: 1299 },
  "redmi-note-13": { screen: 4399, battery: 1499, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3499, front_camera: 1199 },
  "redmi-note-12-pro+": { screen: 4999, battery: 1899, charging: 1299, speaker: 899, receiver: 899, mic: 899, back_camera: 4999, front_camera: 1499 },
  "redmi-note-12-pro": { screen: 3999, battery: 1599, charging: 1299, speaker: 899, receiver: 899, mic: 899, back_camera: 3499, front_camera: 1299 },
  "redmi-note-12-5g": { screen: 4199, battery: 1399, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3299, front_camera: 1199 },
  "redmi-note-12-4g": { screen: 3499, battery: 1299, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 1599, front_camera: 999 },
  "redmi-note-11-pro+": { screen: 5699, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3299, front_camera: 1299 },
  "redmi-note-11-pro": { screen: 4499, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 3199, front_camera: 1199 },
  "redmi-note-11t-5g": { screen: 2499, battery: 1199, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2999, front_camera: 1199 },
  "redmi-note-11s": { screen: 3199, battery: 999, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2999, front_camera: 1199 },
  "redmi-note-11": { screen: 3299, battery: 999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2999, front_camera: 1199 },
  "redmi-note-10-pro-max": { screen: 3599, battery: 999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3399, front_camera: 1399 },
  "redmi-note-10-pro": { screen: 3499, battery: 999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3199, front_camera: 1299 },
  "redmi-note-10s": { screen: 2599, battery: 1199, charging: 899, speaker: 799, receiver: 799, mic: 799, back_camera: 1799, front_camera: 1199 },
  "redmi-note-10": { screen: 2099, battery: 1199, charging: 899, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 1199 },
  "redmi-note-10t-5g": { screen: 1599, battery: 999, charging: 899, speaker: 799, receiver: 799, mic: 799, back_camera: 1599, front_camera: 1099 },
  "redmi-note-9-pro-max": { screen: 2499, battery: 799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2199, front_camera: 1199 },
  "redmi-note-9-pro": { screen: 2499, battery: 799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2199, front_camera: 1199 },
  "redmi-note-9": { screen: 2299, battery: 799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2099, front_camera: 999 },
  "redmi-13c": { screen: 5299, battery: 899, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2299, front_camera: 1199 },
  "redmi-13c-5g": { screen: 1899, battery: 749, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2199, front_camera: 1199 },
  "redmi-12-5g": { screen: 2799, battery: 999, charging: 899, speaker: 899, receiver: 899, mic: 899, back_camera: 2099, front_camera: 1099 },
  "redmi-12": { screen: 2399, battery: 699, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 999 },
  "redmi-11-prime-5g": { screen: 1799, battery: 799, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 999 },
  "redmi-10-power": { screen: 1699, battery: 799, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-10-prime": { screen: 1799, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-10": { screen: 1999, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-9-power": { screen: 1499, battery: 799, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-9-prime": { screen: 1499, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-9-activ": { screen: 1499, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-9i": { screen: 1499, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-9a": { screen: 1599, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-a3": { screen: 1399, battery: 899, charging: 599, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-a2+": { screen: 1599, battery: 899, charging: 699, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-a2": { screen: 1999, battery: 899, charging: 699, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "redmi-a1": { screen: 1899, battery: 799, charging: 699, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },

  // --- VIVO ---
  "vivo-x100-pro": { screen: 12999, battery: 2099, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 9999, front_camera: 1199 },
  "vivo-x100": { screen: 11999, battery: 1999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3999, front_camera: 999 },
  "vivo-x90-pro": { screen: 8999, battery: 2599, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 9999, front_camera: 1199 },
  "vivo-x80-pro": { screen: 14999, battery: 1999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 7999, front_camera: 1199 },
  "vivo-v30-pro": { screen: 11999, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3499, front_camera: 1199 },
  "vivo-v30": { screen: 9999, battery: 1499, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2799, front_camera: 1199 },
  "vivo-v29-pro": { screen: 7999, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3199, front_camera: 1199 },
  "vivo-v29": { screen: 7899, battery: 1999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3199, front_camera: 1199 },
  "vivo-v29e": { screen: 7899, battery: 1899, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2999, front_camera: 1299 },
  "vivo-v27-pro": { screen: 9799, battery: 2099, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3399, front_camera: 1299 },
  "vivo-v27": { screen: 8399, battery: 2399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 3399, front_camera: 1299 },
  "vivo-v25-pro": { screen: 8299, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2599, front_camera: 1499 },
  "vivo-v25": { screen: 6999, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2599, front_camera: 1499 },
  "vivo-v23-pro": { screen: 8499, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2399, front_camera: 1999 },
  "vivo-v23": { screen: 9999, battery: 1599, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2199, front_camera: 1999 },
  "vivo-t3-5g": { screen: 3999, battery: 1499, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2099, front_camera: 1299 },
  "vivo-t2-pro": { screen: 6599, battery: 1999, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1999, front_camera: 1099 },
  "vivo-t2": { screen: 6199, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1799, front_camera: 999 },
  "vivo-t2x-5g": { screen: 2799, battery: 1499, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 799 },
  "vivo-t1-pro": { screen: 4299, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1999, front_camera: 899 },
  "vivo-t1-5g": { screen: 3299, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 999 },
  "vivo-t1-44w": { screen: 3399, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 899 },
  "vivo-y200e": { screen: 3499, battery: 1299, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1899, front_camera: 1099 },
  "vivo-y200": { screen: 6999, battery: 1899, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1699, front_camera: 999 },
  "vivo-y100": { screen: 6599, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1599, front_camera: 899 },
  "vivo-y56-5g": { screen: 2699, battery: 1699, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1599, front_camera: 899 },
  "vivo-y36": { screen: 3599, battery: 2399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1499, front_camera: 999 },
  "vivo-y28-5g": { screen: 3199, battery: 1249, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 899 },
  "vivo-y27": { screen: 3499, battery: 1699, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 899 },
  "vivo-y17s": { screen: 2699, battery: 1499, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 899 },
  "vivo-y35": { screen: 2599, battery: 1799, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1499, front_camera: 999 },
  "vivo-y22": { screen: 2599, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 799 },
  "vivo-y16": { screen: 2699, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 799 },
  "vivo-y02t": { screen: 2499, battery: 1599, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 799 },
  "vivo-y02": { screen: 2499, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 799 },
  "vivo-y75-5g": { screen: 2999, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 799 },
  "vivo-y33s": { screen: 2599, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 999 },
  "vivo-y21t": { screen: 2499, battery: 1299, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1399, front_camera: 999 },
  "vivo-y21": { screen: 2499, battery: 1499, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 899 },
  "vivo-y21e": { screen: 2399, battery: 1399, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1299, front_camera: 899 },
  "vivo-y73": { screen: 3299, battery: 1299, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 2299, front_camera: 999 },
  "vivo-y53s": { screen: 3299, battery: 1299, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1999, front_camera: 999 },
  "vivo-y31": { screen: 3299, battery: 1299, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1999, front_camera: 999 },
  "vivo-y20g": { screen: 3399, battery: 1199, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 899 },
  "vivo-y20": { screen: 1499, battery: 1199, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 899 },
  "vivo-y12g": { screen: 1499, battery: 1199, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 899 },
  "vivo-y12s": { screen: 1599, battery: 1199, charging: 799, speaker: 799, receiver: 799, mic: 799, back_camera: 1199, front_camera: 899 },

  // --- OPPO ---
  "oppo-find-n3-flip": { screen: 16999, battery: 3599, charging: 999, speaker: 999, receiver: 999, mic: 999 }, 
  // Note: Most other Oppo/Realme/OnePlus/Google models in the provided file 
  // listed model names but no specific pricing. They will fall back to defaultPrices.
};

// Default prices for models not in the database (The Safety Net)
const defaultPrices = { screen: 1999, battery: 999, charging: 699, speaker: 499, receiver: 499, mic: 499, back_camera: 1499, front_camera: 999 };

// ==============================================================================
// 2. MASSIVE BRAND LIST (The Cashify Killer List)
// ==============================================================================
const brandData: Record<string, string[]> = {
  apple: [
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini",
    "iPhone 11 Pro Max", "iPhone 11 Pro", "iPhone 11",
    "iPhone XS Max", "iPhone XS", "iPhone XR", "iPhone X",
    "iPhone 8 Plus", "iPhone 8", "iPhone 7 Plus", "iPhone 7",
    "iPhone 6S Plus", "iPhone 6S", "iPhone 6 Plus", "iPhone 6",
    "iPhone SE (2022)", "iPhone SE (2020)"
  ],
  samsung: [
    "Galaxy S24 Ultra", "Galaxy S24 Plus", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23 Plus", "Galaxy S23", "Galaxy S23 FE",
    "Galaxy S22 Ultra", "Galaxy S22 Plus", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21 Plus", "Galaxy S21", "Galaxy S21 FE",
    "Galaxy S20 Ultra", "Galaxy S20 Plus", "Galaxy S20", "Galaxy S20 FE",
    "Galaxy S10 Plus", "Galaxy S10", "Galaxy S10e",
    "Galaxy Note 20 Ultra", "Galaxy Note 20",
    "Galaxy Note 10 Plus", "Galaxy Note 10",
    "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy Z Fold 4", "Galaxy Z Flip 4",
    "Galaxy A55", "Galaxy A54", "Galaxy A35", "Galaxy A34", "Galaxy A25", "Galaxy A24",
    "Galaxy A15", "Galaxy A14 5G", "Galaxy A14 4G", "Galaxy A05s", "Galaxy A05",
    "Galaxy A04s", "Galaxy A04", "Galaxy A04e", "Galaxy A03s", "Galaxy A03",
    "Galaxy A73 5G", "Galaxy A53 5G", "Galaxy A33 5G", "Galaxy A23", "Galaxy A13",
    "Galaxy A72", "Galaxy A52s 5G", "Galaxy A52", "Galaxy A32", "Galaxy A22", "Galaxy A12",
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy M14 5G", "Galaxy M04",
    "Galaxy M53 5G", "Galaxy M33 5G", "Galaxy M13", "Galaxy M52 5G", "Galaxy M32",
    "Galaxy M12", "Galaxy M02s", "Galaxy M02", "Galaxy M51", "Galaxy M31s", "Galaxy M31",
    "Galaxy F54", "Galaxy F34", "Galaxy F15", "Galaxy F14", "Galaxy F04",
    "Galaxy F23 5G", "Galaxy F13", "Galaxy F42 5G", "Galaxy F22", "Galaxy F12", "Galaxy F62"
  ],
  xiaomi: [
    "Xiaomi 14 Ultra", "Xiaomi 14", "Xiaomi 13 Pro", "Xiaomi 13", "Xiaomi 12 Pro",
    "Xiaomi 11T Pro", "Xiaomi 11i HyperCharge", "Mi 11X Pro", "Mi 11X", "Mi 10T Pro", "Mi 10",
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13",
    "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12 5G", "Redmi Note 12 4G",
    "Redmi Note 11 Pro+", "Redmi Note 11 Pro", "Redmi Note 11T 5G", "Redmi Note 11S", "Redmi Note 11",
    "Redmi Note 10 Pro Max", "Redmi Note 10 Pro", "Redmi Note 10S", "Redmi Note 10", "Redmi Note 10T 5G",
    "Redmi Note 9 Pro Max", "Redmi Note 9 Pro", "Redmi Note 9",
    "Redmi 13C", "Redmi 13C 5G", "Redmi 12 5G", "Redmi 12",
    "Redmi 11 Prime 5G", "Redmi 10 Power", "Redmi 10 Prime", "Redmi 10",
    "Redmi 9 Power", "Redmi 9 Prime", "Redmi 9 Activ", "Redmi 9i", "Redmi 9A",
    "Redmi A3", "Redmi A2+", "Redmi A2", "Redmi A1"
  ],
  vivo: [
    "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro", "Vivo X80 Pro",
    "Vivo V30 Pro", "Vivo V30", "Vivo V29 Pro", "Vivo V29", "Vivo V29e",
    "Vivo V27 Pro", "Vivo V27", "Vivo V25 Pro", "Vivo V25",
    "Vivo V23 Pro", "Vivo V23",
    "Vivo T3 5G", "Vivo T2 Pro", "Vivo T2", "Vivo T2x 5G", "Vivo T1 Pro", "Vivo T1 5G", "Vivo T1 44W",
    "Vivo Y200e", "Vivo Y200", "Vivo Y100", "Vivo Y56 5G", "Vivo Y36", "Vivo Y28 5G", "Vivo Y27",
    "Vivo Y17s", "Vivo Y35", "Vivo Y22", "Vivo Y16", "Vivo Y02t", "Vivo Y02",
    "Vivo Y75 5G", "Vivo Y33s", "Vivo Y21T", "Vivo Y21", "Vivo Y21e",
    "Vivo Y73", "Vivo Y53s", "Vivo Y31", "Vivo Y20G", "Vivo Y20", "Vivo Y12G", "Vivo Y12s"
  ],
  oppo: [
    "Oppo Find N3 Flip", "Oppo Reno 11 Pro", "Oppo Reno 11",
    "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro", "Oppo Reno 10",
    "Oppo Reno 8 Pro", "Oppo Reno 8T", "Oppo Reno 8",
    "Oppo F25 Pro", "Oppo F23 5G", "Oppo F21s Pro", "Oppo F21 Pro", "Oppo F19 Pro+", "Oppo F19",
    "Oppo A79 5G", "Oppo A78 5G", "Oppo A77", "Oppo A59 5G", "Oppo A58",
    "Oppo A38", "Oppo A18", "Oppo A17", "Oppo A17k",
    "Oppo A96", "Oppo A76", "Oppo A55", "Oppo A54", "Oppo A53s",
    "Oppo A16", "Oppo A16k", "Oppo A15s", "Oppo A15"
  ],
  realme: [
    "Realme 12 Pro+", "Realme 12 Pro", "Realme 12+", "Realme 12x",
    "Realme 11 Pro+", "Realme 11 Pro", "Realme 11x 5G", "Realme 11 5G",
    "Realme 10 Pro+", "Realme 10 Pro", "Realme 10",
    "Realme 9 Pro+", "Realme 9 Pro", "Realme 9 5G", "Realme 9i",
    "Realme GT 2 Pro", "Realme GT Neo 3", "Realme GT Master Edition",
    "Realme Narzo 70 Pro", "Realme Narzo 60x", "Realme Narzo 60",
    "Realme Narzo N55", "Realme Narzo N53", "Realme Narzo 50 Pro", "Realme Narzo 50A Prime", "Realme Narzo 50i",
    "Realme C67 5G", "Realme C55", "Realme C53", "Realme C51", "Realme C35",
    "Realme C33", "Realme C31", "Realme C30", "Realme C25Y", "Realme C21Y", "Realme C11 2021"
  ],
  oneplus: [
    "OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus 11R",
    "OnePlus 10 Pro", "OnePlus 10T", "OnePlus 10R",
    "OnePlus 9 Pro", "OnePlus 9", "OnePlus 9RT", "OnePlus 9R",
    "OnePlus 8 Pro", "OnePlus 8T", "OnePlus 8",
    "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4", "OnePlus Nord CE 3", "OnePlus Nord CE 3 Lite",
    "OnePlus Nord 2T", "OnePlus Nord CE 2 Lite", "OnePlus Nord 2", "OnePlus Nord CE", "OnePlus Nord"
  ],
  google: [
    "Pixel 8 Pro", "Pixel 8", "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
    "Pixel 6 Pro", "Pixel 6", "Pixel 6a", "Pixel 5", "Pixel 4a"
  ],
  poco: [
    "Poco X6 Pro", "Poco X6", "Poco X5 Pro", "Poco X5", "Poco X4 Pro", "Poco X3 Pro",
    "Poco F5", "Poco F4 5G", "Poco F3 GT",
    "Poco M6 Pro 5G", "Poco M6 5G", "Poco M5", "Poco M4 Pro", "Poco M3",
    "Poco C65", "Poco C55", "Poco C51", "Poco C50", "Poco C31"
  ],
  iqoo: [
    "iQOO 12", "iQOO 11", "iQOO 9 Pro", "iQOO 9T", "iQOO 9 SE",
    "iQOO Neo 9 Pro", "iQOO Neo 7 Pro", "iQOO Neo 7", "iQOO Neo 6",
    "iQOO Z9", "iQOO Z7 Pro", "iQOO Z7s", "iQOO Z6 Pro", "iQOO Z6 Lite"
  ],
  motorola: [
    "Moto Edge 50 Pro", "Moto Edge 40 Neo", "Moto Edge 40", "Moto Edge 30 Ultra",
    "Moto G84 5G", "Moto G54 5G", "Moto G34 5G", "Moto G24 Power",
    "Moto G82", "Moto G62", "Moto G52", "Moto G42", "Moto G32",
    "Razr 40 Ultra", "Razr 40"
  ],
  nothing: [
    "Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)"
  ],
  nokia: [
    "Nokia G42 5G", "Nokia C32", "Nokia C22", "Nokia C12", 
    "Nokia G21", "Nokia G11 Plus", "Nokia X30 5G", "Nokia 5.4", "Nokia 5.3"
  ],
  asus: [
    "ROG Phone 8 Pro", "ROG Phone 7", "ROG Phone 6", "ROG Phone 5s",
    "Zenfone 10", "Zenfone 9", "Zenfone 8", 
    "Zenfone Max Pro M2", "Zenfone Max Pro M1"
  ],
  honor: [
    "Honor 90", "Honor X9b", "Honor Magic 6 Pro", "Honor X9a", "Honor 9X"
  ],
  infinix: [
    "Infinix Note 40 Pro", "Infinix Note 30 5G", "Infinix Note 12 Pro", "Infinix Note 12",
    "Infinix GT 20 Pro", "Infinix GT 10 Pro", 
    "Infinix Zero 30", "Infinix Zero Ultra",
    "Infinix Hot 40i", "Infinix Hot 30i", "Infinix Hot 20 5G",
    "Infinix Smart 8", "Infinix Smart 7"
  ]
};

// 3. REPAIR TYPES UI (Matches CSV columns)
const repairTypes = [
  { id: "screen", label: "Screen", icon: Smartphone },
  { id: "battery", label: "Battery", icon: Battery },
  { id: "charging", label: "Charging Jack", icon: Zap },
  { id: "speaker", label: "Speaker", icon: Volume2 },
  { id: "receiver", label: "Receiver", icon: PhoneCall },
  { id: "mic", label: "Mic", icon: Mic },
  { id: "back_camera", label: "Back Camera", icon: Camera },
  { id: "front_camera", label: "Front Camera", icon: Camera },
];

export default function BrandPage() {
  const params = useParams();
  
  if (!params) return <div className="p-10 text-center">Loading...</div>;

  const brandSlug = typeof params.brand === 'string' ? params.brand.toLowerCase() : '';
  const brandName = brandSlug.charAt(0).toUpperCase() + brandSlug.slice(1);
  const allModels = brandData[brandSlug] || ["Model 1", "Model 2"];

  // Search Logic
  const [searchTerm, setSearchTerm] = useState("");
  const filteredModels = allModels.filter(model => 
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // CART LOGIC
  const [selectedModel, setSelectedModel] = useState("");
  const [cart, setCart] = useState<string[]>([]);
  const [showForm, setShowForm] = useState(false);

  const toggleItem = (issueLabel: string) => {
    setCart((prev) => {
      if (prev.includes(issueLabel)) {
        return prev.filter(item => item !== issueLabel);
      } else {
        return [...prev, issueLabel];
      }
    });
  };

  const getTotalPrice = () => {
    let total = 0;
    const slug = toSlug(selectedModel);
    const specificData = modelDatabase[slug];

    cart.forEach(issueLabel => {
      const type = repairTypes.find(t => t.label === issueLabel);
      if (type) {
        if (specificData) {
          total += specificData[type.id] || 0;
        } else {
          // @ts-ignore
          total += defaultPrices[type.id] || 0;
        }
      }
    });
    return total;
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* HEADER */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
             <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-600" />
             </Link>
             <h1 className="text-xl font-bold text-slate-900">Select {brandName} Model</h1>
          </div>
          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input 
              type="text"
              placeholder={`Search your ${brandName}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-100 border-none rounded-lg text-sm font-medium text-slate-900 placeholder:text-slate-500 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </div>

      {/* GRID */}
      <div className="max-w-6xl mx-auto p-4">
        {filteredModels.length === 0 ? (
          <div className="text-center py-10 text-slate-400">
            <p>No model found matching "{searchTerm}"</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {filteredModels.map((model) => (
              <Sheet key={model}>
                <SheetTrigger asChild>
                  <div 
                    onClick={() => {
                      setSelectedModel(model);
                      setCart([]); 
                      setShowForm(false);
                    }}
                    className="group relative flex flex-col items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all active:scale-95 h-48 overflow-hidden"
                  >
                    {/* IMAGE LOGIC */}
                    <div className="w-full h-28 relative flex flex-col items-center justify-center mb-2">
                        <img
                          src={`/phones/${brandSlug}/${toSlug(model)}.jpg`}
                          alt={model}
                          className="object-contain max-h-full max-w-full group-hover:scale-110 transition-transform duration-300"
                          onError={(e) => {
                            e.currentTarget.style.display = 'none';
                            e.currentTarget.nextElementSibling?.classList.remove('hidden');
                          }}
                       />
                       <div className="hidden absolute inset-0 flex items-center justify-center">
                          <Smartphone className="w-12 h-12 text-slate-200 group-hover:text-blue-500 transition-colors" />
                       </div>
                    </div>
                    
                    <span className="text-sm font-bold text-slate-700 text-center leading-tight group-hover:text-blue-700 w-full">
                      {model}
                    </span>
                  </div>
                </SheetTrigger>

                {/* DRAWER (FIXED DESKTOP ALIGNMENT) */}
                <SheetContent 
                  side="bottom" 
                  className="h-[90vh] sm:h-[85vh] sm:max-w-lg sm:mx-auto sm:inset-x-0 sm:bottom-4 sm:rounded-2xl overflow-hidden flex flex-col bg-slate-50 shadow-2xl border-none outline-none"
                >
                  <SheetHeader className="mb-6 text-left bg-white p-4 -mt-6 rounded-t-[20px] sticky top-0 z-10 border-b">
                    <SheetTitle className="text-xl font-bold text-slate-900">
                      Repair {model}
                    </SheetTitle>
                    <p className="text-sm text-slate-500">Select multiple issues to see total estimate.</p>
                  </SheetHeader>

                  <div className="max-w-2xl mx-auto px-2 pb-32 overflow-y-auto">
                    
                    {!showForm ? (
                      <div className="space-y-3">
                        {repairTypes.map((type) => {
                          const slug = toSlug(model);
                          const specificData = modelDatabase[slug];
                          let price = 999;
                          if (specificData) {
                             price = specificData[type.id] || 0;
                          } else {
                             // @ts-ignore
                             price = defaultPrices[type.id] || 0;
                          }

                          const isAdded = cart.includes(type.label);

                          return (
                            <div 
                              key={type.id}
                              className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                isAdded 
                                  ? "bg-blue-50 border-blue-500 shadow-sm" 
                                  : "bg-white border-slate-200 hover:border-blue-300"
                              }`}
                            >
                              <div className="flex items-center gap-4">
                                <div className={`p-2 rounded-full ${isAdded ? "bg-blue-200 text-blue-700" : "bg-slate-100 text-slate-500"}`}>
                                  <type.icon className="w-5 h-5" />
                                </div>
                                <div>
                                  <h4 className={`font-bold ${isAdded ? "text-blue-900" : "text-slate-700"}`}>
                                    {type.label}
                                  </h4>
                                  <p className="text-sm font-semibold text-slate-500">₹{price}</p>
                                </div>
                              </div>

                              <button
                                onClick={() => toggleItem(type.label)}
                                className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
                                  isAdded
                                    ? "bg-blue-600 text-white hover:bg-blue-700"
                                    : "bg-slate-100 text-blue-600 hover:bg-blue-100"
                                }`}
                              >
                                {isAdded ? "Added" : "Add +"}
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="animate-in slide-in-from-right duration-300">
                          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-4">
                            <div className="flex justify-between items-center mb-4 border-b pb-4">
                              <h3 className="font-bold text-slate-900">Booking Summary</h3>
                              <button onClick={() => setShowForm(false)} className="text-xs text-blue-600 underline">Edit</button>
                            </div>
                            <ul className="space-y-2 mb-4">
                              {cart.map(item => (
                                <li key={item} className="text-sm text-slate-600 flex items-center gap-2">
                                  <Check className="w-4 h-4 text-green-500" /> {item}
                                </li>
                              ))}
                            </ul>
                            <div className="flex justify-between items-center pt-2 border-t font-bold text-lg text-slate-900">
                              <span>Total Estimate</span>
                              <span>₹{getTotalPrice()}</span>
                            </div>
                          </div>

                          <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                            <RepairForm 
                              selectedBrand={brandName} 
                              selectedModel={model} 
                              selectedIssues={cart}
                              estimatedPrice={getTotalPrice()}
                            />
                          </div>
                      </div>
                    )}

                  </div>

                  {/* BOTTOM BAR (Cart Summary) */}
                  {!showForm && cart.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white border-t p-4 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
                      <div className="max-w-md mx-auto flex items-center justify-between">
                        <div>
                          <p className="text-xs text-slate-500 uppercase font-bold">{cart.length} Services Selected</p>
                          <p className="text-2xl font-extrabold text-slate-900">₹{getTotalPrice()}</p>
                        </div>
                        <button 
                          onClick={() => setShowForm(true)}
                          className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors shadow-lg"
                        >
                          Book Now
                        </button>
                      </div>
                    </div>
                  )}

                </SheetContent>
              </Sheet>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}