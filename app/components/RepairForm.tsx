"use client";

import { useState } from "react";
// We use the fixed connection we made earlier
import { supabase } from "@/lib/supabase"; 
import { Loader2, Calendar, MapPin, User, Phone, CheckCircle } from "lucide-react";
import { toast } from "sonner";

interface RepairFormProps {
  selectedBrand: string;
  selectedModel?: string;      
  selectedIssue?: string;      
  estimatedPrice?: number;     
}

export default function RepairForm({ selectedBrand, selectedModel, selectedIssue, estimatedPrice }: RepairFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // Form States
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [date, setDate] = useState("Today");

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
            // We save the address in the description or a new column if you added one.
            // For now, let's append it to the issue so we don't break the database layout.
            issue_description: `${selectedIssue} (Address: ${address}, Date: ${date})`,
            device_model: finalDeviceName,
            estimated_cost: estimatedPrice || 0,
            status: 'Pending'
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

  // SUCCESS CARD (What they see after booking)
  if (success) {
    return (
      <div className="flex flex-col items-center justify-center py-8 text-center animate-in zoom-in-95 duration-300">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4 shadow-sm">
          <CheckCircle className="w-8 h-8 text-green-600" />
        </div>
        <h3 className="text-xl font-bold text-slate-900">Booking Confirmed!</h3>
        <p className="text-slate-500 mt-2 max-w-xs mx-auto text-sm">
          We have received your request for <strong>{selectedModel}</strong>.
        </p>
        <div className="bg-slate-50 p-3 rounded-lg mt-4 w-full border border-slate-100">
            <p className="text-xs text-slate-400 uppercase font-bold mb-1">Next Step</p>
            <p className="text-sm text-slate-600">Our technician will call you shortly at <span className="font-bold">{phone}</span> to confirm location.</p>
        </div>
        
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
      
      {/* 1. Date Selection Buttons */}
      <div className="space-y-2">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider flex items-center gap-1">
            <Calendar className="w-3 h-3" /> Preferred Time
        </label>
        <div className="grid grid-cols-3 gap-2">
          {['Today', 'Tomorrow', 'Later'].map((d) => (
            <button
              key={d}
              type="button"
              onClick={() => setDate(d)}
              className={`py-2.5 px-2 text-xs font-bold rounded-lg border transition-all ${
                date === d 
                  ? "bg-slate-900 text-white border-slate-900 shadow-md transform scale-105" 
                  : "bg-white text-slate-500 border-slate-200 hover:border-blue-300 hover:bg-blue-50"
              }`}
            >
              {d}
            </button>
          ))}
        </div>
      </div>

      {/* 2. Personal Details Inputs */}
      <div className="space-y-3">
        
        {/* Name */}
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

        {/* Phone */}
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

        {/* Address */}
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

      {/* 3. Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 rounded-xl shadow-lg hover:shadow-blue-500/30 transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Scheduling...
            </>
          ) : (
            <>
              Confirm Booking
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