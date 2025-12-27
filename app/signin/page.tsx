"use client";

import { useState } from "react";
// FIX: Use 'setAdminCookie' from our new actions file so the server knows we logged in
import { setAdminCookie } from "../action"; 
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Lock, Loader2 } from "lucide-react";

export default function LoginPage() {
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async () => {
    setLoading(true);

    if (password === "admin123") {
      // 1. Set the cookie on the SERVER
      await setAdminCookie();
      
      // 2. Show Success
      toast.success("Access Granted");
      
      // 3. Go to Dashboard
      router.push("/admin");
    } else {
      toast.error("Wrong Password!");
      setLoading(false);
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-slate-50">
      <div className="w-full max-w-sm rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        
        <div className="w-16 h-16 bg-blue-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Lock className="w-8 h-8 text-blue-600" />
        </div>

        <h1 className="mb-2 text-center text-2xl font-bold text-slate-900">
          Admin Login
        </h1>
        <p className="text-center text-slate-500 text-sm mb-6">Enter the secret key to manage shop.</p>

        <div className="flex flex-col gap-4">
          <Input 
            type="password" 
            placeholder="Enter Password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="py-6 text-lg"
          />
          <Button 
            onClick={handleLogin} 
            disabled={loading}
            className="bg-slate-900 hover:bg-slate-800 h-12 text-base font-bold"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Unlock Shop"}
          </Button>
        </div>
      </div>
    </div>
  );
}