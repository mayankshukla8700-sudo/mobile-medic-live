"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RepairForm from "../../components/RepairForm"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Smartphone, Battery, Zap, Volume2, Mic, Camera, PhoneCall, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

// --- HELPER: Slugify (Converts "iPhone 15 Pro" -> "iphone-15-pro") ---
const toSlug = (text: string) => {
  return text.toLowerCase().replace(/ /g, "-").replace(/[()]/g, "");
};

// ==============================================================================
// 1. THE MASTER PRICING DATABASE (Derived from your Rate Card CSV) 🛠️
// ==============================================================================
const modelDatabase: Record<string, { [key: string]: number }> = {
  // --- Apple ---
  "iphone-15-pro-max": { screen: 28000, battery: 7500, charging: 4500, speaker: 3500, receiver: 3500, mic: 3500, back_camera: 14500, front_camera: 8500 },
  "iphone-15-pro": { screen: 26000, battery: 7500, charging: 4500, speaker: 3500, receiver: 3500, mic: 3500, back_camera: 14500, front_camera: 8500 },
  "iphone-15-plus": { screen: 16500, battery: 5500, charging: 4500, speaker: 3500, receiver: 3500, mic: 3500, back_camera: 9500, front_camera: 7500 },
  "iphone-15": { screen: 14500, battery: 5500, charging: 4500, speaker: 3500, receiver: 3500, mic: 3500, back_camera: 9500, front_camera: 7500 },
  "iphone-14-pro-max": { screen: 26500, battery: 6500, charging: 3500, speaker: 3000, receiver: 3000, mic: 3000, back_camera: 12500, front_camera: 6500 },
  "iphone-14-pro": { screen: 24500, battery: 6500, charging: 3500, speaker: 3000, receiver: 3000, mic: 3000, back_camera: 12500, front_camera: 6500 },
  "iphone-14-plus": { screen: 12500, battery: 4500, charging: 3500, speaker: 2500, receiver: 2500, mic: 2500, back_camera: 8500, front_camera: 5500 },
  "iphone-14": { screen: 9500, battery: 4500, charging: 3500, speaker: 2500, receiver: 2500, mic: 2500, back_camera: 8500, front_camera: 5500 },
  "iphone-13-pro-max": { screen: 24000, battery: 5500, charging: 3000, speaker: 2500, receiver: 2500, mic: 2500, back_camera: 9500, front_camera: 5500 },
  "iphone-13-pro": { screen: 22000, battery: 5500, charging: 3000, speaker: 2500, receiver: 2500, mic: 2500, back_camera: 9500, front_camera: 5500 },
  "iphone-13": { screen: 8500, battery: 3500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 6500, front_camera: 4500 },
  "iphone-13-mini": { screen: 12500, battery: 3500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 6500, front_camera: 4500 },
  "iphone-12-pro-max": { screen: 12500, battery: 4500, charging: 2800, speaker: 2200, receiver: 2200, mic: 2200, back_camera: 8500, front_camera: 4500 },
  "iphone-12-pro": { screen: 9500, battery: 4500, charging: 2800, speaker: 2200, receiver: 2200, mic: 2200, back_camera: 8500, front_camera: 4500 },
  "iphone-12": { screen: 7500, battery: 3500, charging: 2200, speaker: 1800, receiver: 1800, mic: 1800, back_camera: 5500, front_camera: 3500 },
  "iphone-12-mini": { screen: 9500, battery: 3500, charging: 2200, speaker: 1800, receiver: 1800, mic: 1800, back_camera: 5500, front_camera: 3500 },
  "iphone-11-pro-max": { screen: 9500, battery: 4000, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 7500, front_camera: 4000 },
  "iphone-11-pro": { screen: 7500, battery: 4000, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 7500, front_camera: 4000 },
  "iphone-11": { screen: 4500, battery: 3200, charging: 2000, speaker: 1500, receiver: 1500, mic: 1500, back_camera: 4500, front_camera: 3000 },
  "iphone-xs-max": { screen: 7500, battery: 3500, charging: 2200, speaker: 1800, receiver: 1800, mic: 1800, back_camera: 5500, front_camera: 3500 },
  "iphone-xs": { screen: 5500, battery: 3500, charging: 2200, speaker: 1800, receiver: 1800, mic: 1800, back_camera: 5500, front_camera: 3500 },
  "iphone-xr": { screen: 4500, battery: 3200, charging: 2000, speaker: 1500, receiver: 1500, mic: 1500, back_camera: 4500, front_camera: 3000 },
  "iphone-x": { screen: 4500, battery: 3200, charging: 2000, speaker: 1500, receiver: 1500, mic: 1500, back_camera: 4500, front_camera: 3000 },
  "iphone-8-plus": { screen: 3200, battery: 2500, charging: 1500, speaker: 1200, receiver: 1200, mic: 1200, back_camera: 3500, front_camera: 2500 },
  "iphone-8": { screen: 2800, battery: 2500, charging: 1500, speaker: 1200, receiver: 1200, mic: 1200, back_camera: 3500, front_camera: 2500 },
  "iphone-7-plus": { screen: 2800, battery: 2200, charging: 1200, speaker: 1000, receiver: 1000, mic: 1000, back_camera: 3000, front_camera: 2000 },
  "iphone-7": { screen: 2400, battery: 2200, charging: 1200, speaker: 1000, receiver: 1000, mic: 1000, back_camera: 3000, front_camera: 2000 },
  "iphone-6s-plus": { screen: 2400, battery: 1800, charging: 1000, speaker: 800, receiver: 800, mic: 800, back_camera: 2500, front_camera: 1500 },
  "iphone-6s": { screen: 2000, battery: 1800, charging: 1000, speaker: 800, receiver: 800, mic: 800, back_camera: 2500, front_camera: 1500 },
  "iphone-6-plus": { screen: 2200, battery: 1800, charging: 1000, speaker: 800, receiver: 800, mic: 800, back_camera: 2000, front_camera: 1200 },
  "iphone-6": { screen: 1800, battery: 1800, charging: 1000, speaker: 800, receiver: 800, mic: 800, back_camera: 2000, front_camera: 1200 },
  "iphone-se-2022": { screen: 3500, battery: 2500, charging: 1500, speaker: 1200, receiver: 1200, mic: 1200, back_camera: 3500, front_camera: 2500 },
  "iphone-se-2020": { screen: 2800, battery: 2500, charging: 1500, speaker: 1200, receiver: 1200, mic: 1200, back_camera: 3500, front_camera: 2500 },

  // --- Samsung ---
  "galaxy-s24-ultra": { screen: 24000, battery: 5500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 9500, front_camera: 5500 },
  "galaxy-s24-plus": { screen: 18000, battery: 5500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 8500, front_camera: 5500 },
  "galaxy-s24": { screen: 16000, battery: 5500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 8500, front_camera: 5500 },
  "galaxy-s23-ultra": { screen: 22000, battery: 5000, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 8500, front_camera: 5000 },
  "galaxy-s23-plus": { screen: 16000, battery: 5000, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 7500, front_camera: 5000 },
  "galaxy-s23": { screen: 14000, battery: 5000, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 7500, front_camera: 5000 },
  "galaxy-s23-fe": { screen: 11000, battery: 4500, charging: 2200, speaker: 1800, receiver: 1800, mic: 1800, back_camera: 6500, front_camera: 4500 },
  "galaxy-s22-ultra": { screen: 19000, battery: 4500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 7500, front_camera: 4500 },
  "galaxy-s22-plus": { screen: 14000, battery: 4500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 6500, front_camera: 4500 },
  "galaxy-s22": { screen: 12000, battery: 4500, charging: 2500, speaker: 2000, receiver: 2000, mic: 2000, back_camera: 6500, front_camera: 4500 },
};

