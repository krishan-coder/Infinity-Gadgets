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
      className={`rounded-lg shadow-md overflow-hidden group ${currentTheme.inputBg} transition-colors duration-500`}
    >
      <Link href={`/product/${product.id}`} className="block">
        <div className="relative">
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={300}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {product.discount && (
            <div className={`absolute top-2 left-2 px-2 py-1 rounded-md text-sm font-semibold ${currentTheme.accent}`}>
              -{product.discount}%
            </div>
          )}
          
          {product.featured && (
            <div className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded-md text-xs">
              Featured
            </div>
          )}

          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold text-sm">
                Out of Stock
              </span>
            </div>
          )}

          {/* Quick View Button - Responsive adjustment */}
          <div className="absolute inset-0 bg-black bg-opacity-0 lg:group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-100 lg:opacity-0 lg:group-hover:opacity-100">
            <Button variant="outline" size="sm" className={`bg-white border-none text-sm ${currentTheme.text} ${currentTheme.accent}`}>
              <Eye className="w-4 h-4 mr-1" />
              Quick View
            </Button>
          </div>
        </div>

        <div className="p-4">
          <h3 className={`font-semibold mb-2 line-clamp-2 transition-colors text-lg ${currentTheme.text} group-hover:${currentTheme.accent}`}>
            {product.name}
          </h3>
          
          <div className="flex items-center mb-2">
            <div className={`flex items-center ${currentTheme.accent}`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className={`text-sm ml-1 ${currentTheme.lightText}`}>({product.reviews})</span>
          </div>

          <div className="flex items-center justify-between mb-3">
            <div>
              <span className={`text-xl font-bold ${currentTheme.text}`}>
                ${product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className={`text-sm line-through ml-2 ${currentTheme.lightText}`}>
                  ${product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
            {product.inStock && (
              <span className="text-sm text-green-600">
                {product.stockCount} in stock
              </span>
            )}
          </div>

          <Button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="w-full"
            size="sm"
          >
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </div>
      </Link>
    </motion.div>
  );
};
export default ProductCard;