"use client";

import React, { useState } from "react";
import { 
  Calendar, 
  Filter, 
  Search, 
  MapPin, 
  Clock, 
  Users, 
  ChevronDown,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";

// Sample events data
const eventsData = [
  {
    id: 1,
    title: "Tech Career Fair",
    description: "Connect with top tech companies hiring for internships and full-time positions.",
    date: "Oct 15, 2023",
    time: "10:00 AM - 4:00 PM",
    location: "Memorial Union",
    category: "Career",
    color: "bg-chart-1/20 text-chart-1",
    attendees: 156
  },
  {
    id: 2,
    title: "Biology Department Seminar",
    description: "Guest lecture on recent advancements in genomic research by Dr. Jane Smith.",
    date: "Oct 17, 2023",
    time: "2:00 PM - 3:30 PM",
    location: "Science Building, Room 302",
    category: "Academic",
    color: "bg-chart-2/20 text-chart-2",
    attendees: 42
  },
  {
    id: 3,
    title: "International Student Mixer",
    description: "Social event for international and domestic students to meet and connect.",
    date: "Oct 19, 2023",
    time: "6:00 PM - 8:00 PM",
    location: "Student Center",
    category: "Social",
    color: "bg-chart-3/20 text-chart-3",
    attendees: 89
  },
  {
    id: 4,
    title: "Basketball Game: University vs. State",
    description: "Come support our team in this important conference matchup!",
    date: "Oct 20, 2023",
    time: "7:00 PM - 9:00 PM",
    location: "University Arena",
    category: "Sports",
    color: "bg-chart-4/20 text-chart-4",
    attendees: 350
  },
  {
    id: 5,
    title: "Coding Workshop: Intro to React",
    description: "Learn the basics of React in this hands-on workshop. No prior experience required.",
    date: "Oct 22, 2023",
    time: "1:00 PM - 4:00 PM",
    location: "Engineering Building, Lab 101",
    category: "Workshop",
    color: "bg-chart-5/20 text-chart-5",
    attendees: 28
  },
  {
    id: 6,
    title: "Student Government Meeting",
    description: "Open meeting to discuss upcoming campus initiatives and student concerns.",
    date: "Oct 24, 2023",
    time: "5:00 PM - 6:30 PM",
    location: "Administration Building, Room 204",
    category: "Governance",
    color: "bg-chart-1/20 text-chart-1",
    attendees: 35
  }
];

// Category options
const categories = [
  { value: "all", label: "All Categories" },
  { value: "academic", label: "Academic" },
  { value: "career", label: "Career" },
  { value: "social", label: "Social" },
  { value: "sports", label: "Sports" },
  { value: "workshop", label: "Workshop" },
  { value: "governance", label: "Governance" }
];

function EventsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Filter events based on search and category
  const filteredEvents = eventsData.filter(event => {
    const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                            event.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6 px-6 max-w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Events</h1>
          <p className="text-muted-foreground">Discover and join events happening around campus</p>
        </div>
        
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2 self-start md:self-center">
          <Plus className="h-4 w-4" />
          Create Event
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-md bg-background"
          />
        </div>
        
        <div className="relative">
          <button
            onClick={() => setFilterMenuOpen(!filterMenuOpen)}
            className="bg-muted hover:bg-muted/80 px-4 py-2 rounded-md flex items-center gap-2 w-full sm:w-auto justify-between"
          >
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              <span>{categories.find(c => c.value === selectedCategory)?.label}</span>
            </div>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {filterMenuOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-card rounded-md shadow-lg border z-10">
              <ul className="py-1">
                {categories.map((category) => (
                  <li key={category.value}>
                    <button
                      onClick={() => {
                        setSelectedCategory(category.value);
                        setFilterMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-muted transition-colors ${
                        selectedCategory === category.value ? "bg-muted" : ""
                      }`}
                    >
                      {category.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      
      {/* Events Grid */}
      {filteredEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event, index) => (
            <motion.div
              key={event.id}
              className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className={`h-2 ${event.color.split(" ")[0]}`}></div>
              <div className="p-5">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <span className={`text-xs px-2 py-1 rounded-full ${event.color}`}>
                    {event.category}
                  </span>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4">{event.description}</p>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-2 text-sm">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span>{event.time}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span>{event.location}</span>
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>{event.attendees} attending</span>
                  </div>
                  
                  <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 text-sm rounded-md transition-colors">
                    RSVP
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No events found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search or filter criteria</p>
          <button 
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="text-primary hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}

export default EventsPage;