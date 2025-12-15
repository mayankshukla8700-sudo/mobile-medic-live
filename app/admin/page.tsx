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
import { MapPin, IndianRupee, ShoppingBag, Calendar, TrendingUp } from "lucide-react";

export const revalidate = 0;

export default async function AdminDashboard() {
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("admin_access");

  if (!hasAccess) {
    redirect("/signin");
  }

  async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_access");
    redirect("/signin");
  }

  // Fetch all bookings
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Error loading data!</div>;
  }

  // --- CALCULATE STATS ---
  const totalOrders = bookings?.length || 0;
  const totalRevenue = bookings?.reduce((acc, curr) => acc + (Number(curr.estimated_cost) || 0), 0) || 0;

  // Filter for TODAY
  const today = new Date().toISOString().split('T')[0]; // "2024-03-20"
  const todaysBookings = bookings?.filter(b => b.created_at.startsWith(today)) || [];
  
  const todayOrders = todaysBookings.length;
  const todayRevenue = todaysBookings.reduce((acc, curr) => acc + (Number(curr.estimated_cost) || 0), 0);

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900">Admin Dashboard</h1>
            <p className="text-slate-500 text-sm">Welcome back, Boss.</p>
          </div>
          <form action={logout}>
            <Button variant="destructive" size="sm">Lock Shop</Button>
          </form>
        </div>

        {/* --- MONEY STATS CARDS --- */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          
          {/* Card 1: Today's Revenue */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Revenue</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{todayRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-green-100 text-green-600 rounded-lg">
                <IndianRupee className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 2: Today's Orders */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Today's Orders</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{todayOrders}</h3>
              </div>
              <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                <ShoppingBag className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 3: Total Revenue */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Revenue</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{totalRevenue.toLocaleString()}</h3>
              </div>
              <div className="p-2 bg-purple-100 text-purple-600 rounded-lg">
                <TrendingUp className="w-5 h-5" />
              </div>
            </div>
          </div>

          {/* Card 4: Total Orders */}
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">Total Orders</p>
                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalOrders}</h3>
              </div>
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <Calendar className="w-5 h-5" />
              </div>
            </div>
          </div>

        </div>

        {/* ORDER TABLE */}
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-slate-50">
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
                {bookings?.map((order) => (
                  <TableRow key={order.id}>
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
                          <span className="line-clamp-3 leading-relaxed">
                              {order.address || "No address provided"}
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
      </div>
    </div>
  );
}