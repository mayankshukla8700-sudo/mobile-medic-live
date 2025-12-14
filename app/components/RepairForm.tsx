"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { Loader2, User, Phone, MapPin, CheckCircle, ArrowRight, Home, Building, Hash, Navigation, Landmark, X } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from "@/components/ui/sheet";

// --- SMART PINCODE DATABASE ---
const pincodeData: Record<string, string> = {
  // DELHI
  "110053": "Bhajanpura, North East Delhi",
  "110001": "Connaught Place, Central Delhi",
  "110006": "Chandni Chowk, North Delhi",
  "110025": "Okhla, South Delhi",
  "110059": "Uttam Nagar, West Delhi",
  "110075": "Dwarka Sector 6, South West Delhi",
  "110085": "Rohini, North West Delhi",
  "110092": "Anand Vihar, East Delhi",
  "110017": "Malviya Nagar, South Delhi",
  "110024": "Lajpat Nagar, South Delhi",
  // MUMBAI
  "400001": "Mumbai CST, South Mumbai",
  "400050": "Bandra West, Mumbai Suburban",
  "400053": "Andheri West, Mumbai Suburban",
  "400076": "Powai, Mumbai Suburban",
  "400013": "Lower Parel, South Mumbai",
  "400092": "Borivali West, Mumbai Suburban",
  "400005": "Colaba, South Mumbai"
};

interface RepairFormProps {
  selectedBrand: string;
  selectedModel: string;
  selectedIssues: string[]; 
  estimatedPrice: number;
}

