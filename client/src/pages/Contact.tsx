import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { ChevronRight, Mail, MapPin, Phone, Clock, Send, User, MessageSquare } from "lucide-react";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

// Add Google Maps type definitions
declare global {
  interface Window {
    initMap?: () => void;
    google: any;
  }
}

export default function Contact() {
  const contactInfoRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = "Contact | Rustic Table";
    
    // Load Google Maps API
    const loadGoogleMapsScript = () => {
      // Check if the map container exists in the DOM before loading the script
      if (!document.getElementById('google-map')) return;
      
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCTsFGP5PcNt2U7ZvZbQT-fYM63QLyFJc&callback=initMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      
      // Define the callback function for Google Maps
      window.initMap = function() {
        const mapElement = document.getElementById('google-map');
        if (mapElement) {
          // New York coordinates as example
          const location = { lat: 40.7128, lng: -74.0060 };
          
          // Create the map with custom styling
          const map = new window.google.maps.Map(mapElement, {
            zoom: 15,
            center: location,
            styles: [
              {
                "featureType": "all",
                "elementType": "geometry.fill",
                "stylers": [
                  { "weight": "2.00" }
                ]
              },
              {
                "featureType": "all",
                "elementType": "geometry.stroke",
                "stylers": [
                  { "color": "#9c9c9c" }
                ]
              },
              {
                "featureType": "all",
                "elementType": "labels.text",
                "stylers": [
                  { "visibility": "on" }
                ]
              },
              {
                "featureType": "landscape",
                "elementType": "all",
                "stylers": [
                  { "color": "#f2f2f2" }
                ]
              },
              {
                "featureType": "poi",
                "elementType": "all",
                "stylers": [
                  { "visibility": "off" }
                ]
              },
              {
                "featureType": "road",
                "elementType": "all",
                "stylers": [
                  { "saturation": -100 },
                  { "lightness": 45 }
                ]
              },
              {
                "featureType": "transit",
                "elementType": "all",
                "stylers": [
                  { "visibility": "simplified" }
                ]
              },
              {
                "featureType": "water",
                "elementType": "all",
                "stylers": [
                  { "color": "#C5553D" },
                  { "visibility": "simplified" }
                ]
              }
            ]
          });
          
          // Custom marker icon
          const marker = new window.google.maps.Marker({
            position: location,
            map: map,
            title: "Rustic Table Restaurant",
            icon: {
              path: window.google.maps.SymbolPath.CIRCLE,
              scale: 10,
              fillColor: "#C5553D",
              fillOpacity: 1,
              strokeColor: "#ffffff",
              strokeWeight: 2,
            }
          });
          
          // Info window
          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="font-family: 'Source Sans 3', sans-serif; color: #2D2620; padding: 8px;">
                <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">Rustic Table</div>
                <div style="font-size: 12px;">123 Main Street, Cityville</div>
              </div>
            `
          });
          
          marker.addListener('click', () => {
            infoWindow.open(map, marker);
          });
        }
      };
      
      // Add the script to the document
      document.body.appendChild(googleMapsScript);
    };
    
    loadGoogleMapsScript();
    
    // Animate elements when they come into view
    const setupAnimations = () => {
      // Contact info animation
      const contactInfoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const contactCards = document.querySelectorAll('.contact-card');
              
              contactCards.forEach((card, index) => {
                gsap.fromTo(
                  card,
                  { y: 30, opacity: 0 },
                  { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.5, 
                    delay: index * 0.15,
                    ease: "power2.out" 
                  }
                );
              });
              
              contactInfoObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Map animation
      const mapObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                entry.target,
                { opacity: 0, scale: 0.95 },
                { opacity: 1, scale: 1, duration: 0.6, ease: "power2.out" }
              );
              
              mapObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Contact form animation
      const formObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const formElements = document.querySelectorAll('.form-element');
              
              formElements.forEach((element, index) => {
                gsap.fromTo(
                  element,
                  { y: 20, opacity: 0 },
                  { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.4, 
                    delay: 0.1 + (index * 0.1),
                    ease: "power2.out" 
                  }
                );
              });
              
              formObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe elements
      if (contactInfoRef.current) contactInfoObserver.observe(contactInfoRef.current);
      if (mapRef.current) mapObserver.observe(mapRef.current);
      if (formRef.current) formObserver.observe(formRef.current);
    };
    
    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      setTimeout(setupAnimations, 100);
    }
    
    return () => {
      // Clean up by removing the callback
      window.initMap = undefined;
    };
  }, []);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert("This is a demo contact form. In a real application, this would send a message to the restaurant.");
  };

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative pt-24 pb-12">
        <div className="absolute inset-0 bg-accent/5 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8 pt-12 pb-8">
          <div className="max-w-3xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="handwritten text-2xl text-primary block mb-3"
            >
              Reach Out
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
            >
              Get in <span className="brush-stroke text-primary">Touch</span> 
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/80 max-w-2xl mt-4"
            >
              We'd love to hear from you. Whether you have a question about reservations, 
              special events, or just want to say hello, we're here to help.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 bottom-0 w-72 h-72 rounded-full bg-primary opacity-[0.03] -z-5"></div>
        <div className="absolute -left-10 top-20 w-40 h-40 rounded-full bg-secondary opacity-[0.07] -z-5"></div>
      </section>
      
      {/* Contact Cards */}
      <section ref={contactInfoRef} className="py-12 md:py-16">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Visit Card */}
            <div className="contact-card opacity-0 group">
              <div className="bg-white rounded-xl p-8 h-full border border-border/30 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">Visit Us</h3>
                
                <address className="not-italic text-foreground/70 flex-grow">
                  <p>123 Main Street</p>
                  <p>Cityville, State 12345</p>
                  <p className="mt-2">Located in the heart of downtown, near Central Park</p>
                </address>
                
                <div className="mt-6 pt-4 border-t border-border/20">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    <span>Get Directions</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
            
            {/* Contact Card */}
            <div className="contact-card opacity-0 group">
              <div className="bg-white rounded-xl p-8 h-full border border-border/30 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">Contact</h3>
                
                <div className="text-foreground/70 flex-grow">
                  <p className="flex items-start mb-3">
                    <Phone className="w-4 h-4 mt-1 text-primary mr-2" />
                    <span>(123) 456-7890</span>
                  </p>
                  <p className="flex items-start">
                    <Mail className="w-4 h-4 mt-1 text-primary mr-2" />
                    <a 
                      href="mailto:info@rustictable.com" 
                      className="hover:text-primary transition-colors duration-300"
                    >
                      info@rustictable.com
                    </a>
                  </p>
                  <p className="mt-2">For reservations, special events, or general inquiries</p>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/20">
                  <div className="flex space-x-3">
                    {[
                      { icon: <FaFacebookF />, label: "Facebook" },
                      { icon: <FaInstagram />, label: "Instagram" },
                      { icon: <FaTwitter />, label: "Twitter" }
                    ].map((social) => (
                      <a
                        key={social.label}
                        href="#"
                        className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center text-primary hover:bg-primary hover:text-white transition-all duration-300"
                        aria-label={social.label}
                      >
                        {social.icon}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Hours Card */}
            <div className="contact-card opacity-0 group">
              <div className="bg-white rounded-xl p-8 h-full border border-border/30 transition-all duration-300 hover:shadow-xl hover:border-primary/20 flex flex-col">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors duration-300">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                
                <h3 className="text-xl font-serif font-semibold mb-2">Hours</h3>
                
                <div className="text-foreground/70 flex-grow">
                  <ul className="space-y-2">
                    <li className="flex justify-between">
                      <span className="font-medium">Mon - Thu:</span>
                      <span>5:00 PM - 10:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Fri - Sat:</span>
                      <span>5:00 PM - 11:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Sunday:</span>
                      <span>4:00 PM - 9:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span className="font-medium">Brunch:</span>
                      <span>Sat-Sun, 10 AM - 2 PM</span>
                    </li>
                  </ul>
                </div>
                
                <div className="mt-6 pt-4 border-t border-border/20">
                  <a 
                    href="#book" 
                    className="inline-flex items-center text-primary font-medium hover:underline"
                  >
                    <span>Make a Reservation</span>
                    <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Map */}
      <section ref={mapRef} className="py-12 md:py-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-paper opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8">
          <div className="rounded-xl overflow-hidden shadow-xl h-[400px] md:h-[500px] opacity-0" id="google-map"></div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-10 bottom-10 w-40 h-40 rounded-full bg-primary opacity-[0.05] -z-5"></div>
        <div className="absolute right-10 top-10 w-20 h-20 rounded-full bg-secondary opacity-[0.07] -z-5"></div>
      </section>
      
      {/* Contact Form */}
      <section ref={formRef} className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="handwritten text-2xl text-primary block mb-2">Message Us</span>
              <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
                Send Us a <span className="brush-stroke text-primary">Message</span>
              </h2>
              <p className="text-foreground/70">
                Have a question or feedback? We'd love to hear from you.
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="bg-white rounded-xl p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-element opacity-0">
                  <label className="block text-sm font-medium mb-2" htmlFor="name">Your Name</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="w-5 h-5 text-foreground/40" />
                    </div>
                    <input
                      type="text"
                      id="name"
                      className="pl-10 w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-element opacity-0">
                  <label className="block text-sm font-medium mb-2" htmlFor="email">Email Address</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="w-5 h-5 text-foreground/40" />
                    </div>
                    <input
                      type="email"
                      id="email"
                      className="pl-10 w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-element md:col-span-2 opacity-0">
                  <label className="block text-sm font-medium mb-2" htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full h-12 px-4 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300"
                    placeholder="What's this about?"
                    required
                  />
                </div>
                
                <div className="form-element md:col-span-2 opacity-0">
                  <label className="block text-sm font-medium mb-2" htmlFor="message">Your Message</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <MessageSquare className="w-5 h-5 text-foreground/40" />
                    </div>
                    <textarea
                      id="message"
                      rows={5}
                      className="pl-10 w-full px-4 py-3 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all duration-300 resize-none"
                      placeholder="Your message here..."
                      required
                    ></textarea>
                  </div>
                </div>
                
                <div className="form-element md:col-span-2 opacity-0 text-center mt-4">
                  <button
                    type="submit"
                    className="button-primary inline-flex items-center gap-2 py-3 px-6"
                  >
                    <span className="relative z-10">Send Message</span>
                    <Send className="w-4 h-4 relative z-10" />
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
