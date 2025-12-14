"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RepairForm from "../../components/RepairForm"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Smartphone, Battery, Zap, Volume2, Wifi, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 1. MASSIVE MODEL DATABASE
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
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy F54"
  ],
  oneplus: [
    "OnePlus 12", "OnePlus 12R",
    "OnePlus 11", "OnePlus 11R",
    "OnePlus 10 Pro", "OnePlus 10T", "OnePlus 10R",
    "OnePlus 9 Pro", "OnePlus 9", "OnePlus 9RT", "OnePlus 9R",
    "OnePlus 8 Pro", "OnePlus 8T", "OnePlus 8",
    "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4", "OnePlus Nord CE 3",
    "OnePlus Nord 2T"
  ],
  xiaomi: [
    "Xiaomi 14 Ultra", "Xiaomi 14",
    "Xiaomi 13 Pro", "Xiaomi 13",
    "Xiaomi 12 Pro", "Xiaomi 12",
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13",
    "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12",
    "Redmi 13C", "Redmi 12 5G", "Redmi A3"
  ],
  vivo: [
    "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro",
    "Vivo V30 Pro", "Vivo V30", "Vivo V29 Pro", "Vivo V29",
    "Vivo T2 Pro", "Vivo T2", "Vivo Y200e", "Vivo Y200"
  ],
  oppo: [
    "Oppo Find N3 Flip", "Oppo Find X7 Ultra",
    "Oppo Reno 11 Pro", "Oppo Reno 11",
    "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro",
    "Oppo F25 Pro", "Oppo F23", "Oppo A79", "Oppo A78"
  ],
  realme: [
    "Realme 12 Pro+", "Realme 12 Pro", "Realme 12+", "Realme 12x",
    "Realme 11 Pro+", "Realme 11 Pro", "Realme 11x",
    "Realme GT 2 Pro", "Realme Narzo 70 Pro", "Realme C67"
  ],
  google: [
    "Pixel 8 Pro", "Pixel 8",
    "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
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

const repairTypes = [
  { id: "screen", label: "Screen Replacement", price: 2499, icon: Smartphone },
  { id: "battery", label: "Battery Replacement", price: 1299, icon: Battery },
  { id: "charging", label: "Charging Port", price: 899, icon: Zap },
  { id: "speaker", label: "Speaker / Mic", price: 699, icon: Volume2 },
  { id: "sensor", label: "FaceID / Sensors", price: 1499, icon: Wifi },
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

  // Helper to convert "iPhone 15 Pro Max" -> "iphone-15-pro-max"
  const toSlug = (text: string) => {
    return text
      .toLowerCase()
      .replace(/ /g, "-")       // Replace spaces with dashes
      .replace(/[()]/g, "");    // Remove parentheses like (2022)
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HEADER --- */}
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

      {/* --- MODEL GRID --- */}
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
                    {/* IMAGE CONTAINER */}
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
                       
                       {/* Fallback Icon (Hidden by default) */}
                       <div className="hidden absolute inset-0 flex items-center justify-center">
                          <Smartphone className="w-12 h-12 text-slate-200 group-hover:text-blue-500 transition-colors" />
                       </div>
                    </div>
                    
                    {/* MODEL NAME */}
                    <span className="text-sm font-bold text-slate-700 text-center leading-tight group-hover:text-blue-700 w-full">
                      {model}
                    </span>
                    
                    {/* HOVER BADGE */}
                    <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-blue-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
                        Book
                      </div>
                    </div>
                  </div>
                </SheetTrigger>

                <SheetContent side="bottom" className="h-[90vh] rounded-t-[20px] overflow-y-auto bg-white">
                  <SheetHeader className="mb-6 text-left">
                    <SheetTitle className="text-xl font-bold text-slate-900">
                      Repair {model}
                    </SheetTitle>
                    <p className="text-sm text-slate-500">Select the issue to get a price quote.</p>
                  </SheetHeader>

                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-3">
                      {repairTypes.map((type) => (
                        <div 
                          key={type.id}
                          onClick={() => {
                            setSelectedIssue(type.label);
                            setEstimatedPrice(type.price);
                          }}
                          className={`p-3 rounded-lg border cursor-pointer transition-all flex flex-col items-center gap-2 text-center
                            ${selectedIssue === type.label 
                              ? "border-blue-600 bg-blue-50 text-blue-700 ring-1 ring-blue-600" 
                              : "border-slate-200 hover:border-blue-400 text-slate-600"
                            }`}
                        >
                          <type.icon className="h-6 w-6" />
                          <span className="text-xs font-medium">{type.label}</span>
                          <span className="text-sm font-bold">₹{type.price}</span>
                        </div>
                      ))}
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