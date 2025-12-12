"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react"; // Nice icons

export default function RepairForm({ selectedBrand }: { selectedBrand: string }) {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  
  // Form Data
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    model: "",
    issue: "",
  });

  // Handle Typing
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  // The Submission Logic
  const handleSubmit = async () => {
    // 1. VALIDATION CHECKS
    if (!formData.name || !formData.phone || !formData.model || !formData.issue) {
      toast.error("Please fill in all fields");
      return;
    }

    if (formData.phone.length < 10) {
      toast.error("Please enter a valid 10-digit phone number");
      return;
    }

    setLoading(true);

    // 2. SEND TO SUPABASE
    const { error } = await supabase.from("bookings").insert({
      customer_name: formData.name,
      phone_number: formData.phone,
      device_model: `${selectedBrand} - ${formData.model}`,
      issue_type: formData.issue,
      estimated_price: "₹1,999", // Default estimate
      status: "pending",
    });

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Booking Failed. Try again.");
    } else {
      setSuccess(true);
      toast.success("Repair Booked Successfully!");
      // Reset form
      setFormData({ name: "", phone: "", model: "", issue: "" });
    }
  };

  // 3. SUCCESS VIEW (The "Receipt")
  if (success) {
    return (
      <div className="bg-green-50 p-8 rounded-xl border border-green-200 text-center animate-in fade-in zoom-in">
        <div className="flex justify-center mb-4">
          <CheckCircle2 className="h-16 w-16 text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h3>
        <p className="text-green-700 mb-6">
          We have received your request. Our technician will call you at <span className="font-bold">{formData.phone}</span> shortly.
        </p>
        <Button 
          onClick={() => setSuccess(false)} 
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Book Another Device
        </Button>
      </div>
    );
  }

  // 4. THE FORM VIEW
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border space-y-4">
      <h3 className="text-xl font-semibold text-slate-800 mb-4">
        Book {selectedBrand} Repair
      </h3>

      <div className="grid gap-2">
        <Label htmlFor="name">Full Name</Label>
        <Input 
          id="name" 
          placeholder="Enter your name" 
          value={formData.name}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="phone">Phone Number</Label>
        <Input 
          id="phone" 
          type="tel" 
          placeholder="10-digit mobile number" 
          maxLength={10}
          value={formData.phone}
          onChange={(e) => {
            // Only allow numbers
            const val = e.target.value.replace(/\D/g, '');
            setFormData({ ...formData, phone: val });
          }}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="model">Device Model</Label>
        <Input 
          id="model" 
          placeholder="e.g. iPhone 13, Galaxy S21" 
          value={formData.model}
          onChange={handleChange}
        />
      </div>

      <div className="grid gap-2">
        <Label htmlFor="issue">Issue Description</Label>
        <Textarea 
          id="issue" 
          placeholder="What's wrong? (Screen broken, battery draining...)" 
          value={formData.issue}
          onChange={handleChange}
        />
      </div>

      <Button 
        onClick={handleSubmit} 
        disabled={loading}
        className="w-full bg-blue-900 hover:bg-blue-800 h-12 text-lg"
      >
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Booking...
          </>
        ) : (
          "Confirm Booking"
        )}
      </Button>
    </div>
  );
}

