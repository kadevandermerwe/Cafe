import { ReactNode, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

interface LayoutProps {
  children: ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  useEffect(() => {
    // Applying a class to body for global styling
    document.body.classList.add('rustic-table-theme');
    
    return () => {
      document.body.classList.remove('rustic-table-theme');
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground relative">
      {/* Small decorative elements scattered throughout the page */}
      <div className="hidden md:block fixed top-[15%] right-[5%] w-12 h-12 rounded-full bg-primary opacity-10 animate-float" style={{ animationDelay: '0.5s' }}></div>
      <div className="hidden md:block fixed bottom-[20%] left-[8%] w-8 h-8 rounded-full bg-secondary opacity-10 animate-float" style={{ animationDelay: '1.2s' }}></div>
      <div className="hidden md:block fixed top-[40%] left-[3%] w-6 h-6 rounded-full bg-accent opacity-10 animate-pulse-slow"></div>
      
      {/* Subtle texture overlay */}
      <div className="fixed inset-0 bg-paper opacity-30 pointer-events-none z-[-1]"></div>
      
      <Navbar />
      <main className="flex-grow relative z-10 pt-16">
        {children}
      </main>
      <Footer />
    </div>
  );
}
