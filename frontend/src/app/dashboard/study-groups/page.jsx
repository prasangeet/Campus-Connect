"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/services/userAPIs/apiService";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "@/utils/firebase.js";
import { 
  User,
  Mail, 
  PhoneCall, 
  MapPin, 
  Book, 
  Briefcase,
  Edit,
  CheckCircle,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    displayName: "",
    bio: "",
    major: "",
    year: "",
    interests: "",
    phoneNumber: "",
    location: ""
  });

  useEffect(() => {
    const getUser = async () => {
      try {
        const data = await getCurrentUser();
        setUser(data);
        
        // Initialize form data
        setFormData({
          displayName: data?.displayName || "",
          bio: data?.bio || "",
          major: data?.major || "",
          year: data?.year || "",
          interests: data?.interests || "",
          phoneNumber: data?.phoneNumber || "",
          location: data?.location || ""
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else if (!user?.emailVerified) {
        router.push("/verify-email");
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Mocked success for demo
      // In a real app, this would call an API to update the user profile
      
      // Update local user state with form data
      setUser((prev) => ({
        ...prev,
        ...formData
      }));
      
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="py-6 px-6 max-w-full">
      <div className="mb-6 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-foreground">Your Profile</h1>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center gap-2 ${
            isEditing
              ? "bg-destructive text-destructive-foreground hover:bg-destructive/90"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          } px-4 py-2 rounded-md transition-colors`}
        >
          {isEditing ? (
            <>Cancel <Edit className="h-4 w-4" /></>
          ) : (
            <>Edit Profile <Edit className="h-4 w-4" /></>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Profile Summary */}
        <div className="lg:col-span-1">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="bg-gradient-to-r from-chart-1/30 to-chart-2/30 h-32"></div>
            <div className="p-5 -mt-12 text-center">
              <div className="relative w-24 h-24 mx-auto bg-primary/10 rounded-full border-4 border-card flex items-center justify-center overflow-hidden">
                <User className="h-12 w-12 text-primary" />
              </div>
              <h2 className="mt-4 text-xl font-bold">{user?.displayName || "Student Name"}</h2>
              <p className="text-muted-foreground">{user?.email || "student@university.edu"}</p>
              
              <div className="mt-6 flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm">
                  <Book className="h-4 w-4 text-chart-1" />
                  <span>{user?.major || "Computer Science"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-chart-2" />
                  <span>{user?.year || "Junior Year"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-chart-3" />
                  <span>{user?.location || "University Residence Hall"}</span>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t">
                <h3 className="font-medium mb-3">Interests</h3>
                <div className="flex flex-wrap gap-2 justify-center">
                  {(user?.interests || "Programming, AI, Gaming, Music")
                    .split(",")
                    .map((interest, index) => (
                      <span
                        key={index}
                        className="bg-muted px-3 py-1 rounded-full text-xs"
                      >
                        {interest.trim()}
                      </span>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Details */}
        <div className="lg:col-span-2">
          <div className="bg-card rounded-xl border shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b">
              <h3 className="font-medium">
                {isEditing ? "Edit Profile Information" : "Profile Information"}
              </h3>
            </div>
            
            {isEditing ? (
              <form onSubmit={handleSubmit} className="p-5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      name="displayName"
                      value={formData.displayName}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="text"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your phone number"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Major</label>
                    <input
                      type="text"
                      name="major"
                      value={formData.major}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your major"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Year</label>
                    <select
                      name="year"
                      value={formData.year}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md bg-background"
                    >
                      <option value="">Select Year</option>
                      <option value="Freshman">Freshman</option>
                      <option value="Sophomore">Sophomore</option>
                      <option value="Junior">Junior</option>
                      <option value="Senior">Senior</option>
                      <option value="Graduate">Graduate</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Location</label>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your campus location"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Interests</label>
                    <input
                      type="text"
                      name="interests"
                      value={formData.interests}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Separate interests with commas"
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={formData.bio}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                    placeholder="Tell others about yourself"
                  ></textarea>
                </div>
                
                <div className="flex justify-end">
                  <button
                    type="submit"
                    className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded-md flex items-center gap-2"
                  >
                    Save Changes
                    <CheckCircle className="h-4 w-4" />
                  </button>
                </div>
              </form>
            ) : (
              <div className="p-5 space-y-6">
                {user?.bio && (
                  <div className="space-y-2 pb-6 border-b">
                    <h4 className="text-sm font-medium text-muted-foreground">About Me</h4>
                    <p className="text-sm">{user.bio}</p>
                  </div>
                )}
                
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-muted-foreground">Contact Information</h4>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4">
                    <div className="flex items-center gap-3">
                      <div className="bg-chart-1/10 p-2 rounded-md">
                        <Mail className="h-5 w-5 text-chart-1" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Email</p>
                        <p className="text-sm">{user?.email || "student@university.edu"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-chart-2/10 p-2 rounded-md">
                        <PhoneCall className="h-5 w-5 text-chart-2" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Phone</p>
                        <p className="text-sm">{user?.phoneNumber || "Not provided"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-chart-3/10 p-2 rounded-md">
                        <Briefcase className="h-5 w-5 text-chart-3" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Major</p>
                        <p className="text-sm">{user?.major || "Computer Science"}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <div className="bg-chart-4/10 p-2 rounded-md">
                        <MapPin className="h-5 w-5 text-chart-4" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">Location</p>
                        <p className="text-sm">{user?.location || "University Residence Hall"}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Activity Summary could go here */}
                <div className="mt-6 pt-6 border-t">
                  <h4 className="text-sm font-medium text-muted-foreground mb-4">Recent Activity</h4>
                  
                  <div className="space-y-3">
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm font-medium">Joined Study Group: Physics 201</p>
                      <p className="text-xs text-muted-foreground">2 days ago</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm font-medium">Created Discussion: Assignment Help</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                    
                    <div className="bg-muted/50 p-3 rounded-md">
                      <p className="text-sm font-medium">RSVP'd to Event: Campus Job Fair</p>
                      <p className="text-xs text-muted-foreground">1 week ago</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;