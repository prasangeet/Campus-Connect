import Link from 'next/link';
import { Twitter, Instagram, Facebook, Github } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-card text-card-foreground pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold">CC</span>
              </div>
              <span className="font-bold text-xl">CampusConnect</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Bringing your campus community together through meaningful connections and collaboration.
            </p>
            <div className="flex space-x-4">
              <SocialLink href="https://twitter.com" icon={<Twitter size={18} />} />
              <SocialLink href="https://instagram.com" icon={<Instagram size={18} />} />
              <SocialLink href="https://facebook.com" icon={<Facebook size={18} />} />
              <SocialLink href="https://github.com" icon={<Github size={18} />} />
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Features</h3>
            <ul className="space-y-2">
              <FooterLink href="/features/discussions">Campus Discussions</FooterLink>
              <FooterLink href="/features/groups">Study Groups</FooterLink>
              <FooterLink href="/features/events">Event Planning</FooterLink>
              <FooterLink href="/features/resources">Academic Resources</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              <FooterLink href="/about">About Us</FooterLink>
              <FooterLink href="/careers">Careers</FooterLink>
              <FooterLink href="/blog">Blog</FooterLink>
              <FooterLink href="/contact">Contact</FooterLink>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <FooterLink href="/terms">Terms of Service</FooterLink>
              <FooterLink href="/privacy">Privacy Policy</FooterLink>
              <FooterLink href="/cookies">Cookie Policy</FooterLink>
              <FooterLink href="/data">Data Processing</FooterLink>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-border pt-8 text-center text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} CampusConnect. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, icon }) {
  return (
    <Link 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="w-8 h-8 rounded-full bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
    >
      {icon}
    </Link>
  );
}

function FooterLink({ href, children }) {
  return (
    <li>
      <Link 
        href={href}
        className="text-muted-foreground hover:text-foreground transition-colors"
      >
        {children}
      </Link>
    </li>
  );
}