import { useEffect } from "react";
import { motion } from "framer-motion";

export default function About() {
  useEffect(() => {
    document.title = "About | Rustic Table";
  }, []);

  return (
    <section id="about" className="pt-24 pb-16 bg-[#F7F3E8]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Story
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg"
          >
            The passion and people behind Rustic Table
          </motion.p>
        </div>
        
        {/* Restaurant Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-3xl font-bold mb-6">A Culinary Journey</h3>
            <p className="mb-4">Rustic Table began in 2010 with a simple vision: to create a restaurant that felt like home, serving food that nourishes both body and soul.</p>
            <p className="mb-4">Founded by Chef Michael Parker and sommelier Sophia Chen, our restaurant combines their passion for seasonal ingredients, traditional cooking techniques, and warm hospitality.</p>
            <p>Over the years, we've grown from a small neighborhood gem to a beloved culinary destination, while staying true to our original mission of creating memorable dining experiences in a welcoming atmosphere.</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="relative h-96 rounded-lg overflow-hidden shadow-xl"
          >
            <img 
              src="https://images.unsplash.com/photo-1414235077428-338989a2e8c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Restaurant interior" 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </div>
        
        {/* Team Section */}
        <div className="text-center mb-12">
          <h3 className="text-3xl font-bold mb-4">Meet Our Team</h3>
          <p className="max-w-2xl mx-auto">The talented people who make Rustic Table special</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Team Member 1 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Chef Michael Parker" 
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-1">Michael Parker</h4>
              <p className="text-[#C97C5D] mb-3">Executive Chef & Co-Founder</p>
              <p className="text-gray-600">With over 20 years of experience in fine dining, Chef Michael brings his passion for seasonal ingredients and traditional techniques to every dish at Rustic Table.</p>
            </div>
          </motion.div>
          
          {/* Team Member 2 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Sophia Chen" 
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-1">Sophia Chen</h4>
              <p className="text-[#C97C5D] mb-3">Sommelier & Co-Founder</p>
              <p className="text-gray-600">Sophia's expert knowledge of wines and dedication to hospitality ensures that every guest receives the perfect pairing recommendation and exceptional service.</p>
            </div>
          </motion.div>
          
          {/* Team Member 3 */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            whileHover={{ y: -10 }}
            className="bg-white rounded-lg overflow-hidden shadow-lg"
          >
            <img 
              src="https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="James Rodriguez" 
              className="w-full h-80 object-cover"
            />
            <div className="p-6">
              <h4 className="text-xl font-semibold mb-1">James Rodriguez</h4>
              <p className="text-[#C97C5D] mb-3">Pastry Chef</p>
              <p className="text-gray-600">James creates desserts that balance tradition with innovation, crafting sweet finales that perfectly complement the Rustic Table dining experience.</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
