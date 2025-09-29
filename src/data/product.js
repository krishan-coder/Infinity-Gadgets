export const products = [
  // Gaming Products
  {
    id: '1',
    name: 'ASUS ROG Strix GeForce RTX 4080',
    description: 'High-performance gaming graphics card powered by NVIDIA Ada Lovelace architecture, featuring advanced cooling, RGB lighting, and AI-powered graphics technologies.',
    price: 1199.99,
    originalPrice: 1299.99,
    discount: 8,
    category: 'gaming',
    type: 'graphics-card',
    brand: 'asus',
    series: 'rtx-4000',
    images: [
      'https://i.pinimg.com/1200x/4e/a0/0b/4ea00ba25339bac0740297410804fcaf.jpg',
    ],
    specifications: {
     'GPU Engine': 'NVIDIA GeForce RTX 4080',
    'CUDA Cores': '9728',
    'Boost Clock': 'Up to 2595 MHz (OC mode)',
    'Base Clock': '2205 MHz',
    'Memory': '16GB GDDR6X',
    'Memory Interface': '256-bit',
    'Memory Speed': '22.4 Gbps',
    'Bus Standard': 'PCI Express 4.0',
    'Power Connectors': '3 × 8-pin (via 16-pin adapter)',
    'Recommended PSU': '750W or higher',
    'Outputs': '2 × HDMI 2.1a, 3 × DisplayPort 1.4a',
    'Cooling': 'Axial-tech triple-fan design, 3.5-slot',
    'Dimensions': '357.6 × 149.3 × 70.1 mm'
    },
    inStock: true,
    stockCount: 15,
    rating: 4.8,
    reviews: 127,
    featured: true
  },
  {
    id: '2',
    name: 'Razer DeathAdder V3 Pro Wireless Gaming Mouse',
    description: 'Ultra-lightweight ergonomic wireless mouse with Razer HyperSpeed wireless, Focus Pro 30K optical sensor, and 90 million click lifecycle switches.',
    price: 6999,
    originalPrice: 26999,
    discount: 74,
    category: 'gaming',
    type: 'peripherals',
    device: 'mouse',
    devicetype: 'wireless',
    brand: 'razer',
    model: 'deathadder-v3-pro',
    images: [
      'https://i.pinimg.com/736x/9d/af/e2/9dafe208ef1279e685ccebb735973e6b.jpg'
    ],
    specifications: {
      'Sensor': 'Razer Focus Pro 30K Optical Sensor',
    'Sensitivity': '30,000 DPI (adjustable)',
    'Max Speed': '750 IPS',
    'Max Acceleration': '70G',
    'Switches': 'Razer Optical Mouse Switches Gen-3 (90M clicks)',
    'Buttons': '6 programmable',
    'Connectivity': 'Razer HyperSpeed Wireless, USB-C wired',
    'Battery Life': 'Up to 90 hours (HyperSpeed, no RGB)',
    'Weight': '63 g (white) / 64 g (black)',
    'Shape': 'Ergonomic right-handed',
      'Compatibility': 'PC, macOS, USB-C devices'
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
    description: '12-core, 24-thread processor based on AMD Zen 4 architecture, delivering elite gaming and creator performance with support for DDR5 and PCIe 5.0.',
    price: 36599,
    category: 'components',
    type: 'processor',
    images: [
      'https://i.pinimg.com/736x/e6/f9/b0/e6f9b0aa27b727f1e07ffffa52e0f67d.jpg',
      'https://i.pinimg.com/1200x/96/4c/b2/964cb2262d4143856c70a11d2a39cb07.jpg',
      'https://i.pinimg.com/1200x/9d/97/b6/9d97b68414217973eda3c5ca43c9c625.jpg'
    ],
    specifications: {
     'Architecture': 'Zen 4',
    'Cores / Threads': '12 / 24',
    'Base Clock': '4.7 GHz',
    'Max Boost Clock': 'Up to 5.6 GHz',
    'Cache': '76 MB (L2 + L3)',
    'TDP': '170W',
    'Socket': 'AM5',
    'Memory Support': 'DDR5, Dual Channel, up to 5200 MT/s',
    'PCIe Version': 'PCIe 5.0',
    'Integrated Graphics': 'AMD Radeon Graphics (2 cores, 2200 MHz)'
    },
    brand: 'amd',
    generation: '7000',
    series: 'r9',
    inStock: true,
    stockCount: 22,
    rating: 4.9,
    reviews: 156
  },
  {
    id: '4',
    name: 'Corsair Vengeance LPX 32GB DDR4',
    description:  'High-performance DDR4 memory designed for gamers and overclockers, built with pure aluminum heat spreader for faster heat dissipation and reliable performance.',
    price: 3990,
    originalPrice: 6649,
    discount: 40,
    category: 'components',
    type: 'ram',
    ramtype: 'ddr4',
    usage: 'desktop',
    brand: 'corsair',
    kit: 'dual',
    images: [
      'https://i.pinimg.com/736x/e1/97/a0/e197a0253da46b03fd34361d36cf9983.jpg',
      'https://i.pinimg.com/1200x/2b/88/3f/2b883f41fbd8dbd6a7c0446dafc71c54.jpg'
    ],
    specifications: {
       'Capacity': '32GB (2×16GB)',
    'Speed': 'DDR4-3200',
    'Latency': 'CL16',
    'Voltage': '1.35V',
    'Form Factor': 'DIMM',
    'Profile': 'Intel XMP 2.0',
    'Compatibility': 'Intel and AMD DDR4 platforms'
    },
    inStock: true,
    stockCount: 67,
    rating: 4.6,
    reviews: 234
  },
  {
    id: '5',
    name: 'Samsung 980 PRO 2TB NVMe SSD',
    description: "Blazing fast PCIe 4.0 NVMe SSD delivering up to 7,000 MB/s read speeds and exceptional endurance, ideal for gaming, content creation, and high-performance PCs.",
    price: 16999,
    originalPrice: 50999,
    discount: 66,
    category: 'components',
    type: 'storage',
    storage: 'ssd',
    interface: 'nvme',
    form: 'm.2',
    gen: '2',
    brand: 'samsung',
    images: [
      'https://i.pinimg.com/1200x/3e/27/92/3e27920e067be703a6f1265a7e051313.jpg',
      'https://i.pinimg.com/1200x/be/c4/b0/bec4b01c5ec1fe940f1bd1e995e27f22.jpg'
    ],
    specifications: {
       "Capacity": "2TB",
      "Interface": "PCIe 4.0 x4, NVMe 1.3c",
      "Sequential Read": "Up to 7,000 MB/s",
      "Sequential Write": "Up to 5,100 MB/s",
      "Random Read (4K, QD32)": "Up to 1,000K IOPS",
      "Random Write (4K, QD32)": "Up to 1,000K IOPS",
      "Form Factor": "M.2 2280",
      "Controller": "Samsung Elpis",
      "NAND": "Samsung V-NAND 3-bit MLC",
      "MTBF": "1.5 million hours",
      "Endurance": "1200 TBW",
      "Warranty": "1 Years Limited"
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
     name: "Dell Vostro 3681 Small Form Factor Desktop",
    description: "Compact and powerful desktop featuring Intel Core i5-10500 processor, 16GB RAM, and 512GB NVMe SSD, designed for business and professional use.",
    price: 43990,
    originalPrice:  47990,
    discount: 9,
    category: 'commercial',
    type: 'desktops',
    brand: 'dell',
    resolution: '2k',
    size: '24',
    images: [
      'https://i.pinimg.com/1200x/b9/dd/55/b9dd5515d87bff1e074ace54720104e9.jpg',
      'https://i.pinimg.com/1200x/36/ca/ab/36caab676b76145a8ad18c70298a9ce7.jpg'
    ],
    specifications: {
      "Processor": "Intel Core i5-10500, 6C/12T, 3.1-4.5GHz",
    "Memory": "16GB DDR4, 2933MHz, 4 slots, up to 64GB",
    "Storage": "512GB NVMe SSD",
    "Graphics": "Intel UHD 630, Optional Discrete",
    "Ports": "Front: 2xUSB3.2, 1xUSB-C, Audio; Rear: 4xUSB3.2, 2xDP1.4, 1xHDMI, Ethernet, Audio",
    "Networking": "Ethernet 1Gbps, Optional Wi-Fi 6",
    "OS": "Windows 10 Pro",
    "Form Factor": "Small Form Factor",
    "Dimensions": "29.7x9.3x29.7 cm",
    "Weight": "5.4 kg"
    },
    inStock: true,
    stockCount: 18,
    rating: 4.5,
    reviews: 76
  },
  // Accessories
  {
    id: '7',
    name: 'Redragon M991 Wireless Gaming Mouse',
    description: 'High-performance wireless gaming mouse featuring a 26,000 DPI sensor, 9 programmable buttons, RGB backlighting, and dual-mode connectivity for FPS gaming.',
    originalPrice: 3999,
    price: 2999,
    discount: 25,
    category: 'accessories',
    type: 'peripherals',
    device: 'mouse',
    devicetype: 'wireless',
    brand: 'redragon',
    images: [
      'https://i.pinimg.com/1200x/b5/ee/28/b5ee2829c16a56d995ae569d40807cfa.jpg',
      'https://i.pinimg.com/736x/64/13/5c/64135cc01dfb0d73bf73be5b32869b6b.jpg'
    ],
    specifications: {
      "Sensor": "Pixart PAW3370",
    "DPI": "50–26,000 (5 preset levels: 1000/2000/4000/8000/26000)",
    "Polling Rate": "125/250/500/1000 Hz",
    "Connectivity": "2.4GHz wireless, USB-C wired",
    "Battery Life": "Up to 45 hours (eco mode)",
    "Buttons": "9 programmable (including Rapid Fire and 2 side macro buttons)",
    "RGB Lighting": "16.8 million customizable colors",
    "Weight": "Approximately 100g",
    "Compatibility": "PC, Mac, Laptop"
    },
    inStock: true,
    stockCount: 89,
    rating: 4.7,
    reviews: 145
  },
  {
    id: '8',
    name: 'EvoFox Katana-X Mechanical Gaming Keyboard',
    description: 'Compact mechanical keyboard featuring Outemu Blue switches, vibrant RGB lighting, and a multifunctional volume knob, designed for gamers seeking performance and style.',
    price: 2199,
    originalPrice: 3299,
    discount: 33,
    category: 'gaming',
    type: 'peripherals',
    device: 'keyboard',
    devicetype: 'mechanical',
    brand: 'evofox',
    model: 'katana-x',

    images: [
      'https://i.pinimg.com/736x/1a/a3/19/1aa319790434fd921d523e89348b1400.jpg'
    ],
    specifications: {
       "Switch Type": "Outemu Blue",
      "Keys": "96",
      "Key Lifespan": "50 million",
      "Backlighting": "Rainbow RGB with 13 preset effects",
      "Anti-Ghosting": "25 keys",
      "Volume Control": "Knob dial",
      "Windows Lock": "Yes",
      "Cable": "1.5m braided with EMI ring",
      "Dimensions": "385 x 136 x 35.5 mm",
      "Weight": "700g",
      "Build": "ABS plastic"
    },
    inStock: true,
    stockCount: 56,
    rating: 4.6,
    reviews: 203,
    featured: true
  }, 
  {
    id: '9',
    name: 'MSI Vigor GK30 + GM11 White Combo',
    description: '"A stylish white gaming combo featuring the Vigor GK30 mechanical-like keyboard and GM11 optical mouse, designed for gamers seeking performance and aesthetics.',
    price: 3999,
    originalPrice: 4999,
    discount: 20,
    category: 'gaming',
    type: 'peripherals',
    device: "keyboard",
    devicetype: 'combo',
    brand: 'msi',
    model: 'vigor-gk30-gm11',
    images: [
      'https://i.pinimg.com/736x/eb/ba/b2/ebbab2a72c712cfcc58861cfbe95eee8.jpg'
    ],
    specifications: {
    "keyboard": {
      "type": "Mechanical-like plunger switches",
      "keys": "104",
      "key_lifespan": "12 million keystrokes",
      "backlighting": "6-zone RGB with 7 lighting effects",
      "water_resistant": "Yes",
      "dimensions": "438 x 157 x 38 mm",
      "weight": "1042 g"
    },
    "mouse": {
      "sensor": "Pixart PMW-3325 Optical",
      "dpi": "400 / 800 / 1600 / 3200 / 5000",
      "buttons": "6",
      "switch_type": "Omron",
      "design": "Ambidextrous",
      "dimensions": "125 x 65 x 38 mm",
      "weight": "85 g"
    }
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
    type: 'peripherals',
    brand: 'redragon',
    model: 'predator-m612-pro',
    device: 'mouse',
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
    name: "Gigabyte GS25F2 24.5\" 200Hz 1ms Gaming Monitor",
    description: 'A 24.5-inch Full HD gaming monitor featuring a 200Hz refresh rate, 1ms GTG response time, and SuperSpeed IPS technology for smooth and vibrant gaming visuals.',
    price: 10999,
    originalPrice: 8499,
    discount: 28,
    category: 'components',
    type: 'monitor',
    size: '24',
    resolution: '1080p',
    brand: 'gigabyte',
    series: 'gs25f2',
    images: [
      'https://i.pinimg.com/736x/ce/24/69/ce2469885031099b1abd8249b8664fa6.jpg'
    ],
    specifications: {
    "Display Size": "24.5 inches",
    "Panel Type": "SuperSpeed IPS",
    "Resolution": "1920 x 1080 (Full HD)",
    "Refresh Rate": "200Hz",
    "Response Time": "1ms GTG",
    "Color Gamut": "120% sRGB",
    "HDR": "HDR10",
    "Brightness": "300 cd/m²",
    "Contrast Ratio": "1000:1",
    "Viewing Angles": "178° horizontal / 178° vertical",
    "Tilt Adjustment": "-5° to +20°",
    "VESA Mount": "100mm x 100mm",
    "Connectivity": "2x HDMI 2.0, 1x DisplayPort 1.4, 1x 3.5mm headphone jack",
    "Features": "AMD FreeSync Premium, OSD Sidekick, Smart OD, Crosshair, Low Blue Light, Flicker-Free",
    "Power Consumption": "18W (Standby <0.5W)",
    "Dimensions": "557.00 mm (W) x 51.30 mm (D) x 321.50 mm (H)",
    "Weight": "2.73 kg"
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
    price: 8499,
    originalPrice: 8499,
    discount: 0,
    category: 'commercial',
    type: 'gaming',
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
    price: 249.99,
    originalPrice: 374.99,
    discount: 25,
    category: 'accessories',
    type: 'docking-station',
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
    name: 'Logitech Astro A50 X Wireless Gaming Headset + Base Station',
    description: 'Premium multi-platform wireless gaming headset featuring Dolby Atmos support, HDMI 2.1 passthrough, and LIGHTSPEED wireless technology for immersive audio across Xbox Series X|S, PS5, and PC.',
    price: 34999,
    originalPrice: 39999,
    discount: 13,
    category: 'gaming',
    type: 'peripherals',
    brand: 'logitech',
    model: 'astro-a50-x',
    device: 'headset',
    images: [
      'https://i.pinimg.com/736x/b8/fd/6d/b8fd6d6f9624ff2b02c6b6741c914186.jpg',
      'https://i.pinimg.com/1200x/a7/86/b9/a786b90b95d0cb6f629dd7a2eae15f13.jpg'
    ],
    specifications: {
      "Headset": {
        "Weight": "363g",
        "Drivers": "40mm PRO-G GRAPHENE",
        "Frequency Response": "20Hz–20kHz",
        "Audio": "Dolby Atmos, Windows Sonic, 3D Audio (PS5)",
        "Microphone": "Omnidirectional, 16-bit/48kHz",
        "Battery Life": "Up to 24 hours",
        "Charging": "USB-C wired, Charging dock included"
      },
      "Base Station": {
        "Connectivity": "HDMI 2.1 passthrough, USB-C",
        "Audio Output": "Up to 24-bit/48kHz (PC), 16-bit/48kHz (Console)",
        "Features": "PLAYSYNC audio/video switcher, Game/Chat mixing, Auto Low Latency Mode (ALLM), Variable Refresh Rate (VRR)"
      },
      "Compatibility": {
        "Xbox": "Series X|S, One",
        "PlayStation": "PS5, PS4",
        "PC": "Windows 10/11, macOS 13+"
      }
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
    type: 'cpu-cooler',
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
    type: 'peripherals',
    device: 'webcam',
    brand: 'logitech',
    model: 'c920',
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
    type: 'peripherals ',
    matz: "large",
    brand: 'corsair',
    model: 'mm350',
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
    type: 'peripherals',
    device: 'keyboard',
    devicetype: 'mechanical',
    brand: 'corsair',
    model: 'k70-rgb-pro',
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