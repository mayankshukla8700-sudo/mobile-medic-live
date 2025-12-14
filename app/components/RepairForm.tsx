"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase"; 
import { Loader2, User, Phone, MapPin, CheckCircle, ArrowRight, Home, Building, Hash, Navigation, Landmark } from "lucide-react";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // We use Sheet for the right drawer

interface RepairFormProps {
  selectedBrand: string;
  selectedModel: string;
  selectedIssues: string[]; 
  estimatedPrice: number;
}

// --- SMART PINCODE DATABASE (Delhi & Mumbai) ---
// You can add more lines here easily!
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

export default function RepairForm({ selectedBrand, selectedModel, selectedIssues, estimatedPrice }: RepairFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Core Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("Today");

  // ADDRESS LOGIC
  const [pickupAddress, setPickupAddress] = useState(""); // Stores final formatted string
  const [dropAddress, setDropAddress] = useState("");     // Stores final formatted string
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

  // Auto-Detect Area when Pincode changes
  useEffect(() => {
    if (tempPincode.length === 6) {
      const area = pincodeData[tempPincode];
      if (area) {
        setTempArea(area);
        toast.success(`Location detected: ${area}`);
      } else {
        setTempArea("");
        toast.error("Pincode not serviceable yet or invalid.");
      }
    }
  }, [tempPincode]);

  const openAddressDrawer = (type: "pickup" | "drop") => {
    setEditingType(type);
    // Reset temp fields for clean entry
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
      toast.error("Please fill all mandatory fields (*)");
      return;
    }

    const formattedAddress = `
      ${tempHouse}, ${tempStreet},
      ${tempArea}, Pincode: ${tempPincode}
      ${tempLandmark ? `(Near: ${tempLandmark})` : ""}
      ${tempAltPhone ? `Alt Phone: ${tempAltPhone}` : ""}
    `.replace(/\s+/g, ' ').trim();

    if (editingType === "pickup") {
      setPickupAddress(formattedAddress);
    } else {
      setDropAddress(formattedAddress);
    }
    
    setIsAddressDrawerOpen(false);
    toast.success(`${editingType === 'pickup' ? "Pickup" : "Drop"} Address Saved!`);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !phone || !pickupAddress) {
      toast.error("Please details & pickup address");
      setLoading(false);
      return;
    }

    if (!isDropSame && !dropAddress) {
      toast.error("Please add a drop address");
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
      toast.error("Something went wrong.");
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
          We will pick up your <strong>{selectedModel}</strong> from {pickupAddress.substring(0, 20)}...
        </p>
        <button onClick={() => window.location.reload()} className="mt-6 text-blue-600 font-semibold hover:underline">
          Book Another Repair
        </button>
      </div>
    );
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-5">
        
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

        {/* Personal Details */}
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

        {/* ADDRESS SECTION (Triggers the Drawer) */}
        <div className="space-y-3">
          <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Locations</label>
          
          {/* Pickup Trigger */}
          <div 
            onClick={() => openAddressDrawer("pickup")}
            className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer hover:bg-slate-50 transition-all ${pickupAddress ? "border-blue-500 bg-blue-50/50" : "border-slate-200 border-dashed"}`}
          >
            <div className={`p-2 rounded-full ${pickupAddress ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
              <MapPin className="w-5 h-5" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-bold text-slate-700">Pickup Address</p>
              <p className="text-xs text-slate-500 line-clamp-1">
                {pickupAddress || "Tap to add address (Mandatory)"}
              </p>
            </div>
            <ArrowRight className="w-4 h-4 text-slate-300" />
          </div>

          {/* Drop Logic */}
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={isDropSame} onChange={() => setIsDropSame(true)} className="text-blue-600" />
                <span className="text-sm text-slate-700">Same as Pickup</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" checked={!isDropSame} onChange={() => setIsDropSame(false)} className="text-blue-600" />
                <span className="text-sm text-slate-700">Other Address</span>
              </label>
            </div>

            {!isDropSame && (
              <div 
                onClick={() => openAddressDrawer("drop")}
                className={`mt-2 flex items-center gap-3 p-3 rounded-lg border cursor-pointer bg-white hover:bg-slate-50 transition-all ${dropAddress ? "border-blue-500" : "border-slate-200 border-dashed"}`}
              >
                <div className={`p-2 rounded-full ${dropAddress ? "bg-blue-600 text-white" : "bg-slate-100 text-slate-400"}`}>
                  <Navigation className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-700">Drop Address</p>
                  <p className="text-xs text-slate-500 line-clamp-1">
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
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg flex items-center justify-center gap-2"
        >
          {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : `Confirm Booking ₹${estimatedPrice}`}
        </button>
      </form>

      {/* --- RIGHT SIDE ADDRESS DRAWER --- */}
      <Sheet open={isAddressDrawerOpen} onOpenChange={setIsAddressDrawerOpen}>
        <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
          <SheetHeader className="mb-6">
            <SheetTitle className="text-xl font-bold flex items-center gap-2">
              <MapPin className="w-5 h-5 text-blue-600" />
              {editingType === 'pickup' ? "Add Pickup Address" : "Add Drop Address"}
            </SheetTitle>
          </SheetHeader>

          <div className="space-y-5">
            {/* 1. Pincode (The Trigger) */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Pincode <span className="text-red-500">*</span></label>
              <div className="relative">
                <Hash className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  maxLength={6}
                  placeholder="e.g. 110053"
                  value={tempPincode}
                  onChange={(e) => setTempPincode(e.target.value.replace(/\D/g, ''))}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-bold tracking-widest focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                />
              </div>
              {/* Auto-detected Area Display */}
              {tempArea ? (
                <div className="text-sm text-green-600 font-medium flex items-center gap-1 mt-1 animate-in slide-in-from-top-1">
                  <CheckCircle className="w-3 h-3" /> {tempArea}
                </div>
              ) : tempPincode.length === 6 ? (
                <div className="text-xs text-red-500 mt-1">
                  We don't serve this area yet or check pincode.
                </div>
              ) : null}
            </div>

            {/* 2. House No */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Flat / House No / Office <span className="text-red-500">*</span></label>
              <div className="relative">
                <Home className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Flat 4B, 3rd Floor"
                  value={tempHouse}
                  onChange={(e) => setTempHouse(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* 3. Street / Locality */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Area / Colony / Street <span className="text-red-500">*</span></label>
              <div className="relative">
                <Building className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Gali No 4, Vijay Vihar"
                  value={tempStreet}
                  onChange={(e) => setTempStreet(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* 4. Landmark */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Landmark (Optional)</label>
              <div className="relative">
                <Landmark className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="e.g. Near Mother Dairy"
                  value={tempLandmark}
                  onChange={(e) => setTempLandmark(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            {/* 5. Alt Phone */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-slate-500 uppercase">Alternate Number (Optional)</label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
                <input
                  type="tel"
                  placeholder="e.g. 9876543210"
                  value={tempAltPhone}
                  onChange={(e) => setTempAltPhone(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={saveAddress}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg mt-4 transition-all active:scale-[0.98]"
            >
              Save Address
            </button>

          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}