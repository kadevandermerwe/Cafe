import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Utensils } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    // Create logo animation
    const logoAnimation = () => {
      gsap.fromTo(
        ".logo-text", 
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
      );
      
      gsap.fromTo(
        ".nav-item", 
        { opacity: 0, y: -10 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5, 
          stagger: 0.1,
          ease: "power2.out",
          delay: 0.3
        }
      );
    };
    
    logoAnimation();
    
    // Handle scroll behavior
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

  // Menu overlay transition variants
  const menuVariants = {
    closed: {
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.4,
        ease: [0.33, 1, 0.68, 1],
      }
    },
    open: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.5,
        ease: [0.33, 1, 0.68, 1],
      }
    }
  };
  
  // Menu items staggered animation
  const menuItemVariants = {
    closed: {
      opacity: 0,
      y: -15,
      transition: {
        duration: 0.2,
      }
    },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      }
    })
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-500 ${
      scrolled 
        ? "py-2 backdrop-blur-md bg-background/95 shadow-lg border-b border-white/10 text-foreground" 
        : "py-4 bg-black/30 backdrop-blur-sm text-white"
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-white overflow-hidden shadow-md transition-all duration-300 group-hover:shadow-lg">
                <Utensils className="w-5 h-5 transition-all duration-500 group-hover:rotate-12" />
              </div>
              <div className="logo-text">
                <span className="handwritten text-2xl text-primary">Rustic</span>
                <span className="elegant text-xl tracking-widest ml-1 text-accent text-shadow-strong">TABLE</span>
              </div>
            </div>
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className={`nav-item nav-link text-sm uppercase tracking-wider font-medium ${scrolled ? 'text-foreground' : 'text-white shadow-sm'} ${isActive("/")}`}>
              Home
            </Link>
            <Link href="/menu" className={`nav-item nav-link text-sm uppercase tracking-wider font-medium ${scrolled ? 'text-foreground' : 'text-white shadow-sm'} ${isActive("/menu")}`}>
              Menu
            </Link>
            <Link href="/about" className={`nav-item nav-link text-sm uppercase tracking-wider font-medium ${scrolled ? 'text-foreground' : 'text-white shadow-sm'} ${isActive("/about")}`}>
              About
            </Link>
            <Link href="/contact" className={`nav-item nav-link text-sm uppercase tracking-wider font-medium ${scrolled ? 'text-foreground' : 'text-white shadow-sm'} ${isActive("/contact")}`}>
              Contact
            </Link>
            <a 
              href="#book" 
              className="nav-item button-primary group relative overflow-hidden"
            >
              <span className="relative z-10">Book a Table</span>
              <span className="absolute inset-0 translate-y-full bg-accent transition-transform duration-300 group-hover:translate-y-0"></span>
            </a>
          </div>
          
          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              className="w-10 h-10 flex items-center justify-center rounded-full bg-muted focus:outline-none transition-colors duration-300"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 45, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <X className="w-5 h-5 text-primary" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="open"
                    initial={{ rotate: 45, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -45, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <Menu className="w-5 h-5 text-foreground" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </nav>
        
        {/* Mobile Navigation */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
              className="md:hidden overflow-hidden"
            >
              <div className="pt-6 pb-6 space-y-3">
                {[
                  { text: "Home", href: "/" },
                  { text: "Menu", href: "/menu" },
                  { text: "About", href: "/about" },
                  { text: "Contact", href: "/contact" },
                ].map((item, i) => (
                  <motion.div 
                    key={item.text}
                    custom={i}
                    variants={menuItemVariants}
                    initial="closed"
                    animate="open"
                    exit="closed"
                  >
                    <Link 
                      href={item.href} 
                      className={`block py-3 px-4 rounded-lg text-center ${
                        location === item.href
                          ? "bg-primary text-white font-medium"
                          : "bg-muted hover:bg-primary/10 transition-colors duration-300"
                      }`}
                    >
                      {item.text}
                    </Link>
                  </motion.div>
                ))}
                <motion.div
                  custom={4}
                  variants={menuItemVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                >
                  <a 
                    href="#book" 
                    className="block py-3 px-4 rounded-lg text-center bg-primary text-white shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    Book a Table
                  </a>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}
