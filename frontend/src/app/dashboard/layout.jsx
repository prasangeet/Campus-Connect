"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Sidebar from "@/components/dashboard/Sidebar";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import { Toaster } from "@/components/ui/sonner";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase";
import { useRouter } from "next/navigation";

function DashboardLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      }
    });

    return () => unsubscribe;
  }, []);

  return (
    <div className="h-screen flex flex-col md:flex-row bg-background">
      <div className="md:hidden flex items-center p-4 border-b">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <div className="ml-4 font-semibold">CampusConnect</div>
      </div>

      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        className={`
          fixed inset-y-0 left-0 z-50 transform md:relative md:translate-x-0 transition-transform duration-300 ease-in-out
          ${
            sidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"
          }
        `}
      />

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        <div className="p-4 border-b">
          <Breadcrumbs path={pathname} />
        </div>
        <main className="flex-1 overflow-y-auto w-full">{children}</main>
      </div>

      <Toaster />
    </div>
  );
}

export default DashboardLayout;
