"use client";

import React from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AccountSettings from "@/components/settings/AccountSettings";
import NotificationSettings from "@/components/settings/NotificationSettings";
import PrivacySettings from "@/components/settings/PrivacySettings";
import AppearanceSettings from "@/components/settings/AppearanceSettings";
import SecuritySettings from "@/components/settings/SecuritySettings";
import AcademicSettings from "@/components/settings/AcademicSettings";
import AccessibilitySettings from "@/components/settings/AccessibilitySettings";

export default function SettingsPage() {
  return (
    <div className="container py-6 px-4 md:px-6 max-w-full animate-in fade-in duration-500">
      <div className="flex flex-col gap-2 mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
        <Separator className="my-2" />
      </div>

      <Tabs defaultValue="account" className="w-full" >
        <TabsList className="w-full md:w-auto mb-6 grid grid-cols-2 md:grid-cols-4 lg:inline-flex overflow-auto" >
          <TabsTrigger value="account" className="flex gap-2 items-center">
            Account
          </TabsTrigger>
          <TabsTrigger
            value="notifications"
            className="flex gap-2 items-center"
          >
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="flex gap-2 items-center">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="appearance" className="flex gap-2 items-center">
            Appearance
          </TabsTrigger>
          <TabsTrigger value="security" className="flex gap-2 items-center">
            Security
          </TabsTrigger>
        </TabsList>

        <Card className="border rounded-lg p-0 overflow-hidden bg-card">
          <TabsContent value="account" className="m-0">
            <AccountSettings />
          </TabsContent>

          <TabsContent value="notifications" className="m-0">
            <NotificationSettings />
          </TabsContent>

          <TabsContent value="privacy" className="m-0">
            <PrivacySettings />
          </TabsContent>

          <TabsContent value="appearance" className="m-0">
            <AppearanceSettings />
          </TabsContent>

          <TabsContent value="security" className="m-0">
            <SecuritySettings />
          </TabsContent>
        </Card>
      </Tabs>
    </div>
  );
}
