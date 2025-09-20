'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Star, Eye } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import Link from 'next/link';
import Button from '../components/Button';
import Image from 'next/image';

const ProductCard = ({ product, index = 0, currentTheme }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={`w-full max-w-72 h-90 lg:h-90 rounded-lg shadow-md overflow-hidden group ${currentTheme.inputBg} transition-colors duration-500 flex flex-col`}
    >
      <Link href={`/product/${product.id}`} className="block flex-1 flex-col">
        <div className="relative h-48 flex-shrink-0">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          { ( product.discount > 0)   &&  (
            <div className={`absolute top-2 left-2 bg-red-500 text-white text-xs rounded-full h-6 w-9 flex items-center justify-center font-semibold ${currentTheme.accent}`}>
              -{product.discount}%
            </div>
          )}
          
          {product.featured && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
              Featured
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 hover:bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}
        </div> 

        <div className="p-2 flex-1 flex flex-col">
          <h3 className={`font-semibold text-sm  xl:text-xl leading-tight transition-colors ${currentTheme.text} group-hover:${currentTheme.accent} line-clamp-2 flex-shrink-0`} style={{ minHeight: '2.5rem' }}>
            {product.name}
          </h3>
          
          <div className="flex items-center  flex-shrink-0">
            <div className={`flex items-center ${currentTheme.accent}`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-3 h-3 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-xs ml-1 ${currentTheme.lightText}`}>({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-1 flex-shrink-0">
            <div className="flex-1">
              
              <span className={`text-xl font-extrabold ${currentTheme.text}`}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className={`text-xs line-through ml-2 ${currentTheme.lightText}`}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
          <span className={`text-sm font-semibold ${product.stockCount != 0 ? "text-green-600" : "text-red-600 line-through"}`}>
            {product.stockCount != 0 ? "In stock" : "Out of stock"} 
          </span>

          <div className="mt-auto ">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full"
              size="sm"
            >
              <ShoppingCart className="w-5 h-5 mr-5" />
              Add to Cart
            </Button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;