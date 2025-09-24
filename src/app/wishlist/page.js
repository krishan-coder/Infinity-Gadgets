// app/wishlist/page.jsx
"use client";
import React from 'react';
import { useWishList } from '@/contexts/WishListContext';
import { useTheme } from '@/contexts/ThemeContext';
import ProductCard from '@/cards/ProductCard'; // Assuming your ProductCard is here
import Button from '@/components/Button';
import Link from 'next/link';

export default function WishlistPage() {
  const { wishlist, removeFromWishlist } = useWishList();
  const { currentTheme } = useTheme();

  const handleRemove = (productId) => {
    removeFromWishlist(productId);
  };

  return (
    <div className={`min-h-screen ${currentTheme.background} ${currentTheme.text} py-12`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl font-bold mb-8">My Wishlist</h1>

        {wishlist.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg mb-4">Your wishlist is empty.</p>
            <Link href="/">
              <Button>Start Shopping</Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {wishlist.map((product) => (
              <div key={product.id} className="relative group">
                <ProductCard product={product} currentTheme={currentTheme} />
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <button
                    onClick={() => handleRemove(product.id)}
                    className="p-2 bg-white rounded-full shadow-lg text-red-500 hover:text-red-700 transition-colors"
                    aria-label="Remove from wishlist"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}