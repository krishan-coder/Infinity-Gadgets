'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingCart, User, Menu, X, Monitor, Heart,
  Facebook, Twitter, Instagram, ChevronDown, Home,
  Youtube
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { signOut } from 'next-auth/react';
import CategoryMenuButton from './CategoryMenuButton';
import '../app/globals.css';
import Image from 'next/image';
import ContactUsLink from './ContactUsLink';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isGamingOpen, setIsGamingOpen] = useState(false); // For desktop hover
  const [isMobileGamingOpen, setIsMobileGamingOpen] = useState(false); // For mobile accordion
  const [searchQuery, setSearchQuery] = useState('');
  const { user } = useAuth();
  const { getTotalItems } = useCart();
  const router = useRouter();
  const pathname = usePathname();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);
  
  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => { document.body.style.overflow = 'auto' };
  }, [isMenuOpen]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false); // Close menu after search
    }
  };

  const handleLogout = () => {
    signOut({ redirect: false });
    router.push('/');
    setIsMenuOpen(false);
  };

  const NavLink = ({ href, children }) => (
    <Link href={href} onClick={() => setIsMenuOpen(false)} className="block py-3 hover:text-blue-500 transition-colors">
      {children}
    </Link>
  );

  const gamingLinks = {
  "keyboard": "Gaming Keyboard",
  "chair": "Gaming Chair",
  "mouse": "Gaming Mouse",
  "gamepad": "Gamepad",
  "headset": "Gaming Headset",
  "console": "Gaming Console",
  "mousepad": "Gaming Mousepad",
  "racingWheel": "Racing Wheel"
};


  return (
    <header className="bg-neutral-900 text-white shadow-lg sticky top-0 z-[100]">
      {/* 🔹 Bar 1: Topbar (Hidden on small screens) */}
      <div className="bg-neutral-800 text-sm hidden md:block">
        <div className="container mx-auto px-4 flex justify-between items-center h-10">
          <div className="flex space-x-4">
            <Link href="/" className="hover:text-blue-500 transition-colors">
            <div className='flex'>
              {<Home className='w-4 h-4 pr-0.5 fill-white '></Home>}
              Home
            </div>              
            </Link>
            <ContactUsLink />
          </div>
          <div className="flex space-x-2 items-center">
            <a href="#" aria-label="Facebook"><Facebook className="w-5 h-5 text-white fill-blue-600 cursor-pointer " /></a>
            <a 
              href="https://www.instagram.com/infinitygadgetsdelhi/" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="Instagram"
              >
                <Instagram className="w-5 h-5 fill-pink-600  cursor-pointer " /></a>
            <a 
              href="https://www.youtube.com/@Infinitygadgetsdelhi" 
              target="_blank" 
              rel="noopener noreferrer" 
              aria-label="YouTube"
            >
              <Youtube className="w-6 h-6 fill-red-500 cursor-pointer transition-colors" />
            </a>

          </div>
        </div>
      </div>

      {/* 🔹 Bar 2: Logo + Search + User Actions */}
      <div className="container mx-auto px-4 flex justify-between items-center h-20">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2 shrink-0">
          <Image src="/infinityLogo-v2.png" alt='Shop Logo' width={50} height={50} className='rounded-full bg-white' ></Image>
          <span className="text-lg lg:text-2xl font-bold font-mono tracking-tighter">Infinity Gadgets</span>
        </Link>

        {/* Desktop Search */}
        <div className="hidden lg:flex flex-1 justify-center px-8">
          <form onSubmit={handleSearch} className="w-full max-w-lg">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-4 pr-12 py-2.5 border bg-neutral-800 border-neutral-700 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <button type="submit" className="absolute right-0 top-0 h-full px-4 text-neutral-400 hover:text-white" aria-label="Search">
                <Search className="h-5 w-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-4 md:space-x-5">
          <Link href="/wishlist" className="hidden md:block hover:text-blue-500 transition-colors " aria-label="Wishlist">
            <Heart className="w-6 h-6 hover:scale-125 fill-red-500 stroke-red-500" />
          </Link>
          <Link href="/cart" className="relative hover:text-blue-500 transition-colors" aria-label="Shopping Cart">
            <ShoppingCart className=" h-6 w-6" />
            <AnimatePresence>
            {getTotalItems() > 0 && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold rounded-full h-5 w-5 flex items-center justify-center border-2 border-neutral-900"
              >
                {getTotalItems()}
              </motion.span>
            )}
            </AnimatePresence>
          </Link>

          {/* User Menu */}
          <div className="relative group hidden md:block">
            <button className="flex items-center space-x-1 hover:text-blue-500 transition-colors">
              <User className="h-7 w-7 fill-blue-500 stroke-blue-600" />
              {user && <span className="hidden lg:block text-sm">{user.name}</span>}
            </button>
            <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
              {user ? (
                <>
                  <Link href="/profile" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Profile</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100 rounded-b-lg">Logout</button>
                </>
              ) : (
                <>
                  <Link href="/auth?mode=login" className="block px-4 py-2 hover:bg-gray-100 rounded-t-lg">Login</Link>
                  <Link href="/auth?mode=register" className="block px-4 py-2 hover:bg-gray-100 rounded-b-lg">Register</Link>
                </>
              )}
            </div>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)} 
            className="lg:hidden flex items-center gap-1 p-2 -mr-2" 
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" /> 
            <span className="text-sm">Menu</span> 
          </button>
        </div>
      </div>

      {/* 🔹 Bar 3: Desktop Navigation */}
      <div className="bg-neutral-800/50 backdrop-blur-sm border-y border-neutral-700/50 hidden lg:block">
        <div className="container mx-auto px-4 flex justify-between items-center h-14">
          <div className="flex items-center space-x-4">
            <CategoryMenuButton />
            <div
              className="relative"
              onMouseEnter={() => setIsGamingOpen(true)}
              onMouseLeave={() => setIsGamingOpen(false)}
            >
              <button className="flex items-center px-2 hover:text-blue-500 transition-colors">Gaming</button>
              <AnimatePresence>
                {isGamingOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute left-0 mt-4 bg-neutral-800 text-white shadow-xl rounded-lg grid grid-cols-3 gap-6 p-6 w-[500px] z-50 border border-neutral-700"
                  >
                  {Object.keys(gamingLinks).map((key) => (
                    <Link
                      key={key}
                      href={`/products/?category=gaming&device=${key}`}
                      className="text-sm font-medium hover:text-blue-400"
                    >
                      {gamingLinks[key]} {/* display the value */}
                    </Link>
                  ))}

                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          <div className="flex space-x-6 items-center">
            <Link href="/pc-builder" className="hover:text-blue-500 transition-colors">PC Builder</Link>
            <Link href="/special-deals" className="hover:text-blue-500 transition-colors">Special Deals</Link>
          </div>
        </div>
      </div>

      {/* 🔹 Mobile Drawer Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <div className="lg:hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/60 z-40"
              onClick={() => setIsMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 left-0 h-full w-[85%] max-w-sm bg-neutral-900 z-50 flex flex-col"
            >
              <div className="flex justify-between items-center p-4 border-b border-neutral-700">
                <span className="font-bold text-lg">Menu</span>
                <button onClick={() => setIsMenuOpen(false)} className="p-2 -mr-2" aria-label="Close menu"><X className="h-6 w-6" /></button>
              </div>

              <div className="p-4 overflow-y-auto flex-grow">
                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="mb-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search..."
                      className="w-full pl-4 pr-10 py-2.5 border bg-neutral-800 border-neutral-700 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500"
                    />
                    <button type="submit" className="absolute right-0 top-0 h-full px-3 text-neutral-400" aria-label="Search"><Search className="h-5 w-5" /></button>
                  </div>
                </form>

                {/* Main Links */}
                <nav className="flex flex-col divide-y divide-neutral-800">
                  <div className="py-2"><CategoryMenuButton /></div>
                  
                  {/* Gaming Accordion */}
                  <div className="py-2">
                    <button onClick={() => setIsMobileGamingOpen(!isMobileGamingOpen)} className="w-full flex justify-between items-center py-2 font-medium">
                      <span>Gaming</span>
                      <ChevronDown className={`w-5 h-5 transition-transform ${isMobileGamingOpen ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {isMobileGamingOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden pl-4"
                        >
                          <div className="pt-2 flex flex-col items-start space-y-2">
                            {gamingLinks.map(item => (
                               <NavLink key={item} href={`/products?search=${item}`}>{item}</NavLink>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <NavLink href="/pc-builder">PC Builder</NavLink>
                  <NavLink href="/special-deals">Special Deals</NavLink>
                  <NavLink href="/contact">Contact Us</NavLink>
                  
                  {/* User Auth Links */}
                  <div className="pt-4 mt-2 border-t border-neutral-800">
                    {user ? (
                      <>
                        <NavLink href="/profile">Profile ({user.name})</NavLink>
                        <button onClick={handleLogout} className="block w-full text-left py-3 hover:text-blue-500 transition-colors">Logout</button>
                      </>
                    ) : (
                      <>
                        <NavLink href="/auth?mode=login">Login</NavLink>
                        <NavLink href="/auth?mode=register">Register</NavLink>
                      </>
                    )}
                  </div>
                </nav>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;