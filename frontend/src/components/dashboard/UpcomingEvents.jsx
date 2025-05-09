"use client";

import React from "react";

const events = [
  {
    id: 1,
    title: "Tech Career Fair",
    date: "Oct 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Memorial Union",
    category: "Career",
    color: "bg-chart-1/20 text-chart-1"
  },
  {
    id: 2,
    title: "Biology Department Seminar",
    date: "Oct 17, 2023",
    time: "2:00 PM - 3:30 PM",
    location: "Science Building, Room 302",
    category: "Academic",
    color: "bg-chart-2/20 text-chart-2"
  },
  {
    id: 3,
    title: "International Student Mixer",
    date: "Oct 19, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Student Center",
    category: "Social",
    color: "bg-chart-3/20 text-chart-3"
  }
];

function UpcomingEvents() {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <div 
          key={event.id}
          className="border rounded-lg p-4 hover:border-primary/50 transition-colors cursor-pointer group"
        >
          <div className="flex justify-between items-start mb-2">
            <h4 className="font-medium group-hover:text-primary transition-colors">{event.title}</h4>
            <span className={`text-xs px-2 py-1 rounded-full ${event.color}`}>
              {event.category}
            </span>
          </div>
          <div className="space-y-1">
            <p className="text-sm flex items-center">
              <span className="inline-block w-16 text-muted-foreground">Date:</span>
              <span>{event.date}</span>
            </p>
            <p className="text-sm flex items-center">
              <span className="inline-block w-16 text-muted-foreground">Time:</span>
              <span>{event.time}</span>
            </p>
            <p className="text-sm flex items-center">
              <span className="inline-block w-16 text-muted-foreground">Location:</span>
              <span>{event.location}</span>
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UpcomingEvents;