export default function RepairForm({ selectedBrand, selectedModel, selectedIssues, estimatedPrice }: RepairFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Core Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("Today");

  // ADDRESS LOGIC
  const [pickupAddress, setPickupAddress] = useState(""); 
  const [dropAddress, setDropAddress] = useState("");     
  const [isDropSame, setIsDropSame] = useState(true);
  
  // Drawer States
  const [isAddressDrawerOpen, setIsAddressDrawerOpen] = useState(false);
  const [editingType, setEditingType] = useState<"pickup" | "drop">("pickup");

  // Temporary Address Fields (Inside the Drawer)
  const [tempPincode, setTempPincode] = useState("");
  const [tempArea, setTempArea] = useState("");
  const [tempHouse, setTempHouse] = useState("");
  const [tempStreet, setTempStreet] = useState("");
  const [tempLandmark, setTempLandmark] = useState("");
  const [tempAltPhone, setTempAltPhone] = useState("");

  // Auto-Detect Area (Optimized)
  useEffect(() => {
    if (tempPincode.length === 6) {
      const area = pincodeData[tempPincode];
      if (area) {
        setTempArea(area);
      } else {
        setTempArea("");
      }
    }
  }, [tempPincode]);

  const openAddressDrawer = (type: "pickup" | "drop") => {
    setEditingType(type);
    // Reset fields
    setTempPincode("");
    setTempArea("");
    setTempHouse("");
    setTempStreet("");
    setTempLandmark("");
    setTempAltPhone("");
    setIsAddressDrawerOpen(true);
  };

  const saveAddress = () => {
    if (!tempPincode || !tempArea || !tempHouse || !tempStreet) {
      toast.error("Please fill Pincode, House No, and Area");
      return;
    }

    const formattedAddress = `
      ${tempHouse}, ${tempStreet}, ${tempArea} (Pin: ${tempPincode})
      ${tempLandmark ? `Near: ${tempLandmark}` : ""}
      ${tempAltPhone ? `Alt: ${tempAltPhone}` : ""}
    `.replace(/\s+/g, ' ').trim();

    if (editingType === "pickup") {
      setPickupAddress(formattedAddress);
    } else {
      setDropAddress(formattedAddress);
    }
    
    setIsAddressDrawerOpen(false);
    toast.success("Address Saved");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !phone || !pickupAddress) {
      toast.error("Please fill Name, Phone & Pickup Address");
      setLoading(false);
      return;
    }

    if (!isDropSame && !dropAddress) {
      toast.error("Please add a Drop Address");
      setLoading(false);
      return;
    }

    try {
      const finalAddressString = isDropSame 
        ? `Pickup/Drop: ${pickupAddress}` 
        : `PICKUP: ${pickupAddress} || DROP: ${dropAddress}`;

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: name,
            phone_number: phone,
            address: finalAddressString,
            device_model: `${selectedBrand} ${selectedModel}`,
            issue_description: selectedIssues.join(", "),
            estimated_cost: estimatedPrice,
            scheduled_date: date,
            status: 'pending'
          }
        ]);

      if (error) throw error;
      setSuccess(true);
      toast.success("Booking Confirmed!");

    } catch (err) {
      console.error("Booking Error:", err);
      toast.error("Connection Failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Booking Confirmed!</h3>
        <p className="text-slate-500 mt-2 max-w-xs mx-auto">
          We will pick up your <strong>{selectedModel}</strong> today.
        </p>
        <button onClick={() => window.location.reload()} className="mt-6 text-blue-600 font-semibold hover:underline">
          Book Another Repair
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Date Selection */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Schedule Pickup</label>
          <div className="grid grid-cols-3 gap-2">
            {['Today', 'Tomorrow', 'Later'].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDate(d)}
                className={`py-2 px-2 text-sm font-medium rounded-lg border transition-all ${
                  date === d ? "bg-blue-600 text-white border-blue-600 shadow-sm" : "bg-white text-slate-600 border-slate-200"
                }`}
              >
                {d}
              </button>
            ))}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Contact Details</label>
          <div className="relative">
            <User className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
          <div className="relative">
            <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
            <input
              type="tel"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
              required
            />
          </div>
        </div>

        {/* --- LOCATIONS SECTION --- */}
        <div className="space-y-4">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Locations</label>
          
          {/* 1. PICKUP ADDRESS BUTTON */}
          <div 
            onClick={() => openAddressDrawer("pickup")}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all active:scale-[0.98] ${pickupAddress ? "bg-blue-50 border-blue-500" : "bg-white border-slate-200 border-dashed hover:border-blue-400"}`}
          >
            <div className={`p-2.5 rounded-full ${pickupAddress ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-bold text-slate-700">Pickup Address <span className="text-red-500">*</span></p>
              <p className="text-xs text-slate-500 truncate">
                {pickupAddress || "Tap to add address"}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </div>

          {/* 2. DROP OPTION */}
          <div className="bg-slate-50/50 p-1 rounded-lg border border-slate-200">
             {/* Toggle Switch */}
             <div className="flex p-1 gap-1 bg-slate-200/50 rounded-lg mb-2">
                <button
                  type="button"
                  onClick={() => setIsDropSame(true)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${isDropSame ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Same as Pickup
                </button>
                <button
                  type="button"
                  onClick={() => setIsDropSame(false)}
                  className={`flex-1 py-1.5 text-xs font-bold rounded-md transition-all ${!isDropSame ? "bg-white text-blue-700 shadow-sm" : "text-slate-500 hover:text-slate-700"}`}
                >
                  Change Drop
                </button>
             </div>

             {/* DROP ADDRESS BUTTON (Only shows if 'Change Drop' is clicked) */}
             {!isDropSame && (
                <div 
                  onClick={() => openAddressDrawer("drop")}
                  className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer bg-white transition-all active:scale-[0.98] ${dropAddress ? "border-blue-500" : "border-slate-200 border-dashed"}`}
                >
                  <div className={`p-2 rounded-full ${dropAddress ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                    <Navigation className="w-4 h-4" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-bold text-slate-700">Drop Address</p>
                    <p className="text-xs text-slate-500 truncate">
                      {dropAddress || "Tap to add drop location"}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-300" />
                </div>
             )}
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg flex items-center justify-center gap-2 active:scale-[0.98] transition-transform"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Confirm Booking ₹${estimatedPrice}`}
        </button>
      </form>

      {/* --- ADDRESS DRAWER (Right Side on Desktop, Bottom on Mobile) --- */}
      <Sheet open={isAddressDrawerOpen} onOpenChange={setIsAddressDrawerOpen}>
        <SheetContent 
          side="right" // Opens from right
          className="w-full sm:max-w-md overflow-y-auto border-l border-slate-200 shadow-2xl p-0"
        >
          {/* Drawer Header */}
          <div className="sticky top-0 bg-white z-10 border-b border-slate-100 p-4 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className={`p-2 rounded-full ${editingType === 'pickup' ? "bg-blue-100 text-blue-600" : "bg-orange-100 text-orange-600"}`}>
                   {editingType === 'pickup' ? <MapPin className="w-5 h-5"/> : <Navigation className="w-5 h-5"/>}
                </div>
                <h3 className="font-bold text-lg text-slate-900">
                  {editingType === 'pickup' ? "Add Pickup Address" : "Add Drop Address"}
                </h3>
             </div>
             {/* Close Button is handled by Sheet automatically, but we can add a manual one if needed */}
          </div>

          <div className="p-5 space-y-6">
            {/* 1. Pincode */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Pincode <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-3.5 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  maxLength={6}
                  placeholder="e.g. 110053"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold tracking-widest text-slate-900 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              {/* Auto-detected Area */}
              {tempArea ? (
                <div className="bg-green-50 text-green-700 text-sm font-medium px-3 py-2 rounded-lg flex items-center gap-2 border border-green-200 animate-in fade-in slide-in-from-top-1">
                  <CheckCircle className="w-4 h-4" /> {tempArea}
                </div>
              ) : tempPincode.length === 6 ? (
                <div className="text-xs text-red-500 font-medium px-1">
                  We don't serve this pincode yet.
                </div>
              ) : null}
            </div>

            {/* 2. House No */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Flat / House / Office <span className="text-red-500">*</span></label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Flat 4B, 3rd Floor"
                  value={tempHouse}
                  onChange={(e) => setTempHouse(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* 3. Street / Locality */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Area / Colony / Street <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Gali No 4, Vijay Vihar"
                  value={tempStreet}
                  onChange={(e) => setTempStreet(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* 4. Landmark */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Landmark (Optional)</label>
              <div className="relative">
                <Landmark className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Near Mother Dairy"
                  value={tempLandmark}
                  onChange={(e) => setTempLandmark(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* 5. Alt Phone */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase">Alternate Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-5 h-5 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={tempAltPhone}
                  onChange={(e) => setTempAltPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none text-slate-900"
                />
              </div>
            </div>

            {/* Save Button */}
            <div className="pt-4">
              <button
                type="button"
                onClick={saveAddress}
                className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 rounded-xl shadow-lg transition-all active:scale-[0.98]"
              >
                Save Address
              </button>
            </div>

          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}