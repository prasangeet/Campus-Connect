"use client";

import React, { useState } from "react";
import toast from "react-hot-toast";
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
import { Input } from "@/components/ui/input";
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
  GraduationCap,
  Clock,
  BookOpen,
  Calendar,
  Users,
  ChevronRight,
  Plus,
  Trash2,
  X,
  Eye,
  EyeOff,
  Loader2,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";

export default function AcademicSettings() {
  const [isSaving, setIsSaving] = useState(false);

  const [studyPreference, setStudyPreference] = useState("quiet");
  const [shareCalendar, setShareCalendar] = useState(true);
  const [academicStatus, setAcademicStatus] = useState(true);
  const [autoJoinCourseGroups, setAutoJoinCourseGroups] = useState(true);
  const [learningStyle, setLearningStyle] = useState("visual");

  // Sample courses for the demo
  const [courses, setCourses] = useState([
    {
      id: 1,
      code: "CS 101",
      name: "Introduction to Computer Science",
      visible: true,
      color: "chart-1",
    },
    {
      id: 2,
      code: "MATH 201",
      name: "Calculus II",
      visible: true,
      color: "chart-2",
    },
    {
      id: 3,
      code: "ENG 105",
      name: "Academic Writing",
      visible: false,
      color: "chart-3",
    },
    {
      id: 4,
      code: "PHYS 211",
      name: "General Physics",
      visible: true,
      color: "chart-4",
    },
  ]);

  const toggleCourseVisibility = (courseId) => {
    setCourses(
      courses.map((course) =>
        course.id === courseId
          ? { ...course, visible: !course.visible }
          : course
      )
    );
  };

  const saveChanges = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Academic settings saved",
      description: "Your academic preferences have been updated successfully.",
    });

    setIsSaving(false);
  };

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Academic Settings</h3>
          <p className="text-sm text-muted-foreground">
            Manage your academic preferences and course settings.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Course Visibility</CardTitle>
            <CardDescription>
              Choose which courses are visible to other students on your
              profile.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {courses.map((course) => (
                <div
                  key={course.id}
                  className="flex items-center justify-between p-3 rounded-md hover:bg-muted/50 transition-colors border"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-2 h-8 rounded-sm bg-${course.color}`}
                    ></div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-medium">{course.code}</p>
                        <Badge variant="outline" className="text-xs">
                          Spring 2025
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {course.name}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleCourseVisibility(course.id)}
                    className={
                      course.visible ? "text-chart-2" : "text-muted-foreground"
                    }
                  >
                    {course.visible ? (
                      <Eye className="h-4 w-4" />
                    ) : (
                      <EyeOff className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Study Preferences</CardTitle>
            <CardDescription>
              Set your study preferences to help find compatible study partners.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="study-environment">
                Preferred Study Environment
              </Label>
              <Select
                value={studyPreference}
                onValueChange={setStudyPreference}
              >
                <SelectTrigger id="study-environment">
                  <SelectValue placeholder="Select environment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="quiet">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-chart-3" />
                      <span>Quiet (Library, Study Room)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="moderate">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-chart-4" />
                      <span>Moderate (Café, Lounge)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="collaborative">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-chart-5" />
                      <span>Collaborative (Group Spaces)</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="virtual">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-chart-1" />
                      <span>Virtual (Online)</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="learning-style">Primary Learning Style</Label>
              <Select value={learningStyle} onValueChange={setLearningStyle}>
                <SelectTrigger id="learning-style">
                  <SelectValue placeholder="Select learning style" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="visual">Visual</SelectItem>
                  <SelectItem value="auditory">Auditory</SelectItem>
                  <SelectItem value="reading">Reading/Writing</SelectItem>
                  <SelectItem value="kinesthetic">Kinesthetic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3">
              <Label>Study Schedule</Label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="morning" />
                  <Label htmlFor="morning" className="text-sm font-normal">
                    Morning
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="afternoon" defaultChecked />
                  <Label htmlFor="afternoon" className="text-sm font-normal">
                    Afternoon
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="evening" defaultChecked />
                  <Label htmlFor="evening" className="text-sm font-normal">
                    Evening
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekdays" defaultChecked />
                  <Label htmlFor="weekdays" className="text-sm font-normal">
                    Weekdays
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Checkbox id="weekends" />
                  <Label htmlFor="weekends" className="text-sm font-normal">
                    Weekends
                  </Label>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Academic Privacy</CardTitle>
            <CardDescription>
              Control what academic information is shared with others.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="share-calendar" className="font-medium">
                  Share Academic Calendar
                </Label>
                <p className="text-sm text-muted-foreground">
                  Allow friends to see your class schedule and study times.
                </p>
              </div>
              <Switch
                id="share-calendar"
                checked={shareCalendar}
                onCheckedChange={setShareCalendar}
              />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="academic-status" className="font-medium">
                  Show Academic Status
                </Label>
                <p className="text-sm text-muted-foreground">
                  Display your academic status (year, major) on your profile.
                </p>
              </div>
              <Switch
                id="academic-status"
                checked={academicStatus}
                onCheckedChange={setAcademicStatus}
              />
            </div>

            <Separator className="my-2" />

            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="auto-join-groups" className="font-medium">
                  Auto-join Course Groups
                </Label>
                <p className="text-sm text-muted-foreground">
                  Automatically join study groups for enrolled courses.
                </p>
              </div>
              <Switch
                id="auto-join-groups"
                checked={autoJoinCourseGroups}
                onCheckedChange={setAutoJoinCourseGroups}
              />
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
