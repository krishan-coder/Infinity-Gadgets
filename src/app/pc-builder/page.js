'use client';
import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cpu, HardDrive, MemoryStick, Zap, Monitor, Mouse, Plus, Trash2, Keyboard, ShoppingCart, Power, Computer, Component, Star } from 'lucide-react';
import Button from '../../components/Button';
import { products } from '../../data/product';
import { useCart } from '../../contexts/CartContext';
import { Transition } from '@headlessui/react';
import ComponentSelectionView from './componentView';
import ComponentHoverInfo from './hoverinfo';
import Image from 'next/image';

const componentTypes = [
  { 
    type: 'cpu' , 
    name: 'Processor (CPU)', 
    icon: Cpu, 
    required: true,
    subcategory: 'processor'
  },
  { 
    type: 'gpu' , 
    name: 'Graphics Card (GPU)', 
    icon: Monitor, 
    required: false,
    subcategory: 'graphics-card'
  },
  { 
    type: 'ram' , 
    name: 'Memory (RAM)', 
    icon: MemoryStick, 
    required: true,
    subcategory: 'ram'
  },
  { 
    type: 'storage' , 
    name: 'Storage', 
    icon: HardDrive, 
    required: true,
    subcategory: 'storage'
  },
  { 
    type: 'motherboard' , 
    name: 'Motherboard', 
    icon: Cpu, 
    required: true,
    subcategory: 'motherboard'
  },
  { 
    type: 'psu', 
    name: 'Power Supply', 
    icon: Zap, 
    required: true,
    subcategory: 'power-supplies'
  },
  { 
    type: 'case' , 
    name: 'Case', 
    icon: Mouse, 
    required: true,
    subcategory: 'cases'
  },
  {
    type: 'cooler' ,
    name: 'CPU Cooler',
    icon: Cpu,
    required: false,
    subcategory: 'coolers'
  },
  {
    type: 'keyboard' ,
    name: 'Keyboard',
    icon: Keyboard,
    required: false,
    subcategory: 'keyboard'
  },
  {
    type: 'mouse' ,
    name: 'Mouse',
    icon: Mouse,
    required: false,
    subcategory: 'mouse'
  }
];

