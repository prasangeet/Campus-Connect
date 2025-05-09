'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { GraduationCap, MessageSquare, Users, Calendar, ArrowRight, ChevronDown } from 'lucide-react';
import Header from '@/components/welcomePage/Header';
import Footer from '@/components/welcomePage/Footer';
import FeatureCard from '@/components/welcomePage/FeatureCard';
import TestimonialCard from '@/components/welcomePage/TestimonialCard';

export default function Home() {
  const scrollToFeatures = () => {
    document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/30">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')] bg-cover bg-center opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold text-primary mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              Connect With Your Campus Community
            </motion.h1>
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-10 max-w-2xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              CampusConnect brings your college experience to life with a social platform designed exclusively for students and faculty to collaborate, communicate, and build meaningful connections.
            </motion.p>
            <motion.div 
              className="flex flex-col sm:flex-row gap-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link 
                href="/register" 
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-3 rounded-md font-medium transition-colors"
              >
                Get Started
              </Link>
              <button 
                onClick={scrollToFeatures}
                className="group bg-secondary text-secondary-foreground hover:bg-secondary/80 px-8 py-3 rounded-md font-medium transition-colors flex items-center justify-center gap-2"
              >
                Learn More
                <ChevronDown className="h-4 w-4 group-hover:translate-y-1 transition-transform" />
              </button>
            </motion.div>
          </div>
        </div>
        
        {/* Decorative Elements */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent"></div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Everything You Need to Stay Connected</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Discover how CampusConnect makes campus life more engaging, collaborative, and organized.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={<MessageSquare className="h-10 w-10 text-chart-1" />}
              title="Campus Discussions"
              description="Engage in meaningful conversations with students and faculty across various academic topics and interests."
              delay={0}
            />
            <FeatureCard 
              icon={<Users className="h-10 w-10 text-chart-2" />}
              title="Study Groups"
              description="Find and create study groups for specific courses, projects and exams to collaborate effectively."
              delay={0.1}
            />
            <FeatureCard 
              icon={<Calendar className="h-10 w-10 text-chart-3" />}
              title="Event Planning"
              description="Discover campus events or create your own, from club meetings to social gatherings and academic seminars."
              delay={0.2}
            />
            <FeatureCard 
              icon={<GraduationCap className="h-10 w-10 text-chart-4" />}
              title="Academic Resources"
              description="Share and access course materials, lecture notes, and academic resources with peers and classmates."
              delay={0.3}
            />
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Hear From Our Community</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">Students and faculty are already experiencing the benefits of a connected campus.</p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard 
              quote="CampusConnect has completely transformed how I interact with my classmates. Finding study partners has never been easier!"
              name="Alex Johnson"
              role="Computer Science Major"
              image="https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0}
            />
            <TestimonialCard 
              quote="As a professor, I love being able to share resources and engage with students outside the classroom. It's created a more collaborative learning environment."
              name="Dr. Sarah Williams"
              role="Biology Professor"
              image="https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.1}
            />
            <TestimonialCard 
              quote="The event planning feature has boosted attendance at our club meetings. It's so much easier to get the word out about what we're doing!"
              name="Miguel Rodriguez"
              role="Student Government"
              image="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              delay={0.2}
            />
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Join Your Campus Community?</h2>
            <p className="text-primary-foreground/80 mb-8 text-lg">Sign up today and start connecting with your peers, professors, and campus organizations.</p>
            <Link 
              href="/register" 
              className="inline-flex items-center bg-background text-foreground hover:bg-background/90 px-8 py-3 rounded-md font-medium transition-colors group"
            >
              Get Started Now
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}