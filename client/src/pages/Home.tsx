import { useEffect } from "react";
import { Link } from "wouter";
import { motion } from "framer-motion";
import BookingForm from "@/components/BookingForm";
import { FaStar } from "react-icons/fa";

export default function Home() {
  useEffect(() => {
    document.title = "Rustic Table | Fine Dining Restaurant";
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[80vh] min-h-[600px] pt-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80" 
            alt="Restaurant interior" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-[#333333] opacity-40"></div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative h-full z-10">
          <div className="flex flex-col justify-center h-full max-w-lg md:max-w-xl text-white">
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="handwritten text-2xl mb-2 text-[#B4C7A5]"
            >
              Welcome to
            </motion.h2>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-5xl md:text-6xl font-bold mb-6"
            >
              Rustic Table
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8 text-lg"
            >
              Experience fine dining in a warm, inviting atmosphere. Our chefs craft seasonal dishes using locally-sourced ingredients to create unforgettable culinary experiences.
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a 
                href="#book" 
                className="bg-[#C97C5D] hover:bg-[#722F37] text-white px-8 py-3 rounded-lg text-center transition-all duration-300"
              >
                Book a Table
              </a>
              <Link 
                href="/menu" 
                className="bg-white hover:bg-[#F7F3E8] text-[#333333] px-8 py-3 rounded-lg text-center transition-all duration-300"
              >
                View Menu
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
      
      {/* Featured Sections */}
      <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Experience the Essence of <span className="text-[#C97C5D]">Rustic Dining</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg">
            From farm-fresh ingredients to handcrafted cocktails, every detail is designed to delight your senses.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="image-card rounded-xl overflow-hidden shadow-lg group"
          >
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1455279032140-49a4bf46f343?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Seasonal cuisine" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Seasonal Cuisine</h3>
              <p>Our menu changes with the seasons, highlighting the freshest local ingredients at their peak.</p>
            </div>
          </motion.div>
          
          {/* Feature 2 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="image-card rounded-xl overflow-hidden shadow-lg group"
          >
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Cozy atmosphere" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Cozy Atmosphere</h3>
              <p>Our carefully designed space creates the perfect ambiance for a romantic dinner or gathering with friends.</p>
            </div>
          </motion.div>
          
          {/* Feature 3 */}
          <motion.div 
            whileHover={{ y: -10 }}
            transition={{ duration: 0.3 }}
            className="image-card rounded-xl overflow-hidden shadow-lg group"
          >
            <div className="overflow-hidden">
              <img 
                src="https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Craft cocktails" 
                className="w-full h-64 object-cover"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2">Craft Cocktails</h3>
              <p>Our bartenders create signature drinks using house-made syrups, fresh juices, and premium spirits.</p>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="bg-[#333333] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">What Our Guests Say</h2>
            <div className="w-16 h-1 bg-[#C97C5D] mx-auto"></div>
          </div>
          
          <div className="max-w-4xl mx-auto">
            <div className="relative">
              <div className="testimonial-slide text-center px-4 md:px-12">
                <p className="text-lg italic mb-6">
                  "The experience at Rustic Table was exceptional. The ambiance, service, and most importantly, the food were all impeccable. Every dish was a work of art, both visually and in flavor."
                </p>
                <div className="flex items-center justify-center">
                  <div className="mr-4">
                    <img 
                      src="https://randomuser.me/api/portraits/women/32.jpg" 
                      alt="Sarah Johnson" 
                      className="w-12 h-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="text-left">
                    <p className="font-medium">Sarah Johnson</p>
                    <div className="flex text-yellow-400">
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                      <FaStar />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section id="book" className="py-24 bg-[#C97C5D] text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Reserve Your Table</h2>
            <p className="max-w-2xl mx-auto text-lg">Join us for an unforgettable dining experience</p>
          </div>
          
          <div className="max-w-3xl mx-auto bg-white text-[#333333] rounded-lg shadow-xl p-6 md:p-8">
            <BookingForm />
          </div>
        </div>
      </section>
    </div>
  );
}