const PCBuilder = () => {
  const [buildComponents, setBuildComponents] = useState(
    componentTypes.map(type => ({
      type: type.type,
      required: type.required,
      product: undefined
    }))
  );
  const [selectedComponentType, setSelectedComponentType] = useState(null);
  const [hoveredComponentType, setHoveredComponentType] = useState(null);
  const { addToCart } = useCart();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const parallaxStyle = {
    transform: `translate(${mousePosition.x / 50}px, ${mousePosition.y / 50}px)`
  };

  const selectComponent = (componentType, product) => {
    setBuildComponents(prev =>
      prev.map(comp =>
        comp.type === componentType ? { ...comp, product } : comp
      )
    );
    setSelectedComponentType(null); // Return to main view
  };

  const removeComponent = (componentType) => {
    setBuildComponents(prev =>
      prev.map(comp =>
        comp.type === componentType ? { ...comp, product: undefined } : comp
      )
    );
  };

  const totalPrice = useMemo(() => {
    return buildComponents.reduce((total, comp) =>
      total + (comp.product ? comp.product.price : 0), 0
    );
  }, [buildComponents]);

  const selectedComponents = buildComponents.filter(comp => comp.product);
  const requiredComponents = buildComponents.filter(comp => comp.required);
  const isComplete = requiredComponents.every(comp => comp.product);

  const addBuildToCart = () => {
    if (!isComplete) {
      console.log('Please select all required components before adding to cart.');
      return;
    }
    selectedComponents.forEach(comp => {
      if (comp.product) {
        addToCart(comp.product);
      }
    });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 font-sans antialiased relative overflow-hidden">
      <AnimatePresence>
        {selectedComponentType ? (
          <ComponentSelectionView
            componentType={selectedComponentType}
            onSelectProduct={selectComponent}
            onBack={() => setSelectedComponentType(null)}
          />
        ) : (
          <motion.div
            key="main-builder"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div
              className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse at center, rgba(16, 185, 129, 0.15) 0%, rgba(16, 185, 129, 0) 70%)`
              }}
            ></div>
            <motion.div
              className="absolute w-[200vw] h-[200vh] -top-[50vh] -left-[50vw] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"
              style={parallaxStyle}
            />
            <div className="container mx-auto px-4 py-16 relative z-10 max-w-7xl">
              <div className="text-center mb-16">
                <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
                    PC BUILDER
                  </span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                  {"Craft your ultimate rig. Select from a curated list of components and build your dream machine."}
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Component Selection */}
                <div className="lg:col-span-2 space-y-6">
                  {componentTypes.map((componentType, index) => {
                    const selectedComponent = buildComponents.find(c => c.type === componentType.type);
                    return (
                      <motion.div
                        key={componentType.type}
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ delay: index * 0.05, duration: 0.4 }}
                        onMouseEnter={() => setHoveredComponentType(componentType.type)}
                        onMouseLeave={() => setHoveredComponentType(null)}
                        className="bg-gray-800 rounded-xl shadow-lg shadow-gray-900/50 p-6 border border-gray-700 relative"
                      >
                        <div className="flex items-center justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-500 rounded-full shadow-lg">
                              <componentType.icon className="w-6 h-6 text-white" />
                            </div>
                            <div>
                              <h3 className="text-xl font-bold text-white">
                                {componentType.name}
                                {componentType.required && (
                                  <span className="text-red-500 ml-1 text-sm">*</span>
                                )}
                              </h3>
                            </div>
                          </div>

                          {selectedComponent?.product && (
                            <button
                              onClick={() => removeComponent(componentType.type)}
                              className="text-red-500 hover:text-red-400 p-2 rounded-full transition-colors duration-200"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          )}
                        </div>

                        {selectedComponent?.product ? (
                          <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center space-x-4 p-4 bg-gray-900 rounded-lg border border-gray-700 hover:border-blue-500 transition-colors duration-300"
                          >
                            <Image
                              width={64}
                              height={64}
                              src={selectedComponent.product.images[0]}
                              alt={selectedComponent.product.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-gray-200">{selectedComponent.product.name}</h4>
                              <p className="text-sm text-gray-400">₹{selectedComponent.product.price.toLocaleString()}</p>
                            </div>
                            <Button onClick={() => setSelectedComponentType(componentType.type)}>Change</Button>
                          </motion.div>
                        ) : (
                          <motion.button
                            onClick={() => setSelectedComponentType(componentType.type)}
                            className="w-full p-4 border-2 border-dashed border-gray-700 rounded-lg hover:border-teal-400 hover:bg-gray-800 transition-colors flex items-center justify-center space-x-2"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Plus className="w-5 h-5 text-gray-400" />
                            <span className="text-gray-400 font-medium">
                              Select {componentType.name.toLowerCase()}
                            </span>
                          </motion.button>
                        )}
                        <AnimatePresence>
                          {hoveredComponentType === componentType.type && (
                            <ComponentHoverInfo componentDetails={componentType.type} />
                          )}
                        </AnimatePresence>
                      </motion.div>
                    );
                  })}
                </div>

                {/* Build Summary */}
                <div className="lg:col-span-1">
                  <div className="bg-gray-800 rounded-xl shadow-lg shadow-gray-900/50 p-8 border border-gray-700 sticky top-16">
                    <h2 className="text-2xl font-bold text-white mb-6">Build Summary</h2>

                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Components Selected:</span>
                        <span className="font-semibold text-white">{selectedComponents.length} / {componentTypes.length}</span>
                      </div>

                      <div className="flex justify-between items-center text-sm text-gray-400">
                        <span>Required Components:</span>
                        <motion.span
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className={`font-semibold ${isComplete ? 'text-green-500' : 'text-red-500'}`}
                        >
                          {requiredComponents.filter(c => c.product).length} / {requiredComponents.length}
                        </motion.span>
                      </div>
                    </div>

                    {selectedComponents.length > 0 && (
                      <div className="space-y-3 mb-6">
                        <h3 className="font-semibold text-gray-300">Selected Components:</h3>
                        {selectedComponents.map((comp, index) => (
                          <motion.div
                            key={comp.type}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.02 }}
                            className="flex justify-between items-center text-sm text-gray-400"
                          >
                            <span className="truncate">
                              {componentTypes.find(t => t.type === comp.type)?.name}
                            </span>
                            <span className="font-medium text-white">₹{comp.product?.price.toLocaleString()}</span>
                          </motion.div>
                        ))}
                      </div>
                    )}

                    <div className="border-t border-gray-700 pt-6 mb-8">
                      <div className="flex justify-between items-center text-2xl font-bold text-white">
                        <span>Total Price:</span>
                        <motion.span
                          initial={{ scale: 0.9, opacity: 0 }}
                          animate={{ scale: 1, opacity: 1 }}
                          transition={{ duration: 0.5 }}
                          className="bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500"
                        >
                          ₹{totalPrice.toLocaleString()}
                        </motion.span>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Button
                        onClick={addBuildToCart}
                        disabled={!isComplete}
                        className="w-full flex items-center justify-center space-x-2"
                        size="lg"
                      >
                        <ShoppingCart className="w-6 h-6" />
                        <span>Add All to Cart</span>
                      </Button>

                      {!isComplete && (
                        <p className="text-sm text-center text-red-400">
                          <span className="font-medium">{"Please select all required components to finalize your build."}</span>
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PCBuilder;