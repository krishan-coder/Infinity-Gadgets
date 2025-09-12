'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ShoppingBag, Zap, Shield } from 'lucide-react';

// Simplified Button Component
const Button = ({ children, onClick, className = '', disabled = false, size = 'md' }) => {
  const baseClasses = 'font-semibold rounded-lg transition-all duration-300 transform hover:scale-105';
  const sizeClasses = size === 'lg' ? 'px-6 py-3 text-lg' : 'px-4 py-2 text-base';
  const disabledClasses = disabled ? 'bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-black text-white hover:bg-opacity-80 shadow-lg shadow-black/50';
  return (
    <button onClick={onClick} className={`${baseClasses} ${sizeClasses} ${disabledClasses} ${className}`} disabled={disabled}>
      {children}
    </button>
  );
};


// Pre-defined data for the banner slides
const bannerSlides = [
  {
    id: 1,
    title: 'Gaming Revolution',
    subtitle: 'RTX 4080 Series',
    description: 'Experience next-gen gaming with ray tracing and AI-powered graphics. Up to 20% off selected GPUs.',
    image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Shop Gaming',
    buttonLink: '/products?category=gaming',
  },
  {
    id: 2,
    title: 'Build Your Dream PC',
    subtitle: 'Custom PC Builder',
    description: 'Create the perfect gaming or workstation setup with our intuitive PC builder tool.',
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Start Building',
    buttonLink: '/pc-builder',
  },
  {
    id: 3,
    title: 'Professional Solutions',
    subtitle: 'Commercial Tech',
    description: 'Upgrade your business with enterprise-grade hardware and commercial solutions.',
    image: 'https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg?auto=compress&cs=tinysrgb&w=800',
    buttonText: 'Explore Business',
    buttonLink: '/products?category=commercial',
  }
];

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-advance the slides every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length);
  };

  return (
    <div className="relative min-h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0"
        >
          {/* Background image without blur */}
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bannerSlides[currentSlide].image})` }}
          />

          {/* Content container with frosted glass effect on top of the background */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-lg p-6 md:p-10 shadow-lg text-center">
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className="text-white space-y-6"
              >
                <div className="space-y-2">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold leading-tight"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.6 }}
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h1>
                  <motion.h2
                    className="text-xl md:text-2xl font-semibold text-blue-300"
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.h2>
                </div>

                <motion.p
                  className="text-lg text-gray-200 max-w-md mx-auto"
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.7, duration: 0.6 }}
                >
                  {bannerSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                  className="flex flex-col sm:flex-row gap-4 justify-center"
                >
                  <a href={bannerSlides[currentSlide].buttonLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-black text-white hover:bg-black-800">
                      <ShoppingBag className="w-5 h-5 mr-2" />
                      {bannerSlides[currentSlide].buttonText}
                    </Button>
                  </a>

                  <div className="flex items-center space-x-6 text-sm">
                    <div className="flex items-center space-x-2">
                      <Zap className="w-4 h-4 text-yellow-400" />
                      <span>Fast Delivery</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Shield className="w-4 h-4 text-green-400" />
                      <span>2 Year Warranty</span>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-200 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              currentSlide === index ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
