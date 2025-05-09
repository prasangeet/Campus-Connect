"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { getCurrentUser, logout } from "@/services/userAPIs/apiService";
import {
  LayoutDashboard,
  Users,
  Calendar,
  BookOpen,
  MessageSquare,
  Settings,
  LogOut,
  Bell,
  X,
  User,
  ChevronRight,
  Book,
  MessageCircleCode,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AvatarImage } from "@radix-ui/react-avatar";

function Sidebar({ isOpen, onClose, className }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState(null);

  const handleLogout = async () => {
    const confirmed = window.confirm("Are you sure you want to logout?");
    if (confirmed) {
      try {
        await logout();
        router.push("/login");
      } catch (error) {
        console.error("Error logging out:", error);
      }
    }
  };

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUser();
  }, []);

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard className="h-5 w-5" />,
      path: "/dashboard",
      exact: true,
    },
    {
      title: "Profile",
      icon: <User className="h-5 w-5" />,
      path: "/dashboard/profile",
    },
    {
      title: "Events",
      icon: <Calendar className="h-5 w-5" />,
      path: "/dashboard/events",
    },
    {
      title: "Discussions",
      icon: <MessageSquare className="h-5 w-5" />,
      path: "/dashboard/discussions",
    },
    {
      title: "Posts",
      icon: <Book className="h-5 w-5" />,
      path: "/dashboard/posts",
    },
    {
      title: "Messages",
      icon: <MessageCircle className="h-5 w-5" />,
      path: "/dashboard/messages",
    },
    {
      title: "Study Groups",
      icon: <BookOpen className="h-5 w-5" />,
      path: "/dashboard/study-groups",
    },
    {
      title: "Community",
      icon: <Users className="h-5 w-5" />,
      path: "/dashboard/community",
    },
    {
      title: "Notifications",
      icon: <Bell className="h-5 w-5" />,
      path: "/dashboard/notifications",
    },
    {
      title: "Settings",
      icon: <Settings className="h-5 w-5" />,
      path: "/dashboard/settings",
    },
  ];

  const isActive = (path, exact = false) => {
    if (exact) {
      return pathname === path;
    }
    return pathname.startsWith(path);
  };

  const SidebarContent = () => (
    <div className={`w-64 bg-card border-r flex flex-col h-full ${className}`}>
      <div className="p-6 border-b flex justify-center items-center space-x-2">
        <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
          <span className="text-primary-foreground font-bold">CC</span>
        </div>
        <h2 className="text-xl font-bold">CampusConnect</h2>
      </div>

      <div className="p-4 border-b">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link href="/dashboard/profile" className="flex items-center gap-3">
            <Avatar>
              <AvatarFallback>
                <User className="h-5 w-5" />
              </AvatarFallback>
              {user?.profile_image && (
                <AvatarImage
                  src={user?.profile_image}
                  alt="Profile Picture"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              )}
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium truncate">{user?.full_name}</p>
              <p className="text-xs text-muted-foreground truncate">
                {user?.email}
              </p>
            </div>
            <ChevronRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <nav className="p-3 space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              href={item.path}
              onClick={item.path === pathname ? onClose : undefined}
            >
              <Button
                variant="ghost"
                className={`w-full justify-start transition-colors ${
                  isActive(item.path, item.exact)
                    ? "bg-muted text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                {item.icon}
                <span className="ml-3">{item.title}</span>
              </Button>
            </Link>
          ))}
        </nav>
      </ScrollArea>

      <div className="p-3 border-t">
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </div>
    </div>
  );

  return (
    <>
      <div className="hidden md:block">
        <SidebarContent />
      </div>

      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent side="left" className="p-0 w-64">
          <SidebarContent />
        </SheetContent>
      </Sheet>
    </>
  );
}

export default Sidebar;
