"use client";

import React, { useState } from "react";
import toast from 'react-hot-toast'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { Slider } from "@/components/ui/slider";
import { Check, Loader2, Monitor, Moon, Palette, SunMedium } from "lucide-react";

export default function AppearanceSettings() {
  const [isSaving, setIsSaving] = useState(false);
  
  const [theme, setTheme] = useState("system");
  const [fontSize, setFontSize] = useState(100);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [colorScheme, setColorScheme] = useState("default");
  const [denseMode, setDenseMode] = useState(false);
  
  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Appearance settings saved",
      description: "Your display preferences have been updated successfully."
    });
    
    setIsSaving(false);
  };

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Appearance Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize how CampusConnect looks and feels.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Theme</CardTitle>
            <CardDescription>
              Choose your preferred theme for CampusConnect.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <RadioGroup 
              value={theme} 
              onValueChange={setTheme}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <div className="flex flex-col items-center space-y-3 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                <SunMedium className="h-6 w-6 text-chart-1" />
                <RadioGroupItem value="light" id="theme-light" className="sr-only" />
                <Label htmlFor="theme-light" className="font-medium">Light</Label>
              </div>
              
              <div className="flex flex-col items-center space-y-3 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                <Moon className="h-6 w-6 text-chart-3" />
                <RadioGroupItem value="dark" id="theme-dark" className="sr-only" />
                <Label htmlFor="theme-dark" className="font-medium">Dark</Label>
              </div>
              
              <div className="flex flex-col items-center space-y-3 rounded-md border p-4 hover:bg-muted/50 transition-colors">
                <Monitor className="h-6 w-6 text-chart-5" />
                <RadioGroupItem value="system" id="theme-system" className="sr-only" />
                <Label htmlFor="theme-system" className="font-medium">System</Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Font & Display</CardTitle>
            <CardDescription>
              Adjust text size and other display settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label className="font-medium">Text Size</Label>
                <span className="text-sm font-medium">{fontSize}%</span>
              </div>
              <Slider 
                value={[fontSize]} 
                onValueChange={(value) => setFontSize(value[0])}
                min={75} 
                max={150} 
                step={5}
              />
              <div className="flex justify-between text-xs text-muted-foreground pt-1">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="dense-mode" className="font-medium">Compact Mode</Label>
                  <p className="text-sm text-muted-foreground">
                    Reduce padding and spacing for a more compact layout.
                  </p>
                </div>
                <Switch 
                  id="dense-mode"
                  checked={denseMode}
                  onCheckedChange={setDenseMode}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="reduced-motion" className="font-medium">Reduce Motion</Label>
                  <p className="text-sm text-muted-foreground">
                    Minimize animations throughout the interface.
                  </p>
                </div>
                <Switch 
                  id="reduced-motion"
                  checked={reducedMotion}
                  onCheckedChange={setReducedMotion}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Color Scheme</CardTitle>
            <CardDescription>
              Select a color scheme for the application interface.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <Select value={colorScheme} onValueChange={setColorScheme}>
                <SelectTrigger className="w-full md:w-[250px]">
                  <SelectValue placeholder="Select color scheme" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="default">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-chart-1" />
                      <span>Default</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="ocean">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-chart-2" />
                      <span>Ocean</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="forest">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-chart-3" />
                      <span>Forest</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="sunset">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-chart-4" />
                      <span>Sunset</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="berry">
                    <div className="flex items-center gap-2">
                      <Palette className="h-4 w-4 text-chart-5" />
                      <span>Berry</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              
              <div className="flex gap-3 overflow-x-auto py-2">
                <div className="bg-chart-1 w-10 h-10 rounded-full flex-shrink-0"></div>
                <div className="bg-chart-2 w-10 h-10 rounded-full flex-shrink-0"></div>
                <div className="bg-chart-3 w-10 h-10 rounded-full flex-shrink-0"></div>
                <div className="bg-chart-4 w-10 h-10 rounded-full flex-shrink-0"></div>
                <div className="bg-chart-5 w-10 h-10 rounded-full flex-shrink-0"></div>
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