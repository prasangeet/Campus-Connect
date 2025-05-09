"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { 
  MessageSquare, 
  Heart,
  Share,
  MoreHorizontal,
  Send,
  Image,
  Link as LinkIcon
} from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { format } from "date-fns";

// Sample posts data
const postsData = [
  {
    id: 1,
    author: {
      name: "Alex Johnson",
      avatar: null,
      username: "alexj"
    },
    content: "Just finished my research paper on quantum computing! 🎉 Looking forward to presenting it next week at the symposium. #ComputerScience #Research",
    timestamp: "2024-03-20T10:30:00Z",
    likes: 42,
    comments: 8,
    isLiked: false
  },
  {
    id: 2,
    author: {
      name: "Sarah Williams",
      avatar: null,
      username: "sarahw"
    },
    content: "Great discussion in today's environmental science class about sustainable practices on campus. We're working on some exciting initiatives! 🌱 #Sustainability #CampusLife",
    timestamp: "2024-03-20T09:15:00Z",
    likes: 35,
    comments: 12,
    isLiked: true
  },
  {
    id: 3,
    author: {
      name: "Mike Chen",
      avatar: null,
      username: "mikec"
    },
    content: "Our robotics team just qualified for the national competition! Months of hard work paying off. Thanks to everyone who supported us! 🤖 #Robotics #Engineering",
    timestamp: "2024-03-20T08:45:00Z",
    likes: 89,
    comments: 15,
    isLiked: false
  }
];

function PostsPage() {
  const [posts, setPosts] = useState(postsData);
  const [newPost, setNewPost] = useState("");

  const handleLike = (postId) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          likes: post.isLiked ? post.likes - 1 : post.likes + 1,
          isLiked: !post.isLiked
        };
      }
      return post;
    }));
  };

  const handleSubmitPost = (e) => {
    e.preventDefault();
    if (!newPost.trim()) return;

    const post = {
      id: Date.now(),
      author: {
        name: "Current User",
        avatar: null,
        username: "currentuser"
      },
      content: newPost,
      timestamp: new Date().toISOString(),
      likes: 0,
      comments: 0,
      isLiked: false
    };

    setPosts([post, ...posts]);
    setNewPost("");
  };

  return (
    <div className="py-6 px-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">Campus Feed</h1>
        <p className="text-muted-foreground">Share and connect with your campus community</p>
      </div>

      {/* Create Post */}
      <div className="bg-card rounded-xl border shadow-sm mb-6">
        <form onSubmit={handleSubmitPost} className="p-4">
          <Textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            placeholder="What's on your mind?"
            className="mb-4"
          />
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              <Button variant="outline" size="icon">
                <Image className="h-4 w-4" />
              </Button>
              <Button variant="outline" size="icon">
                <LinkIcon className="h-4 w-4" />
              </Button>
            </div>
            <Button type="submit" disabled={!newPost.trim()}>
              Post <Send className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </form>
      </div>

      {/* Posts Feed */}
      <div className="space-y-6">
        {posts.map((post, index) => (
          <motion.div
            key={post.id}
            className="bg-card rounded-xl border shadow-sm overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="p-4">
              {/* Post Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.author.name}</p>
                    <p className="text-sm text-muted-foreground">@{post.author.username}</p>
                  </div>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>Copy Link</DropdownMenuItem>
                    <DropdownMenuItem>Report Post</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Post Content */}
              <p className="text-foreground mb-4">{post.content}</p>

              {/* Post Footer */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center gap-6">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${post.isLiked ? "fill-destructive text-destructive" : ""}`}
                    />
                    <span>{post.likes}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    <span>{post.comments}</span>
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <Share className="h-4 w-4" />
                  </Button>
                </div>
                <span className="text-sm text-muted-foreground">
                  {format(new Date(post.timestamp), "MMM d, yyyy 'at' h:mm a")}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PostsPage;