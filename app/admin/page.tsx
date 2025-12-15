import { supabase } from "@/lib/supabase";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { IndianRupee, ShoppingBag, Calendar, TrendingUp } from "lucide-react";
import AdminBookingTable from "@/components/ui/AdminBookingTable"; // Import our new table

export const revalidate = 0; // Ensure data is always fresh

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
  const today = new Date().toISOString().split('T')[0]; 
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
          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Today's Revenue</p>
               <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{todayRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-green-100 text-green-600 rounded-lg w-fit mt-2"><IndianRupee className="w-5 h-5" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Today's Orders</p>
               <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{todayOrders}</h3>
            </div>
            <div className="p-2 bg-blue-100 text-blue-600 rounded-lg w-fit mt-2"><ShoppingBag className="w-5 h-5" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Total Revenue</p>
               <h3 className="text-2xl font-extrabold text-slate-900 mt-1">₹{totalRevenue.toLocaleString()}</h3>
            </div>
            <div className="p-2 bg-purple-100 text-purple-600 rounded-lg w-fit mt-2"><TrendingUp className="w-5 h-5" /></div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
            <div>
               <p className="text-xs font-bold text-slate-500 uppercase">Total Orders</p>
               <h3 className="text-2xl font-extrabold text-slate-900 mt-1">{totalOrders}</h3>
            </div>
            <div className="p-2 bg-orange-100 text-orange-600 rounded-lg w-fit mt-2"><Calendar className="w-5 h-5" /></div>
          </div>
        </div>

        {/* NEW INTERACTIVE TABLE */}
        <AdminBookingTable initialBookings={bookings || []} />

      </div>
    </div>
  );
}