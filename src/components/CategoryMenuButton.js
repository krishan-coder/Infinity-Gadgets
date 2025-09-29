'use client';
import React, { useState, useEffect } from 'react';
import { Menu, ChevronDown, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- A simple hook to detect screen size for responsiveness ---
const useMediaQuery = (query) => {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    window.addEventListener('resize', listener);
    return () => window.removeEventListener('resize', listener);
  }, [matches, query]);

  return matches;
};


// --- CATEGORY DATA (No changes needed here) ---
const CATEGORY_DATA = [
  // --- DIY COOLING ---
  {
    name: 'DIY Cooling',
    href: '/products?type=diy-cooling',
    flyout: [
      {
        title: 'Core Components',
        items: [
          { name: 'CPU Water Block', href: '/products?type=diy-cooling&mode=water-block' },
          { name: 'GPU Water Block', href: '/products?type=diy-cooling&mode=water-block' },
          { name: 'Pump & Reservoir', href: '/products?type=diy-cooling&mode=reservoir' },
          { name: 'Radiator', href: '/products?type=diy-cooling&mode=radiator' },
          { name: 'Distro Plate', href: '/products?type=diy-cooling&mode=distro-plate' },
        ]
      },
      {
        title: 'Connectivity & Fluids',
        items: [
          { name: 'Fitting Adapter', href: '/products?type=diy-cooling&mode=fitting-adapter' },
          { name: 'Tubing', href: '/products?type=diy-cooling&mode=tubing' },
          { name: 'Coolant', href: '/products?type=diy-cooling&mode=coolant' },
        ]
      },
      {
        title: 'Accessories',
        items: [
          { name: 'Cooling Accessories', href: '/products?type=diy-cooling&mode=cooling-accessories' },
        ]
      },
    ]
  },

  // --- PROCESSOR ---
  {
    name: 'Processor',
    href: '/products?type=processor',
    flyout: [
      {
        title: 'AMD Ryzen Series',
        items: [
          { name: 'RYZEN 3', href: '/products?type=processor&brand=amd&series=r3' },
          { name: 'RYZEN 5', href: '/products?type=processor&brand=amd&series=r5' },
          { name: 'RYZEN 7', href: '/products?type=processor&brand=amd&series=r7' },
          { name: 'RYZEN 9', href: '/products?type=processor&brand=amd&series=r9' },
          { name: 'RYZEN THREADRIPPER', href: '/products?type=processor&brand=amd&series=tr' },
        ]
      },
      {
        title: 'AMD Generation',
        items: [
          { name: 'AMD 9000 Series', href: '/products?type=processor&brand=amd&gen=9000' },
          { name: 'AMD 8000 Series', href: '/products?type=processor&brand=amd&gen=8000' },
          { name: 'AMD 7000 Series', href: '/products?type=processor&brand=amd&gen=7000' },
          { name: 'AMD 5000 Series', href: '/products?type=processor&brand=amd&gen=5000' },
          { name: 'AMD 4000 Series', href: '/products?type=processor&brand=amd&gen=4000' },
          { name: 'AMD 3000 Series', href: '/products?type=processor&brand=amd&gen=3000' },
        ]
      },
      {
        title: 'Intel Core & Gen',
        items: [
          { name: 'CORE i3', href: '/products?type=processor&brand=intel&series=i3' },
          { name: 'CORE i5', href: '/products?type=processor&brand=intel&series=i5' },
          { name: 'CORE i7', href: '/products?type=processor&brand=intel&series=i7' },
          { name: 'CORE i9', href: '/products?type=processor&brand=intel&series=i9' },
          { name: 'CORE ULTRA 5', href: '/products?type=processor&brand=intel&series=u5' },
          { name: 'INTEL 14th Gen', href: '/products?type=processor&brand=intel&gen=14' },
          { name: 'INTEL 13th Gen', href: '/products?type=processor&brand=intel&gen=13' },
          { name: 'INTEL 12th Gen', href: '/products?type=processor&brand=intel&gen=12' },
          { name: 'INTEL 11th Gen', href: '/products?type=processor&brand=intel&gen=11' },
          { name: 'INTEL 10th Gen', href: '/products?type=processor&brand=intel&gen=10' },
        ]
      },
    ]
  },

  // --- MOTHERBOARD ---
  {
    name: 'Motherboard',
    href: '/products?type=motherboard',
    flyout: [
      {
        title: 'AMD Chipset',
        items: [
          { name: 'A520', href: '/products?type=motherboard&chipset=a520' },
          { name: 'A620', href: '/products?type=motherboard&chipset=a620' },
          { name: 'B450', href: '/products?type=motherboard&chipset=b450' },
          { name: 'B550', href: '/products?type=motherboard&chipset=b550' },
          { name: 'B650', href: '/products?type=motherboard&chipset=b650' },
          { name: 'X870', href: '/products?type=motherboard&chipset=x870' },
          { name: 'X670', href: '/products?type=motherboard&chipset=x670' },
        ]
      },
      {
        title: 'Intel Chipset',
        items: [
          { name: 'B760', href: '/products?type=motherboard&chipset=b760' },
          { name: 'H610', href: '/products?type=motherboard&chipset=h610' },
          { name: 'H510', href: '/products?type=motherboard&chipset=h510' },
          { name: 'Z790', href: '/products?type=motherboard&chipset=z790' },
          { name: 'Z890', href: '/products?type=motherboard&chipset=z890' },
        ]
      },
      {
        title: 'Shop By Brand',
        items: [
          { name: 'ASUS', href: '/products?type=motherboard&brand=asus' },
          { name: 'ASROCK', href: '/products?type=motherboard&brand=asrock' },
          { name: 'GIGABYTE', href: '/products?type=motherboard&brand=gigabyte' },
          { name: 'MSI', href: '/products?type=motherboard&brand=msi' },
        ]
      },
    ]
  },
  
  // --- GRAPHICS CARD ---
  {
    name: 'Graphics Card',
    href: '/products?category=graphics-card',
    flyout: [
      {
        title: 'AMD GPU',
        items: [
          { name: 'RX 9000 Series', href: '/products?type=gpu&series=rx9000' },
          { name: 'RX 7000 Series', href: '/products?type=gpu&series=rx7000' },
          { name: 'RX 6000 Series', href: '/products?type=gpu&series=rx6000' },
        ]
      },
      {
        title: 'NVIDIA GPU',
        items: [
          { name: 'RTX 50 Series', href: '/products?type=gpu&serires=rtx50' },
          { name: 'RTX 40 Series', href: '/products?type=gpu&series=rtx40' },
          { name: 'RTX 30 Series', href: '/products?type=gpu&series=rtx30' },
          { name: 'NVIDIA QUADRO', href: '/products?type=gpu&series=quadro' },
          { name: 'INTEL ARC', href: '/products?type=gpu&series=intel-arc' },
        ]
      },
      {
        title: 'Shop By Brand',
        items: [
          { name: 'Asus', href: '/products?type=gpu&brand=asus' },
          { name: 'Asrock', href: '/products?type=gpu&brand=asrock' },
          { name: 'Gigabyte', href: '/products?type=gpu&brand=gigabyte' },
          { name: 'Inno3D', href: '/products?type=gpu&brand=inno3d' },
          { name: 'MSI', href: '/products?type=gpu&brand=msi' },
          { name: 'Sapphire', href: '/products?type=gpu&brand=sapphire' },
          { name: 'Zotac', href: '/products?type=gpu&brand=zotac' },
        ]
      },
    ]
  },

  // --- RAM ---
  {
    name: 'RAM',
    href: '/products?type=ram',
    flyout: [
      {
        title: 'Usage & Kit',
        items: [
          { name: 'Desktop', href: '/products?type=ram&usage=desktop' },
          { name: 'Laptop', href: '/products?type=ram&usage=laptop' },
          { name: 'Single Channel Kit', href: '/products?type=ram&kit=single' },
          { name: 'Dual Channel Kit', href: '/products?type=ram&kit=dual' },
          { name: 'Quad Channel Kit', href: '/products?type=ram&kit=quad' },
        ]
      },
      {
        title: 'By Type',
        items: [
          { name: 'DDR3', href: '/products?type=ram&ramtype=ddr3' },
          { name: 'DDR4', href: '/products?type=ram&ramtype=ddr4' },
          { name: 'DDR5', href: '/products?type=ram&ramtype=ddr5' },
        ]
      },
      {
        title: 'By Brand',
        items: [
          { name: 'Adata', href: '/products?type=ram&brand=adata' },
          { name: 'Corsair', href: '/products?type=ram&brand=corsair' },
          { name: 'G.Skill', href: '/products?type=ram&brand=gskill' },
          { name: 'Kingston', href: '/products?type=ram&brand=kingston' },
          { name: 'Thermaltake', href: '/products?type=ram&brand=thermaltake' },
        ]
      },
    ]
  },
  
  // --- STORAGE ---
  {
    name: 'Storage',
    href: '/products?type=storage',
    flyout: [
      {
        title: 'HDD',
        items: [
          { name: 'External Hard Drive', href: '/products?type=storage&storage=hdd&form=external' },
          { name: 'Internal Hard Drive', href: '/products?type=storage&storage=hdd&form=internal' },
          { name: 'Enterprise Hard Drive', href: '/products?type=storage&storage=hdd&form=enterprise' },
        ]
      },
      {
        title: 'SSD & NVMe',
        items: [
          { name: 'Sata 2.5 inch', href: '/products?type=storage&storage=ssd&interface=sata' },
          { name: 'NVMe Gen3', href: '/products?type=storage&storage=nvme&gen=3' },
          { name: 'NVMe Gen4', href: '/products?type=storage&storage=nvme&gen=4' },
          { name: 'NVMe Gen5', href: '/products?type=storage&storage=nvme&gen=5' },
          { name: 'External SSD', href: '/products?type=storage&storage=ssd&form=external' },
        ]
      },
      {
        title: 'Other & Brand',
        items: [
          { name: 'Pen Drive', href: '/products?type=storage&storage=other&form=pendrive' },
          { name: 'Memory Card', href: '/products?type=storage&storage=other&form=memorycard' },
          { name: 'Enclosure', href: '/products?type=storage&storage=other&form=enclosure' },
          { name: 'Adata', href: '/products?type=storage&brand=adata' },
          { name: 'Ant Esports', href: '/products?type=storage&brand=ant-esports' },
          { name: 'Kingston', href: '/products?type=storage&brand=kingston' },
          { name: 'Samsung', href: '/products?type=storage&brand=samsung' },
          { name: 'Western Digital', href: '/products?type=storage&brand=wd' },
        ]
      },
    ]
  },

  // --- SMPS (Power Supply) ---
  {
    name: 'SMPS',
    href: '/products?type=smps',
    flyout: [
      {
        title: 'Certification & Modularity',
        items: [
          { name: '80 Plus Platinum', href: '/products?type=smps&smps=platinum' },
          { name: '80 Plus Gold', href: '/products?type=smps&smps=gold' },
          { name: '80 Plus Bronze', href: '/products?type=smps&smps=bronze' },
          { name: 'Fully Modular', href: '/products?type=smps&modular=full' },
          { name: 'Semi Modular', href: '/products?type=smps&modular=semi' },
          { name: 'Non Modular', href: '/products?type=smps&modular=non' },
        ]
      },
      {
        title: 'Shop By Brands',
        items: [
          { name: 'ASUS', href: '/products?type=smps&brand=asus' },
          { name: 'Deepcool', href: '/products?type=smps&brand=deepcool' },
          { name: 'MSI', href: '/products?type=smps&brand=msi' },
          { name: 'Super Flower', href: '/products?type=smps&brand=super-flower' },
        ]
      },
      {
        title: 'Modular Cables',
        items: [
          { name: 'PSU Extension Cable Kit', href: '/products?type=smps&cable=ext-kit' },
          { name: 'ATX 24-Pin Cable', href: '/products?type=smps&cable=atx-24' },
          { name: 'PCIe 8-Pin Cable', href: '/products?type=smps&cable=pcie-8' },
        ]
      },
    ]
  },

  // --- CABINET ---
  {
    name: 'Cabinet',
    href: '/products?type=cabinet',
    flyout: [
      {
        title: 'Form Factor & Style',
        items: [
          { name: 'Full Tower', href: '/products?type=cabinet&form=full' },
          { name: 'Mid Tower', href: '/products?type=cabinet&form=mid' },
          { name: 'Mini Tower', href: '/products?type=cabinet&form=mini' },
          { name: 'ARGB Enable Case', href: '/products?type=cabinet&style=rgb-case' },
          { name: 'RGB Enable Case', href: '/products?type=cabinet&style=rgb-case' },
        ]
      },
      {
        title: 'Cabinet Fans',
        items: [
          { name: 'ARGB Case Fan', href: '/products?type=cabinet&fan=rgb' },
          { name: 'RGB Case Fan', href: '/products?type=cabinet&fan=rgb' },
          { name: 'LED Case Fan', href: '/products?type=cabinet&fan=led' },
          { name: 'Non LED Case Fan', href: '/products?type=cabinet&fan=non-led' },
        ]
      },
      {
        title: 'Case Accessories',
        items: [
          { name: 'RGB LED Strips', href: '/products?type=cabinet&acc=led-strips' },
          { name: 'Digital RGB Controller', href: '/products?type=cabinet&acc=rgb-controller' },
          { name: 'GPU Holder', href: '/products?type=cabinet&acc=gpu-holder' },
          { name: 'Riser Cable', href: '/products?type=cabinet&acc=riser-cable' },
        ]
      },
    ]
  },

  // --- PERIPHERALS ---
  {
    name: 'Peripherals',
    href: '/products?type=peripheral',
    flyout: [
      {
        title: 'Input & Audio',
        items: [
          { name: 'Mechanical Keyboard', href: '/products?type=peripheral&device=keyboard&devicetype=mech' },
          { name: 'Gaming Mouse', href: '/products?type=peripheral&device=mouse&devicetype=gaming' },
          { name: 'Wired Headphone', href: '/products?type=peripheral&device=headset&devicetype=wired' },
          { name: 'Wireless Headphone', href: '/products?type=peripheral&device=headset&devicetype=wireless' },
          { name: 'Webcam', href: '/products?type=peripheral&device=desktop&devicetype=webcam' },
          { name: 'Mouse & Matz Combo', href: '/products?type=peripheral&device=combo&devicetype=mouse-mat' },
        ]
      },
      {
        title: 'Networking & Power',
        items: [
          { name: 'Router', href: '/products?device=router' },
          { name: 'Switch', href: '/products?device=switch' },
          { name: 'UPS', href: '/products?device=ups' },
          { name: 'Surge Protector', href: '/products?device=surge' },
          { name: 'Modular Cables', href: '/products?modular=cables' },
          { name: 'Printer & Scanner', href: '/products?device=printer-scanner' },
        ]
      },
      {
        title: 'Mouse Matz & Other',
        items: [
          { name: 'RGB Matz', href: '/products?mat=rgb' },
          { name: 'Extended Size Matz', href: '/products?mat=extended' },
          { name: 'Large Size Matz', href: '/products?mat=large' },
          { name: 'Pen Tablet', href: '/products?desktop=pentablet' },
          { name: 'Speaker', href: '/products?desktop=speaker' },
        ]
      },
    ]
  },

  // --- LAPTOP ---
  {
    name: 'Laptop',
    href: '/products?type=laptop',
    flyout: [
      {
        title: 'Shop By Brand',
        items: [
          { name: 'ASUS', href: '/products?type=laptop&brand=asus' },
          { name: 'MSI', href: '/products?type=laptop&brand=msi' },
          { name: 'LENOVO', href: '/products?type=laptop&brand=lenovo' },
          { name: 'HP', href: '/products?type=laptop&brand=hp' },
          { name: 'DELL', href: '/products?type=laptop&brand=dell' },
        ]
      },
      {
        title: 'Accessories',
        items: [
          { name: 'Laptop Cooler', href: '/products?type=laptop&acc=cooler' },
          { name: 'Laptop RAM', href: '/products?type=laptop&acc=ram' },
        ]
      },
    ]
  },
  
  // --- MONITOR ---
  {
    name: 'Monitor',
    href: '/products?type=monitor',
    flyout: [
      {
        title: 'Shop By Type',
        items: [
          { name: 'Gaming Monitor', href: '/products?type=monitor&category=gaming' },
          { name: 'Professional', href: '/products?type=monitor&category=professional' },
          { name: '4K Monitor', href: '/products?type=monitor&resolution=4k' },
          { name: '2K Monitor', href: '/products?type=monitor&resolution=2k' },
        ]
      },
      {
        title: 'Shop By Size',
        items: [
          { name: '34 Inch', href: '/products?type=monitor&size=34' },
          { name: '32 Inch', href: '/products?type=monitor&size=32' },
          { name: '27 Inch', href: '/products?type=monitor&size=27' },
          { name: '24 Inch', href: '/products?type=monitor&size=24' },
          { name: '22 Inch', href: '/products?type=monitor&size=22' },
        ]
      },
      {
        title: 'Shop By Brand',
        items: [
          { name: 'Asus', href: '/products?type=monitor&brand=asus' },
          { name: 'BenQ', href: '/products?type=monitor&brand=benq' },
          { name: 'LG', href: '/products?type=monitor&brand=lg' },
          { name: 'MSI', href: '/products?type=monitor&brand=msi' },
          { name: 'Samsung', href: '/products?type=monitor&brand=samsung' },
          { name: 'Viewsonic', href: '/products?type=monitor&brand=viewsonic' },
        ]
      },
    ]
  },
  
  // --- Remaining simple categories ---
  { name: 'CPU Cooler', href: '/products?type=cpu-cooler' },
];

