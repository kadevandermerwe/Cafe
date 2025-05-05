import { Link } from "wouter";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { motion } from "framer-motion";
import { Utensils, MapPin, Clock, Phone, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  // Social media link animation
  const socialVariants = {
    hover: {
      y: -5,
      transition: {
        duration: 0.3,
        type: "spring",
        stiffness: 300
      }
    }
  };
  
  // Quick link hover effect
  const linkVariants = {
    hover: {
      x: 6,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <footer className="relative pt-24 pb-12 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 right-0 h-12 bg-accent opacity-5"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-12 bg-primary opacity-20 rounded-b-full"></div>
      
      <div className="absolute inset-0 bg-accent -z-10 opacity-[0.03]"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* About Column */}
          <div className="relative">
            <div className="mb-6 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white">
                <Utensils className="w-4 h-4" />
              </div>
              <div>
                <span className="handwritten text-xl text-primary">Rustic</span>
                <span className="elegant text-lg tracking-widest text-accent ml-1">TABLE</span>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed max-w-xs">
              Crafting memorable dining experiences with seasonal ingredients and warm hospitality since 2010.
            </p>
            
            <div className="flex space-x-3">
              {[
                { icon: <FaFacebookF />, label: "Facebook" },
                { icon: <FaInstagram />, label: "Instagram" },
                { icon: <FaTwitter />, label: "Twitter" }
              ].map((social) => (
                <motion.a
                  key={social.label}
                  href="#"
                  variants={socialVariants}
                  whileHover="hover"
                  className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-colors duration-300"
                  aria-label={social.label}
                >
                  {social.icon}
                </motion.a>
              ))}
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-5 pb-1 border-b border-border/50 inline-block">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { text: "Home", href: "/" },
                { text: "Our Menu", href: "/menu" },
                { text: "About Us", href: "/about" },
                { text: "Contact", href: "/contact" },
                { text: "Book a Table", href: "#book" }
              ].map((link) => (
                <li key={link.text}>
                  <motion.div
                    variants={linkVariants}
                    whileHover="hover"
                    className="flex items-center"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-primary mr-2"></span>
                    <Link 
                      href={link.href}
                      className="text-foreground/80 hover:text-primary transition-colors duration-300"
                    >
                      {link.text}
                    </Link>
                  </motion.div>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-5 pb-1 border-b border-border/50 inline-block">
              Get in Touch
            </h4>
            <address className="not-italic space-y-3 text-foreground/80">
              <p className="flex items-start">
                <MapPin className="w-4 h-4 mr-3 mt-1 text-primary flex-shrink-0" />
                <span>123 Main Street<br/>Cityville, State 12345</span>
              </p>
              <p className="flex items-center">
                <Phone className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                <span>(123) 456-7890</span>
              </p>
              <p className="flex items-center group">
                <Mail className="w-4 h-4 mr-3 text-primary flex-shrink-0" />
                <a 
                  href="mailto:info@rustictable.com"
                  className="hover:text-primary transition-colors duration-300"
                >
                  info@rustictable.com
                </a>
              </p>
            </address>
          </div>
          
          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-serif font-semibold mb-5 pb-1 border-b border-border/50 inline-block">
              Opening Hours
            </h4>
            <ul className="space-y-3 text-foreground/80">
              {[
                { days: "Monday - Thursday", hours: "5:00 PM - 10:00 PM" },
                { days: "Friday - Saturday", hours: "5:00 PM - 11:00 PM" },
                { days: "Sunday", hours: "4:00 PM - 9:00 PM" },
                { days: "Weekend Brunch", hours: "10:00 AM - 2:00 PM" }
              ].map((schedule) => (
                <li key={schedule.days} className="flex items-start">
                  <Clock className="w-4 h-4 mr-3 mt-1 text-primary flex-shrink-0" />
                  <div>
                    <span className="font-medium block">{schedule.days}</span>
                    <span>{schedule.hours}</span>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-border/50 text-center">
          <div className="relative flex flex-col md:flex-row justify-center md:justify-between items-center text-sm text-foreground/60">
            <p>&copy; {currentYear} <span className="text-primary">Rustic Table</span>. All rights reserved.</p>
            
            <div className="mt-4 md:mt-0 space-x-6">
              <a href="#" className="hover:text-primary transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-primary transition-colors duration-300">Terms of Service</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
