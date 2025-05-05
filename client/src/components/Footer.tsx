import { Link } from "wouter";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-[#333333] text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="handwritten text-2xl mb-4 text-[#C97C5D]">Rustic Table</h3>
            <p className="mb-4">Crafting memorable dining experiences with seasonal ingredients and warm hospitality.</p>
            <div className="flex space-x-4">
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a 
                href="#" 
                className="text-gray-400 hover:text-white transition-all duration-300"
                aria-label="Twitter"
              >
                <FaTwitter />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  href="/"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link 
                  href="/menu"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Menu
                </Link>
              </li>
              <li>
                <Link 
                  href="/about"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link 
                  href="/contact"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Contact
                </Link>
              </li>
              <li>
                <a 
                  href="#book"
                  className="text-gray-400 hover:text-white transition-all duration-300"
                >
                  Reservations
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Contact</h4>
            <address className="not-italic text-gray-400">
              <p className="mb-2">123 Main Street</p>
              <p className="mb-2">Cityville, State 12345</p>
              <p className="mb-2">(123) 456-7890</p>
              <p>info@rustictable.com</p>
            </address>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Hours</h4>
            <ul className="text-gray-400">
              <li className="mb-2">Mon-Thu: 5:00 PM - 10:00 PM</li>
              <li className="mb-2">Fri-Sat: 5:00 PM - 11:00 PM</li>
              <li className="mb-2">Sun: 4:00 PM - 9:00 PM</li>
              <li>Weekend Brunch: 10:00 AM - 2:00 PM</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Rustic Table. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
