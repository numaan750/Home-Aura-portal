"use client";

import { useContext, useEffect } from "react";
import { useRouter } from "next/navigation";
import { AppContext } from "@/context/Appcontext";

const ProtectedRoute = ({ children }) => {
  const router = useRouter();
  const { authenticated, authLoading } = useContext(AppContext);

  useEffect(() => {
    if (!authLoading && !authenticated) {
      router.replace("/login");
    }
  }, [authenticated, authLoading, router]);

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-black text-xl">Please Wait.......</div>
      </div>
    );
  }

  if (!authenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-amber-50">
        <div className="text-black text-xl">Please Wait.......</div>
      </div>
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;
