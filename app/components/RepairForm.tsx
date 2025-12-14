"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { Loader2, User, Phone, MapPin, CheckCircle, Calendar } from "lucide-react";
import { toast } from "sonner";

interface RepairFormProps {
  selectedBrand: string;
  selectedModel: string;
  selectedIssues: string[]; // UPDATED: Accepts a list of issues
  estimatedPrice: number;
}

export default function RepairForm({ selectedBrand, selectedModel, selectedIssues, estimatedPrice }: RepairFormProps) {
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

    try {
      // Join the issues into a single string for the database (e.g., "Screen, Battery")
      const finalIssueString = selectedIssues.join(", ");

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: name,
            phone_number: phone,
            address: address,
            device_model: `${selectedBrand} ${selectedModel}`,
            issue_description: finalIssueString, // Saving multiple issues
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
      toast.error("Something went wrong. Please call us.");
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
          Request received for <strong>{selectedModel}</strong>.
        </p>
        <p className="text-sm text-slate-400 mt-1">We will call {phone} shortly.</p>
        
        <button 
          onClick={() => window.location.reload()}
          className="mt-6 text-blue-600 font-semibold hover:underline"
        >
          Book Another Repair
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      
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
                date === d 
                  ? "bg-blue-600 text-white border-blue-600 shadow-sm" 
                  : "bg-white text-slate-600 border-slate-200 hover:border-blue-300"
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

        <div className="relative">
          <MapPin className="absolute left-3 top-3 w-4 h-4 text-slate-400" />
          <textarea
            placeholder="Pickup Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            rows={2}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            required
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3.5 rounded-xl shadow-lg hover:shadow-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Processing...
            </>
          ) : (
            <>
              Confirm Pickup <span className="bg-white/20 px-2 py-0.5 rounded text-xs ml-1">₹{estimatedPrice}</span>
            </>
          )}
        </button>
      </div>

    </form>
  );
}