"use client";

import React, { useState } from "react";
import toast from 'react-hot-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Check, Download, Eye, EyeOff, Globe, Loader2, LockKeyhole, Shield, Users } from "lucide-react";

export default function PrivacySettings() {
  const [isSaving, setIsSaving] = useState(false);
  
  const [profileVisibility, setProfileVisibility] = useState("university");
  const [activityVisibility, setActivityVisibility] = useState("friends");
  const [locationSharing, setLocationSharing] = useState(false);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [dataUsage, setDataUsage] = useState(50);
  
  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated successfully."
    });
    
    setIsSaving(false);
  };

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Privacy Settings</h3>
          <p className="text-sm text-muted-foreground">
            Control who can see your information and how your data is used.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Profile Visibility</CardTitle>
            <CardDescription>
              Control who can view your profile information.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={profileVisibility} 
              onValueChange={setProfileVisibility}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="public" id="profile-public" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="profile-public" className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Public
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Anyone on the internet can view your profile information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="university" id="profile-university" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="profile-university" className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    University Only
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only people with verified university email addresses can view your profile.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="friends" id="profile-friends" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="profile-friends" className="font-medium flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    Friends Only
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Only people you've connected with can view your full profile information.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="private" id="profile-private" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="profile-private" className="font-medium flex items-center gap-2">
                    <LockKeyhole className="h-4 w-4 text-muted-foreground" />
                    Private
                  </Label>
                  <p className="text-sm text-muted-foreground">
                    Your profile is hidden from search results. Only show minimal information.
                  </p>
                </div>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Activity Privacy</CardTitle>
            <CardDescription>
              Manage how your activity and status are shared.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={activityVisibility} 
              onValueChange={setActivityVisibility}
              className="space-y-3"
            >
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="public" id="activity-public" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="activity-public" className="font-medium">Public</Label>
                  <p className="text-sm text-muted-foreground">
                    Share activity updates with everyone on CampusConnect.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="friends" id="activity-friends" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="activity-friends" className="font-medium">Friends Only</Label>
                  <p className="text-sm text-muted-foreground">
                    Only share activity with people you're connected with.
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3 space-y-0 rounded-md p-3 hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="private" id="activity-private" className="mt-1" />
                <div className="space-y-1">
                  <Label htmlFor="activity-private" className="font-medium">Private</Label>
                  <p className="text-sm text-muted-foreground">
                    Don't share any activity updates.
                  </p>
                </div>
              </div>
            </RadioGroup>

            <Separator className="my-4" />
            
            <div className="flex items-start space-x-3 space-y-0 p-2">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="online-status" className="font-medium flex items-center gap-2">
                    <Eye className="h-4 w-4 text-muted-foreground" />
                    Show Online Status
                  </Label>
                  <Switch 
                    id="online-status" 
                    checked={onlineStatus}
                    onCheckedChange={setOnlineStatus}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Let others know when you're actively using CampusConnect.
                </p>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 space-y-0 p-2">
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <Label htmlFor="location-sharing" className="font-medium flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Location Sharing
                  </Label>
                  <Switch 
                    id="location-sharing" 
                    checked={locationSharing}
                    onCheckedChange={setLocationSharing}
                  />
                </div>
                <p className="text-sm text-muted-foreground">
                  Allow the app to use your location for campus events and study groups.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Data Usage and Personalization</CardTitle>
            <CardDescription>
              Control how we use your data to personalize your experience.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  Personalization Level
                </Label>
                <span className="text-sm font-medium">{dataUsage}%</span>
              </div>
              <Slider 
                value={[dataUsage]} 
                onValueChange={(value) => setDataUsage(value[0])}
                max={100} 
                step={10}
              />
              <p className="text-sm text-muted-foreground mt-2">
                Control how much data we use to personalize your content and recommendations.
                Higher values mean more relevant content, but require more data.
              </p>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-2">
              <Button variant="outline" className="gap-2 w-full md:w-auto">
                <Download className="h-4 w-4" />
                Download Your Data
              </Button>
              <p className="text-xs text-muted-foreground">
                Get a copy of all the data we have about you in a machine-readable format.
              </p>
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