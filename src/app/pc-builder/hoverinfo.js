import React from "react";
import { motion } from "framer-motion";
import { products } from "../../data/product";
import Image from "next/image";

// Ensure products is an array to prevent errors

const safeProducts = Array.isArray(products) ? products : [];

const ComponentHoverInfo = ({ componentDetails }) => {
  // Filter products based on the subcategory
  const filteredProducts = componentDetails
    ? safeProducts.filter(p => p.type === componentDetails).slice(0, 4)
    : [];

  // If there are no products, don't render anything
  if (filteredProducts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.2 }}
      // Use the 'group-hover' class to make sure it only shows on hover
      // And the 'hidden' class to ensure it is always hidden on small screens
      className="absolute z-50 left-[105%] top-1/2 -translate-y-1/2 w-80 p-4 bg-gray-800 rounded-xl shadow-2xl border border-gray-700 pointer-events-none hidden lg:block group-hover:block overflow-hidden"
    >
      <h4 className="text-base font-bold text-white mb-3">Popular {componentDetails}s</h4>
      <div className="space-y-3">
        {filteredProducts.map(product => (
          <div key={product.id} className="flex items-center space-x-3">
            <Image
              src={product.images && product.images.length > 0 ? product.images[0] : `https://placehold.co/100x100/1A202C/ffffff?text=Product`}
              alt={product.name}
              width={48}
              height={48}
              className="w-12 h-12 object-cover rounded-lg"
              onError={(e) => { e.target.onerror = null; e.target.src = `https://placehold.co/100x100/1A202C/ffffff?text=Product`; }}
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-200 truncate">{product.name}</p>
              <p className="text-xs text-gray-400">₹{product.price.toLocaleString()}</p>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComponentHoverInfo;