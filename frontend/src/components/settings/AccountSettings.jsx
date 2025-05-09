"use client";

import React, { useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AtSign, Meta, Github, Loader2, Mail, Trash2, X, Facebook } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const emailFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
});

const passwordFormSchema = z.object({
  currentPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  newPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AccountSettings() {
  const [isEmailSubmitting, setIsEmailSubmitting] = useState(false);
  const [isPasswordSubmitting, setIsPasswordSubmitting] = useState(false);
  
  const emailForm = useForm({
    resolver: zodResolver(emailFormSchema),
    defaultValues: {
      email: "johndoe@university.edu",
    },
  });

  const passwordForm = useForm({
    resolver: zodResolver(passwordFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onEmailSubmit = async (data) => {
    setIsEmailSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    toast({
      title: "Email updated",
      description: "Your email has been updated successfully.",
    });
    setIsEmailSubmitting(false);
  };

  const onPasswordSubmit = async (data) => {
    setIsPasswordSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Show success toast
    toast({
      title: "Password updated",
      description: "Your password has been updated successfully.",
    });
    setIsPasswordSubmitting(false);
    passwordForm.reset();
  };

  const connectedAccounts = [
    { 
      provider: "Google", 
      connected: true, 
      email: "johndoe@gmail.com", 
      icon: <Facebook className="h-4 w-4" /> 
    },
    { 
      provider: "Facebook", 
      connected: false, 
      email: null, 
      icon: <Facebook className="h-4 w-4" /> 
    },
    { 
      provider: "Github", 
      connected: true, 
      email: "johndoe@github.com", 
      icon: <Github className="h-4 w-4" /> 
    },
  ];

  return (
    <div className="divide-y divide-border animate-in fade-in duration-300">
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-lg font-medium">Account Settings</h3>
          <p className="text-sm text-muted-foreground">
            Update your account details and manage connected accounts.
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Email Address</CardTitle>
            <CardDescription>
              Change your primary email address. This is where you'll receive important account notifications.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...emailForm}>
              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)}>
                <div className="grid gap-4 md:grid-cols-[1fr_auto]">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="relative">
                            <AtSign className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                            <Input
                              placeholder="email@example.com"
                              className="pl-10"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" disabled={isEmailSubmitting}>
                    {isEmailSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Saving
                      </>
                    ) : (
                      "Update Email"
                    )}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Password</CardTitle>
            <CardDescription>
              Change your password. We recommend using a strong, unique password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...passwordForm}>
              <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="space-y-4">
                <FormField
                  control={passwordForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={passwordForm.control}
                    name="newPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={passwordForm.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Confirm New Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <Button type="submit" className="mt-2" disabled={isPasswordSubmitting}>
                  {isPasswordSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Updating
                    </>
                  ) : (
                    "Change Password"
                  )}
                </Button>
              </form>
            </Form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">Connected Accounts</CardTitle>
            <CardDescription>
              Connect your CampusConnect account with these services for easier sign-in and enhanced features.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {connectedAccounts.map((account) => (
                <div 
                  key={account.provider} 
                  className="flex items-center justify-between p-3 border rounded-md hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                      {account.icon}
                    </div>
                    <div>
                      <div className="font-medium flex items-center">
                        {account.provider}
                        {account.connected && (
                          <Badge variant="outline" className="ml-2 text-xs">
                            Connected
                          </Badge>
                        )}
                      </div>
                      {account.email && (
                        <div className="text-xs text-muted-foreground">
                          {account.email}
                        </div>
                      )}
                    </div>
                  </div>
                  {account.connected ? (
                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
                          <X className="h-4 w-4" />
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>Disconnect Account</AlertDialogTitle>
                          <AlertDialogDescription>
                            Are you sure you want to disconnect your {account.provider} account? 
                            This will revoke access to any features that rely on this connection.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            Disconnect
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  ) : (
                    <Button size="sm" variant="outline">
                      Connect
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Permanently delete your account and all associated data.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  Delete Account
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                    Delete Account
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}