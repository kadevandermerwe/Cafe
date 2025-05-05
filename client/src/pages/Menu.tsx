import { useEffect, useState } from "react";
import { motion } from "framer-motion";

type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

export default function Menu() {
  useEffect(() => {
    document.title = "Menu | Rustic Table";
  }, []);

  const [activeTab, setActiveTab] = useState<MenuCategory>("starters");

  const menuItems: Record<MenuCategory, MenuItem[]> = {
    starters: [
      {
        id: 1,
        name: "Bruschetta",
        description: "Grilled bread rubbed with garlic and topped with olive oil, salt, tomato, and fresh basil.",
        price: "$12",
        image: "https://images.unsplash.com/photo-1625944525533-473dc8c3c54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 2,
        name: "Arancini",
        description: "Stuffed rice balls coated with breadcrumbs and fried, filled with ragù, mozzarella, and peas.",
        price: "$14",
        image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 3,
        name: "Beef Carpaccio",
        description: "Thinly sliced raw beef drizzled with olive oil, lemon juice, and topped with capers and shaved Parmesan.",
        price: "$16",
        image: "https://images.unsplash.com/photo-1607355739828-0bf365440db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 4,
        name: "Caprese Salad",
        description: "Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1601315379719-56d8190159c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    mains: [
      {
        id: 5,
        name: "Grilled Salmon",
        description: "Fresh Atlantic salmon with a lemon dill sauce, served with seasonal vegetables and herb-roasted potatoes.",
        price: "$28",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 6,
        name: "Braised Short Ribs",
        description: "Slow-cooked beef short ribs in a rich red wine reduction with creamy polenta and glazed carrots.",
        price: "$32",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 7,
        name: "Wild Mushroom Risotto",
        description: "Creamy Arborio rice with assorted wild mushrooms, finished with Parmesan cheese and truffle oil.",
        price: "$24",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 8,
        name: "Herb-Roasted Chicken",
        description: "Free-range chicken roasted with fresh herbs, served with garlic mashed potatoes and seasonal vegetables.",
        price: "$26",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    desserts: [
      {
        id: 9,
        name: "Tiramisu",
        description: "Classic Italian dessert with layers of coffee-soaked ladyfingers and mascarpone cheese.",
        price: "$10",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 10,
        name: "Chocolate Lava Cake",
        description: "Warm chocolate cake with a molten center, served with vanilla ice cream and fresh berries.",
        price: "$12",
        image: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    drinks: [
      {
        id: 11,
        name: "Signature Old Fashioned",
        description: "Our take on the classic cocktail with bourbon, house-made bitters, and orange zest.",
        price: "$14",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 12,
        name: "Elderflower Spritz",
        description: "Refreshing cocktail with St. Germain elderflower liqueur, prosecco, and soda water.",
        price: "$13",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ]
  };

  return (
    <section id="menu" className="pt-24 pb-16 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-4"
          >
            Our Menu
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg"
          >
            Crafted with care and locally-sourced ingredients
          </motion.p>
        </div>
        
        {/* Menu Navigation */}
        <div className="flex justify-center mb-12">
          <nav className="inline-flex flex-wrap justify-center bg-[#F7F3E8] rounded-lg p-1 shadow-sm">
            <button 
              className={`menu-tab px-6 py-2 rounded-lg ${activeTab === 'starters' 
                ? 'bg-[#C97C5D] text-white' 
                : 'text-[#333333] hover:bg-[#B4C7A5] hover:text-white transition-all duration-300'}`}
              onClick={() => setActiveTab('starters')}
            >
              Starters
            </button>
            <button 
              className={`menu-tab px-6 py-2 rounded-lg ${activeTab === 'mains' 
                ? 'bg-[#C97C5D] text-white' 
                : 'text-[#333333] hover:bg-[#B4C7A5] hover:text-white transition-all duration-300'}`}
              onClick={() => setActiveTab('mains')}
            >
              Main Courses
            </button>
            <button 
              className={`menu-tab px-6 py-2 rounded-lg ${activeTab === 'desserts' 
                ? 'bg-[#C97C5D] text-white' 
                : 'text-[#333333] hover:bg-[#B4C7A5] hover:text-white transition-all duration-300'}`}
              onClick={() => setActiveTab('desserts')}
            >
              Desserts
            </button>
            <button 
              className={`menu-tab px-6 py-2 rounded-lg ${activeTab === 'drinks' 
                ? 'bg-[#C97C5D] text-white' 
                : 'text-[#333333] hover:bg-[#B4C7A5] hover:text-white transition-all duration-300'}`}
              onClick={() => setActiveTab('drinks')}
            >
              Drinks
            </button>
          </nav>
        </div>
        
        {/* Menu Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="max-w-5xl mx-auto"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {menuItems[activeTab].map((item) => (
              <motion.div 
                key={item.id}
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="flex space-x-4 p-4 rounded-lg hover:bg-[#F7F3E8] transition-all duration-300"
              >
                <img 
                  src={item.image} 
                  alt={item.name} 
                  className="w-24 h-24 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl font-semibold">{item.name}</h3>
                    <span className="font-medium text-[#C97C5D]">{item.price}</span>
                  </div>
                  <p className="text-gray-600 mt-1">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        <div className="text-center mt-16">
          <a 
            href="#book" 
            className="inline-block bg-[#C97C5D] hover:bg-[#722F37] text-white px-8 py-3 rounded-lg transition-all duration-300"
          >
            Reserve Your Table
          </a>
        </div>
      </div>
    </section>
  );
}
