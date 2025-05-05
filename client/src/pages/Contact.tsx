import { useEffect } from "react";
import { motion } from "framer-motion";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | Rustic Table";
    
    // Load Google Maps API
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBCTsFGP5PcNt2U7ZvZbQT-fYM63QLyFJc&callback=initMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      window.document.body.appendChild(googleMapsScript);
      
      window.initMap = function() {
        const mapElement = document.getElementById('google-map');
        if (mapElement) {
          const location = { lat: 40.7128, lng: -74.0060 }; // New York coordinates as example
          const map = new google.maps.Map(mapElement, {
            zoom: 15,
            center: location,
          });
          new google.maps.Marker({
            position: location,
            map: map,
            title: "Rustic Table Restaurant",
          });
        }
      };
    };
    
    loadGoogleMapsScript();
    
    return () => {
      // Clean up by removing the callback
      delete window.initMap;
    };
  }, []);

  return (
    <section id="contact" className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg"
          >
            We'd love to hear from you
          </motion.p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Visit Us</h3>
              <address className="not-italic">
                <p className="mb-1 flex items-center">
                  <FaMapMarkerAlt className="text-[#C97C5D] mr-3 w-5" />
                  <span>123 Main Street, Cityville, State 12345</span>
                </p>
                <p className="mb-1 flex items-center">
                  <FaPhone className="text-[#C97C5D] mr-3 w-5" />
                  <span>(123) 456-7890</span>
                </p>
                <p className="mb-1 flex items-center">
                  <FaEnvelope className="text-[#C97C5D] mr-3 w-5" />
                  <span>info@rustictable.com</span>
                </p>
              </address>
            </div>
            
            <div className="mb-8">
              <h3 className="text-2xl font-bold mb-4">Hours</h3>
              <ul>
                <li className="mb-2 flex justify-between">
                  <span className="font-medium">Monday - Thursday</span>
                  <span>5:00 PM - 10:00 PM</span>
                </li>
                <li className="mb-2 flex justify-between">
                  <span className="font-medium">Friday - Saturday</span>
                  <span>5:00 PM - 11:00 PM</span>
                </li>
                <li className="mb-2 flex justify-between">
                  <span className="font-medium">Sunday</span>
                  <span>4:00 PM - 9:00 PM</span>
                </li>
                <li className="mb-2 flex justify-between">
                  <span className="font-medium">Weekend Brunch</span>
                  <span>10:00 AM - 2:00 PM</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <a 
                  href="#" 
                  className="bg-[#C97C5D] hover:bg-[#722F37] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Facebook"
                >
                  <FaFacebookF />
                </a>
                <a 
                  href="#" 
                  className="bg-[#C97C5D] hover:bg-[#722F37] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Instagram"
                >
                  <FaInstagram />
                </a>
                <a 
                  href="#" 
                  className="bg-[#C97C5D] hover:bg-[#722F37] text-white w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300"
                  aria-label="Twitter"
                >
                  <FaTwitter />
                </a>
              </div>
            </div>
          </motion.div>
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-[#F7F3E8] rounded-lg overflow-hidden shadow-lg h-[400px]">
              <div id="google-map" className="w-full h-full"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
