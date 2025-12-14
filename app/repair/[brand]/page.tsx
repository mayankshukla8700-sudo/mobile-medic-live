"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import RepairForm from "../../components/RepairForm"; 
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";
import { Smartphone, Battery, Zap, Volume2, Wifi, Search, ArrowLeft } from "lucide-react";
import Link from "next/link";

// 1. MASSIVE MODEL DATABASE (Expanded to cover almost all models)
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
    // S Series
    "Galaxy S24 Ultra", "Galaxy S24 Plus", "Galaxy S24",
    "Galaxy S23 Ultra", "Galaxy S23 Plus", "Galaxy S23", "Galaxy S23 FE",
    "Galaxy S22 Ultra", "Galaxy S22 Plus", "Galaxy S22",
    "Galaxy S21 Ultra", "Galaxy S21 Plus", "Galaxy S21", "Galaxy S21 FE",
    "Galaxy S20 Ultra", "Galaxy S20 Plus", "Galaxy S20", "Galaxy S20 FE",
    "Galaxy S10 Plus", "Galaxy S10", "Galaxy S10e",
    // Note Series
    "Galaxy Note 20 Ultra", "Galaxy Note 20", 
    "Galaxy Note 10 Plus", "Galaxy Note 10",
    // Fold/Flip
    "Galaxy Z Fold 5", "Galaxy Z Flip 5", "Galaxy Z Fold 4", "Galaxy Z Flip 4",
    "Galaxy Z Fold 3", "Galaxy Z Flip 3",
    // A Series
    "Galaxy A55", "Galaxy A54", "Galaxy A34", "Galaxy A24", "Galaxy A14",
    "Galaxy A73", "Galaxy A53", "Galaxy A33", "Galaxy A23", "Galaxy A13",
    "Galaxy A52s", "Galaxy A52", "Galaxy A72", "Galaxy A32",
    // M Series
    "Galaxy M55", "Galaxy M54", "Galaxy M34", "Galaxy M14", "Galaxy M04",
    "Galaxy M53", "Galaxy M33", "Galaxy M13",
    // F Series
    "Galaxy F54", "Galaxy F34", "Galaxy F14", "Galaxy F04"
  ],
  oneplus: [
    "OnePlus 12", "OnePlus 12R",
    "OnePlus 11", "OnePlus 11R",
    "OnePlus 10 Pro", "OnePlus 10T", "OnePlus 10R",
    "OnePlus 9 Pro", "OnePlus 9", "OnePlus 9RT", "OnePlus 9R",
    "OnePlus 8 Pro", "OnePlus 8T", "OnePlus 8",
    "OnePlus 7T Pro", "OnePlus 7T", "OnePlus 7 Pro", "OnePlus 7",
    "OnePlus 6T", "OnePlus 6",
    "OnePlus Nord 4", "OnePlus Nord 3", "OnePlus Nord CE 4", "OnePlus Nord CE 3",
    "OnePlus Nord 2T", "OnePlus Nord CE 2", "OnePlus Nord 2", "OnePlus Nord CE", "OnePlus Nord"
  ],
  xiaomi: [
    // Xiaomi Number Series
    "Xiaomi 14 Ultra", "Xiaomi 14",
    "Xiaomi 13 Pro", "Xiaomi 13",
    "Xiaomi 12 Pro", "Xiaomi 12", "Xiaomi 12X",
    "Mi 11 Ultra", "Mi 11X Pro", "Mi 11X", "Mi 11 Lite",
    "Mi 10T Pro", "Mi 10T", "Mi 10",
    // Redmi Note Series
    "Redmi Note 13 Pro+", "Redmi Note 13 Pro", "Redmi Note 13",
    "Redmi Note 12 Pro+", "Redmi Note 12 Pro", "Redmi Note 12",
    "Redmi Note 11 Pro+", "Redmi Note 11 Pro", "Redmi Note 11S", "Redmi Note 11",
    "Redmi Note 10 Pro Max", "Redmi Note 10 Pro", "Redmi Note 10S", "Redmi Note 10",
    // Redmi Number Series
    "Redmi 13C", "Redmi 12 5G", "Redmi 12C",
    "Redmi A3", "Redmi A2", "Redmi A1"
  ],
  vivo: [
    // X Series
    "Vivo X100 Pro", "Vivo X100", "Vivo X90 Pro", "Vivo X90",
    "Vivo X80 Pro", "Vivo X80", "Vivo X70 Pro", "Vivo X60 Pro",
    // V Series
    "Vivo V30 Pro", "Vivo V30", 
    "Vivo V29 Pro", "Vivo V29", "Vivo V29e",
    "Vivo V27 Pro", "Vivo V27",
    "Vivo V25 Pro", "Vivo V25", 
    "Vivo V23 Pro", "Vivo V23",
    // T Series
    "Vivo T3", "Vivo T2 Pro", "Vivo T2", "Vivo T2x", "Vivo T1 Pro", "Vivo T1",
    // Y Series
    "Vivo Y200e", "Vivo Y200", "Vivo Y100",
    "Vivo Y56", "Vivo Y28", "Vivo Y17s", "Vivo Y02t"
  ],
  oppo: [
    // Find Series
    "Oppo Find N3 Flip", "Oppo Find N2 Flip", "Oppo Find X7 Ultra",
    // Reno Series
    "Oppo Reno 11 Pro", "Oppo Reno 11",
    "Oppo Reno 10 Pro+", "Oppo Reno 10 Pro", "Oppo Reno 10",
    "Oppo Reno 8 Pro", "Oppo Reno 8", "Oppo Reno 8T",
    "Oppo Reno 7 Pro", "Oppo Reno 7",
    // F Series
    "Oppo F25 Pro", "Oppo F23", "Oppo F21s Pro", "Oppo F21 Pro",
    "Oppo F19 Pro+", "Oppo F19 Pro", "Oppo F19",
    // A Series
    "Oppo A79", "Oppo A78", "Oppo A59", "Oppo A38", "Oppo A18"
  ],
  realme: [
    // Number/Pro Series
    "Realme 12 Pro+", "Realme 12 Pro", "Realme 12+", "Realme 12x",
    "Realme 11 Pro+", "Realme 11 Pro", "Realme 11x", "Realme 11",
    "Realme 10 Pro+", "Realme 10 Pro", "Realme 10",
    // GT Series
    "Realme GT 2 Pro", "Realme GT 2", "Realme GT Neo 3", "Realme GT Neo 2",
    // Narzo Series
    "Realme Narzo 70 Pro", "Realme Narzo 60 Pro", "Realme Narzo 60", "Realme Narzo N55",
    // C Series
    "Realme C67", "Realme C65", "Realme C55", "Realme C53", "Realme C51"
  ],
  google: [
    "Pixel 8 Pro", "Pixel 8",
    "Pixel 7 Pro", "Pixel 7", "Pixel 7a",
    "Pixel 6 Pro", "Pixel 6", "Pixel 6a",
    "Pixel 5", "Pixel 4a"
  ],
  poco: [
    "Poco X6 Pro", "Poco X6",
    "Poco F5", "Poco F4", "Poco F3 GT",
    "Poco X5 Pro", "Poco X5",
    "Poco M6 Pro", "Poco M6", "Poco M5", "Poco M4 Pro",
    "Poco C65", "Poco C61", "Poco C55"
  ],
  iqoo: [
    "iQOO 12", "iQOO 11", "iQOO 9 Pro", "iQOO 9 SE", "iQOO 9",
    "iQOO Neo 9 Pro", "iQOO Neo 7 Pro", "iQOO Neo 7", "iQOO Neo 6",
    "iQOO Z9", "iQOO Z7 Pro", "iQOO Z7", "iQOO Z6 Pro", "iQOO Z6 Lite"
  ],
  motorola: [
    "Moto Edge 50 Pro", "Moto Edge 40 Neo", "Moto Edge 40", "Moto Edge 30",
    "Moto G84", "Moto G54", "Moto G34", "Moto G24",
    "Razr 40 Ultra", "Razr 40"
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
  const allModels = brandData[brandSlug] || ["Model 1", "Model 2", "Model 3"];

  // Search Logic
  const [searchTerm, setSearchTerm] = useState("");
  const filteredModels = allModels.filter(model => 
    model.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      
      {/* --- HEADER --- */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-4 py-4 shadow-sm">
        <div className="max-w-2xl mx-auto">
          {/* Back Button & Title */}
          <div className="flex items-center gap-3 mb-4">
             <Link href="/" className="p-2 -ml-2 hover:bg-slate-100 rounded-full transition-colors">
               <ArrowLeft className="w-5 h-5 text-slate-600" />
             </Link>
             <h1 className="text-xl font-bold text-slate-900">Select {brandName} Model</h1>
          </div>

          {/* Search Bar (Narrower: max-w-xl) */}
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

      {/* --- MODEL GRID (5 Columns on Desktop) --- */}
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
                    className="flex flex-col items-center justify-center p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-md cursor-pointer transition-all active:scale-95 h-36 text-center group"
                  >
                    {/* Placeholder Phone Image (Stylized) */}
                    <div className="w-12 h-16 mb-3 relative flex items-center justify-center">
                        <Smartphone className="w-10 h-10 text-slate-300 group-hover:text-blue-500 transition-colors" />
                    </div>
                    
                    {/* Model Name */}
                    <span className="text-sm font-bold text-slate-700 leading-tight group-hover:text-blue-700">
                      {model}
                    </span>
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