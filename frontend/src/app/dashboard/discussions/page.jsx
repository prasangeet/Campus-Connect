"use client";

import React, { useState } from "react";
import { 
  MessageSquare, 
  User, 
  Search,
  Filter,
  ChevronDown,
  MessageCircle,
  Plus,
  ThumbsUp,
  Clock,
  BookOpen
} from "lucide-react";
import { motion } from "framer-motion";

// Sample discussions data
const discussionsData = [
  {
    id: 1,
    title: "Assignment 3 Clarification",
    content: "Can someone explain the requirements for question 4? I'm not sure what the professor is asking for.",
    author: "Maria Chen",
    authorRole: "Student",
    course: "CS 101",
    category: "Assignment",
    color: "bg-chart-1/20 text-chart-1",
    replies: 21,
    likes: 8,
    timestamp: "2 hours ago",
    tags: ["help", "assignment", "urgent"]
  },
  {
    id: 2,
    title: "Study Group for Midterm",
    content: "Looking for people to form a study group for the upcoming calculus midterm. Planning to meet at the library.",
    author: "Jamal Washington",
    authorRole: "Student",
    course: "MATH 201",
    category: "Study Group",
    color: "bg-chart-2/20 text-chart-2",
    replies: 15,
    likes: 12,
    timestamp: "5 hours ago",
    tags: ["study group", "midterm", "calculus"]
  },
  {
    id: 3,
    title: "Extra Credit Opportunity",
    content: "I'm offering an extra credit assignment for those who attend the department seminar this Friday. Details in the post.",
    author: "Dr. Sarah Williams",
    authorRole: "Professor",
    course: "BIO 302",
    category: "Announcement",
    color: "bg-chart-3/20 text-chart-3",
    replies: 32,
    likes: 45,
    timestamp: "1 day ago",
    tags: ["extra credit", "announcement"]
  },
  {
    id: 4,
    title: "Summer Internship Opportunities",
    content: "The career center has just posted several summer internship opportunities for CS students. Check them out!",
    author: "Career Services",
    authorRole: "Staff",
    course: "General",
    category: "Career",
    color: "bg-chart-4/20 text-chart-4",
    replies: 13,
    likes: 27,
    timestamp: "2 days ago",
    tags: ["internship", "career", "summer"]
  },
  {
    id: 5,
    title: "Research Assistant Position",
    content: "I'm looking for a research assistant for my project on machine learning applications in healthcare. Undergrads welcome to apply.",
    author: "Prof. Michael Lee",
    authorRole: "Professor",
    course: "CS 440",
    category: "Opportunity",
    color: "bg-chart-5/20 text-chart-5",
    replies: 9,
    likes: 18,
    timestamp: "3 days ago",
    tags: ["research", "opportunity", "ML"]
  },
  {
    id: 6,
    title: "Textbook PDF Needed",
    content: "Does anyone have a PDF of the Advanced Economics textbook by Johnson? The bookstore is sold out.",
    author: "Alex Rodriguez",
    authorRole: "Student",
    course: "ECON 305",
    category: "Resource",
    color: "bg-chart-1/20 text-chart-1",
    replies: 7,
    likes: 5,
    timestamp: "4 days ago",
    tags: ["textbook", "resource", "help"]
  }
];

// Category options
const categories = [
  { value: "all", label: "All Categories" },
  { value: "assignment", label: "Assignment" },
  { value: "study group", label: "Study Group" },
  { value: "announcement", label: "Announcement" },
  { value: "career", label: "Career" },
  { value: "opportunity", label: "Opportunity" },
  { value: "resource", label: "Resource" }
];

function DiscussionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filterMenuOpen, setFilterMenuOpen] = useState(false);
  
  // Filter discussions based on search and category
  const filteredDiscussions = discussionsData.filter(discussion => {
    const matchesSearch = discussion.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          discussion.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || 
                            discussion.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="py-6 px-6 max-w-full">
      <div className="mb-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Campus Discussions</h1>
          <p className="text-muted-foreground">Join conversations and connect with your campus community</p>
        </div>
        
        <button className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2 self-start md:self-center">
          <Plus className="h-4 w-4" />
          New Discussion
        </button>
      </div>
      
      {/* Search and Filter */}
      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Search discussions..."
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
      
      {/* Discussions List */}
      {filteredDiscussions.length > 0 ? (
        <div className="space-y-4">
          {filteredDiscussions.map((discussion, index) => (
            <motion.div
              key={discussion.id}
              className="bg-card rounded-xl border shadow-sm overflow-hidden hover:shadow-md transition-shadow"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <div className="p-5">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                  <div className="flex items-center gap-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${discussion.color}`}>
                      {discussion.course}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs bg-muted`}>
                      {discussion.category}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    <span>{discussion.timestamp}</span>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg mb-2">{discussion.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{discussion.content}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {discussion.tags.map((tag) => (
                    <span key={tag} className="text-xs bg-secondary px-2 py-1 rounded-full">
                      #{tag}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center overflow-hidden">
                      <User className="h-3 w-3 text-primary" />
                    </div>
                    <span className="text-sm font-medium">{discussion.author}</span>
                    <span className="text-xs bg-muted px-2 py-0.5 rounded-full">
                      {discussion.authorRole}
                    </span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <ThumbsUp className="h-4 w-4" />
                      <span>{discussion.likes}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <MessageCircle className="h-4 w-4" />
                      <span>{discussion.replies}</span>
                    </div>
                    <button className="bg-secondary text-secondary-foreground hover:bg-secondary/80 px-3 py-1 text-sm rounded-md transition-colors flex items-center gap-1">
                      <MessageSquare className="h-3.5 w-3.5" />
                      Reply
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="bg-muted/50 rounded-lg p-8 text-center">
          <h3 className="text-lg font-medium mb-2">No discussions found</h3>
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

export default DiscussionsPage;