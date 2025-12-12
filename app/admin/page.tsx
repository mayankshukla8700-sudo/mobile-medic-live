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

export const revalidate = 0;

export default async function AdminDashboard() {
  // 1. SECURITY CHECK
  const cookieStore = await cookies();
  const hasAccess = cookieStore.get("admin_access");

  if (!hasAccess) {
    redirect("/signin"); // <--- CHANGED THIS TO /signin
  }

  // 2. LOGOUT FUNCTION
  async function logout() {
    "use server";
    const cookieStore = await cookies();
    cookieStore.delete("admin_access");
    redirect("/signin"); // <--- CHANGED THIS TO /signin
  }

  // 3. FETCH DATA
  const { data: bookings, error } = await supabase
    .from("bookings")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return <div className="p-10 text-red-500">Error loading data!</div>;
  }

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      <div className="max-w-6xl mx-auto bg-white rounded-xl shadow-sm border p-8">
        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            Admin Dashboard
          </h1>
          <form action={logout}>
            <Button variant="destructive">Lock Shop (Logout)</Button>
          </form>
        </div>

        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Device</TableHead>
                <TableHead>Issue</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {bookings?.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {new Date(order.created_at).toLocaleDateString()}
                  </TableCell>
                  <TableCell className="font-medium">
                    <div>{order.customer_name}</div>
                    <div className="text-xs text-slate-500">{order.phone_number}</div>
                  </TableCell>
                  <TableCell>{order.device_model}</TableCell>
                  <TableCell>{order.issue_type}</TableCell>
                  <TableCell className="text-green-600 font-bold">
                    {order.estimated_price}
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