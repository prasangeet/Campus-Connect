"use client";

import React from "react";
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

function Breadcrumbs({ path }) {
  const segments = path
    .split("/")
    .filter(Boolean)
    .map((segment, index, array) => {
      const href = "/" + array.slice(0, index + 1).join("/");
      const label = segment
        .split("-")
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");
      
      return { label, href };
    });

  return (
    <nav aria-label="Breadcrumbs" className="flex items-center space-x-1 text-sm">
      <Button variant="ghost" size="sm" asChild className="h-auto p-0">
        <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors flex items-center">
          <Home className="h-4 w-4" />
        </Link>
      </Button>
      
      {segments.map((segment, index) => (
        <React.Fragment key={segment.href}>
          <ChevronRight className="h-4 w-4 text-muted-foreground" />
          
          {index === segments.length - 1 ? (
            <span className="font-medium text-foreground px-2">{segment.label}</span>
          ) : (
            <Button variant="ghost" size="sm" asChild className="h-auto p-0">
              <Link
                href={segment.href}
                className="px-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {segment.label}
              </Link>
            </Button>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}

export default Breadcrumbs;