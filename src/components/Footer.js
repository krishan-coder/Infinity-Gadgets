'use client';
import React, { Profiler } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Monitor , ShoppingBag, User, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Youtube, Heart, ShoppingCart, Home } from 'lucide-react';

const Footer = () => {
  return (
    <>
      <footer className="bg-neutral-800 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Image src="/infinityLogo-v2.png" alt='Shop Logo' width={50} height={50} className='rounded-full bg-white' ></Image>
                <span className="text-xl font-bold">Infinity Gadgets</span>
              </div>
              <p className="text-gray-400 mb-4">
                {"Your premier destination for computer accessories, gaming gadgets, and commercial tech solutions."}
              </p>
              <div className="flex space-x-4">
                <a href="#" className=" hover:text-blue-400 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className=" hover:text-blue-400 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="https://www.instagram.com/infinitygadgetsdelhi/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  >
                    <Instagram className="w-5 h-5 hover:text-pink-500 cursor-pointer transition-colors" /></a>
                <a 
                  href="https://www.youtube.com/@Infinitygadgetsdelhi" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  aria-label="YouTube"
                >
                  <Youtube className="w-6 h-6 hover:text-red-500 cursor-pointer transition-colors" />
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
                  <MapPin className="h-14 w-14 md:h-18 md:w-18 text-blue-400" />
                  <span className="text-gray-400 text-sm">Store Address-101/46, Front Side First Floor, Dohil Chamber, behind Satyam cinema, Nehru Place, New Delhi- 110019.</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-blue-400" />
                  <div className='flex '>
                    <span>+91--   </span>
                  <a 
                    href="tel:+919354235280" 
                    className="text-blue-400 underline hover:text-blue-600"
                  >
                    9354235280
                  </a>
                  ,
                  <a 
                    href="tel:+918368511881" 
                    className="text-blue-400 underline hover:text-blue-600 ml-2"
                  >
                    8368511881
                  </a>
                  </div>
                </li>
                <li className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-blue-400" />
                  <a href="mailto:infinitygadgetsdelhi@gmail.com?subject=Inquiry&body=Hello, I would like to know more..." className='text-blue-400 underline hover:text-blue-600'>infinitygadgetsdelhi@gmail.com</a>
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
      <nav className="fixed bottom-0 left-0  right-0 bg-neutral-900 border-t border-gray-700 z-50 sm:hidden">
        <div className="flex justify-around items-center h-14 text-gray-400">
          {/* Login/Profile */}
          <Link href="/" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <Home className="w-6 h-6 mb-1" />
            <span className="text-xs">Home</span>
          </Link>

          {/* Wishlist */}
          <Link href="/wishlist" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <Heart className="w-6 h-6 mb-1" />
            <span className="text-xs">Wishlist</span>
          </Link>

          {/* Cart */}
          <Link href="/profile" className="flex flex-col items-center justify-center hover:text-blue-400 transition-colors">
            <User className="w-6 h-6 mb-1" />
            <span className="text-xs">Profile</span>
          </Link>
        </div>
      </nav>
    </>
  );
};

export default Footer;
