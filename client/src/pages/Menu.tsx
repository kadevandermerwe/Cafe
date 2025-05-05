import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ChevronRight, Coffee, Utensils, Beef, Dessert } from "lucide-react";

type MenuCategory = "starters" | "mains" | "desserts" | "drinks";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  featured?: boolean;
}

export default function Menu() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("starters");
  const menuRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    document.title = "Menu | Rustic Table";
    
    // Animate menu items when they come into view using Intersection Observer
    const setupMenuAnimations = () => {
      const menuObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const items = document.querySelectorAll('.menu-item');
              items.forEach((item, index) => {
                gsap.fromTo(
                  item,
                  { y: 20, opacity: 0 },
                  { 
                    y: 0, 
                    opacity: 1,
                    duration: 0.6,
                    delay: index * 0.1,
                    ease: "power2.out"
                  }
                );
              });
              
              // Once animation is triggered, disconnect the observer
              menuObserver.disconnect();
            }
          });
        },
        { threshold: 0.1 }
      );
      
      // Observe the menu grid
      const menuGrid = document.querySelector('.menu-grid');
      if (menuGrid) {
        menuObserver.observe(menuGrid);
      }
    };
    
    if (typeof window !== 'undefined') {
      // Wait for DOM to be ready
      setTimeout(setupMenuAnimations, 100);
    }
  }, [activeTab]); // Re-run when active tab changes

  const menuItems: Record<MenuCategory, MenuItem[]> = {
    starters: [
      {
        id: 1,
        name: "Rustic Bruschetta",
        description: "Grilled artisanal bread rubbed with garlic, topped with heritage tomatoes, extra virgin olive oil, flaky sea salt, and fresh basil from our garden.",
        price: "£10",
        image: "https://images.unsplash.com/photo-1625944525533-473dc8c3c54b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        featured: true
      },
      {
        id: 2,
        name: "Wild Mushroom Arancini",
        description: "Hand-crafted risotto balls with locally foraged mushrooms, stuffed with fontina cheese, lightly fried and served with truffle aioli.",
        price: "£12",
        image: "https://images.unsplash.com/photo-1559737558-2f5a35f4523b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 3,
        name: "Grass-Fed Beef Carpaccio",
        description: "Thinly sliced raw beef from local pastures, drizzled with cold-pressed olive oil, fresh lemon juice, topped with wild capers and 24-month aged Parmesan.",
        price: "£14",
        image: "https://images.unsplash.com/photo-1607355739828-0bf365440db5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 4,
        name: "Heritage Caprese",
        description: "Handmade burrata, heritage tomatoes, and sweet basil, finished with aged balsamic reduction and Ligurian olive oil.",
        price: "£11",
        image: "https://images.unsplash.com/photo-1601315379719-56d8190159c5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    mains: [
      {
        id: 5,
        name: "Cedar-Planked Salmon",
        description: "Wild-caught Atlantic salmon, slow-roasted on cedar wood, with preserved lemon dill sauce, served with seasonal root vegetables and herb-infused potato purée.",
        price: "£24",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        featured: true
      },
      {
        id: 6,
        name: "12-Hour Braised Short Ribs",
        description: "Slow-cooked grass-fed beef short ribs in a rich red wine reduction with rosemary and thyme, served with stone-ground creamy polenta and glazed heritage carrots.",
        price: "£28",
        image: "https://images.unsplash.com/photo-1544025162-d76694265947?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 7,
        name: "Foraged Mushroom Risotto",
        description: "Slowly stirred Carnaroli rice with a medley of seasonal wild mushrooms, finished with 24-month aged Parmesan and white truffle oil.",
        price: "£20",
        image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      },
      {
        id: 8,
        name: "Heritage Herb-Roasted Chicken",
        description: "Free-range chicken from local farms, slow-roasted with fresh herb bundle, served with confit garlic mashed potatoes and seasonal vegetables.",
        price: "£22",
        image: "https://images.unsplash.com/photo-1532550907401-a500c9a57435?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    desserts: [
      {
        id: 9,
        name: "Classic Tiramisu",
        description: "Handcrafted Italian dessert with layers of espresso-soaked ladyfingers and mascarpone cream, dusted with Valrhona cocoa powder.",
        price: "£8",
        image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        featured: true
      },
      {
        id: 10,
        name: "Dark Chocolate Lava Cake",
        description: "Warm 70% single-origin chocolate cake with a molten center, served with house-made vanilla bean ice cream and seasonal berries.",
        price: "£10",
        image: "https://images.unsplash.com/photo-1579306194872-64d3b7bac4c2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ],
    drinks: [
      {
        id: 11,
        name: "Rustic Old Fashioned",
        description: "Our signature take on the classic cocktail with small-batch whisky, house-made aromatic bitters, and orange peel, served over hand-cut ice.",
        price: "£12",
        image: "https://images.unsplash.com/photo-1470337458703-46ad1756a187?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80",
        featured: true
      },
      {
        id: 12,
        name: "Garden Elderflower Spritz",
        description: "Refreshing spritz with St. Germain elderflower liqueur, organic prosecco, and sparkling water, garnished with fresh edible flowers and herbs.",
        price: "£11",
        image: "https://images.unsplash.com/photo-1536935338788-846bb9981813?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=300&q=80"
      }
    ]
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1]
      }
    }
  };

  // Get featured items to display at top
  const featuredItems = Object.values(menuItems)
    .flat()
    .filter(item => item.featured);

  // Get category icon
  const getCategoryIcon = (category: MenuCategory) => {
    switch(category) {
      case 'starters': return <Utensils className="w-5 h-5" />;
      case 'mains': return <Beef className="w-5 h-5" />;
      case 'desserts': return <Dessert className="w-5 h-5" />;
      case 'drinks': return <Coffee className="w-5 h-5" />;
    }
  };

  return (
    <div className="pt-24 pb-20 overflow-hidden" ref={menuRef}>
      {/* Hero banner */}
      <div className="relative h-64 md:h-80 mb-16 overflow-hidden">
        <div className="absolute inset-0 bg-accent/5 -z-10"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-primary/5 to-transparent -z-10"></div>
        
        <div className="container mx-auto px-6 sm:px-8 h-full flex flex-col justify-center">
          <div className="max-w-3xl">
            <span className="handwritten text-2xl text-primary block mb-3">Our Offerings</span>
            <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4">
              Seasonal <span className="brush-stroke text-primary">Menu</span>
            </h1>
            <p className="text-lg md:text-xl text-foreground/80 max-w-2xl">
              Crafted with care using the finest locally-sourced ingredients, our menu reflects the bounty of the season.
            </p>
          </div>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute -right-16 -bottom-16 w-64 h-64 rounded-full bg-primary opacity-5"></div>
        <div className="absolute right-1/4 top-0 w-32 h-32 rounded-full bg-secondary opacity-5"></div>
      </div>
      
      <div className="container mx-auto px-6 sm:px-8">
        {/* Featured dishes section */}
        {featuredItems.length > 0 && (
          <section className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-2xl md:text-3xl font-serif font-semibold mb-4">
                Chef's <span className="text-primary">Recommendations</span>
              </h2>
              <div className="w-20 h-1 bg-primary/30 mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredItems.map((item) => (
                <motion.div
                  key={`featured-${item.id}`}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                  className="relative bg-white rounded-xl overflow-hidden shadow-xl group"
                >
                  <div className="relative h-52 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover transition-all duration-700 ease-in-out group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-primary text-white text-sm px-3 py-1 rounded-full z-20">
                      Featured
                    </div>
                  </div>
                  
                  <div className="p-6">
                    <h3 className="text-xl font-serif font-semibold mb-2 group-hover:text-primary transition-colors duration-300">
                      {item.name}
                    </h3>
                    <p className="text-foreground/70 text-sm mb-4 line-clamp-2">
                      {item.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="menu-item-price text-lg">{item.price}</span>
                      <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                        {getCategoryIcon(Object.entries(menuItems).find(
                          ([_, items]) => items.some(menuItem => menuItem.id === item.id)
                        )?.[0] as MenuCategory)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}
        
        {/* Menu Navigation */}
        <div className="flex justify-center mb-12 overflow-x-auto py-2">
          <nav className="inline-flex rounded-full bg-muted p-1.5 shadow-md">
            {(["starters", "mains", "desserts", "drinks"] as MenuCategory[]).map((tab) => (
              <button 
                key={tab}
                className={`relative overflow-hidden px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 flex items-center gap-2 ${
                  activeTab === tab 
                    ? 'bg-primary text-white shadow-md' 
                    : 'text-foreground/80 hover:text-foreground hover:bg-muted-foreground/10'
                }`}
                onClick={() => setActiveTab(tab)}
              >
                <span className="relative z-10">{getCategoryIcon(tab)}</span>
                <span className="capitalize relative z-10">{tab}</span>
              </button>
            ))}
          </nav>
        </div>
        
        {/* Menu Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto menu-grid"
          >
            <motion.div 
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {menuItems[activeTab].map((item) => (
                <motion.div 
                  key={item.id}
                  variants={itemVariants}
                  className="menu-item group"
                >
                  <div className="flex space-x-4 h-full">
                    <div className="w-28 h-28 overflow-hidden rounded-xl flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-start gap-2">
                        <h3 className="text-xl font-serif font-semibold group-hover:text-primary transition-colors duration-300">
                          {item.name}
                        </h3>
                        <span className="menu-item-price whitespace-nowrap">{item.price}</span>
                      </div>
                      <p className="text-foreground/70 mt-2 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </AnimatePresence>
        
        {/* Seasonal note */}
        <div className="mt-16 max-w-2xl mx-auto text-center">
          <div className="p-8 bg-accent/5 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-paper opacity-30"></div>
            <div className="relative z-10">
              <span className="handwritten text-xl text-primary">A note from our chef</span>
              <p className="mt-3 italic text-foreground/80">
                "Our menu changes with the seasons to showcase the finest local ingredients at their peak. 
                We work closely with local farmers, foragers, and artisans to bring you a truly authentic 
                farm-to-table experience."
              </p>
            </div>
          </div>
          
          <div className="mt-10">
            <a 
              href="#book" 
              className="button-primary group px-10 py-4 inline-flex items-center gap-2"
            >
              <span className="relative z-10">Reserve Your Table</span>
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 relative z-10" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
