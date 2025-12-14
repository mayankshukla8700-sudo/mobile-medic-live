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
import { MapPin } from "lucide-react";

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

  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Error loading data!</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-10">
      <div className="max-w-7xl mx-auto bg-white rounded-xl shadow-sm border p-6 md:p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl md:text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <form action={logout}>
            <Button variant="destructive" size="sm">Lock Shop</Button>
          </form>
        </div>

        <div className="rounded-md border overflow-x-auto">
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
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-slate-500">{order.phone_number}</div>
                  </TableCell>
                  
                  {/* NEW ADDRESS COLUMN */}
                  <TableCell className="text-xs max-w-[250px]">
                    <div className="flex gap-2">
                        <MapPin className="w-4 h-4 text-blue-500 shrink-0" />
                        <span className="line-clamp-3 leading-relaxed">
                            {order.address || "No address provided"}
                        </span>
                    </div>
                  </TableCell>

                  <TableCell className="text-sm">{order.device_model}</TableCell>
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
  );
}