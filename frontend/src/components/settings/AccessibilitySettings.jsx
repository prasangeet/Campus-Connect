"use client";

import React, { useState } from "react";
import toast  from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  Check,
  Loader2,
  MousePointer,
  Keyboard,
  Volume2,
  Type,
  ZoomIn,
  Sparkles,
  Megaphone,
} from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";

export default function AccessibilitySettings() {
  const [isSaving, setIsSaving] = useState(false);

  const [screenReader, setScreenReader] = useState(false);
  const [motionReduced, setMotionReduced] = useState(false);
  const [highContrast, setHighContrast] = useState(false);
  const [focusIndicators, setFocusIndicators] = useState(true);
  const [autoplayMedia, setAutoplayMedia] = useState(false);
  const [keyboardNavigation, setKeyboardNavigation] = useState(true);
  const [contentDensity, setContentDensity] = useState("default");
  const [textSize, setTextSize] = useState(100);

  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Accessibility settings saved",
      description:
        "Your accessibility preferences have been updated successfully.",
    });

    setIsSaving(false);
  };

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Accessibility Settings</h3>
          <p className="text-sm text-muted-foreground">
            Customize how CampusConnect works for your accessibility needs.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Vision Accessibility</CardTitle>
            <CardDescription>
              Adjust settings to make the platform more accessible for vision
              impairments.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="screen-reader"
                  className="font-medium flex items-center gap-2"
                >
                  <Megaphone className="h-4 w-4 text-chart-1" />
                  Screen Reader Support
                </Label>
                <p className="text-sm text-muted-foreground">
                  Optimize content for screen readers.
                </p>
              </div>
              <Switch
                id="screen-reader"
                checked={screenReader}
                onCheckedChange={setScreenReader}
              />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="high-contrast"
                  className="font-medium flex items-center gap-2"
                >
                  <Sparkles className="h-4 w-4 text-chart-3" />
                  High Contrast Mode
                </Label>
                <p className="text-sm text-muted-foreground">
                  Increase color contrast for better visibility.
                </p>
              </div>
              <Switch
                id="high-contrast"
                checked={highContrast}
                onCheckedChange={setHighContrast}
              />
            </div>

            <Separator className="my-2" />

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="text-size"
                  className="font-medium flex items-center gap-2"
                >
                  <ZoomIn className="h-4 w-4 text-chart-4" />
                  Text Size
                </Label>
                <span className="text-sm font-medium">{textSize}%</span>
              </div>
              <Slider
                id="text-size"
                value={[textSize]}
                onValueChange={(value) => setTextSize(value[0])}
                min={80}
                max={200}
                step={10}
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Smaller</span>
                <span>Default</span>
                <span>Larger</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Motion & Interaction</CardTitle>
            <CardDescription>
              Control animations and interaction elements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="motion-reduced" className="font-medium">
                  Reduce Motion
                </Label>
                <p className="text-sm text-muted-foreground">
                  Minimize or eliminate animations and transitions.
                </p>
              </div>
              <Switch
                id="motion-reduced"
                checked={motionReduced}
                onCheckedChange={setMotionReduced}
              />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="autoplay-media" className="font-medium">
                  Autoplay Media
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically play videos and animations.
                </p>
              </div>
              <Switch
                id="autoplay-media"
                checked={autoplayMedia}
                onCheckedChange={setAutoplayMedia}
              />
            </div>

            <Separator className="my-2" />

            <div className="space-y-2">
              <Label htmlFor="content-density" className="font-medium">
                Content Density
              </Label>
              <RadioGroup
                id="content-density"
                value={contentDensity}
                onValueChange={setContentDensity}
                className="flex flex-col space-y-1"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfort" id="density-comfort" />
                  <Label htmlFor="density-comfort" className="font-normal">
                    Comfort (More Space)
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="density-default" />
                  <Label htmlFor="density-default" className="font-normal">
                    Default
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="compact" id="density-compact" />
                  <Label htmlFor="density-compact" className="font-normal">
                    Compact (Less Space)
                  </Label>
                </div>
              </RadioGroup>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Navigation & Input</CardTitle>
            <CardDescription>
              Adjust how you navigate and interact with the platform.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="focus-indicators"
                  className="font-medium flex items-center gap-2"
                >
                  <MousePointer className="h-4 w-4 text-chart-2" />
                  Enhanced Focus Indicators
                </Label>
                <p className="text-sm text-muted-foreground">
                  Make focus outlines more visible when navigating.
                </p>
              </div>
              <Switch
                id="focus-indicators"
                checked={focusIndicators}
                onCheckedChange={setFocusIndicators}
              />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label
                  htmlFor="keyboard-navigation"
                  className="font-medium flex items-center gap-2"
                >
                  <Keyboard className="h-4 w-4 text-chart-5" />
                  Keyboard Navigation
                </Label>
                <p className="text-sm text-muted-foreground">
                  Navigate all parts of the site using only a keyboard.
                </p>
              </div>
              <Switch
                id="keyboard-navigation"
                checked={keyboardNavigation}
                onCheckedChange={setKeyboardNavigation}
              />
            </div>

            <Separator className="my-2" />

            <div className="space-y-2">
              <Label
                htmlFor="text-style"
                className="font-medium flex items-center gap-2"
              >
                <Type className="h-4 w-4 text-chart-1" />
                Font Style
              </Label>
              <Select defaultValue="system">
                <SelectTrigger id="text-style">
                  <SelectValue placeholder="Select font style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="system">System Default</SelectItem>
                  <SelectItem value="serif">
                    Serif (Easier for some readers)
                  </SelectItem>
                  <SelectItem value="dyslexic">OpenDyslexic</SelectItem>
                  <SelectItem value="mono">Monospace</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Additional Accessibility Resources
            </CardTitle>
            <CardDescription>
              Resources to help you get the most out of CampusConnect.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-md border p-4">
                <h3 className="text-sm font-medium">Accessibility Shortcuts</h3>
                <div className="mt-2 text-sm space-y-2">
                  <div className="flex justify-between">
                    <span>Toggle screen reader mode:</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">
                      Alt + S
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Increase text size:</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">
                      Alt + +
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Decrease text size:</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">
                      Alt + -
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span>Toggle high contrast:</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">
                      Alt + H
                    </kbd>
                  </div>
                </div>
              </div>

              <Button variant="outline" className="w-full">
                View Complete Accessibility Guide
              </Button>
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
