import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { gsap } from "gsap";
import { Quote, Award, ChevronRight, Clock } from "lucide-react";

export default function About() {
  const storyRef = useRef<HTMLDivElement>(null);
  const teamRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = "About | Rustic Table";
    
    // Set up animations using intersection observer
    const setupAnimations = () => {
      // Story section animation
      const storyObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const storyImage = document.querySelector('.story-image');
              const storyContent = document.querySelector('.story-content');
              
              if (storyImage && storyContent) {
                gsap.fromTo(
                  storyImage,
                  { opacity: 0, x: 50 },
                  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
                );
                
                gsap.fromTo(
                  storyContent,
                  { opacity: 0, x: -50 },
                  { opacity: 1, x: 0, duration: 0.8, ease: "power2.out" }
                );
              }
              
              storyObserver.disconnect();
            }
          });
        },
        { threshold: 0.2 }
      );
      
      // Team members animation
      const teamObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const teamMembers = document.querySelectorAll('.team-member');
              
              teamMembers.forEach((member, index) => {
                gsap.fromTo(
                  member,
                  { opacity: 0, y: 50 },
                  { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.6, 
                    delay: index * 0.15,
                    ease: "power2.out" 
                  }
                );
              });
              
              teamObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe sections
      if (storyRef.current) storyObserver.observe(storyRef.current);
      if (teamRef.current) teamObserver.observe(teamRef.current);
    };
    
    // Wait for DOM to be ready
    if (typeof window !== 'undefined') {
      setTimeout(setupAnimations, 100);
    }
  }, []);
  
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
              Our Roots
            </motion.span>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl md:text-6xl font-serif font-bold mb-4"
            >
              The <span className="brush-stroke text-primary">Story</span> Behind<br/>
              Our Restaurant
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-lg md:text-xl text-foreground/80 max-w-2xl mt-4"
            >
              A culinary journey fueled by passion, tradition, and a deep respect for locally-sourced ingredients.
            </motion.p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute right-0 top-40 w-72 h-72 rounded-full bg-primary opacity-[0.03] -z-5"></div>
        <div className="absolute -left-10 bottom-0 w-40 h-40 rounded-full bg-secondary opacity-[0.07] -z-5"></div>
      </section>
      
      {/* Timeline */}
      <section className="py-16 md:py-24 relative">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="flex items-center justify-center mb-16">
            <div className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div className="ml-4">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold">Our Journey</h2>
            </div>
          </div>
          
          <div className="max-w-3xl mx-auto relative">
            {/* Vertical timeline line */}
            <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-0.5 bg-primary/20 transform md:-translate-x-1/2"></div>
            
            {/* Timeline items */}
            {[
              {
                year: "2010",
                title: "Our Beginning",
                description: "Rustic Table was founded with a vision to create a dining experience that felt like home."
              },
              {
                year: "2013",
                title: "Farm Partnerships",
                description: "We established relationships with local farms to source the freshest seasonal ingredients."
              },
              {
                year: "2016",
                title: "Award Recognition",
                description: "Received our first culinary excellence award for our commitment to sustainable dining."
              },
              {
                year: "2020",
                title: "Expansion",
                description: "Expanded our space to include a dedicated private dining area and chef's table experience."
              }
            ].map((item, index) => (
              <div
                key={item.year}
                className={`relative flex flex-col md:flex-row items-start mb-12 last:mb-0 ${
                  index % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center z-10 mb-4 md:mb-0 ml-4 md:ml-0">
                  <span className="font-medium text-sm">{item.year}</span>
                </div>
                
                <div className={`flex-1 md:max-w-[calc(50%-2rem)] ${
                  index % 2 === 0 ? "md:mr-8" : "md:ml-8"
                }`}>
                  <div className="bg-white rounded-xl p-6 shadow-md card-shadow">
                    <h3 className="text-xl font-serif font-semibold mb-2 text-primary">
                      {item.title}
                    </h3>
                    <p className="text-foreground/70">
                      {item.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Restaurant Story Section */}
      <section ref={storyRef} className="py-16 md:py-24 bg-background relative overflow-hidden">
        <div className="absolute inset-0 bg-paper opacity-30 -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="story-content opacity-0">
              <div className="relative mb-6">
                <span className="handwritten text-2xl text-primary">Our Philosophy</span>
                <h2 className="text-3xl md:text-4xl font-serif font-bold mt-2 mb-6">
                  A Culinary Haven Built on <span className="brush-stroke text-primary">Passion</span>
                </h2>
              </div>
              
              <div className="prose prose-lg">
                <p className="mb-4">Rustic Table began in 2010 with a simple vision: to create a restaurant that felt like home, serving food that nourishes both body and soul.</p>
                <p className="mb-4">Founded by Chef Michael Parker and sommelier Sophia Chen, our restaurant combines their passion for seasonal ingredients, traditional cooking techniques, and genuine hospitality.</p>
                <p>Over the years, we've grown from a small neighborhood gem to a beloved culinary destination, while staying true to our original mission of creating memorable dining experiences in a welcoming atmosphere.</p>
              </div>
              
              <div className="mt-8 flex items-center">
                <Quote className="text-primary w-10 h-10 mr-4 opacity-60" />
                <blockquote className="text-lg italic text-foreground/80">
                  "We cook with heart, serve with joy, and create with intention."
                </blockquote>
              </div>
              
              <div className="mt-6">
                <a 
                  href="#book" 
                  className="button-primary group inline-flex items-center gap-2 py-3 px-6"
                >
                  <span className="relative z-10">Reserve a Table</span>
                  <ChevronRight className="w-4 h-4 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
            
            <div className="story-image opacity-0 relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-xl">
                <img 
                  src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                  alt="Restaurant interior" 
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute top-10 -right-6 w-24 h-24 border-4 border-primary/20 -z-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 border-4 border-secondary/20 -z-10"></div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Team Section */}
      <section ref={teamRef} className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 sm:px-8">
          <div className="text-center mb-16">
            <span className="handwritten text-2xl text-primary block mb-3">The Faces</span>
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-5">
              Meet Our <span className="brush-stroke text-primary">Team</span>
            </h2>
            <p className="max-w-2xl mx-auto text-lg text-foreground/80">
              The talented people who bring passion, expertise, and warmth to create the Rustic Table experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Team Member 1 */}
            <div className="team-member group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Chef Michael Parker" 
                    className="w-full h-80 object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-sm line-clamp-3">
                      "I believe that food should be an experience that engages all senses and creates memories that last a lifetime."
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors duration-300">
                      Michael Parker
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-primary font-medium mb-3">Executive Chef & Co-Founder</p>
                  <p className="text-foreground/70">With over 20 years of experience in fine dining, Chef Michael brings his passion for seasonal ingredients and traditional techniques to every dish at Rustic Table.</p>
                </div>
              </div>
            </div>
            
            {/* Team Member 2 */}
            <div className="team-member group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="Sophia Chen" 
                    className="w-full h-80 object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-sm line-clamp-3">
                      "The perfect wine pairing elevates a meal from delicious to unforgettable. It's about creating harmony on the palate."
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors duration-300">
                      Sophia Chen
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-primary font-medium mb-3">Sommelier & Co-Founder</p>
                  <p className="text-foreground/70">Sophia's expert knowledge of wines and dedication to hospitality ensures that every guest receives the perfect pairing recommendation and exceptional service.</p>
                </div>
              </div>
            </div>
            
            {/* Team Member 3 */}
            <div className="team-member group">
              <div className="relative bg-muted rounded-xl overflow-hidden card-shadow transition-all duration-500 group-hover:shadow-xl h-full">
                <div className="relative overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                    alt="James Rodriguez" 
                    className="w-full h-80 object-cover transition-all duration-700 ease-in-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white transform translate-y-full group-hover:translate-y-0 transition-all duration-500">
                    <p className="text-sm line-clamp-3">
                      "Dessert is more than just a sweet ending—it's an opportunity to create moments of joy and wonder on a plate."
                    </p>
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors duration-300">
                      James Rodriguez
                    </h3>
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Award className="w-4 h-4 text-primary" />
                    </div>
                  </div>
                  <p className="text-primary font-medium mb-3">Pastry Chef</p>
                  <p className="text-foreground/70">James creates desserts that balance tradition with innovation, crafting sweet finales that perfectly complement the Rustic Table dining experience.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Closing banner */}
      <section className="py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-primary/10 -z-10"></div>
        <div className="absolute inset-0 bg-paper opacity-20 -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
              Come Experience Our <span className="brush-stroke">Story</span>
            </h2>
            <p className="text-lg mb-8">
              We invite you to join us for a meal, meet our team, and become part of our ongoing story. Each visit to Rustic Table is an opportunity to create new memories together.
            </p>
            <a 
              href="#book" 
              className="button-primary group py-4 px-8 font-medium"
            >
              <span className="relative z-10">Make a Reservation</span>
            </a>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -left-12 -bottom-12 w-60 h-60 rounded-full bg-secondary opacity-10 -z-5"></div>
        <div className="absolute -right-12 -top-12 w-60 h-60 rounded-full bg-accent opacity-10 -z-5"></div>
      </section>
    </div>
  );
}
