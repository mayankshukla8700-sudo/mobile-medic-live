"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

export default function StatusSelect({ id, initialStatus }: { id: number, initialStatus: string }) {
  const [status, setStatus] = useState(initialStatus);

  const handleUpdate = async (newStatus: string) => {
    setStatus(newStatus);

    const { error } = await supabase
      .from("bookings")
      .update({ status: newStatus })
      .eq("id", id);

    if (error) {
      toast.error("Failed to update status");
    } else {
      toast.success("Status Updated");
    }
  };

  // Helper function to pick colors
  const getColor = (s: string) => {
    if (s === "completed") return "bg-green-500 hover:bg-green-600";
    if (s === "in-progress") return "bg-blue-500 hover:bg-blue-600";
    return "bg-slate-500 hover:bg-slate-600";
  };

  return (
    <Select onValueChange={handleUpdate} defaultValue={status}>
      <SelectTrigger className={`w-[140px] text-white border-none h-8 ${getColor(status)}`}>
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="pending">Pending</SelectItem>
        <SelectItem value="in-progress">In Progress</SelectItem>
        <SelectItem value="completed">Completed</SelectItem>
        <SelectItem value="cancelled">Cancelled</SelectItem>
      </SelectContent>
    </Select>
  );
}