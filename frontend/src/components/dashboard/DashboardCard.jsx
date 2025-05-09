"use client";

import React from "react";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

function DashboardCard({ title, icon, children, action, className = "" }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className={className}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-md font-medium flex items-center gap-2">
            {icon && <span>{icon}</span>}
            {title}
          </CardTitle>
          {action && (
            <Button 
              variant="ghost" 
              onClick={action.onClick}
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {action.label}
            </Button>
          )}
        </CardHeader>
        <CardContent>{children}</CardContent>
      </Card>
    </motion.div>
  );
}

export default DashboardCard;