'use client';
import React from 'react';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import  Link  from 'next/link';
import { Gamepad2, Monitor, Cpu, Mouse, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Banner from '../components/Banner';
import ProductCard from '../cards/ProductCard';
import Button from '../components/Button';
import { products } from '../data/product';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { div } from 'framer-motion/client';

const categories = [
  {
    name: 'Gaming',
    icon: Gamepad2,
    description: 'Intensive gaming',
    link: '/products?category=gaming',
    color: 'bg-gradient-to-br from-slate-700 to-slate-800'
  },
  {
    name: 'Components',
    icon: Cpu,
    description: 'PC building components',
    link: '/products?category=components',
    color: 'bg-gradient-to-br from-blue-600 to-blue-700'
  },
  {
    name: 'Accessories',
    icon: Mouse,
    description: 'Peripherals & accessories',
    link: '/products?category=accessories',
    color: 'bg-gradient-to-br from-emerald-600 to-emerald-700'
  },
  {
    name: 'Commercial',
    icon: Monitor,
    description: 'Business solutions',
    link: '/products?category=commercial',
    color: 'bg-gradient-to-br from-indigo-600 to-indigo-700'
  }
];

const Home = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 8);
  const discountedProducts = products.filter(product => product.discount && product.discount > 0).slice(0, 4);
  
  const currentTheme = {
    bg: 'bg-white',
    text: 'text-slate-900',
    font: 'font-sans',
    accent: 'text-blue-600',
    lightText: 'text-slate-600',
    inputBg: 'bg-white',
    inputBorder: 'border-slate-300'
  };

  const SliderNext = (props) =>{
    const {className, style, onClick} = props;
     return (
     <div 
        className={className}
        onClick = {onClick}
        style={{
          ...style,
          display: "block",
          background: "#000",
          borderRadius: "50%",
          zIndex: 1
        }}>

    </div>
     );
  };
  const SliderPrev = (props) =>{
    const {className, style, onClick} = props;
     return (
     <div 
        className={className}
        onClick = {onClick}
        style={{
          ...style,
          display: "block",
          background: "#000",
          borderRadius: "50%",
          zIndex: 1
        }}>

    </div>
     );
  };

  // Responsive slider settings

      const sliderSettings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      autoplaySpeed: 4000,
      pauseOnHover: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      nextArrow: <SliderNext />,
      prevArrow: <SliderPrev />,
      
    };
  return (
    <div className="bg-slate-50">
      {/* Hero Banner */}
      <Banner />

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {"Discover our extensive range of computer accessories, gaming gear, and professional equipment"}
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={category.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="group"
              >
                <Link
                  href={category.link}
                  className="block bg-white rounded-xl p-6 shadow-sm hover:shadow-lg border border-slate-200 hover:border-slate-300 transition-all duration-300"
                >
                  <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300 shadow-sm`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>

                  <p className="sm:hidden text-slate-600 mb-2">{category.description}</p>
                  <p className="hidden sm:inline lg:hidden text-slate-600 mb-4">{category.description}</p>
                  <p className="hidden lg:inline text-slate-600 mb-4">{category.description}</p>

                  <div className="flex items-center text-blue-600 group-hover:text-blue-700">
                    <span className="text-sm font-medium">Shop Now</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Special Offers Section */}
      {discountedProducts.length > 0 && (
        <section className="py-6 sm:py-8 lg:py-16 bg-gradient-to-br from-orange-50 to-red-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-6 sm:mb-8 lg:mb-12"
            >
              <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
                <TrendingUp className="w-6 h-7 sm:w-7 sm:h-6 lg:w-8 lg:h-8 text-orange-600 mb-2 sm:mb-0 sm:mr-2" />
                <h2 className="text-xl sm:text-xl lg:text-4xl xl:text-5xl font-bold text-slate-900 leading-tight">
                  Special Offers
                </h2>
              </div>
              <p className="text-sm sm:text-sm lg:text-lg text-slate-600 max-w-xl lg:max-w-2xl mx-auto px-4">
                {"Don't miss out on these incredible deals! Limited time offers on top-rated products."}
              </p>
            </motion.div>

            {/* Enhanced responsive grid */}
            <div className="grid grid-cols-2 
                            xs:grid-cols-2 
                            sm:grid-cols-2 
                            md:grid-cols-2 
                            lg:grid-cols-3 
                            xl:grid-cols-4 
                            2xl:grid-cols-5
                            gap-4 sm:gap-5 lg:gap-6 xl:gap-8 
                            mb-8 sm:mb-10 lg:mb-12">
              {discountedProducts.map((product, index) => (
                <div 
                  key={product.id} 
                  className="w-full max-w-sm mx-auto"
                >
                  <ProductCard 
                    product={product} 
                    index={index} 
                    currentTheme={currentTheme}
                    className="h-full" 
                  />
                </div>
              ))}
            </div>

            {/* Responsive button */}
            <div className="text-center">
              <Link href="/products?discount=true">
                <Button 
                  size="lg" 
                  className="w-full sm:w-auto 
                             px-6 sm:px-8 
                             py-3 sm:py-4 
                             text-sm sm:text-base lg:text-lg
                             bg-orange-600 hover:bg-orange-700
                             text-white
                             transition-all duration-300 
                             hover:scale-105 
                             active:scale-95
                             shadow-md hover:shadow-lg"
                >
                  <span className="hidden sm:inline">View All Offers</span>
                  <span className="sm:hidden">View All</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16 w-full bg-slate-100">
        <div className="container  mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Featured Products
              </h2>
            </div>
            <p className="text-slate-600 max-w-2xl mx-auto">
              {"Handpicked by our experts - the best products for performance, quality, and value"} 
            </p>
          </motion.div>

          {/* Responsive Slider */}
          <div className="w-full max-w-[1200px] mx-0 my-auto px-4 mb-10 xl:gap-3 lg:-gap-3">
            <Slider {...sliderSettings}>
              {featuredProducts.map((product, index) => (
                <div key={product.id} className="px-2 xl:gap-0 xl:ml-40">
                  <ProductCard 
                    product={product} 
                    index={index} 
                    currentTheme={currentTheme} 
                    className="mx-auto"
                  />
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button 
                size="lg" 
                variant="outline"
                className="border-slate-300 text-slate-700 hover:bg-slate-700 hover:text-white hover:border-slate-700 transition-all duration-300"
              >
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-slate-700 to-slate-800">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center text-white"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-slate-200 mb-8 max-w-2xl mx-auto">
              {"Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and tech insights"}
            </p>
            
            {/* Mobile-first responsive email subscription form */}
            <div className="w-full max-w-xs sm:max-w-md lg:max-w-lg xl:max-w-2xl mx-auto 
                            px-4 sm:px-0">
              
              {/* Mobile: Stacked layout, Large: Side-by-side */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 lg:gap-6">
                
                {/* Email Input */}
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full 
                            px-3 py-2.5 sm:px-4 sm:py-3 lg:px-3 lg:py-4 xl:h-15
                            text-sm sm:text-base lg:text-lg
                            bg-white 
                            rounded-md sm:rounded-lg lg:rounded-xl
                            text-slate-900 placeholder-slate-500
                            border border-slate-200 sm:border-slate-300
                            focus:outline-none 
                            focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50
                            focus:border-blue-500
                            transition-all duration-200
                            shadow-sm hover:shadow-md"
                />
                
                {/* Subscribe Button */}
                <Button 
                  className="w-full sm:w-auto sm:min-w-[80px] lg:min-w-[140px]
                            px-4 py-2.5 sm:px-6 sm:py-3 lg:px-8 lg:py-4
                            text-sm sm:text-base lg:text-lg font-medium xl:h-15
                            bg-blue-600 text-white
                            hover:bg-blue-700 hover:text-white
                            focus:bg-blue-700 focus:text-white
                            border-2 border-blue-600 hover:border-blue-700
                            rounded-md sm:rounded-lg lg:rounded-xl
                            transition-all duration-200
                            shadow-sm hover:shadow-lg
                            active:scale-95
                            disabled:opacity-50 disabled:cursor-not-allowed"
                  type="submit"
                >
                  <span className="sm:hidden">Subscribe</span>
                  <span className="hidden sm:inline lg:hidden">Subscribe</span>
                  <span className="hidden lg:inline">Subscribe Now</span>
                </Button>
              </div>
              
              {/* Optional: Success/Error message area */}
              <div className="mt-2 sm:mt-3 lg:mt-4 min-h-[1.5rem] text-center">
                {/* Space for validation messages */}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;