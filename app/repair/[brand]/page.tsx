"use client";

import { useState } from "react";
// GO UP 2 LEVELS to find RepairForm in 'app/components'
import RepairForm from "../../components/RepairForm"; 

// GO UP 3 LEVELS to find the UI folder in the Root
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "../../../components/ui/sheet";

// Icons
import { Smartphone, Battery, Zap, Volume2, Wifi } from "lucide-react";

// 1. THE DATA
const brandData: Record<string, string[]> = {
  apple: ["iPhone 15 Pro Max", "iPhone 15", "iPhone 14 Pro", "iPhone 14", "iPhone 13", "iPhone 12", "iPhone 11", "iPhone X"],
  samsung: ["Galaxy S24 Ultra", "Galaxy S23", "Galaxy A54", "Galaxy M34", "Galaxy F14", "Note 20 Ultra"],
  xiaomi: ["Redmi Note 13 Pro", "Redmi Note 12", "Xiaomi 14", "Xiaomi 13 Pro"],
  vivo: ["Vivo X100", "Vivo V29", "Vivo T2 Pro", "Vivo Y200"],
  oppo: ["Oppo Reno 11", "Oppo F25 Pro", "Oppo A78", "Oppo Find N3 Flip"],
  realme: ["Realme 12 Pro+", "Realme 11x", "Realme Narzo 60", "Realme C67"],
  oneplus: ["OnePlus 12", "OnePlus 11R", "OnePlus Nord CE 3", "OnePlus 10 Pro"],
  google: ["Pixel 8 Pro", "Pixel 7a", "Pixel 7", "Pixel 6a"],
  poco: ["Poco X6 Pro", "Poco M6 Pro", "Poco F5", "Poco C65"],
  iqoo: ["iQOO 12", "iQOO Neo 9 Pro", "iQOO Z7 Pro", "iQOO 11"],
  motorola: ["Moto Edge 40", "Moto G84", "Moto G54", "Razr 40 Ultra"],
  infinix: ["Infinix Note 40", "Infinix Zero 30", "Infinix Hot 40", "Infinix GT 10 Pro"],
  honor: ["Honor X9b", "Honor 90", "Honor Magic 6"],
  nokia: ["Nokia G42", "Nokia C32", "Nokia X30"],
  asus: ["ROG Phone 8", "ROG Phone 7", "Zenfone 10", "Zenfone 9"],
  nothing: ["Nothing Phone (2)", "Nothing Phone (1)", "Nothing Phone (2a)"],
};

// 2. THE PRICES
const repairTypes = [
  { id: "screen", label: "Screen Replacement", price: 2499, icon: Smartphone },
  { id: "battery", label: "Battery Replacement", price: 1299, icon: Battery },
  { id: "charging", label: "Charging Port", price: 899, icon: Zap },
  { id: "speaker", label: "Speaker / Mic", price: 699, icon: Volume2 },
  { id: "sensor", label: "FaceID / Sensors", price: 1499, icon: Wifi },
];

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brandSlug = params.brand.toLowerCase();
  const brandName = decodeURIComponent(params.brand).toUpperCase();
  
  const models = brandData[brandSlug] || ["Pro Model", "Standard Model"];

  const [selectedModel, setSelectedModel] = useState("");
  const [selectedIssue, setSelectedIssue] = useState("");
  const [estimatedPrice, setEstimatedPrice] = useState(0);

  return (
    <div className="max-w-md mx-auto p-4 pb-20 bg-slate-50 min-h-screen">
      <div className="mb-6">
        <h1 className="text-xl font-bold text-slate-900">Select {brandName} Model</h1>
        <p className="text-sm text-slate-500">Choose your device to see repair prices.</p>
      </div>

      <div className="grid gap-3">
        {models.map((model) => (
          <Sheet key={model}>
            <SheetTrigger asChild>
              <div 
                onClick={() => {
                  setSelectedModel(model);
                  setSelectedIssue(""); 
                  setEstimatedPrice(0);
                }}
                className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm hover:border-blue-500 hover:shadow-md cursor-pointer flex justify-between items-center transition-all"
              >
                <span className="font-semibold text-slate-700">{model}</span>
                <span className="text-slate-300">➜</span>
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

                {selectedIssue ? (
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
                    
                    {/* Pass the data to the form */}
                    <RepairForm 
                      selectedBrand={brandName} 
                      selectedModel={model} 
                      selectedIssue={selectedIssue}
                      estimatedPrice={estimatedPrice}
                    />
                  </div>
                ) : (
                  <div className="text-center py-10 text-slate-400">
                    <p>Select an issue above to continue</p>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}