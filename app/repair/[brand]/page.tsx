"use client";

import RepairForm from "../../components/RepairForm";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

// Placeholder models (We can connect this to a real database later!)
const models = [
  "Standard Model",
  "Pro Model",
  "Pro Max / Ultra",
  "Plus Model",
  "Fold / Flip",
  "Older Version"
];

export default function BrandPage({ params }: { params: { brand: string } }) {
  const brandName = decodeURIComponent(params.brand);

  return (
    <div className="max-w-md mx-auto p-6 pb-20">
      <h1 className="text-2xl font-bold mb-6 text-slate-800">
        Select {brandName} Model
      </h1>
      
      <p className="text-slate-500 mb-6">
        Choose your device model to get started.
      </p>

      <div className="grid gap-4">
        {models.map((model) => (
          <Sheet key={model}>
            <SheetTrigger asChild>
              {/* THIS is what the user sees first: A clean, simple button */}
              <div className="p-5 border rounded-xl bg-white shadow-sm hover:shadow-md hover:border-blue-500 cursor-pointer transition-all flex justify-between items-center group">
                <div>
                    <h3 className="font-semibold text-lg text-slate-800">{brandName} {model}</h3>
                    <p className="text-slate-400 text-sm">Tap to Book Repair</p>
                </div>
                <div className="h-8 w-8 rounded-full bg-slate-100 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
                    &rarr;
                </div>
              </div>
            </SheetTrigger>

            {/* This is the Hidden Drawer that slides up */}
            <SheetContent side="bottom" className="h-[85vh] rounded-t-[20px] overflow-y-auto">
              <SheetHeader className="mb-6">
                <SheetTitle className="text-center text-xl">Book {brandName} Repair</SheetTitle>
              </SheetHeader>
              
              {/* The Form lives safely inside here */}
              <RepairForm selectedBrand={brandName} />
              
            </SheetContent>
          </Sheet>
        ))}
      </div>
    </div>
  );
}