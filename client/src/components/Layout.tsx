import { ReactNode, useEffect } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Initialize page transition animations
    gsap.set('.page-transition', { scaleY: 0, transformOrigin: 'bottom' });
    
    const enterPage = () => {
      gsap.to('.page-content', { 
        opacity: 1, 
        y: 0, 
        duration: 0.8, 
        ease: "power2.out",
        clearProps: "all",
        stagger: 0.05
      });
    };
    
    // Trigger animations when page loads
    enterPage();
    
    // Cleanup
    return () => {
      gsap.killTweensOf('.page-content');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* Page transition overlay */}
      <div className="page-transition fixed inset-0 bg-accent z-[9999] pointer-events-none"></div>
      
      {/* Small decorative elements scattered throughout the page */}
      <div className="hidden md:block fixed top-[15%] right-[5%] w-12 h-12 rounded-full bg-primary opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="hidden md:block fixed bottom-[20%] left-[8%] w-8 h-8 rounded-full bg-secondary opacity-10 animate-float" style={{ animationDelay: '1.2s' }}></div>
      <div className="hidden md:block fixed top-[40%] left-[3%] w-6 h-6 rounded-full bg-accent opacity-10 animate-pulse-slow"></div>
      
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 bg-paper opacity-30 pointer-events-none"></div>
      
      <Navbar />
      <main className="flex-grow relative">
        <div className="page-content opacity-0 translate-y-4">
          {children}
        </div>
      </main>
      <Footer />
    </div>
  );
}
