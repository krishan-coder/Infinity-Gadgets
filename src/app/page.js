'use client';
import React from 'react';
import { motion } from 'framer-motion';
import  Link  from 'next/link';
import { Gamepad2, Monitor, Cpu, Mouse, ArrowRight, Star, TrendingUp } from 'lucide-react';
import Banner from '../components/Banner';
import ProductCard from '../cards/ProductCard';
import Button from '../components/Button';
import { products } from '../data/product';


const categories = [
  {
    name: 'Gaming',
    icon: Gamepad2,
    description: 'High-performance gaming gear',
    link: '/products?category=gaming',
    color: 'bg-red-500'
  },
  {
    name: 'Components',
    icon: Cpu,
    description: 'PC building components',
    link: '/products?category=components',
    color: 'bg-blue-500'
  },
  {
    name: 'Accessories',
    icon: Mouse,
    description: 'Peripherals and accessories',
    link: '/products?category=accessories',
    color: 'bg-green-500'
  },
  {
    name: 'Commercial',
    icon: Monitor,
    description: 'Business solutions',
    link: '/products?category=commercial',
    color: 'bg-purple-500'
  }
];



const Home = () => {
  const featuredProducts = products.filter(product => product.featured).slice(0, 8);
  const discountedProducts = products.filter(product => product.discount && product.discount > 0).slice(0, 4);
  const currentTheme = {
  bg: 'bg-white',
  text: 'text-gray-900',
  font: 'font-sans',
  accent: 'text-blue-600',
  lightText: 'text-gray-600',
  inputBg: 'bg-white',
  inputBorder: 'border-gray-300'
};

  return (
    <div>
      {/* Hero Banner */}
      <Banner />

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {"Discover our extensive range of computer accessories, gaming gear, and professional equipment"}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                  className="block bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <div className={`${category.color} w-16 h-16 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <category.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.description}</p>
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
        <section className="py-16 bg-red-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <div className="flex items-center justify-center mb-4">
                <TrendingUp className="w-8 h-8 text-red-500 mr-2" />
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                  Special Offers
                </h2>
              </div>
              <p className="text-gray-600 max-w-2xl mx-auto">
                {"Don't miss out on these incredible deals! Limited time offers on top-rated products."}
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {discountedProducts.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} currentTheme={currentTheme} />
              ))}
            </div>

            <div className="text-center">
              <Link href="/products?discount=true">
                <Button size="lg">
                  View All Offers
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Featured Products Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center mb-4">
              <Star className="w-8 h-8 text-yellow-500 mr-2" />
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                Featured Products
              </h2>
            </div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {"Handpicked by our experts - the best products for performance, quality, and value"} 
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} currentTheme={currentTheme} />
            ))}
          </div>

          <div className="text-center">
            <Link href="/products">
              <Button size="lg" variant="outline">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-blue-600">
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
            <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
              {"Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and tech insights"}
            </p>
            
            <div className="max-w-md mx-auto flex gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-white flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300 border-black border-0"
              />
              <Button className="bg-black text-blue-600 hover:bg-gray-100 hover:text-black border-white border-2">
                Subscribe
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;