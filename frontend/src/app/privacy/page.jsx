"use client";

import React from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

function PrivacyPage() {
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
          <h1 className="text-4xl font-bold mb-8">Privacy Policy</h1>

          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="text-muted-foreground mb-4">
                CampusConnect is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Information We Collect</h2>
              <h3 className="text-xl font-medium mb-3">2.1 Personal Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Name and email address</li>
                <li>Student/Faculty ID number</li>
                <li>Profile information</li>
                <li>Educational institution details</li>
                <li>Profile picture (optional)</li>
              </ul>

              <h3 className="text-xl font-medium mb-3">2.2 Usage Information</h3>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Log data and device information</li>
                <li>Usage patterns and preferences</li>
                <li>Communication history</li>
                <li>Content you post or share</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">We use the collected information for:</p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Providing and maintaining the platform</li>
                <li>Personalizing your experience</li>
                <li>Communication about your account</li>
                <li>Platform security and fraud prevention</li>
                <li>Analytics and platform improvement</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Information Sharing</h2>
              <p className="text-muted-foreground mb-4">
                We do not sell your personal information. We may share your information with:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Other users (based on your privacy settings)</li>
                <li>Service providers and partners</li>
                <li>Law enforcement (when required by law)</li>
                <li>Educational institutions (for verification purposes)</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate security measures to protect your information, including:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Encryption of data in transit and at rest</li>
                <li>Regular security assessments</li>
                <li>Access controls and authentication</li>
                <li>Secure data storage practices</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Your Rights</h2>
              <p className="text-muted-foreground mb-4">
                You have the right to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4">
                <li>Access your personal information</li>
                <li>Correct inaccurate information</li>
                <li>Request deletion of your information</li>
                <li>Object to processing of your information</li>
                <li>Export your data</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Cookies and Tracking</h2>
              <p className="text-muted-foreground mb-4">
                We use cookies and similar tracking technologies to improve your experience and collect usage information. You can control cookie settings through your browser preferences.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Children's Privacy</h2>
              <p className="text-muted-foreground mb-4">
                CampusConnect is not intended for users under 13 years of age. We do not knowingly collect information from children under 13.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Changes to Privacy Policy</h2>
              <p className="text-muted-foreground mb-4">
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last updated" date.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have questions or concerns about this Privacy Policy, please contact us at:
              </p>
              <p className="text-muted-foreground">
                Email: privacy@campusconnect.com<br />
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

export default PrivacyPage;