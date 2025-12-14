"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { Loader2, Calendar as CalendarIcon, MapPin, User, Phone, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface RepairFormProps {
  selectedBrand: string;
  selectedModel: string;
  selectedIssue: string;
  estimatedPrice: number;
}

export default function RepairForm({ selectedBrand, selectedModel, selectedIssue, estimatedPrice }: RepairFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  
  // Date Logic
  const [dateType, setDateType] = useState("Today"); // 'Today', 'Tomorrow', or 'Custom'
  const [customDate, setCustomDate] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validation
    if (!name || !phone || !address) {
      toast.error("Please fill in all details");
      setLoading(false);
      return;
    }

    if (phone.length < 10) {
      toast.error("Please enter a valid phone number");
      setLoading(false);
      return;
    }

    // Determine Final Date string
    let finalDate = dateType;
    if (dateType === 'Custom') {
        if (!customDate) {
            toast.error("Please pick a date from the calendar");
            setLoading(false);
            return;
        }
        finalDate = new Date(customDate).toDateString(); // Formats nicely like "Mon Jan 01 2024"
    }

    // 2. Prepare Data
    const finalDeviceName = selectedModel 
        ? `${selectedBrand} - ${selectedModel}` 
        : selectedBrand;

    // 3. Send to Database
    try {
      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: name,
            phone_number: phone,
            // Saving address and date in description for simplicity
            issue_description: `${selectedIssue} (Address: ${address})`,
            device_model: finalDeviceName,
            estimated_cost: estimatedPrice || 0,
            status: 'Pending',
            scheduled_date: finalDate // Requires a 'scheduled_date' column, or will be ignored if column missing (safe)
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      toast.success("Booking Confirmed!");

    } catch (err) {
      console.error("Booking Error:", err);
      toast.error("Something went wrong. Please call us.");
    } finally {
      setLoading(false);
    }
  };

  // SUCCESS CARD
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Booking Confirmed!</h3>
        <div className="bg-slate-50 p-4 rounded-xl mt-4 w-full border border-slate-100 text-left space-y-2">
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">Device:</span>
                <span className="font-semibold text-slate-800">{selectedModel}</span>
            </div>
            <div className="flex justify-between text-sm">
                <span className="text-slate-500">Date:</span>
                <span className="font-semibold text-blue-600">
                    {dateType === 'Custom' && customDate ? new Date(customDate).toLocaleDateString() : dateType}
                </span>
            </div>
        </div>
        <p className="text-sm text-slate-400 mt-4">We will call you shortly at <span className="font-bold text-slate-600">{phone}</span></p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-blue-600 font-semibold text-sm hover:underline"
        >
          Book Another Repair
        </button>
      </div>
    );
  }

  // THE BOOKING FORM
  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      
      {/* 1. Date Selection (Smart Buttons + Calendar) */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <CalendarIcon className="w-3 h-3" /> Schedule Repair
        </label>
        
        <div className="grid grid-cols-3 gap-2">
          {/* Preset Buttons */}
          {['Today', 'Tomorrow'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => { setDateType(d); setCustomDate(""); }}
              className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                dateType === d 
                  ? "bg-slate-900 text-white border-slate-900 shadow-md" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
              }`}
            >
              {d}
            </button>
          ))}

          {/* Calendar Trigger */}
          <button
            type="button"
            onClick={() => setDateType('Custom')}
            className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition-all ${
              dateType === 'Custom' 
                ? "bg-blue-600 text-white border-blue-600 shadow-md" 
                : "bg-white text-slate-500 border-slate-200 hover:border-blue-300"
            }`}
          >
            Pick Date 📅
          </button>
        </div>

        {/* HIDDEN CALENDAR: Only appears when "Pick Date" is clicked */}
        {dateType === 'Custom' && (
            <div className="animate-in slide-in-from-top-2 duration-200">
                <input 
                    type="date" 
                    value={customDate}
                    onChange={(e) => setCustomDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]} // Disable past dates
                    className="w-full p-3 border border-blue-200 rounded-lg bg-blue-50 text-slate-700 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        )}
      </div>

      {/* 2. Personal Details Inputs */}
      <div className="space-y-3">
        <div className="relative group">
          <User className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            required
          />
        </div>

        <div className="relative group">
          <Phone className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all"
            required
          />
        </div>

        <div className="relative group">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          <textarea
            placeholder="Area / Colony / House No."
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all resize-none"
            required
          />
        </div>
      </div>

      {/* 3. Submit */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Confirming...
            </>
          ) : (
            <>
              Book Repair
              <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1 font-medium">
                 ₹{estimatedPrice || 0}
              </span>
            </>
          )}
        </button>
        <p className="text-center text-[10px] text-slate-400 mt-3 flex items-center justify-center gap-1">
          <CheckCircle className="w-3 h-3" /> No payment required now
        </p>
      </div>

    </form>
  );
}