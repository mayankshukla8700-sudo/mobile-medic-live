"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase"; 
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MapPin, Trash2, CheckSquare, Square } from "lucide-react";
import { toast } from "sonner";
import StatusSelect from "@/app/admin/StatusSelect"; // Check if this path matches your folder structure

export default function AdminBookingTable({ initialBookings }: { initialBookings: any[] }) {
  const [bookings, setBookings] = useState(initialBookings);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  // Toggle One
  const toggleSelect = (id: string) => {
    setSelectedIds((prev) => 
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  // Toggle All
  const toggleAll = () => {
    if (selectedIds.length === bookings.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(bookings.map((b) => b.id));
    }
  };

  // Delete Function
  const deleteSelected = async () => {
    if (!confirm(`Are you sure you want to delete ${selectedIds.length} bookings?`)) return;
    
    setLoading(true);
    const { error } = await supabase
      .from('bookings')
      .delete()
      .in('id', selectedIds);

    if (error) {
      toast.error("Database blocked the delete. Check Supabase RLS.");
      console.error(error);
    } else {
      toast.success("Bookings Deleted!");
      // FORCE RELOAD to update the Stats (Revenue/Count)
      window.location.reload(); 
    }
    setLoading(false);
  };

  return (
    <div className="space-y-4">
      
      {/* ACTION BAR */}
      {selectedIds.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl flex items-center justify-between animate-in slide-in-from-top-2">
          <span className="text-red-700 font-bold flex items-center gap-2">
            <CheckSquare className="w-5 h-5" /> {selectedIds.length} Selected
          </span>
          <Button 
            onClick={deleteSelected} 
            variant="destructive" 
            disabled={loading}
            className="flex items-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            {loading ? "Deleting..." : "Delete Selected"}
          </Button>
        </div>
      )}

      {/* TABLE */}
      <div className="rounded-md border overflow-x-auto bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-50">
              <TableHead className="w-[50px]">
                <button onClick={toggleAll} className="pt-2">
                  {selectedIds.length === bookings.length && bookings.length > 0 ? (
                    <CheckSquare className="w-5 h-5 text-blue-600" />
                  ) : (
                    <Square className="w-5 h-5 text-slate-400" />
                  )}
                </button>
              </TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="min-w-[200px]">Address</TableHead>
              <TableHead>Device</TableHead>
              <TableHead>Issue</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookings.length === 0 ? (
                <TableRow>
                    <TableCell colSpan={8} className="text-center py-10 text-slate-500">
                        No bookings found. Time to market! 🚀
                    </TableCell>
                </TableRow>
            ) : bookings.map((order) => (
              <TableRow key={order.id} className={selectedIds.includes(order.id) ? "bg-blue-50/50" : ""}>
                <TableCell>
                  <button onClick={() => toggleSelect(order.id)} className="pt-2">
                    {selectedIds.includes(order.id) ? (
                      <CheckSquare className="w-5 h-5 text-blue-600" />
                    ) : (
                      <Square className="w-5 h-5 text-slate-300 hover:text-blue-400" />
                    )}
                  </button>
                </TableCell>
                <TableCell className="whitespace-nowrap text-xs text-slate-500">
                  {new Date(order.created_at).toLocaleDateString()}
                  <div className="text-[10px] text-slate-400">
                    {order.scheduled_date || "No Date"}
                  </div>
                </TableCell>
                <TableCell className="font-medium">
                  <div>{order.customer_name}</div>
                  <div className="text-xs text-slate-500">{order.phone_number}</div>
                </TableCell>
                <TableCell className="text-xs max-w-[250px]">
                  <div className="flex gap-2">
                      <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                      <span className="line-clamp-2 leading-relaxed" title={order.address}>
                          {order.address || "No address"}
                      </span>
                  </div>
                </TableCell>
                <TableCell className="text-sm font-semibold">{order.device_model}</TableCell>
                <TableCell className="text-sm max-w-[150px] truncate" title={order.issue_description}>
                    {order.issue_description}
                </TableCell>
                <TableCell className="text-green-600 font-bold whitespace-nowrap">
                  ₹{order.estimated_cost}
                </TableCell>
                <TableCell>
                  <StatusSelect id={order.id} initialStatus={order.status} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}