"use client";

import React, { useState } from "react";

import toast from "react-hot-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Check, Loader2, Shield, Lock, LogOut, Clock, X, Smartphone, AlertTriangle } from "lucide-react";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

export default function SecuritySettings() {
  const [isSaving, setIsSaving] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [deviceApprovalEnabled, setDeviceApprovalEnabled] = useState(true);
  const [loginNotificationsEnabled, setLoginNotificationsEnabled] = useState(true);
  
  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Security settings saved",
      description: "Your security preferences have been updated successfully."
    });
    
    setIsSaving(false);
  };

  const recentSessions = [
    {
      device: "MacBook Pro",
      location: "Austin, TX",
      ip: "198.51.100.42",
      time: "Current session",
      isCurrent: true
    },
    {
      device: "iPhone 14",
      location: "Austin, TX",
      ip: "198.51.100.37",
      time: "2 hours ago",
      isCurrent: false
    },
    {
      device: "Windows PC",
      location: "San Antonio, TX",
      ip: "203.0.113.105",
      time: "Yesterday at 3:42 PM",
      isCurrent: false
    }
  ];

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Security Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your account security and authentication methods.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Two-Factor Authentication</CardTitle>
            <CardDescription>
              Add an extra layer of security to your account by requiring more than just a password to sign in.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-chart-2" />
                  {twoFactorEnabled ? "Enabled" : "Disabled"}
                </Label>
                <p className="text-sm text-muted-foreground">
                  {twoFactorEnabled 
                    ? "Your account is protected with two-factor authentication." 
                    : "Two-factor authentication is not enabled for your account."}
                </p>
              </div>
              <Switch 
                checked={twoFactorEnabled}
                onCheckedChange={setTwoFactorEnabled}
              />
            </div>
            
            {twoFactorEnabled && (
              <div className="pt-2 space-y-4 animate-in slide-in-from-left duration-300">
                <div className="rounded-md bg-muted p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Smartphone className="h-5 w-5 text-chart-1" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Text message verification</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>A verification code will be sent to your phone when you sign in.</p>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          Change phone number
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="rounded-md bg-muted p-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <Shield className="h-5 w-5 text-chart-4" />
                    </div>
                    <div className="ml-3">
                      <h3 className="text-sm font-medium">Recovery codes</h3>
                      <div className="mt-2 text-sm text-muted-foreground">
                        <p>Recovery codes can be used to access your account if you lose your device.</p>
                      </div>
                      <div className="mt-3">
                        <Button variant="outline" size="sm">
                          View recovery codes
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Login Sessions</CardTitle>
            <CardDescription>
              Review your active sessions and sign out from other devices.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border">
              {recentSessions.map((session, index) => (
                <div 
                  key={index} 
                  className={`p-4 flex items-center justify-between ${
                    index !== recentSessions.length - 1 ? "border-b" : ""
                  } ${session.isCurrent ? "bg-muted/50" : ""}`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{session.device}</p>
                      {session.isCurrent && (
                        <span className="text-xs bg-chart-2/20 text-chart-2 px-2 py-0.5 rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      <p>{session.location} • {session.ip}</p>
                      <p className="mt-1">{session.time}</p>
                    </div>
                  </div>
                  
                  {!session.isCurrent && (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="outline" size="sm" className="text-muted-foreground hover:text-destructive">
                          <LogOut className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Sign out device?</AlertDialogTitle>
                          <AlertDialogDescription>
                            This will end the session on this device. The user will need to sign in again.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Sign Out
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  )}
                </div>
              ))}
            </div>
            
            <Button variant="outline" className="w-full">
              Sign out from all other devices
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Additional Security</CardTitle>
            <CardDescription>
              Configure additional security measures for your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="device-approval" className="font-medium">New Device Approval</Label>
                <p className="text-sm text-muted-foreground">
                  Require your approval before logging in from a new device.
                </p>
              </div>
              <Switch 
                id="device-approval"
                checked={deviceApprovalEnabled}
                onCheckedChange={setDeviceApprovalEnabled}
              />
            </div>
            
            <Separator className="my-2" />
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="login-notifications" className="font-medium">Login Notifications</Label>
                <p className="text-sm text-muted-foreground">
                  Receive notifications when someone logs into your account.
                </p>
              </div>
              <Switch 
                id="login-notifications"
                checked={loginNotificationsEnabled}
                onCheckedChange={setLoginNotificationsEnabled}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center space-x-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            <div>
              <CardTitle className="text-base text-destructive">Security Risks</CardTitle>
              <CardDescription>
                Review potential security risks for your account.
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <div className="rounded-md bg-destructive/10 p-4 text-destructive border border-destructive/20">
              <div className="flex gap-3">
                <div className="flex-shrink-0 mt-0.5">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-sm font-medium">Password last changed 6 months ago</h3>
                  <p className="mt-2 text-sm opacity-90">
                    We recommend changing your password every 3 months for better security.
                  </p>
                  <div className="mt-3">
                    <Button size="sm" variant="secondary" className="bg-destructive/10 hover:bg-destructive/20 border border-destructive/20">
                      Update password
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end mt-6">
          <Button onClick={saveChanges} disabled={isSaving}>
            {isSaving ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving changes
              </>
            ) : (
              <>
                <Check className="mr-2 h-4 w-4" />
                Save changes
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}