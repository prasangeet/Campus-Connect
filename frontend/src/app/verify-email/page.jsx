"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Mail, RefreshCw, CheckCircle, ArrowRight } from "lucide-react";
import { checkVerification, logout } from "@/services/userAPIs/apiService";
import { useRouter } from "next/navigation";

export default function VerifyEmail() {
  const router = useRouter();
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const result = await checkVerification();
        if (result) {
          setIsVerified(true);
        } else {
          setIsVerified(false);
        }
      } catch (err) {
        console.error("Error checking email verification:", err);
      }
    };
    checkEmailVerification();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const handleVerification = async () => {
    setIsVerifying(true);
    setError("");

    try {
      // TODO: Implement actual email verification logic with Firebase
      // await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
      const result = await checkVerification();
      if (!result) {
        setError("Email not verified. Please check your inbox.");
        return;
      }
      setIsVerified(true);
    } catch (err) {
      setError("Failed to verify email. Please try again.");
    } finally {
      setIsVerifying(false);
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

            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail className="h-8 w-8 text-primary" />
            </div>

            <h1 className="text-2xl font-bold mb-2">Verify Your Email</h1>
            <p className="text-muted-foreground">
              We've sent a verification link to your email address. Please
              verify your account to continue.
            </p>
          </div>

          {error && (
            <div className="bg-destructive/10 text-destructive text-sm p-3 rounded-md mb-6">
              {error}
            </div>
          )}

          {isVerified ? (
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Email Verified!</h2>
              <p className="text-muted-foreground mb-6">
                Your email has been successfully verified.
              </p>
              <Link
                href="/dashboard"
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors flex items-center justify-center gap-2 group"
              >
                Continue to Dashboard
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              <button
                onClick={handleVerification}
                disabled={isVerifying}
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-2 rounded-md transition-colors flex items-center justify-center gap-2 group disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isVerifying ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Verifying...
                  </>
                ) : (
                  <>
                    Check Verification
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>

              <div className="text-center text-sm text-muted-foreground">
                <p className="mb-2">Didn't receive the email?</p>
                <button
                  onClick={handleVerification}
                  disabled={isVerifying}
                  className="text-primary hover:underline disabled:opacity-50 disabled:no-underline disabled:cursor-not-allowed"
                >
                  Click here to resend
                </button>
              </div>
            </div>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            <Link
              onClick={handleLogout}
              href={""}
              className="text-primary hover:underline"
            >
              Back to Login
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}
