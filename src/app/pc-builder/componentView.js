'use client';
import React, { useState, useMemo,useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cpu,  Eye, HardDrive, MemoryStick, Zap, Monitor, Mouse, Plus, Trash2, Keyboard, ShoppingCart, Power, Computer, Component, Star, XCircle, Search, ArrowLeft } from 'lucide-react';
import { products } from '../../data/product';
import Image from 'next/image';
import { useQuickView } from '@/contexts/QuickViewContext';

const componentTypes = [
  { type: 'cpu', name: 'Processor (CPU)', icon: Cpu, required: true, subcategory: 'processors' },
  { type: 'gpu', name: 'Graphics Card (GPU)', icon: Monitor, required: false, subcategory: 'graphics-cards' },
  { type: 'ram', name: 'Memory (RAM)', icon: MemoryStick, required: true, subcategory: 'memory' },
  { type: 'storage', name: 'Storage', icon: HardDrive, required: true, subcategory: 'storage' },
  { type: 'motherboard', name: 'Motherboard', icon: Component, required: true, subcategory: 'motherboards' },
  { type: 'monitor', name: 'Monitor', icon: Component, required: true, subcategory: 'monitor' },
  { type: 'psu', name: 'Power Supply', icon: Power, required: true, subcategory: 'power-supplies' },
  { type: 'case', name: 'Case', icon: Computer, required: true, subcategory: 'cases' },
  { type: 'cooler', name: 'CPU Cooler', icon: Cpu, required: false, subcategory: 'coolers' },
  { type: 'keyboard', name: 'Keyboard', icon: Keyboard, required: false, subcategory: 'keyboard' },
  { type: 'mouse', name: 'Mouse', icon: Mouse, required: false, subcategory: 'mouse' }
];

const ComponentSelectionView = ({ componentType, onSelectProduct, onBack }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const {openQuickView} = useQuickView();

  // Find the details of the component type being selected
  const componentDetails = componentTypes.find(c => c.type === componentType);

  // Filter products based on the component type and search term
  const filteredProducts = useMemo(() => {
    const safeProducts = Array.isArray(products) ? products : [];
    return safeProducts.filter(product => {
      const matchesCategory = (componentDetails.type === "mouse" || componentDetails.type === "keyboard")?componentDetails.type === product.device:componentDetails.type === product.type;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [searchTerm, componentDetails]);

  useEffect(() => {
    window.scrollTo(0,0);
  }, []);

  
  return (
    <motion.div
      initial={{ opacity: 0, x: '100vw' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-100vw' }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gray-950 text-gray-100 p-8 relative z-20"
    >
      <div className="flex items-center space-x-4 mb-4 -mt-4">
        <button onClick={onBack} className="p-2 rounded-full hover:bg-gray-800 transition-colors">
          <ArrowLeft className="w-6 h-6 text-white" />
        </button>
        <p className="text-lg lg:text-3xl xl:text-3xl font-extrabold text-white">{componentDetails.name} Selection</p>
      </div>

      {/* Search bar */}
      <div className="relative mb-8">
        <input
          type="text"
          placeholder="Search for a product..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full h-8 lg:h-12 xl:h-12 pl-12 pr-4 py-3 bg-gray-800 text-white rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 transition-all duration-300 placeholder-gray-400"
        />
        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
      </div>

      {/* Product list with Tap-to-Select */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map(product => (
            <motion.div
              key={product.id}
              onClick={() => onSelectProduct(componentType, product)}
              className="group bg-gray-800 rounded-xl shadow-lg p-4 border border-gray-700 hover:border-blue-500 transition-all duration-300 cursor-pointer overflow-hidden relative"
              whileHover={{ scale: 1.02 }}
            >
               
              <div className="relative  w-full  h-48 mb-2 overflow-hidden rounded-lg">
                <Image
                  width={600}
                  height={400}
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  onError={(e) => e.target.src = `https://placehold.co/600x400/1A202C/ffffff?text=${product.name.split(' ').slice(0, 2).join('+')}`}
                />
                
                <div className="absolute top-2 right-2 flex  items-center bg-gray-900/70 backdrop-blur-sm rounded-full px-2 py-1 text-sm font-semibold text-white">
                  <Star className="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" />
                  {product.rating.toFixed(1)}
                
                </div>
              </div>
                        {/* Quick View + Select Buttons */}
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    openQuickView(product); // ✅ product is passed here
                  }}
                  className="flex items-center gap-1 px-2 py-2 rounded-full bg-white text-gray-700 text-sm font-medium shadow hover:bg-gray-100 transition"
                  aria-label="Quick View"
                >
                  <Eye className="w-4 h-4" />
                </button>

                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onSelectProduct(componentType, product); // ✅ Select to Card
                  }}
                  className="flex items-center gap-1 px-2 py-2 rounded-lg bg-gradient-to-r from-teal-400 to-blue-500 text-white text-sm font-medium shadow hover:opacity-90 transition"
                >
                  <ShoppingCart className="w-4 h-4" />
                  Select
                </button>
              </div>
              <h3 className="lg:text-lg xl:text-lg font-bold text-white truncate">{product.name}</h3>
              <p className="text-sm text-gray-400 mt-1 mb-2 truncate">{product.description}</p>
              <div className="flex justify-between items-center pt-2 border-t border-gray-700">
                <span className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">₹{product.price.toLocaleString()}</span>
                <span className="text-xs text-green-400 font-semibold">{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full text-center py-16">
            <XCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">{"No products found matching your search."}</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ComponentSelectionView;