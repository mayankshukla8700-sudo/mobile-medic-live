"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { toast } from "sonner";
import { useState } from "react";
import { supabase } from "@/lib/supabase"; // <--- Importing the bridge

export default function RepairForm({ model }: { model: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  // State to store user inputs
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [issue, setIssue] = useState("Broken Screen"); // Default issue
  const [price, setPrice] = useState("₹2,499");      // Default price

  const handleBooking = async () => {
    if (!name || !phone) {
      toast.error("Please fill in all details!");
      return;
    }

    setLoading(true);

    // 1. Send data to Supabase
    const { error } = await supabase
      .from('bookings')
      .insert([
        { 
          customer_name: name, 
          phone_number: phone, 
          device_model: model,
          issue_type: issue,
          estimated_price: price,
          status: 'pending'
        },
      ]);

    setLoading(false);

    if (error) {
      console.error(error);
      toast.error("Booking Failed. Please try again.");
    } else {
      // 2. Success! Close and notify
      setIsOpen(false);
      toast.success("Booking Request Sent!", {
        description: `We will call ${name} shortly.`,
        duration: 5000,
        style: { background: "#10B981", color: "white", border: "none" }
      });
      // Clear form
      setName("");
      setPhone("");
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button variant="outline" className="w-full mt-4 border-blue-200 text-blue-700 hover:bg-blue-50">
          Book Repair
        </Button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[90vh] sm:h-auto rounded-t-3xl">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-blue-900">
            Repair {model}
          </SheetTitle>
          <SheetDescription>
            Select your issue to see the estimated price.
          </SheetDescription>
        </SheetHeader>

        <div className="grid gap-4 py-4">
          {/* Issue Selection */}
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => { setIssue("Broken Screen"); setPrice("₹2,499"); }}
              className={`border p-4 rounded-lg text-center cursor-pointer hover:border-blue-600 ${issue === "Broken Screen" ? "bg-blue-50 border-blue-600" : "bg-slate-50"}`}
            >
              <div className="font-semibold">Broken Screen</div>
              <div className="text-green-600 font-bold">₹2,499</div>
            </div>
            <div 
              onClick={() => { setIssue("Battery Issue"); setPrice("₹1,299"); }}
              className={`border p-4 rounded-lg text-center cursor-pointer hover:border-blue-600 ${issue === "Battery Issue" ? "bg-blue-50 border-blue-600" : "bg-slate-50"}`}
            >
              <div className="font-semibold">Battery Issue</div>
              <div className="text-green-600 font-bold">₹1,299</div>
            </div>
          </div>

          <div className="space-y-2 mt-4">
            <Label htmlFor="name">Your Name</Label>
            <Input 
              id="name" 
              placeholder="Enter your name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input 
              id="phone" 
              placeholder="98765 43210" 
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <Button 
            onClick={handleBooking}
            disabled={loading}
            className="w-full bg-green-600 hover:bg-green-700 text-lg py-6 mt-4"
          >
            {loading ? "Booking..." : "Confirm Booking"}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}