// ------------------------------------------------------------------
// --- Main Responsive Category Menu Component ---
// ------------------------------------------------------------------

const CategoryMenuButton = () => {
   const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(null);
  
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Reset state when switching between mobile and desktop views
  useEffect(() => {
    if (isDesktop) {
      setIsMenuOpen(false);
    }
  }, [isDesktop]);

  // --- Event Handlers ---
  const handleDesktopMenuEnter = () => isDesktop && setIsMenuOpen(true);
  const handleDesktopMenuLeave = () => isDesktop && (setIsMenuOpen(false), setActiveCategory(null));
  const handleDesktopCategoryEnter = (category) => isDesktop && setActiveCategory(category);
  
  const toggleMobileMenu = () => !isDesktop && setIsMenuOpen(!isMenuOpen);
  const handleMobileCategoryClick = (category) => {
    if (category.flyout) {
      setActiveCategory(active => active?.name === category.name ? null : category);
    }
  };

  const activeCategoryDetails = activeCategory ? CATEGORY_DATA.find(c => c.name === activeCategory.name) : null;

  const menuVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.2 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.15 } }
  };
  
  const flyoutVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.2, delay: 0.1 } },
    exit: { opacity: 0, x: -10, transition: { duration: 0.15 } }
  };
  
  const accordionVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { opacity: 1, height: 'auto', transition: { duration: 0.3, ease: "easeInOut" } },
    exit: { opacity: 0, height: 0, transition: { duration: 0.2, ease: "easeInOut" } }
  };
  
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      className="relative inline-block text-left"
      onMouseEnter={handleDesktopMenuEnter}
      onMouseLeave={handleDesktopMenuLeave}
    >
      {/* --- Main "All Categories" Button --- */}
      <button
        type="button"
        onClick={toggleMobileMenu}
        className="inline-flex justify-center items-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
        aria-expanded={isMenuOpen}
      >
        <Menu className="w-5 h-5 mr-2" />
        All Categories
        <ChevronDown 
          className={`-mr-1 ml-2 h-5 w-5 transition-transform duration-300 ${isMenuOpen ? 'rotate-180' : ''}`} 
        />
      </button>

      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* --- Mobile Overlay --- */}
            {!isDesktop && (
              <motion.div
                variants={overlayVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={toggleMobileMenu}
                className="fixed inset-0 bg-black/50 z-40"
              />
            )}
            
            {/* --- Main Flyout Container --- */}
            <motion.div
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute left-0 mt-2 z-50 rounded-xl shadow-2xl bg-white overflow-hidden
                         w-full max-w-xs lg:w-auto lg:max-w-none lg:flex"
            >
              {/* --- Left Panel: Main Category List --- */}
              <div className="w-64 border-r border-gray-100">
                <div className="flex justify-between items-center p-4 border-b lg:hidden">
                  <h3 className="text-lg font-bold text-gray-800">Categories</h3>
                  <button onClick={toggleMobileMenu} className="p-1 rounded-full hover:bg-gray-200">
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <ul className="list-none p-0 m-0 py-2">
                  {CATEGORY_DATA.map((category) => (
                    <li key={category.name} onMouseEnter={() => handleDesktopCategoryEnter(category)}>
                      <a
                        href={!isDesktop && !category.flyout ? category.href : undefined}
                        onClick={(e) => {
                          if (!isDesktop) {
                            if (category.flyout) e.preventDefault();
                            handleMobileCategoryClick(category);
                          }
                        }}
                        className={`flex justify-between items-center w-full px-4 py-3 text-sm font-medium
                                    transition-colors duration-150 ease-in-out cursor-pointer
                                    ${activeCategory?.name === category.name ? 'bg-blue-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                      >
                        {category.name}
                        {category.flyout && (
                          isDesktop ? <span className="text-lg leading-none">›</span> :
                          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${activeCategory?.name === category.name ? 'rotate-180' : ''}`} />
                        )}
                      </a>
                      {/* --- MOBILE: Accordion Content --- */}
                      {!isDesktop && (
                        <AnimatePresence>
                          {activeCategoryDetails?.name === category.name && category.flyout && (
                            <motion.div
                              variants={accordionVariants}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              className="overflow-hidden"
                            >
                              <div className="p-4 bg-gray-50 border-t">
                                {category.flyout.map((section) => (
                                  <div key={section.title} className="mb-4 last:mb-0">
                                    <h4 className="font-semibold text-blue-600 mb-2 border-b pb-1">{section.title}</h4>
                                    <ul className="space-y-1 text-sm">{section.items.map((item) => (
                                      <li key={item.name}><a href={item.href} className="block py-1 text-gray-600 hover:text-blue-500 hover:underline">{item.name}</a></li>
                                    ))}</ul>
                                  </div>
                                ))}
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
              {/* --- DESKTOP: Right Panel (Mega Menu) --- */}
              {isDesktop && (
                <AnimatePresence mode="wait">
                  {activeCategoryDetails?.flyout && (
                    <motion.div
                      key={activeCategoryDetails.name} // Key is crucial for AnimatePresence
                      variants={flyoutVariants}
                      initial="hidden"
                      animate="visible"
                      exit="exit"
                      className="min-w-[500px] p-6 grid grid-cols-3 gap-x-8 gap-y-6 bg-white"
                    >
                      {activeCategoryDetails.flyout.map((section) => (
                        <div key={section.title}>
                          <h4 className="font-semibold text-blue-600 mb-2 border-b pb-1">{section.title}</h4>
                          <ul className="space-y-1 text-sm">{section.items.map((item) => (
                            <li key={item.name}><a href={item.href} className="block py-1 text-gray-600 hover:text-blue-500 hover:underline transition-colors">{item.name}</a></li>
                          ))}</ul>
                        </div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryMenuButton;