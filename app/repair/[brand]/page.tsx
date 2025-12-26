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
// 1. MASTER PRICING DATABASE (Prices for high-end, Defaults for rest)
// ==============================================================================
const modelDatabase: Record<string, { [key: string]: number }> = {
  // Add specific high-value pricing here if needed.
  // The system will automatically use 'defaultPrices' for any model not listed here.
  "iphone-15-pro-max": { screen: 28000, battery: 7500, charging: 4500, speaker: 3500, receiver: 3500, mic: 3500, back_camera: 14500, front_camera: 8500 },
  "iphone-13": { screen: 8500, battery: 3500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 6500, front_camera: 4500 },
  // ... (You can keep your existing pricing data here)
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
    // S Series (Flagships)
    "Galaxy S24 Ultra", "Galaxy S24 Plus", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23 Plus", "Galaxy S23", "Galaxy S23 FE",
    "Galaxy S22 Ultra", "Galaxy S22 Plus", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21 Plus", "Galaxy S21", "Galaxy S21 FE",
    "Galaxy S20 Ultra", "Galaxy S20 Plus", "Galaxy S20", "Galaxy S20 FE",
    "Galaxy S10 Plus", "Galaxy S10", "Galaxy S10e",
    // Note & Fold
    "Galaxy Note 20 Ultra", "Galaxy Note 20", "Galaxy Note 10 Plus", "Galaxy Note 10",
    "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy Z Fold 4", "Galaxy Z Flip 4",
    // A Series (The Popular Ones)
    "Galaxy A55", "Galaxy A54", "Galaxy A35", "Galaxy A34", "Galaxy A25", "Galaxy A24",
    "Galaxy A15", "Galaxy A14 5G", "Galaxy A14 4G", "Galaxy A05s", "Galaxy A05",
    "Galaxy A04s", "Galaxy A04", "Galaxy A04e", "Galaxy A03s", "Galaxy A03",
    "Galaxy A73 5G", "Galaxy A53 5G", "Galaxy A33 5G", "Galaxy A23", "Galaxy A13",
    "Galaxy A72", "Galaxy A52s 5G", "Galaxy A52", "Galaxy A32", "Galaxy A22", "Galaxy A12",
    // M Series (Online Exclusives - Huge Volume)
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy M14 5G", "Galaxy M04",
    "Galaxy M53 5G", "Galaxy M33 5G", "Galaxy M13", "Galaxy M52 5G", "Galaxy M32",
    "Galaxy M12", "Galaxy M02s", "Galaxy M02", "Galaxy M51", "Galaxy M31s", "Galaxy M31",
    // F Series (Flipkart Exclusives)
    "Galaxy F54", "Galaxy F34", "Galaxy F15", "Galaxy F14", "Galaxy F04",
    "Galaxy F23 5G", "Galaxy F13", "Galaxy F42 5G", "Galaxy F22", "Galaxy F12", "Galaxy F62"
  ],
  xiaomi: [
    // Flagships
    "Xiaomi 14 Ultra", "Xiaomi 14", "Xiaomi 13 Pro", "Xiaomi 13", "Xiaomi 12 Pro", "Xiaomi 11T Pro", "Xiaomi 11i HyperCharge", "Mi 11X Pro", "Mi 11X", "Mi 10T Pro", "Mi 10",
    // Redmi Note Series (The Kings of Repair)
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13", 
    "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12 5G", "Redmi Note 12 4G",
    "Redmi Note 11 Pro+", "Redmi Note 11 Pro", "Redmi Note 11T 5G", "Redmi Note 11S", "Redmi Note 11",
    "Redmi Note 10 Pro Max", "Redmi Note 10 Pro", "Redmi Note 10S", "Redmi Note 10", "Redmi Note 10T 5G",
    "Redmi Note 9 Pro Max", "Redmi Note 9 Pro", "Redmi Note 9",
    // Redmi Number Series (Budget)
    "Redmi 13C", "Redmi 13C 5G", "Redmi 12 5G", "Redmi 12",
    "Redmi 11 Prime 5G", "Redmi 10 Power", "Redmi 10 Prime", "Redmi 10",
    "Redmi 9 Power", "Redmi 9 Prime", "Redmi 9 Activ", "Redmi 9i", "Redmi 9A",
    "Redmi A3", "Redmi A2+", "Redmi A2", "Redmi A1"
  ],
  vivo: [
    // X & V Series (Premium)
    "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro", "Vivo X80 Pro",
    "Vivo V30 Pro", "Vivo V30", "Vivo V29 Pro", "Vivo V29", "Vivo V29e",
    "Vivo V27 Pro", "Vivo V27", "Vivo V25 Pro", "Vivo V25", "Vivo V23 Pro", "Vivo V23",
    // T Series (Online)
    "Vivo T3 5G", "Vivo T2 Pro", "Vivo T2", "Vivo T2x 5G", "Vivo T1 Pro", "Vivo T1 5G", "Vivo T1 44W",
    // Y Series (Massive Volume - Offline Market)
    "Vivo Y200e", "Vivo Y200", "Vivo Y100", "Vivo Y56 5G",
    "Vivo Y36", "Vivo Y28 5G", "Vivo Y27", "Vivo Y17s",
    "Vivo Y35", "Vivo Y22", "Vivo Y16", "Vivo Y02t", "Vivo Y02",
    "Vivo Y75 5G", "Vivo Y33s", "Vivo Y21T", "Vivo Y21", "Vivo Y21e",
    "Vivo Y73", "Vivo Y53s", "Vivo Y31", "Vivo Y20G", "Vivo Y20", "Vivo Y12G", "Vivo Y12s"
  ],
  oppo: [
    // Reno & Find
    "Oppo Find N3 Flip", "Oppo Reno 11 Pro", "Oppo Reno 11", 
    "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro", "Oppo Reno 10",
    "Oppo Reno 8 Pro", "Oppo Reno 8T", "Oppo Reno 8",
    // F Series
    "Oppo F25 Pro", "Oppo F23 5G", "Oppo F21s Pro", "Oppo F21 Pro", "Oppo F19 Pro+", "Oppo F19",
    // A Series (Budget Kings)
    "Oppo A79 5G", "Oppo A78 5G", "Oppo A77", "Oppo A59 5G", "Oppo A58",
    "Oppo A38", "Oppo A18", "Oppo A17", "Oppo A17k",
    "Oppo A96", "Oppo A76", "Oppo A55", "Oppo A54", "Oppo A53s", "Oppo A16", "Oppo A16k", "Oppo A15s", "Oppo A15"
  ],
  realme: [
    // Number Series
    "Realme 12 Pro+", "Realme 12 Pro", "Realme 12+", "Realme 12x",
    "Realme 11 Pro+", "Realme 11 Pro", "Realme 11x 5G", "Realme 11 5G",
    "Realme 10 Pro+", "Realme 10 Pro", "Realme 10",
    "Realme 9 Pro+", "Realme 9 Pro", "Realme 9 5G", "Realme 9i",
    // GT Series
    "Realme GT 2 Pro", "Realme GT Neo 3", "Realme GT Master Edition",
    // Narzo Series (Budget Gaming)
    "Realme Narzo 70 Pro", "Realme Narzo 60x", "Realme Narzo 60",
    "Realme Narzo N55", "Realme Narzo N53", "Realme Narzo 50 Pro", "Realme Narzo 50A Prime", "Realme Narzo 50i",
    // C Series (Entry Level - Huge Volume)
    "Realme C67 5G", "Realme C55", "Realme C53", "Realme C51", 
    "Realme C35", "Realme C33", "Realme C31", "Realme C30",
    "Realme C25Y", "Realme C21Y", "Realme C11 2021"
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