'use client';

import React, { useState } from 'react';
import Link from 'next/link'; 
import { useRouter, usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { Search, ShoppingCart, User, Menu, X, Monitor, Home } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { signOut } from  'next-auth/react';
import '../app/globals.css'; 


const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();

  const pathname = usePathname();
  const isActive = (path) => pathname === path;

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    signOut({redirect: false});
    router.push('/');
  };

  return (
    <header className="bg-neutral-800 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
          {/* Logo */}
        <div className="flex items-center justify-between h-16">
          <div className='flex space-x-2 lg:-ml-10 '>

            <Monitor className="h-10 w-10 mt-3 -ml-2 text-blue-600 " />
            <span className="text-md font-mono lg:text-3xl mt-3 font-bold text-white space-x-2">Infinity Gadgets</span>
          </div>


          {/* Search Bar - Desktop */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full px-4 py-2 border text-white border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-blue-600 text-white rounded-r-lg hover:bg-blue-700 transition-colors"
              >
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>

          {/* Navigation Links - Desktop */}
          <nav className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/')
                    ? 'bg-blue-600 text-white'
                    : 'text-zinc-300 hover:text-white hover:bg-blue-500'
                }`}
              >
                Home
              </Link>

              <Link
                href="/products"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/products')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-blue-500'
                }`}
              >
                Products
              </Link>
              <Link
                href="/wishlist"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/wishlist')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-blue-500'
                }`}
              >
                Wishlist
              </Link>

              <Link
                href="/pc-builder"
                className={`px-4 py-2 rounded-md transition-colors ${
                  isActive('/pc-builder')
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-blue-500'
                }`}
              >
                PC Builder
              </Link>

              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  className={`px-4 py-2 rounded-md transition-colors ${
                    isActive('/admin')
                      ? 'bg-blue-600 text-white'
                      : 'text-gray-300 hover:text-white hover:bg-blue-500'
                  }`}
                >
                  Admin
                </Link>
              )}
          </nav>


          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart */}
            <Link href="/" className="relative p-2 text-white hover:text-blue-600 transition-colors">
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </Link>

            {/* User Menu */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-white hover:text-blue-600 transition-colors">
                <User className="h-6 w-6" />
                {user && <span className="hidden md:block">{user.name}</span>}
              </button>

              {/* Dropdown */}
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                {user ? (
                  <>
                    <Link href="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-50"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link href="/auth?mode=login" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Login
                    </Link>
                    <Link href="/auth?mode=register" className="block px-4 py-2 text-gray-700 hover:bg-gray-50">
                      Register
                    </Link>
                  </>
                )}
              </div>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden p-2 text-zinc-500 hover:text-blue-600"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden border-t border-grey-300 py-4"
          >
            {/* Mobile Search */}
            <form onSubmit={handleSearch} className="mb-4">
              <div className="relative">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="absolute right-2 top-2 text-gray-400 hover:text-blue-600"
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </form>

            {/* Mobile Navigation */}
            <nav className="flex flex-col space-y-2">
              <Link
                href="/products"
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-400 font-semibold hover:text-blue-600 py-2"
              >
                Products
              </Link>
              <Link
                href="/pc-builder"
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-400 font-semibold hover:text-blue-600 py-2"
              >
                PC Builder
              </Link>
              <Link
                href="/wishlist"
                onClick={() => setIsMenuOpen(false)}
                className="text-zinc-400 font-semibold hover:text-blue-600 py-2"
              >
                Wishlist
              </Link>
              {user?.role === 'admin' && (
                <Link
                  href="/admin"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-gray-700 hover:text-blue-600 py-2"
                >
                  Admin
                </Link>
 )}
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;