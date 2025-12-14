import { supabase } from "@/lib/supabase";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import StatusSelect from "./StatusSelect";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  // 1. SECURITY CHECK
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("admin_access");

  if (!hasAccess) {
    redirect("/signin");
  }

  // 2. LOGOUT FUNCTION
  async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_access");
    redirect("/signin");
  }

  // 3. FETCH DATA (Now includes the new 'scheduled_date' column automatically via *)
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Error loading data!</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border p-6 md:p-8">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
              Admin Dashboard
            </h1>
            <p className="text-slate-500 text-sm mt-1">
              Manage your orders and repairs.
            </p>
          </div>
          <form action={logout}>
            <Button variant="destructive" size="sm">Lock Shop 🔒</Button>
          </form>
        </div>

        {/* Stats Row (Optional Polish) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                <div className="text-blue-600 text-xs font-bold uppercase tracking-wider mb-1">Total Orders</div>
                <div className="text-2xl font-black text-slate-900">{bookings?.length || 0}</div>
            </div>
            <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                <div className="text-green-600 text-xs font-bold uppercase tracking-wider mb-1">Revenue</div>
                {/* Simple calculation of total estimated revenue */}
                <div className="text-2xl font-black text-slate-900">
                    ₹{bookings?.reduce((acc, curr) => acc + (Number(curr.estimated_cost) || 0), 0).toLocaleString()}
                </div>
            </div>
        </div>

        {/* The Table */}
        <div className="rounded-lg border overflow-hidden">
          <Table>
            <TableHeader className="bg-slate-50">
              <TableRow>
                <TableHead className="w-[100px]">Booked On</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Scheduled For</TableHead> {/* NEW COLUMN */}
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead className="text-right">Est. Price</TableHead>
                <TableHead className="text-center">Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((order) => (
                <TableRow key={order.id} className="hover:bg-slate-50/50 transition-colors">
                  
                  {/* Date Created */}
                  <TableCell className="text-slate-500 text-xs">
                    {new Date(order.created_at).toLocaleDateString()}
                    <div className="text-[10px]">{new Date(order.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</div>
                  </TableCell>

                  {/* Customer Details */}
                  <TableCell>
                    <div className="font-semibold text-slate-900">{order.customer_name}</div>
                    <div className="text-xs text-slate-500 font-mono mt-0.5">{order.phone_number}</div>
                  </TableCell>

                  {/* NEW: Scheduled Date */}
                  <TableCell>
                    <div className="flex items-center gap-1.5 text-sm font-medium text-blue-700 bg-blue-50 px-2 py-1 rounded w-fit whitespace-nowrap">
                        <Calendar className="w-3 h-3" />
                        {order.scheduled_date || "ASAP"} 
                    </div>
                  </TableCell>

                  {/* Device */}
                  <TableCell className="font-medium text-slate-700">
                    {order.device_model}
                  </TableCell>

                  {/* Issue */}
                  <TableCell className="max-w-[200px] truncate text-slate-600" title={order.issue_description}>
                    {order.issue_description}
                  </TableCell>

                  {/* Price */}
                  <TableCell className="text-right font-bold text-slate-900">
                    ₹{order.estimated_cost}
                  </TableCell>

                  {/* Status Switcher */}
                  <TableCell className="text-center">
                    <StatusSelect id={order.id} initialStatus={order.status} />
                  </TableCell>

                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}