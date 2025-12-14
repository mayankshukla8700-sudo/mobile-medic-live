"use client";

import { useState } from "react";
// THIS IS THE KEY: We import 'supabase' from the file you made in Step 2
import { supabase } from "@/lib/supabase"; 
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
// These icons work after you run the install command in Step 1
import { Loader2, CheckCircle2 } from "lucide-react"; 

interface RepairFormProps {
  selectedBrand: string;
  selectedModel?: string;      
  selectedIssue?: string;      
  estimatedPrice?: number;     
}

export default function RepairForm({ selectedBrand, selectedModel, selectedIssue, estimatedPrice }: RepairFormProps) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
  });

  const handleBooking = async () => {
    if (!formData.name || !formData.phone) {
      toast.error("Please fill in your Name and Phone Number.");
      return;
    }
    if (formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const finalDeviceName = selectedModel 
        ? `${selectedBrand} - ${selectedModel}` 
        : selectedBrand;

      const { error } = await supabase
        .from('bookings')
        .insert([
          {
            customer_name: formData.name,
            phone_number: formData.phone,
            device_model: finalDeviceName,
            issue_description: selectedIssue || "General Repair",
            estimated_cost: estimatedPrice || 0,
            status: 'Pending'
          }
        ]);

      if (error) throw error;

      setSuccess(true);
      toast.success("Booking Confirmed!");

    } catch (error) {
      console.error("Error:", error);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center animate-in zoom-in duration-300">
        <div className="mx-auto w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mb-3">
          <CheckCircle2 className="h-6 w-6 text-green-600" />
        </div>
        <h3 className="text-lg font-bold text-green-800 mb-1">Repair Booked!</h3>
        <p className="text-sm text-green-700 mb-4">
          We will call {formData.name} shortly at {formData.phone}.
        </p>
        <Button 
          variant="outline" 
          className="w-full border-green-200 text-green-700 hover:bg-green-100"
          onClick={() => window.location.reload()}
        >
          Book Another
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="Enter your name" 
          value={formData.name}
          onChange={(e) => setFormData({...formData, name: e.target.value})}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          type="tel"
          placeholder="10-digit mobile number" 
          value={formData.phone}
          onChange={(e) => setFormData({...formData, phone: e.target.value})}
        />
      </div>

      <Button 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-6 text-lg mt-4" 
        onClick={handleBooking}
        disabled={loading}
      >
        {loading ? (
          <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Booking...</>
        ) : (
          `Confirm Repair (₹${estimatedPrice || '0'})`
        )}
      </Button>
    </div>
  );
}