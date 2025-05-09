"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function TermsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-block mb-8">
          <Button variant="ghost" className="gap-2">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
        </Link>

        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Terms of Service</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing and using CampusConnect, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. User Eligibility</h2>
              <p className="text-muted-foreground mb-4">
                You must be a current student, faculty member, or staff of an accredited educational institution to use CampusConnect. You must be at least 13 years old to use this service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. User Account</h2>
              <p className="text-muted-foreground mb-4">
                You are responsible for maintaining the confidentiality of your account and password. You agree to accept responsibility for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Acceptable Use</h2>
              <p className="text-muted-foreground mb-4">
                You agree not to use CampusConnect for any unlawful purpose or in any way that could damage, disable, overburden, or impair the service.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>No harassment or bullying of other users</li>
                <li>No posting of inappropriate or offensive content</li>
                <li>No spamming or distribution of malware</li>
                <li>No impersonation of others</li>
                <li>No violation of intellectual property rights</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Content</h2>
              <p className="text-muted-foreground mb-4">
                You retain all rights to the content you post on CampusConnect. By posting content, you grant CampusConnect a non-exclusive license to use, modify, and display the content in connection with the service.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Privacy</h2>
              <p className="text-muted-foreground mb-4">
                Your use of CampusConnect is also governed by our Privacy Policy. Please review our Privacy Policy to understand our practices.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Termination</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to terminate or suspend your account and access to CampusConnect at our sole discretion, without notice, for conduct that we believe violates these Terms of Service or is harmful to other users, us, or third parties, or for any other reason.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="text-muted-foreground mb-4">
                We reserve the right to modify or replace these Terms at any time. We will provide notice of any changes by posting the new Terms on the platform. Your continued use of CampusConnect after any such changes constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Contact Information</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: support@campusconnect.com<br />
                Address: 123 University Ave, College Town, ST 12345
              </p>
            </section>
          </div>

          <div className="mt-12 pt-8 border-t">
            <p className="text-sm text-muted-foreground">
              Last updated: March 21, 2024
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TermsPage;