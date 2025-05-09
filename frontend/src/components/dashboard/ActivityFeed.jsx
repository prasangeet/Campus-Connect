"use client";

import React from "react";
import { 
  MessageSquare, 
  Calendar, 
  Users, 
  BookOpen, 
  ThumbsUp,
  FileText
} from "lucide-react";

const activities = [
  {
    id: 1,
    type: "comment",
    icon: <MessageSquare className="h-4 w-4" />,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
    content: "You received a reply on your discussion post",
    detail: "Assignment 3 Clarification - CS 101",
    time: "10 minutes ago"
  },
  {
    id: 2,
    type: "event",
    icon: <Calendar className="h-4 w-4" />,
    iconBg: "bg-chart-2/20",
    iconColor: "text-chart-2",
    content: "New campus event was added",
    detail: "Tech Career Fair - Memorial Union",
    time: "1 hour ago"
  },
  {
    id: 3,
    type: "group",
    icon: <Users className="h-4 w-4" />,
    iconBg: "bg-chart-3/20",
    iconColor: "text-chart-3",
    content: "You were added to a new study group",
    detail: "Physics 201 Midterm Prep",
    time: "2 hours ago"
  },
  {
    id: 4,
    type: "document",
    icon: <FileText className="h-4 w-4" />,
    iconBg: "bg-chart-4/20",
    iconColor: "text-chart-4",
    content: "New course material uploaded",
    detail: "Lecture slides for CHEM 302",
    time: "Yesterday"
  },
  {
    id: 5,
    type: "like",
    icon: <ThumbsUp className="h-4 w-4" />,
    iconBg: "bg-chart-5/20",
    iconColor: "text-chart-5",
    content: "Your post received 5 likes",
    detail: "Campus Photography Club",
    time: "Yesterday"
  },
  {
    id: 6,
    type: "resource",
    icon: <BookOpen className="h-4 w-4" />,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
    content: "Recommended reading added to your course",
    detail: "ENG 205 - American Literature",
    time: "2 days ago"
  }
];

function ActivityFeed() {
  return (
    <div className="space-y-1">
      {activities.map((activity) => (
        <div 
          key={activity.id}
          className="flex items-start gap-3 p-3 rounded-md hover:bg-muted/50 transition-colors"
        >
          <div className={`${activity.iconBg} ${activity.iconColor} p-2 rounded-full mt-0.5`}>
            {activity.icon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium">{activity.content}</p>
            <p className="text-xs text-muted-foreground">{activity.detail}</p>
            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ActivityFeed;