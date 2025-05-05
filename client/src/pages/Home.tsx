import { useEffect, useRef } from "react";
import { Link } from "wouter";
import { motion, useScroll, useTransform } from "framer-motion";
import { gsap } from "gsap";
import BookingForm from "@/components/BookingForm";
import { FaStar } from "react-icons/fa";
import { ChevronRight, Utensils, Coffee, Award, Clock } from "lucide-react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const highlightsRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const heroTextY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  
  useEffect(() => {
    document.title = "Rustic Table | Fine Dining Restaurant";
    
    // Set up animations without ScrollTrigger
    const setupAnimations = () => {
      // Use IntersectionObserver instead of ScrollTrigger
      const highlightsObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const items = document.querySelectorAll('.highlight-item');
              items.forEach((item, index) => {
                gsap.fromTo(
                  item,
                  { y: 50, opacity: 0 },
                  { 
                    y: 0, 
                    opacity: 1, 
                    duration: 0.6,
                    delay: index * 0.15,
                    ease: "power2.out" 
                  }
                );
              });
              
              // Once animation is triggered, disconnect the observer
              highlightsObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      const testimonialObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              gsap.fromTo(
                ".testimonial-content",
                { scale: 0.9, opacity: 0 },
                { 
                  scale: 1, 
                  opacity: 1,
                  duration: 0.6,
                  ease: "power2.out" 
                }
              );
              
              // Once animation is triggered, disconnect the observer
              testimonialObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe the sections
      const highlightsSection = document.querySelector('.highlights-section');
      const testimonialsSection = document.querySelector('.testimonials-section');
      
      if (highlightsSection) {
        highlightsObserver.observe(highlightsSection);
      }
      
      if (testimonialsSection) {
        testimonialObserver.observe(testimonialsSection);
      }
    };
    
    if (typeof window !== 'undefined') {
      // Wait for DOM to be ready
      setTimeout(setupAnimations, 100);
    }
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section 
        ref={heroRef}
        className="relative h-screen min-h-[650px] md:min-h-[750px] flex items-center justify-center overflow-hidden"
      >
        {/* Hero background with parallax effect */}
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ scale: heroScale }}
        >
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/40 to-black/70"></div>
          
          {/* Decorative overlay patterns */}
          <div className="absolute inset-0 bg-noise opacity-20 mix-blend-overlay"></div>
        </motion.div>
        
        {/* Content */}
        <motion.div 
          style={{ opacity: heroOpacity, y: heroTextY }}
          className="container mx-auto px-6 sm:px-8 relative z-10 mt-20"
        >
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="block handwritten text-3xl md:text-4xl text-secondary mb-2 text-shadow-strong"
            >
              Welcome to
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-5xl md:text-7xl font-serif font-bold mb-6 text-shadow-strong"
            >
              <span className="inline-block">Rustic</span>{" "}
              <span className="elegant tracking-widest font-normal">TABLE</span>
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="relative mx-auto w-24 h-[3px] bg-primary my-6 before:absolute before:content-[''] before:w-2 before:h-2 before:bg-primary before:rounded-full before:-left-2 before:-top-[3px] after:absolute after:content-[''] after:w-2 after:h-2 after:bg-primary after:rounded-full after:-right-2 after:-top-[3px]"
            ></motion.div>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="text-lg md:text-xl mb-10 max-w-2xl mx-auto leading-relaxed text-shadow-strong"
            >
              Experience fine dining in a warm, inviting atmosphere. Our chefs craft seasonal dishes using locally-sourced ingredients to create unforgettable culinary experiences.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-6 justify-center"
            >
              <a 
                href="#book" 
                className="button-primary group py-4 px-10 font-medium"
              >
                <span className="flex items-center justify-center gap-2">
                  Book a Table
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </a>
              <Link 
                href="/menu" 
                className="button-secondary group py-4 px-10 font-medium"
              >
                <span className="group-hover:text-primary transition-colors duration-300">
                  Explore Menu
                </span>
              </Link>
            </motion.div>
          </div>
        </motion.div>
        
        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <div className="flex flex-col items-center text-white">
            <span className="text-sm uppercase tracking-widest mb-2 opacity-80">Scroll</span>
            <div className="w-[2px] h-12 bg-white/30 relative">
              <motion.div 
                className="absolute top-0 left-0 right-0 bg-primary h-4" 
                animate={{ 
                  top: ['0%', '100%', '0%'],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
            </div>
          </div>
        </motion.div>
      </section>
      
      {/* Highlights Section */}
      <section ref={highlightsRef} className="highlights-section py-24 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-16 md:mb-20">
            <span className="handwritten text-2xl text-primary block mb-2">Discover</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5">
              What Makes Us <span className="brush-stroke text-primary">Special</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80">
              From farm-fresh ingredients to handcrafted cocktails, every detail is designed to create an unforgettable dining experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
            {/* Highlight 1 */}
            <div className="highlight-item group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full flex flex-col">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1455279032140-49a4bf46f343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Seasonal cuisine" 
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Utensils className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Seasonal Cuisine</h3>
                    <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">Our menu changes with the seasons, highlighting the freshest local ingredients at their peak of flavor and nutrition.</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/menu" className="inline-flex items-center font-medium text-primary">
                      <span>View Our Menu</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Highlight 2 */}
            <div className="highlight-item group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full flex flex-col">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Cozy atmosphere" 
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Coffee className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Rustic Elegance</h3>
                    <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">Our carefully designed space creates the perfect ambiance for a romantic dinner or a memorable gathering with friends and family.</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/about" className="inline-flex items-center font-medium text-primary">
                      <span>About Us</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Highlight 3 */}
            <div className="highlight-item group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full flex flex-col">
                <div className="relative overflow-hidden h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Craft cocktails" 
                    className="w-full h-full object-cover transition-all duration-500 ease-in-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="absolute top-4 left-4 bg-primary text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg transform -translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                
                <div className="p-7 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-3 group-hover:text-primary transition-colors duration-300">Artisanal Experience</h3>
                    <p className="text-foreground/70 group-hover:text-foreground transition-colors duration-300">Our bartenders create signature cocktails using house-made syrups, fresh juices, and premium spirits that perfectly complement our menu.</p>
                  </div>
                  
                  <div className="mt-6">
                    <Link href="/contact" className="inline-flex items-center font-medium text-primary">
                      <span>Contact Us</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:ml-2 transition-all duration-300" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Schedule banner */}
      <section className="bg-accent/5 border-y border-border/50 py-10 my-10">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <h3 className="font-serif text-2xl mb-2">Opening Hours</h3>
              <p className="text-foreground/70">We look forward to serving you</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { day: "Mon-Thu", hours: "5:00 PM - 10:00 PM" },
                { day: "Fri-Sat", hours: "5:00 PM - 11:00 PM" },
                { day: "Sunday", hours: "4:00 PM - 9:00 PM" },
                { day: "Brunch", hours: "Sat-Sun, 10 AM - 2 PM" }
              ].map((schedule) => (
                <div key={schedule.day} className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                    <Clock className="w-5 h-5 text-primary" />
                  </div>
                  <div className="font-medium">{schedule.day}</div>
                  <div className="text-sm text-foreground/70">{schedule.hours}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="testimonials-section relative py-20 md:py-28 overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 bg-accent opacity-[0.03] -z-10"></div>
        <div className="absolute inset-0 bg-paper opacity-30 -z-10"></div>
        <div className="absolute -left-10 top-10 w-40 h-40 bg-primary rounded-full opacity-[0.03] -z-10"></div>
        <div className="absolute -right-10 bottom-10 w-60 h-60 bg-secondary rounded-full opacity-[0.05] -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="handwritten text-2xl text-primary block mb-2">Testimonials</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-3">
              What Our <span className="brush-stroke text-primary">Guests</span> Say
            </h2>
          </div>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-xl p-8 md:p-10 testimonial-content">
            <div className="flex flex-col items-center">
              <div className="relative mb-8">
                <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                  <img 
                    src="https://randomuser.me/api/portraits/women/32.jpg" 
                    alt="Sarah Johnson" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className="text-white w-3 h-3" />
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="relative">
                <div className="text-4xl text-primary opacity-20 absolute -top-6 -left-4">"</div>
                <p className="text-xl md:text-2xl font-serif text-center italic mb-6 leading-relaxed">
                  The experience at Rustic Table was exceptional. The ambiance, service, and most importantly, the food were all impeccable. Every dish was a work of art, both visually and in flavor.
                </p>
                <div className="text-4xl text-primary opacity-20 absolute -bottom-10 -right-4">"</div>
              </div>
              
              <div className="mt-6 text-center">
                <p className="font-medium text-lg">Sarah Johnson</p>
                <p className="text-sm text-foreground/60">Frequent Diner</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="relative py-20 md:py-28 overflow-hidden">
        {/* Decorative background */}
        <div className="absolute inset-0 bg-primary -z-10 opacity-10"></div>
        <div className="absolute inset-0 bg-paper -z-10 opacity-30"></div>
        
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
            <div className="lg:w-1/2">
              <span className="handwritten text-2xl text-primary block mb-2">Join Us</span>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
                Reserve Your <span className="brush-stroke text-primary">Table</span>
              </h2>
              
              <p className="text-lg text-foreground/80 mb-8 leading-relaxed">
                Secure your spot for an unforgettable dining experience at Rustic Table. Whether you're celebrating a special occasion or simply craving exceptional food in a warm atmosphere, we look forward to serving you.
              </p>
              
              <div className="hidden lg:flex space-x-4 mb-8">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-primary"></div>
                  <span className="text-sm">Online Reservations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-secondary"></div>
                  <span className="text-sm">Special Occasions</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 rounded-full bg-accent"></div>
                  <span className="text-sm">Group Dining</span>
                </div>
              </div>
              
              <div className="hidden lg:block relative h-64 md:h-80 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1559339352-11d035aa65de?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
                  alt="Restaurant dining" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
            
            <div className="lg:w-1/2">
              <div className="bg-white rounded-xl shadow-xl p-8 md:p-10">
                <BookingForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
