"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function setAdminCookie() {
  const cookieStore = await cookies();
  
  cookieStore.set("admin_access", "true", { 
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24 * 7 // 7 Days
  });
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_access");
  redirect("/signin");
}