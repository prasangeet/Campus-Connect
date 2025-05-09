"use client";

import React, { useState } from "react";
import { 
  Search,
  Send,
  Phone,
  Video,
  MoreHorizontal,
  Image,
  Paperclip,
  Smile
} from "lucide-react";
import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Sample conversations data
const conversations = [
  {
    id: 1,
    user: {
      name: "Sarah Williams",
      avatar: null,
      status: "online"
    },
    lastMessage: "Can you share the notes from today's lecture?",
    timestamp: "2 min ago",
    unread: 2
  },
  {
    id: 2,
    user: {
      name: "John Davis",
      avatar: null,
      status: "offline"
    },
    lastMessage: "The study group meeting is confirmed for tomorrow",
    timestamp: "1 hour ago",
    unread: 0
  },
  {
    id: 3,
    user: {
      name: "Emily Chen",
      avatar: null,
      status: "online"
    },
    lastMessage: "Thanks for helping with the project!",
    timestamp: "2 hours ago",
    unread: 0
  }
];

// Sample messages for a conversation
const messages = [
  {
    id: 1,
    sender: "Sarah Williams",
    content: "Hi! Do you have the notes from today's lecture?",
    timestamp: "10:30 AM",
    isSender: false
  },
  {
    id: 2,
    sender: "You",
    content: "Yes, I'll share them with you right away!",
    timestamp: "10:31 AM",
    isSender: true
  },
  {
    id: 3,
    sender: "Sarah Williams",
    content: "That would be great, thank you so much!",
    timestamp: "10:31 AM",
    isSender: false
  },
  {
    id: 4,
    sender: "You",
    content: "No problem! Here they are. Let me know if you need any clarification.",
    timestamp: "10:32 AM",
    isSender: true
  }
];

function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState(conversations[0]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    // Here you would typically send the message to your backend
    console.log("Sending message:", newMessage);
    setNewMessage("");
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations Sidebar */}
      <div className="w-80 border-r bg-card">
        <div className="p-4 border-b">
          <h2 className="font-semibold mb-4">Messages</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search conversations..."
              className="pl-10"
            />
          </div>
        </div>
        
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="p-2">
            {conversations.map((conversation) => (
              <motion.button
                key={conversation.id}
                className={`w-full p-3 rounded-lg mb-2 hover:bg-muted transition-colors ${
                  selectedConversation.id === conversation.id ? "bg-muted" : ""
                }`}
                onClick={() => setSelectedConversation(conversation)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback>{conversation.user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    {conversation.user.status === "online" && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></span>
                    )}
                  </div>
                  <div className="flex-1 text-left">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{conversation.user.name}</p>
                      <p className="text-xs text-muted-foreground">{conversation.timestamp}</p>
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{conversation.lastMessage}</p>
                  </div>
                  {conversation.unread > 0 && (
                    <span className="bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                      {conversation.unread}
                    </span>
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col bg-background">
        {selectedConversation ? (
          <>
            {/* Chat Header */}
            <div className="p-4 border-b flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{selectedConversation.user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{selectedConversation.user.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {selectedConversation.user.status === "online" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon">
                  <Phone className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Video className="h-4 w-4" />
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>View Profile</DropdownMenuItem>
                    <DropdownMenuItem>Clear Chat</DropdownMenuItem>
                    <DropdownMenuItem className="text-destructive">Block User</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>

            {/* Messages */}
            <ScrollArea className="flex-1 p-4">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isSender ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[70%] rounded-lg p-3 ${
                        message.isSender
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted"
                      }`}
                    >
                      <p>{message.content}</p>
                      <p className={`text-xs mt-1 ${
                        message.isSender ? "text-primary-foreground/80" : "text-muted-foreground"
                      }`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            {/* Message Input */}
            <div className="p-4 border-t bg-card">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button type="button" variant="ghost" size="icon">
                  <Paperclip className="h-4 w-4" />
                </Button>
                <Button type="button" variant="ghost" size="icon">
                  <Image className="h-4 w-4" />
                </Button>
                <Input
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  placeholder="Type a message..."
                  className="flex-1"
                />
                <Button type="submit" disabled={!newMessage.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <p className="text-muted-foreground">Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default MessagesPage;