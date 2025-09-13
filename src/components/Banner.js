'use client';
import React, { useState, useEffect, useCallback } from 'react';
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
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Smooth slide change function with transition lock
  const changeSlide = useCallback((newIndex) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(newIndex);
    
    // Release transition lock after animation completes
    setTimeout(() => setIsTransitioning(false), 800);
  }, [isTransitioning]);

  // Auto-advance the slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isTransitioning) {
        changeSlide((currentSlide + 1) % bannerSlides.length);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [currentSlide, isTransitioning, changeSlide]);

  const nextSlide = () => {
    changeSlide((currentSlide + 1) % bannerSlides.length);
  };

  const prevSlide = () => {
    changeSlide((currentSlide - 1 + bannerSlides.length) % bannerSlides.length);
  };

  const goToSlide = (index) => {
    changeSlide(index);
  };

  // Smooth transition variants
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 1.1,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94], // Custom cubic-bezier for smooth easing
      }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.9,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    })
  };

  const contentVariants = {
    initial: {
      opacity: 0,
      y: 50,
      scale: 0.9,
    },
    animate: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
        staggerChildren: 0.1,
      }
    },
    exit: {
      opacity: 0,
      y: -30,
      scale: 1.1,
      transition: {
        duration: 0.4,
        ease: 'easeInOut',
      }
    }
  };

  const itemVariants = {
    initial: {
      opacity: 0,
      y: 30,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      }
    }
  };

  return (
    <div className="relative min-h-[450px] md:h-[500px] lg:h-[600px] overflow-hidden bg-gray-900">
      <AnimatePresence mode="wait" custom={currentSlide}>
        <motion.div
          key={currentSlide}
          custom={currentSlide}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {/* Background image with smooth transition */}
          <motion.div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${bannerSlides[currentSlide].image})` }}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{
              duration: 1,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          />

          {/* Overlay for better text readability */}
          <motion.div
            className="absolute inset-0 bg-black/20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          />

          {/* Content container with smooth animations */}
          <div className="absolute inset-0 flex items-center justify-center p-4">
            <motion.div
              className="w-full max-w-2xl bg-black/30 backdrop-blur-md rounded-3xl p-6 md:p-10 shadow-2xl text-center"
              variants={contentVariants}
              initial="initial"
              animate="animate"
              exit="exit"
            >
              <div className="text-white space-y-6">
                <div className="space-y-3">
                  <motion.h1
                    className="text-4xl md:text-6xl font-bold leading-tight"
                    variants={itemVariants}
                  >
                    {bannerSlides[currentSlide].title}
                  </motion.h1>
                  <motion.h2
                    className="text-xl md:text-2xl font-semibold text-blue-300"
                    variants={itemVariants}
                  >
                    {bannerSlides[currentSlide].subtitle}
                  </motion.h2>
                </div>

                <motion.p
                  className="text-lg text-gray-200 max-w-md mx-auto leading-relaxed"
                  variants={itemVariants}
                >
                  {bannerSlides[currentSlide].description}
                </motion.p>

                <motion.div
                  className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                  variants={itemVariants}
                >
                  <a href={bannerSlides[currentSlide].buttonLink} target="_blank" rel="noopener noreferrer">
                    <Button size="lg" className="bg-black text-white hover:bg-gray-800 text-sm flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 " />
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
                      <span>With Warranty</span>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows with smooth hover effects */}
      <motion.button
        onClick={prevSlide}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm disabled:opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronLeft className="w-6 h-6" />
      </motion.button>

      <motion.button
        onClick={nextSlide}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/20 hover:bg-black/40 text-white p-3 rounded-full transition-all duration-300 z-10 backdrop-blur-sm disabled:opacity-50"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <ChevronRight className="w-6 h-6" />
      </motion.button>

      {/* Slide Indicators with smooth animations */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {bannerSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index ? 'bg-white shadow-lg' : 'bg-white/40 hover:bg-white/60'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            animate={{
              scale: currentSlide === index ? 1.2 : 1,
              backgroundColor: currentSlide === index ? '#ffffff' : 'rgba(255, 255, 255, 0.4)',
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;