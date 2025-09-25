"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  ShoppingCart,
  Star,
  Eye,
  Heart,
  Truck,
  Check,
} from "lucide-react";
import { useCart } from "../contexts/CartContext";
import { useWishList } from "@/contexts/WishListContext";
import { useQuickView } from "@/contexts/QuickViewContext";
import Link from "next/link";
import Image from "next/image";
import Button from "../components/Button";

const ProductCard = ({ product, index = 0, currentTheme }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist } = useWishList();
  const { openQuickView } = useQuickView();

  const [wishlistState, setWishlist] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [hovered, setHovered] = useState(false);
  

  

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    openQuickView(product);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setWishlist(!wishlistState);
    if (!wishlistState) {
      addToWishlist(product);
    } else {
      removeFromWishlist(product.id);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`relative rounded-2xl shadow-md overflow-hidden group bg-white transition-all duration-500 ${currentTheme.inputBg}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onTouchStart={() => setHovered(true)} // for mobile tap
      onTouchEnd={() => setHovered(false)} // for mobile tap
    >
      {/* Product Image */}
      <div className="relative w-full">
        <Link href={`/product/${product.id}`}>
          <Image
            width={400}
            height={400}
            src={
              hovered && product.images[1]
                ? product.images[1]
                : product.images[0]
            }
            alt={product.name}
            className="w-full h-40 sm:h-56 object-cover transition-transform duration-500 group-hover:scale-105"
          />
        </Link>

        {/* Discount Badge */}
        {product.discount && (
          <div className="absolute top-2 left-2 bg-gradient-to-r from-red-500 to-red-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
            -{product.discount}%
          </div>
        )}

        {/* Featured Badge */}
        {product.featured && (
          <div className="absolute top-2 right-2 bg-blue-600 text-white px-2 py-1 rounded-full text-xs font-semibold shadow">
            Featured
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-red-600 text-white px-3 py-1 rounded-lg font-semibold shadow">
              Out of Stock
            </span>
          </div>
        )}

 {/* Floating Action Buttons */}
<motion.div
  initial={{ opacity: 0, y: 10 }}
  animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : 10 }}
  whileHover={{ opacity: 1, y: 0 }} // desktop hover
  transition={{ duration: 0.3 }}
  className="
    absolute top-3 right-3 flex flex-col gap-2
    opacity-0 group-hover:opacity-100
    pointer-events-auto
    mt-5
  " // mobile tap toggle
>
  <button
    onClick={handleQuickView}
    className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
    aria-label="Quick View"
  >
    <Eye className="w-4 h-4 text-gray-700" />
  </button>

  <button
    onClick={handleWishlist}
    className={`p-2 rounded-full bg-white shadow hover:bg-gray-100 transition ${
      wishlistState ? "text-red-600" : "text-gray-700"
    }`}
    aria-label="Wishlist"
  >
    <Heart className={`w-4 h-4 ${wishlistState ? "fill-red-600" : ""}`} />
  </button>
</motion.div>

</div>

      {/* Product Details */}
      <div className="p-4">
        <Link href={`/product/${product.id}`}>
          <div className="mb-2 h-12 overflow-hidden relative">
            <div className="whitespace-nowrap overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <h3 className="font-semibold text-gray-900 inline-block">
                {product.name}
              </h3>
            </div>
          </div>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-4 h-4 ${
                i < Math.floor(product.rating)
                  ? "text-yellow-400 fill-current"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-sm text-gray-600 ml-1">
            ({product.reviews})
          </span>
        </div>

        {/* Price + Stock */}
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-xl font-bold text-gray-900">
              ${product.price.toLocaleString()}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>
          {product.inStock && (
            <span className="text-xs text-green-600">
              {product.stockCount} in stock
            </span>
          )}
        </div>

        {/* Add to Cart */}
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full flex items-center justify-center gap-2"
          size="sm"
        >
          {addedToCart ? (
            <>
              <Check className="w-4 h-4" /> Added
            </>
          ) : (
            <>
              <ShoppingCart className="w-4 h-4" /> Add to Cart
            </>
          )}
        </Button>

        {/* Optional Free Shipping */}
        {product.freeShipping && (
          <div className="flex items-center mt-2 text-xs text-gray-600">
            <Truck className="w-4 h-4 mr-1 text-green-500" /> Free
            Shipping
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;
