"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/AuthProvider";

export default function Home() {
  const { session } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (session?.user?.user_metadata?.role === "admin") {
      router.push("/admin/users");
    } else if (session) {
      router.push("/dashboard");
    } else {
      router.push("/login");
    }
  }, [session]);

  return null;
}
