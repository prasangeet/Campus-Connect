"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, MessageSquare, Calendar, BookOpen } from "lucide-react";

const stats = [
  {
    label: "Active Courses",
    value: "5",
    icon: <BookOpen className="h-5 w-5" />,
    iconBg: "bg-chart-1/20",
    iconColor: "text-chart-1",
    delay: 0
  },
  {
    label: "Study Groups",
    value: "3",
    icon: <Users className="h-5 w-5" />,
    iconBg: "bg-chart-2/20",
    iconColor: "text-chart-2",
    delay: 0.1
  },
  {
    label: "Discussions",
    value: "12",
    icon: <MessageSquare className="h-5 w-5" />,
    iconBg: "bg-chart-3/20",
    iconColor: "text-chart-3",
    delay: 0.2
  },
  {
    label: "Upcoming Events",
    value: "7",
    icon: <Calendar className="h-5 w-5" />,
    iconBg: "bg-chart-4/20",
    iconColor: "text-chart-4",
    delay: 0.3
  }
];

function StatsRow() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <motion.div
          key={index}
          className="bg-card rounded-xl border p-5 flex items-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: stat.delay }}
        >
          <div className={`${stat.iconBg} p-3 rounded-lg ${stat.iconColor} mr-4`}>
            {stat.icon}
          </div>
          <div>
            <p className="text-muted-foreground text-sm">{stat.label}</p>
            <p className="text-2xl font-bold">{stat.value}</p>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default StatsRow;