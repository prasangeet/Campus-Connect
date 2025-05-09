"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AtSign, Lock, ArrowRight, Mail } from "lucide-react";
import { auth } from "@/utils/firebase";
import { checkVerification, login } from "@/services/userAPIs/apiService";
import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function Login() {
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // TODO: Implement actual authentication logic
      const result = await login(formData);
      console.log(result);

      if (result) {
        setTimeout(async () => {
          const verified = await checkVerification();
          if (verified) {
            router.push("/dashboard");
          } else {
            router.push("/verify-email");
          }
        }, 2000);
      }
    } catch (err) {
      setError("Invalid email or password");
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
            <h1 className="text-2xl font-bold mb-2">Welcome Back!</h1>
            <p className="text-muted-foreground">
              Sign in to your account to continue
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-medium" htmlFor="email">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  id="email"
                  type="email"
                  className="w-full pl-10 pr-4 py-2 bg-muted border border-input rounded-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                  placeholder="your_email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  required
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

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2">
                <input type="checkbox" className="rounded border-input" />
                <span>Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>

            <button
              type="submit"
              className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-muted-foreground">
            Don't have an account?{" "}
            <Link href="/register" className="text-primary hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
