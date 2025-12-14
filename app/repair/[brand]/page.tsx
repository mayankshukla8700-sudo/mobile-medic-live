"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RepairForm from "../../components/RepairForm"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Smartphone, Battery, Zap, Volume2, Wifi, Search, ArrowLeft, AlertCircle } from "lucide-react";
import Link from "next/link";

// --- HELPER: Slugify (Converts "iPhone 15 Pro" -> "iphone-15-pro") ---
const toSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-").replace(/[()]/g, "");
};

// ==============================================================================
// 1. THE MASTER PRICING DATABASE (THIS IS WHERE YOU DO THE HARD WORK) 🛠️
// ==============================================================================
// Format: "slug-name": { screen: 0, battery: 0, charging: 0, etc }
const modelDatabase: Record<string, { screen: number, battery: number, charging: number, glass: number }> = {
  
  // --- APPLE EXAMPLES ---
  "iphone-15-pro-max": { screen: 28999, battery: 6500, charging: 3500, glass: 8500 },
  "iphone-15":         { screen: 14500, battery: 5500, charging: 3000, glass: 6500 },
  "iphone-14-pro":     { screen: 24500, battery: 5500, charging: 3500, glass: 7500 },
  "iphone-13":         { screen: 8500,  battery: 3500, charging: 2500, glass: 4500 },
  "iphone-x":          { screen: 4500,  battery: 2200, charging: 1500, glass: 2500 },

  // --- SAMSUNG EXAMPLES ---
  "galaxy-s24-ultra":  { screen: 22000, battery: 4500, charging: 2500, glass: 6500 },
  "galaxy-s22-ultra":  { screen: 16000, battery: 3500, charging: 2200, glass: 5500 },
  "galaxy-m34":        { screen: 2800,  battery: 1500, charging: 800,  glass: 1200 },

  // --- ONEPLUS EXAMPLES ---
  "oneplus-11r":       { screen: 7500,  battery: 2500, charging: 1500, glass: 3000 },
  "oneplus-nord-ce-3": { screen: 4500,  battery: 1800, charging: 1200, glass: 2200 },

  // --- REALME/BUDGET EXAMPLES (Cheaper) ---
  "realme-10-pro":     { screen: 2800,  battery: 1200, charging: 800,  glass: 1500 },
  "realme-narzo-60":   { screen: 2400,  battery: 1200, charging: 700,  glass: 1200 },
};

// Default "Starting At" prices (Used if you haven't filled the database for a specific phone)
const defaultPrices = { screen: 1999, battery: 999, charging: 699, glass: 1499 };

// ==============================================================================

// 2. BRAND LIST (Names for the UI)
const brandData: Record<string, string[]> = {
  apple: [
    "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
    "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
    "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
    "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 11",
    "iPhone X", "iPhone XR", "iPhone XS Max", "iPhone 7", "iPhone 8"
  ],
  samsung: [
    "Galaxy S24 Ultra", "Galaxy S24", "Galaxy S23 Ultra", "Galaxy S22 Ultra",
    "Galaxy A54", "Galaxy A34", "Galaxy M34", "Galaxy F54", "Note 20 Ultra"
  ],
  oneplus: [
    "OnePlus 12", "OnePlus 11R", "OnePlus 11", "OnePlus 10R", 
    "OnePlus Nord CE 3", "OnePlus Nord 4"
  ],
  realme: [
    "Realme 12 Pro+", "Realme 11 Pro", "Realme 10 Pro", "Realme Narzo 60", "Realme C67"
  ],
  xiaomi: ["Xiaomi 14", "Redmi Note 13 Pro", "Redmi Note 12", "Poco X6 Pro"],
  vivo: ["Vivo X100", "Vivo V30", "Vivo T2 Pro", "Vivo Y200"],
  oppo: ["Oppo Reno 11", "Oppo F25 Pro", "Oppo A78"],
  nothing: ["Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)"],
  google: ["Pixel 8 Pro", "Pixel 7a", "Pixel 6a"],
  iqoo: ["iQOO 12", "iQOO Neo 9 Pro", "iQOO Z7 Pro"],
  motorola: ["Moto Edge 40", "Moto G84", "Razr 40 Ultra"]
};

// 3. REPAIR TYPES DEFINITION
const repairTypes = [
  { id: "screen", label: "Screen Replacement", icon: Smartphone },
  { id: "glass", label: "Glass Only Replacement", icon: ScanFace }, // Added Glass option
  { id: "battery", label: "Battery Replacement", icon: Battery },
  { id: "charging", label: "Charging Port", icon: Zap },
];

// Helper Icon for Glass
import { ScanFace } from "lucide-react"; 

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

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // --- THE SMART PRICING LOGIC ---
  const getDynamicPrice = (modelName: string, issueId: string) => {
    const slug = toSlug(modelName); // e.g., "iphone-15-pro"
    
    // 1. Check if we have specific data for this exact phone
    const specificData = modelDatabase[slug];
    
    if (specificData) {
      // @ts-ignore
      return specificData[issueId] || 0; // Return specific price (e.g., 28999)
    }

    // 2. If no specific data, return the default "Starting At" price
    // @ts-ignore
    return defaultPrices[issueId] || 999;
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
                      setSelectedIssue(""); 
                      setEstimatedPrice(0);
                    }}
                    className="group relative flex flex-col items-center justify-between p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-lg cursor-pointer transition-all active:scale-95 h-48 overflow-hidden"
                  >
                    {/* IMAGE LOGIC (Matches your local files) */}
                    <div className="w-full h-28 relative flex flex-col items-center justify-center mb-2">
                       <img
                          src={`/models/${brandSlug}/${toSlug(model)}.jpg`}
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

                {/* DRAWER */}
                <SheetContent side="bottom" className="h-[90vh] rounded-t-[20px] overflow-y-auto bg-white">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-xl font-bold text-slate-900">
                      Repair {model}
                    </SheetTitle>
                    <p className="text-sm text-slate-500">Select the issue to see the exact price.</p>
                  </SheetHeader>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      {repairTypes.map((type) => {
                        // CALCULATE PRICE HERE
                        const price = getDynamicPrice(model, type.id);
                        
                        return (
                          <div 
                            key={type.id}
                            onClick={() => {
                              setSelectedIssue(type.label);
                              setEstimatedPrice(price);
                            }}
                            className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center gap-2 text-center
                              ${selectedIssue === type.label 
                                ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" 
                                : "border-slate-200 hover:border-blue-400 text-slate-600"
                              }`}
                          >
                            <type.icon className="h-6 w-6" />
                            <span className="text-xs font-medium">{type.label}</span>
                            <span className="text-sm font-bold">₹{price}</span>
                          </div>
                        );
                      })}
                    </div>

                    {selectedIssue && (
                      <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        <div className="bg-slate-100 p-4 rounded-lg mb-4 flex justify-between items-center">
                          <div>
                            <p className="text-xs text-slate-500 uppercase font-bold">Total Estimate</p>
                            <p className="text-lg font-bold text-slate-900">₹{estimatedPrice}</p>
                          </div>
                          <div className="text-right">
                             <p className="text-xs text-slate-500">{selectedIssue}</p>
                          </div>
                        </div>
                        
                        <RepairForm 
                          selectedBrand={brandName} 
                          selectedModel={model} 
                          selectedIssue={selectedIssue}
                          estimatedPrice={estimatedPrice}
                        />
                      </div>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}