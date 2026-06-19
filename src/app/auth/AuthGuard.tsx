"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthorized, setIsAuthorized] = useState(false);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    const refreshToken = localStorage.getItem("refreshToken");
    const role = localStorage.getItem("role");

    const isAuthenticated = !!(accessToken || refreshToken);
    const publicPaths = ["/", "/auth", "/register", "/forgot-password"];

    // --- NOT AUTHENTICATED ---
    if (!isAuthenticated) {
      if (!publicPaths.includes(pathname)) {
        router.replace("/auth");
      } else {
        setIsAuthorized(true);
      }
      return;
    }

    // --- AUTHENTICATED ---

    // Define the correct workspace base path depending on the role
    const isEmployee = role === "EMPLOYEE";
    const targetWorkspace = isEmployee ? "/portal" : "/dashboard";

    // Scenario A: Prevent logged-in users from sitting on the login/landing page
    if (pathname === "/" || pathname === "/auth") {
      router.replace(targetWorkspace);
      return;
    }

    // Scenario B: Block Standard Employees from accessing the Management Dashboard
    if (isEmployee && pathname.startsWith("/dashboard")) {
      router.replace("/portal");
      return;
    }

    // Scenario C: Block HR/Directors from accessing the Employee Self-Service Portal
    if (!isEmployee && pathname.startsWith("/portal")) {
      router.replace("/dashboard");
      return;
    }

    // If they pass all security checks, render the page
    setIsAuthorized(true);

  }, [router, pathname]);

  // Prevent UI flashing by returning nothing (or you could return a loading spinner) until authorized
  if (!isAuthorized) {
    return null;
  }

  return <>{children}</>;
}