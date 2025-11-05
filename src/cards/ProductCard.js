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
      className={`relative rounded-2xl shadow-md  overflow-hidden group bg-white transition-all duration-500 ${currentTheme.inputBg}`}
    >
                {/* Product Image */}
                <div className="relative w-full">
                  <Link href={`/product/${product.id}`}>
                    <div className="relative w-full h-40 sm:h-56">
                      {product.images.length > 1 ? (
              <>
                {/* First image */}
                <Image
                  width={600}
                  height={400}
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                  onError={(e) =>
                    (e.currentTarget.src = `https://placehold.co/600x400/1A202C/ffffff?text=${product.name
                      .split(" ")
                      .slice(0, 2)
                      .join("+")}`)
                  }
                />

                {/* Second image */}
                <Image
                  width={600}
                  height={400}
                  src={product.images[1]}
                  alt={`${product.name} hover`}
                  className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
              </>
            ) : (
              // Only one image → just zoom effect, no fading
              <Image
                width={600}
                height={400}
                src={product.images[0]}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                onError={(e) =>
                  (e.currentTarget.src = `https://placehold.co/600x400/1A202C/ffffff?text=${product.name
                    .split(" ")
                    .slice(0, 2)
                    .join("+")}`)
                }
              />
            )}
          </div>
        </Link>

        {/* Discount Badge */}
        {product.discount > 0 && (
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
        <div
          className="
            absolute top-3 right-3 flex flex-col gap-4 
            transition-all duration-300 ease-in-out
            
            opacity-100
            md:opacity-0 md:translate-y-2
            md:group-hover:opacity-100 md:group-hover:translate-y-0
            mt-5

          "
        >
          <button
            onClick={handleQuickView}
            className="p-2 rounded-full bg-white shadow hover:bg-gray-100 transition"
            aria-label="Quick View"
          >
            <Eye className="w-4 h-4  text-gray-700" />
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
        </div>
      </div>

      {/* Product Details */}
      <div className="py-3 px-2 bg-zinc-200">
        <Link href={`/product/${product.id}`}>
          <div className=" h-8 overflow-hidden relative -mb-2">
            <div className="whitespace-nowrap overflow-hidden scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
              <h3 className="font-semibold text-gray-900 inline-block ">
                {product.name}
              </h3>
            </div>
          </div>
        </Link>

        {/* Rating */}
        <div className="flex items-center mb-1">
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
          <span className=" text-gray-600 text-xs">
            ({product.reviews})
          </span>
          {/* Stock Info */}
          {product.inStock && (
            <div className=" pl-2 ml-auto mb-1">
              <span className="md:hidden text-green-600 text-sm">
                stock
              </span>
              <span className="hidden md:inline text-xs md:text-lg text-green-600">
                 in stock
              </span>
            </div>
          )}
        </div>

        <div className="mb-1 mx-auto my-auto text-center -mt-2">
          {/* Price and Discount */}
          <div className="flex flex-col justify-center items-center text-sm">
            <span className="text-xl md:text-2xl font-bold text-gray-900">
              ₹{product.price.toLocaleString()}
            </span>
            {product.originalPrice > product.price && (
              <div className="flex gap-2">
                <span className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice.toLocaleString()}
                </span>

                <span className="text-xs text-red-500 font-semibold">
                  -{product.discount}%
                </span>
              </div>
            )}
          </div>
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
              <Check className="w-4 h-4 bg-green-600 " /> Added
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
            <Truck className="w-4 h-4 mr-1 text-green-500" /> Free Shipping
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductCard;