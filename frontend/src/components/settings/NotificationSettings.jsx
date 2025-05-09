"use client";

import React, { useState } from "react";
import toast from 'react-hot-toast'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Loader2, Mail, MessageSquare, Bell, Calendar, BookOpen, Users, Check } from "lucide-react";


export default function NotificationSettings() {
  const [isSaving, setIsSaving] = useState(false);
  
  const [notificationOptions, setNotificationOptions] = useState([
    {
      id: "messages",
      title: "Messages",
      description: "Notifications for direct messages and replies",
      email: true,
      push: true,
      inApp: true,
      icon: <MessageSquare className="h-4 w-4 text-chart-1" />
    },
    {
      id: "events",
      title: "Events",
      description: "Updates about events you're attending or interested in",
      email: true,
      push: true,
      inApp: true,
      icon: <Calendar className="h-4 w-4 text-chart-2" />
    },
    {
      id: "studyGroups",
      title: "Study Groups",
      description: "Activity and updates from your study groups",
      email: false,
      push: true,
      inApp: true,
      icon: <BookOpen className="h-4 w-4 text-chart-3" />
    },
    {
      id: "discussions",
      title: "Discussions",
      description: "Replies and mentions in discussion forums",
      email: false,
      push: false,
      inApp: true,
      icon: <Users className="h-4 w-4 text-chart-4" />
    },
    {
      id: "announcements",
      title: "Announcements",
      description: "Important campus-wide announcements",
      email: true,
      push: true,
      inApp: true,
      icon: <Bell className="h-4 w-4 text-chart-5" />
    },
  ]);

  const handleToggleChange = (optionId, channel) => {
    setNotificationOptions(prevOptions => 
      prevOptions.map(option => 
        option.id === optionId 
          ? { ...option, [channel]: !option[channel] } 
          : option
      )
    );
  };

  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Notification preferences saved",
      description: "Your notification settings have been updated successfully."
    });
    
    setIsSaving(false);
  };

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Notification Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage how and when you receive notifications from CampusConnect.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Notification Channels</CardTitle>
            <CardDescription>
              Choose your preferred communication channels for different types of notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-12 gap-2 px-4 py-2 text-sm font-medium text-muted-foreground">
                <div className="col-span-6 md:col-span-5">Type</div>
                <div className="col-span-2 text-center">Email</div>
                <div className="col-span-2 text-center">Push</div>
                <div className="col-span-2 text-center">In-App</div>
              </div>
              
              <Separator />
              
              {notificationOptions.map((option) => (
                <div key={option.id} className="grid grid-cols-12 gap-2 px-4 py-4 items-center hover:bg-muted/50 rounded-md transition-colors">
                  <div className="col-span-6 md:col-span-5 flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {option.icon}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{option.title}</p>
                      <p className="text-xs text-muted-foreground hidden md:block">{option.description}</p>
                    </div>
                  </div>
                  
                  <div className="col-span-2 flex justify-center">
                    <Switch 
                      checked={option.email}
                      onCheckedChange={() => handleToggleChange(option.id, "email")}
                      aria-label={`${option.title} email notifications`}
                    />
                  </div>
                  
                  <div className="col-span-2 flex justify-center">
                    <Switch 
                      checked={option.push}
                      onCheckedChange={() => handleToggleChange(option.id, "push")}
                      aria-label={`${option.title} push notifications`}
                    />
                  </div>
                  
                  <div className="col-span-2 flex justify-center">
                    <Switch 
                      checked={option.inApp}
                      onCheckedChange={() => handleToggleChange(option.id, "inApp")}
                      aria-label={`${option.title} in-app notifications`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Digest Settings</CardTitle>
            <CardDescription>
              Configure how often you receive notification digests summarizing your activity.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="email-digest">Email Digest Frequency</Label>
                <Select defaultValue="daily">
                  <SelectTrigger id="email-digest">
                    <SelectValue placeholder="Select frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="realtime">Real-time</SelectItem>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="never">Never</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="quiet-hours">Quiet Hours</Label>
                <Select defaultValue="10pm-7am">
                  <SelectTrigger id="quiet-hours">
                    <SelectValue placeholder="Select quiet hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">No quiet hours</SelectItem>
                    <SelectItem value="10pm-7am">10:00 PM - 7:00 AM</SelectItem>
                    <SelectItem value="11pm-6am">11:00 PM - 6:00 AM</SelectItem>
                    <SelectItem value="custom">Custom...</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              <Switch id="mute-weekends" />
              <Label htmlFor="mute-weekends" className="text-sm">Mute notifications on weekends</Label>
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