// Default "Starting At" prices (Used if a model isn't in the database above)
const defaultPrices = { screen: 1999, battery: 999, charging: 699, speaker: 499, receiver: 499, mic: 499, back_camera: 1499, front_camera: 999 };

// 2. BRAND LIST (Matches the Sidebar & Home Page logic)
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
    "Galaxy A55", "Galaxy A54", "Galaxy A34", "Galaxy A24", "Galaxy A14",
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy M14", "Galaxy F54"
  ],
  oneplus: [
    "OnePlus 12", "OnePlus 12R", "OnePlus 11", "OnePlus 11R",
    "OnePlus 10 Pro", "OnePlus 10T", "OnePlus 10R",
    "OnePlus 9 Pro", "OnePlus 9", "OnePlus 9RT", "OnePlus 9R",
    "OnePlus 8 Pro", "OnePlus 8T", "OnePlus 8",
    "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4", "OnePlus Nord CE 3",
    "OnePlus Nord 2T"
  ],
  xiaomi: [
    "Xiaomi 14 Ultra", "Xiaomi 14", "Xiaomi 13 Pro", "Xiaomi 13",
    "Xiaomi 12 Pro", "Xiaomi 12", "Redmi Note 13 Pro+", "Redmi Note 13 Pro",
    "Redmi Note 13", "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12",
    "Redmi 13C", "Redmi 12 5G", "Redmi A3"
  ],
  vivo: [
    "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro", "Vivo V30 Pro", "Vivo V30",
    "Vivo V29 Pro", "Vivo V29", "Vivo T2 Pro", "Vivo T2", "Vivo Y200e", "Vivo Y200"
  ],
  oppo: [
    "Oppo Find N3 Flip", "Oppo Find X7 Ultra", "Oppo Reno 11 Pro", "Oppo Reno 11",
    "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro", "Oppo F25 Pro", "Oppo F23", "Oppo A79", "Oppo A78"
  ],
  realme: [
    "Realme 12 Pro+", "Realme 12 Pro", "Realme 12+", "Realme 12x",
    "Realme 11 Pro+", "Realme 11 Pro", "Realme 11x", "Realme GT 2 Pro", "Realme Narzo 70 Pro", "Realme C67"
  ],
  google: [
    "Pixel 8 Pro", "Pixel 8", "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
    "Pixel 6 Pro", "Pixel 6", "Pixel 6a", "Pixel 5"
  ],
  poco: [
    "Poco X6 Pro", "Poco X6", "Poco F5", "Poco M6 Pro", "Poco C65"
  ],
  iqoo: [
    "iQOO 12", "iQOO 11", "iQOO Neo 9 Pro", "iQOO Neo 7 Pro", "iQOO Z9"
  ],
  motorola: [
    "Moto Edge 50 Pro", "Moto Edge 40 Neo", "Moto G84", "Moto G54", "Razr 40 Ultra"
  ],
  nothing: [
    "Nothing Phone (2a)", "Nothing Phone (2)", "Nothing Phone (1)"
  ]
};

// 3. UPDATED REPAIR TYPES (Matches your CSV Columns)
const repairTypes = [
  { id: "screen", label: "Screen Replacement", icon: Smartphone },
  { id: "battery", label: "Battery Replacement", icon: Battery },
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

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  // --- THE SMART PRICING LOGIC ---
  const getDynamicPrice = (modelName: string, issueId: string) => {
    const slug = toSlug(modelName); 
    
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
                    {/* IMAGE LOGIC */}
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