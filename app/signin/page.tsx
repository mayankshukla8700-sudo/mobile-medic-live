"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (password === "admin123") {
      document.cookie = "admin_access=true; path=/";
      toast.success("Access Granted");
      router.push("/admin");
    } else {
      toast.error("Wrong Password!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-96 rounded-lg border bg-white p-8 shadow-lg">
        <h1 className="mb-6 text-center text-2xl font-bold text-blue-900">
          Admin Login
        </h1>
        <div className="flex flex-col gap-4">
          <Input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleLogin} className="bg-blue-900 hover:bg-blue-800">
            Unlock Shop
          </Button>
        </div>
      </div>
    </div>
  );
}