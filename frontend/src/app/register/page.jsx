"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AtSign, Lock, Mail, MapPin, User, ArrowRight } from "lucide-react";
import { auth } from "@/utils/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { register } from "@/services/userAPIs/apiService.js";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    bio: "",
    location: "",
  });
  const [error, setError] = useState("");

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user && user?.emailVerified) {
        router.push("/dashboard");
      } else if (user && !user?.emailVerified) {
        router.push("/verify-email");
      }
    });

    return () => unsubscribe();
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // TODO: Implement actual registration logic
      const result = await register(formData);
      console.log(result);

      if (result) {
        setTimeout(() => {
          router.push("/verify-email");
        }, 2000);
      }
    } catch (err) {
      setError("Registration failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30 flex items-center justify-center p-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="bg-card rounded-lg shadow-lg p-8 border border-border">
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center gap-2 mb-8">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">CC</span>
              </div>
              <span className="font-bold text-xl">CampusConnect</span>
            </Link>
            <h1 className="text-2xl font-bold mb-2">Create Your Account</h1>
            <p className="text-muted-foreground">
              Join your campus community today
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="username">
                Username
              </label>
              <div className="relative">
                <AtSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="username"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Choose a username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="you@university.edu"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="location">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="location"
                  type="text"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="Campus Location"
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="bio">
                Bio
              </label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <textarea
                  id="bio"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50 min-h-[100px]"
                  placeholder="Tell us about yourself..."
                  value={formData.bio}
                  onChange={(e) =>
                    setFormData({ ...formData, bio: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="password">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="password"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="confirmPassword"
                  type="password"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                className="rounded border-input"
                required
              />
              <span>
                I agree to the{" "}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </span>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors flex items-center justify-center gap-2 group"
            >
              Create Account
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link href="/login" className="text-primary hover:underline">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
