"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/userAPIs/apiService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import { 
  Activity, 
  Calendar, 
  BookOpen, 
  Users, 
  Bell,
  BarChart
} from "lucide-react";
import DashboardCard from "@/components/dashboard/DashboardCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import StatsRow from "@/components/dashboard/StatsRow";

function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else if (!user?.emailVerified) {
        router.push("/verify-email");
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 max-w-full">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Welcome back, {user?.username || 'Student'}</h1>
        <p className="text-muted-foreground">Here's what's happening on your campus today.</p>
      </div>

      <StatsRow />
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        <DashboardCard 
          title="Recent Activity" 
          icon={<Activity className="h-5 w-5 text-chart-1" />}
          className="lg:col-span-2"
        >
          <ActivityFeed />
        </DashboardCard>
        
        <DashboardCard 
          title="Upcoming Events" 
          icon={<Calendar className="h-5 w-5 text-chart-2" />}
          action={{
            label: "View all",
            onClick: () => router.push("/dashboard/events")
          }}
        >
          <UpcomingEvents />
        </DashboardCard>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        <DashboardCard 
          title="Study Sessions" 
          icon={<BookOpen className="h-5 w-5 text-chart-3" />}
          action={{
            label: "Join a group",
            onClick: () => router.push("/dashboard/study-groups")
          }}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">You have 3 upcoming study sessions this week.</p>
            <ul className="space-y-3">
              <li className="p-3 bg-muted rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">Data Structures Review</p>
                  <p className="text-sm text-muted-foreground">Tomorrow, 3:00 PM</p>
                </div>
                <span className="text-xs bg-chart-3/20 text-chart-3 px-2 py-1 rounded-full">CS 101</span>
              </li>
              <li className="p-3 bg-muted rounded-md flex justify-between items-center">
                <div>
                  <p className="font-medium">Organic Chemistry Prep</p>
                  <p className="text-sm text-muted-foreground">Thursday, 5:00 PM</p>
                </div>
                <span className="text-xs bg-chart-4/20 text-chart-4 px-2 py-1 rounded-full">CHEM 202</span>
              </li>
            </ul>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Recent Discussions" 
          icon={<Users className="h-5 w-5 text-chart-4" />}
          action={{
            label: "View all",
            onClick: () => router.push("/dashboard/discussions")
          }}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Popular topics in your courses:</p>
            <ul className="space-y-3">
              <li className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Assignment 3 Clarification</p>
                  <span className="text-xs bg-chart-2/20 text-chart-2 px-2 py-1 rounded-full">21 replies</span>
                </div>
                <p className="text-sm text-muted-foreground">Started by Prof. Williams</p>
              </li>
              <li className="p-3 bg-muted rounded-md">
                <div className="flex items-center justify-between mb-1">
                  <p className="font-medium">Summer Internship Opportunities</p>
                  <span className="text-xs bg-chart-1/20 text-chart-1 px-2 py-1 rounded-full">13 replies</span>
                </div>
                <p className="text-sm text-muted-foreground">Started by Career Services</p>
              </li>
            </ul>
          </div>
        </DashboardCard>
        
        <DashboardCard 
          title="Notifications" 
          icon={<Bell className="h-5 w-5 text-chart-5" />}
          action={{
            label: "Settings",
            onClick: () => router.push("/dashboard/settings")
          }}
        >
          <div className="space-y-4">
            <p className="text-muted-foreground text-sm">Recent updates:</p>
            <ul className="space-y-3">
              <li className="p-3 bg-muted rounded-md flex items-start gap-3">
                <span className="bg-chart-5/20 p-1.5 rounded-full mt-0.5">
                  <Calendar className="h-3.5 w-3.5 text-chart-5" />
                </span>
                <div>
                  <p className="font-medium text-sm">Campus Fair rescheduled</p>
                  <p className="text-xs text-muted-foreground">Now on Friday, Oct 15</p>
                </div>
              </li>
              <li className="p-3 bg-muted rounded-md flex items-start gap-3">
                <span className="bg-chart-1/20 p-1.5 rounded-full mt-0.5">
                  <BookOpen className="h-3.5 w-3.5 text-chart-1" />
                </span>
                <div>
                  <p className="font-medium text-sm">New study resource available</p>
                  <p className="text-xs text-muted-foreground">For MATH 301 - Linear Algebra</p>
                </div>
              </li>
              <li className="p-3 bg-muted rounded-md flex items-start gap-3">
                <span className="bg-chart-3/20 p-1.5 rounded-full mt-0.5">
                  <Users className="h-3.5 w-3.5 text-chart-3" />
                </span>
                <div>
                  <p className="font-medium text-sm">Request to join study group</p>
                  <p className="text-xs text-muted-foreground">From Alex Johnson</p>
                </div>
              </li>
            </ul>
          </div>
        </DashboardCard>
      </div>
    </div>
  );
}

export default DashboardPage;