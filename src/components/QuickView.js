// components/QuickViewModal.jsx
"use client";
import { useQuickView } from '@/contexts/QuickViewContext';
import Image from 'next/image';
import { ShoppingCart, Star, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/contexts/CartContext';

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();
  const { addToCart } = useCart();
  
  const handleAddToCart = () => {
    if (product) {
      addToCart(product, 1);
      closeQuickView();
    }
  }
  // Handle keyboard escape to close
  useEffect(() => {
    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        closeQuickView();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [closeQuickView]);

  return (
    <AnimatePresence>
      {product && (
        <div className="fixed inset-0 z-[130] flex items-center justify-center p-4">
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeQuickView}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 250 }}
            className="relative bg-white rounded-lg shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden"
          >
            <button
              onClick={closeQuickView}
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-900 z-20 p-1 rounded-full bg-white/50 hover:bg-gray-100 transition"
              aria-label="Close"
            >
              <X className="h-6 w-6" />
            </button>
            
            {/* Scrollable Area */}
            <div className="flex-grow overflow-y-auto">
              <div className="flex flex-col md:flex-row">
                <div className="md:w-1/2 p-4">
                  <div className="aspect-square w-full relative">
                    <Image
                      src={product.images[0]}
                      alt={product.name}
                      fill
                      className="object-contain rounded-md"
                    />
                  </div>
                </div>

                <div className="p-6 md:p-8 md:w-1/2">
                  <h2 className="text-2xl lg:text-3xl font-bold text-gray-900">{product.name}</h2>
                  
                  <div className="mt-2 flex items-center text-sm text-gray-600">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="ml-1 font-semibold">{product.rating}</span>
                    </div>
                    <span className="mx-2">·</span>
                    <span>{product.reviews} reviews</span>
                  </div>
                  
                  <p className="mt-4 text-gray-700 text-sm leading-relaxed">{product.description}</p>
                  
                  <div className="mt-6">
                    <h3 className="text-md font-semibold text-gray-800">Specifications</h3>
                    <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600 text-sm">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <li key={key}>
                          <strong className="font-medium">{key}:</strong> {value}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Persistent Footer for Actions */}
            <div className="p-4 border-t bg-white shrink-0">
               <p className="text-3xl font-extrabold text-gray-900 mb-4">₹{product.price.toLocaleString()}</p>
               <div className="flex flex-col sm:flex-row gap-3">
                  <button className="flex-1 py-3 px-6 bg-slate-900 text-white font-semibold rounded-md hover:bg-slate-800 transition-colors flex items-center justify-center gap-2" onClick={handleAddToCart}>
                    <ShoppingCart className="w-5 h-5" /> Add to Cart
                  </button>
                  <Link href={`/product/${product.id}`} passHref>
                    <button 
                      onClick={closeQuickView} 
                      className="w-full flex-1 py-3 px-6 bg-white text-gray-800 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors font-semibold"
                    >
                      View Full Details
                    </button>
                  </Link>
                </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}