import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    // Close mobile menu when route changes
    setIsMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => {
    return location === path ? "active" : "";
  };

  return (
    <header className={`fixed w-full bg-[#F7F3E8] z-50 transition-all duration-300 ${scrolled ? "shadow-md bg-opacity-95" : ""}`}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link href="/" className="text-2xl handwritten text-[#C97C5D]">
            Rustic Table
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className={`nav-link font-medium ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/menu" className={`nav-link font-medium ${isActive("/menu")}`}>
              Menu
            </Link>
            <Link href="/about" className={`nav-link font-medium ${isActive("/about")}`}>
              About
            </Link>
            <Link href="/contact" className={`nav-link font-medium ${isActive("/contact")}`}>
              Contact
            </Link>
            <a 
              href="#book" 
              className="bg-[#C97C5D] hover:bg-[#722F37] text-white px-5 py-2 rounded-lg transition-all duration-300"
            >
              Book a Table
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-[#333333] focus:outline-none"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="md:hidden mt-4 pb-4"
            >
              <div className="flex flex-col space-y-3">
                <Link 
                  href="/" 
                  className="py-2 px-4 rounded hover:bg-[#C97C5D] hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
                <Link 
                  href="/menu" 
                  className="py-2 px-4 rounded hover:bg-[#C97C5D] hover:text-white transition-all duration-300"
                >
                  Menu
                </Link>
                <Link 
                  href="/about" 
                  className="py-2 px-4 rounded hover:bg-[#C97C5D] hover:text-white transition-all duration-300"
                >
                  About
                </Link>
                <Link 
                  href="/contact" 
                  className="py-2 px-4 rounded hover:bg-[#C97C5D] hover:text-white transition-all duration-300"
                >
                  Contact
                </Link>
                <a 
                  href="#book" 
                  className="bg-[#C97C5D] text-white py-2 px-4 rounded-lg text-center"
                >
                  Book a Table
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>
    </header>
  );
}
