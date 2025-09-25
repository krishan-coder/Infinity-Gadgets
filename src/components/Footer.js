'use client';
import React from 'react';
import Link from 'next/link';
import { Monitor , ShoppingBag, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ShoppingCart, Home } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Monitor className="h-8 w-8 text-blue-400" />
                <span className="text-xl font-bold">TechStore</span>
              </div>
              <p className="text-gray-400 mb-4">
                {"Your premier destination for computer accessories, gaming gadgets, and commercial tech solutions."}
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="/products" className="text-gray-400 hover:text-white transition-colors">
                    Products
                  </Link>
                </li>
                <li>
                  <Link href="/pc-builder" className="text-gray-400 hover:text-white transition-colors">
                    PC Builder
                  </Link>
                </li>
                <li>
                  <Link href="/cart" className="text-gray-400 hover:text-white transition-colors">
                    Shopping Cart
                  </Link>
                </li>
                <li>
                  <Link href="/profile" className="text-gray-400 hover:text-white transition-colors">
                    My Account
                  </Link>
                </li>
              </ul>
            </div>

            {/* Categories */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Categories</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="/products?category=gaming"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Gaming
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=components"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Components
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=accessories"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Accessories
                  </Link>
                </li>
                <li>
                  <Link
                    href="/products?category=commercial"
                    className="text-gray-400 hover:text-white transition-colors"
                  >
                    Commercial
                  </Link>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
              <ul className="space-y-3">
                <li className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">123 Tech Street, Digital City</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">+1 (555) 123-4567</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <span className="text-gray-400">support@techstore.com</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center">
            <p className="text-gray-400">
              {"© 2025 TechStore. All rights reserved. | Privacy Policy | Terms of Service"}
            </p>
          </div>
        </div>
      </footer>

      {/* ===== Mobile Bottom Nav ===== */}
      <nav className="fixed bottom-0 left-0 right-0 bg-neutral-900 border-t border-gray-700 z-50 sm:hidden">
        <div className="flex justify-around items-center h-14 text-gray-400">
          {/* Wishlist */}
          <Link href="/cart" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/products" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <ShoppingBag className="w-6 h-6 mb-1" />
            <span className="text-xs">Shopping</span>
          </Link>

          {/* Login/Profile */}
          <Link href="/" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Footer;
