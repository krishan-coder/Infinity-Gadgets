
export const products = [
  // Gaming Products
  {
    id: '1',
    name: 'ASUS ROG Strix GeForce RTX 4080',
    description: 'Experience gaming at its finest with the ASUS ROG Strix GeForce RTX 4080. Features advanced cooling and RGB lighting.',
    price: 1199,
    originalPrice: 1299,
    discount: 8,
    category: 'gaming',
    subcategory: 'graphics-cards',
    images: [
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500',
      'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Memory': '16GB GDDR6X',
      'Base Clock': '2505 MHz',
      'Boost Clock': '2595 MHz',
      'Memory Speed': '22.4 Gbps',
      'Interface': 'PCIe 4.0 x16'
    },
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: 127,
    featured: true
  },
  {
    id: '2',
    name: 'Razer DeathAdder V3 Pro Gaming Mouse',
    description: 'Professional esports gaming mouse with 30K DPI sensor and 90-hour battery life.',
    price: 149,
    originalPrice: 179,
    discount: 17,
    category: 'gaming',
    subcategory: 'peripherals',
    images: [
      'https://images.pexels.com/photos/2115257/pexels-photo-2115257.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'DPI': 'Up to 30,000',
      'Battery Life': '90 hours',
      'Connectivity': 'Wireless 2.4GHz',
      'Weight': '95g',
      'Switches': 'Razer Optical'
    },
    inStock: true,
    stockCount: 45,
    rating: 4.7,
    reviews: 89,
    featured: true
  },
  {
    id: '3',
    name: 'AMD Ryzen 9 7900X Processor',
    description: '12-core, 24-thread processor with 5.6 GHz max boost for ultimate performance.',
    price: 399,
    category: 'components',
    subcategory: 'processors',
    images: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Cores': '12',
      'Threads': '24',
      'Base Clock': '4.7 GHz',
      'Max Boost': '5.6 GHz',
      'Cache': '76MB',
      'TDP': '170W'
    },
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    name: 'Corsair Vengeance LPX 32GB DDR4',
    description: 'High-performance DDR4 memory designed for overclocking and gaming.',
    price: 139,
    originalPrice: 159,
    discount: 13,
    category: 'components',
    subcategory: 'memory',
    images: [
      'https://images.pexels.com/photos/1029757/pexels-photo-1029757.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR4-3200',
      'Latency': 'CL16',
      'Voltage': '1.35V',
      'Profile': 'XMP 2.0'
    },
    inStock: true,
    stockCount: 67,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '5',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: 'Blazing fast PCIe 4.0 NVMe SSD with up to 7,000 MB/s read speeds.',
    price: 199,
    originalPrice: 249,
    discount: 20,
    category: 'components',
    subcategory: 'storage',
    images: [
      'https://images.pexels.com/photos/163100/circuit-circuit-board-resistor-computer-163100.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4',
      'Sequential Read': '7,000 MB/s',
      'Sequential Write': '6,900 MB/s',
      'Form Factor': 'M.2 2280'
    },
    inStock: true,
    stockCount: 34,
    rating: 4.8,
    reviews: 198,
    featured: true
  },
  // Commercial Products
  {
    id: '6',
    name: 'Dell OptiPlex 7090 Business Desktop',
    description: 'Powerful business desktop with Intel Core i7 processor and comprehensive security features.',
    price: 899,
    category: 'commercial',
    subcategory: 'desktops',
    images: [
      'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Processor': 'Intel Core i7-11700',
      'Memory': '16GB DDR4',
      'Storage': '512GB SSD',
      'Graphics': 'Intel UHD Graphics',
      'OS': 'Windows 11 Pro'
    },
    inStock: true,
    stockCount: 18,
    rating: 4.5,
    reviews: 76
  },
  // Accessories
  {
    id: '7',
    name: 'Logitech MX Master 3S Wireless Mouse',
    description: 'Advanced wireless mouse with MagSpeed scrolling and multi-device connectivity.',
    price: 99,
    category: 'accessories',
    subcategory: 'mice',
    images: [
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'DPI': 'Up to 8,000',
      'Battery': 'Up to 70 days',
      'Connectivity': 'Bluetooth + 2.4GHz',
      'Buttons': '7',
      'Compatibility': 'Multi-OS'
    },
    inStock: true,
    stockCount: 89,
    rating: 4.7,
    reviews: 145
  },
  {
    id: '8',
    name: 'Mechanical RGB Gaming Keyboard',
    description: 'Full-size mechanical keyboard with Cherry MX switches and customizable RGB lighting.',
    price: 129,
    originalPrice: 149,
    discount: 13,
    category: 'gaming',
    subcategory: 'keyboards',
    images: [
      'https://images.pexels.com/photos/1194713/pexels-photo-1194713.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Switches': 'Cherry MX Red',
      'Backlighting': 'RGB',
      'Layout': '104-key',
      'Connection': 'USB-C',
      'Features': 'Anti-ghosting'
    },
    inStock: true,
    stockCount: 56,
    rating: 4.6,
    reviews: 203,
    featured: true
  }, 
  {
    id: '9',
    name: 'RGB Gaming Keyboard',
    description: 'A mechanical keyboard with customizable RGB lighting and hot-swappable switches.',
    price: 129.99,
    originalPrice: 149.99,
    discount: 15,
    category: 'gaming',
    subcategory: 'keyboard',
    images: [
      'https://imgs.search.brave.com/iIu4OUto7tu4h7Uv2u5t1NuuY5Di3srrRje5RGiMLe4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/NTE3Mzg2Ni9waG90/by9nYW1pbmcta2V5/Ym9hcmQtd2l0aC1y/Z2ItbGlnaHQtd2hp/dGUtbWVjaGFuaWNh/bC1rZXlib2FyZC1n/YW1lcnMtd29ya3Nw/YWNlLW5lb24tbGln/aHQuanBnP3M9NjEy/eDYxMiZ3PTAmaz0y/MCZjPUFnWmlSUkd4/N1AzQ2VpdG5JcVN6/TTlrOHFCZ1lmb1FK/Mnk0dmpzQWZfWVk9?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Key Type': 'Mechanical',
      'Backlighting': 'RGB'
    },
    inStock: true,
    stockCount: 50,
    rating: 4.7,
    reviews: 154,
    featured: true
  },
  {
    id: '10',
    name: 'Wireless Gaming Mouse',
    description: 'High-precision mouse with low latency for serious gamers.',
    price: 79.99,
    originalPrice: 79.99,
    discount: 0,
    category: 'gaming',
    subcategory: 'mouse',
    images: [
      'https://redragonshop.com/cdn/shop/files/PREDATORM612PROgamingmouse_1.png?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'DPI': '20000',
      'Connectivity': 'Wireless'
    },
    inStock: true,
    stockCount: 120,
    rating: 4.5,
    reviews: 210
  },
  {
    id: '11',
    name: '4K Ultra HD Monitor',
    description: 'Stunning visuals for work and play.',
    price: 499.99,
    originalPrice: 549.99,
    discount: 50,
    category: 'components',
    subcategory: 'monitor',
    images: [
      'https://m.media-amazon.com/images/I/81bQEQgABvL.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Resolution': '3840x2160',
      'Refresh Rate': '144Hz'
    },
    inStock: true,
    stockCount: 5,
    rating: 4.8,
    reviews: 95
  },
  {
    id: '12',
    name: 'Ergonomic Office Chair',
    description: 'Designed for long hours of comfortable work.',
    price: 249.99,
    originalPrice: 249.99,
    discount: 0,
    category: 'commercial',
    subcategory: 'gaming',
    images: [
      'https://assets.wfcdn.com/im/47705549/resize-h400-w400%5Ecompr-r85/3387/338728218/Lidwien+Ergonomic+Breathable+Mesh+Office+Chair.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Material': 'Mesh',
      'Weight Capacity': '300lbs'
    },
    inStock: false,
    stockCount: 0,
    rating: 4.2,
    reviews: 320
  },
  {
    id: '13',
    name: 'USB-C Docking Station',
    description: 'Expand your laptop\'s connectivity with this powerful dock.',
    price: 149.99,
    originalPrice: 174.99,
    discount: 25,
    category: 'accessories',
    subcategory: 'docking-station',
    images: [
      'https://manhattanproducts.us/cdn/shop/files/usb-c-pd-10-in-1-dual-hdmi-monitor-docking-station-multiport-hub-190398-1.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Ports': 'HDMI, USB-A, USB-C'
    },
    inStock: true,
    stockCount: 80,
    rating: 4.6,
    reviews: 88,
    featured: true
  },
  {
    id: '14',
    name: 'Gaming Headset',
    description: 'Immersive sound and a noise-cancelling microphone.',
    price: 99.99,
    originalPrice: 109.99,
    discount: 10,
    category: 'gaming',
    subcategory: 'headset',
    images: [
      'https://static.vecteezy.com/system/resources/thumbnails/049/725/302/small/extreme-closeup-of-a-headset-emphasizing-the-block-voice-chat-feature-for-added-safety-while-gaming-online-photo.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Audio': '7.1 Surround Sound',
      'Mic': 'Noise-Cancelling'
    },
    inStock: true,
    stockCount: 200,
    rating: 4.3,
    reviews: 250
  },
  {
    id: '15',
    name: 'CPU Liquid Cooler',
    description: 'Keep your processor running cool under heavy loads.',
    price: 119.99,
    originalPrice: 119.99,
    discount: 0,
    category: 'components',
    subcategory: 'cooler',
    images: [
      'https://images.pexels.com/photos/1591062/pexels-photo-1591062.jpeg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Radiator Size': '240mm',
      'Fan Speed': '2000 RPM'
    },
    inStock: true,
    stockCount: 35,
    rating: 4.9,
    reviews: 75,
    featured: true
  },
  {
    id: '16',
    name: 'Webcam',
    description: 'Crisp 1080p video for video calls and streaming.',
    price: 59.99,
    originalPrice: 59.99,
    discount: 0,
    category: 'accessories',
    subcategory: 'webcam',
    images: [
      'https://m.media-amazon.com/images/I/61Z8eKKUIcL.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Resolution': '1080p',
      'Frame Rate': '60fps'
    },
    inStock: true,
    stockCount: 150,
    rating: 4.1,
    reviews: 190
  },
  {
    id: '17',
    name: 'Gaming Mousepad',
    description: 'Large, smooth surface for precise mouse movements.',
    price: 29.99,
    originalPrice: 29.99,
    discount: 0,
    category: 'gaming',
    subcategory: 'mousepad',
    images: [
      'https://m.media-amazon.com/images/I/715VRSigTSL.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Size': 'XL',
      'Material': 'Cloth'
    },
    inStock: true,
    stockCount: 100,
    rating: 4.6,
    reviews: 60
  },
  {
    id: '18',
    name: 'Mechanical Gaming Keyboard',
    description: 'Tactile and responsive keys for a satisfying gaming experience.',
    price: 139.99,
    originalPrice: 159.99,
    discount: 20,
    category: 'gaming',
    subcategory: 'keyboard',
    images: [
      'https://cdn.thewirecutter.com/wp-content/media/2024/04/mechanicalkeyboards-2048px-1385.jpg?auto=compress&cs=tinysrgb&w=500'
    ],
    specifications: {
      'Key Type': 'Mechanical',
      'Switch': 'Cherry MX Red'
    },
    inStock: true,
    stockCount: 20,
    rating: 4.8,
    reviews: 135
  },
];