'use client';
import React, { useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import {
  Gamepad2,
  Monitor,
  Cpu,
  Mouse,
  ArrowRight,
  Star,
  TrendingUp,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  TrendingDown,
} from 'lucide-react';

import Banner from '../components/Banner';
import ProductCard from '../cards/ProductCard';
import Button from '../components/Button';
import { products } from '../data/product';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/**
 * Redesigned Home page
 * - Improved spacing & typography
 * - Framer Motion animations (entrance, stagger, hover)
 * - Accessible slider controls (buttons that control react-slick via ref)
 * - Best Sellers & Testimonials sections added
 * - Newsletter with basic validation + success state
 */

/* ---------------------- Config / Data ----------------------- */
const categories = [
  {
    name: 'Gaming',
    icon: Gamepad2,
    description: 'High-performance gaming gear',
    link: '/products?category=gaming',
    color: 'bg-gradient-to-br from-slate-800 to-slate-700',
  },
  {
    name: 'Components',
    icon: Cpu,
    description: 'Build your dream PC',
    link: '/products?category=components',
    color: 'bg-gradient-to-br from-blue-700 to-blue-600',
  },
  {
    name: 'Accessories',
    icon: Mouse,
    description: 'Peripherals & essentials',
    link: '/products?category=accessories',
    color: 'bg-gradient-to-br from-emerald-600 to-emerald-500',
  },
  {
    name: 'Commercial',
    icon: Monitor,
    description: 'Business & enterprise systems',
    link: '/products?category=commercial',
    color: 'bg-gradient-to-br from-indigo-700 to-indigo-600',
  },
];

const section = {
  hidden: { opacity: 0, y: 30 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 * i, ease: 'easeOut', duration: 0.6 },
  }),
};

const listContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.08, when: 'beforeChildren' },
  },
};

const listItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.45 } },
};

/* ---------------------- Helpers ----------------------- */

const useDerivedProducts = () => {
  const featured = useMemo(() => products.filter((p) => p.featured).slice(0, 8), []);
  const discounted = useMemo(() => products.filter((p) => p.discount && p.discount > 0).slice(0, 6), []);
  const festive = useMemo(() => products.filter((p) => p.festiveOffer).slice(0, 4), []);
  const bestSellers = useMemo(() => products.filter((p) => p.bestSeller).slice(0, 6), []);
  return { featured, discounted, festive, bestSellers };
};

/* ---------------------- Slider Arrows (accessible) ----------------------- */

const SlickPrev = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Previous"
    className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition"
  >
    <ChevronLeft className="w-5 h-5 text-slate-700" />
  </button>
);

const SlickNext = ({ onClick }) => (
  <button
    onClick={onClick}
    aria-label="Next"
    className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm shadow-md flex items-center justify-center hover:scale-105 transition"
  >
    <ChevronRight className="w-5 h-5 text-slate-700" />
  </button>
);

/* ---------------------- Main Component ----------------------- */

export default function Home() {
  const { featured, discounted, festive, bestSellers } = useDerivedProducts();
  const sliderRef = useRef(null);
  const featuredRef = useRef(null);
  const [email, setEmail] = useState('');
  const [newsletterState, setNewsletterState] = useState('idle'); // 'idle' | 'error' | 'success'
  const [isAutoplaying, setIsAutoplaying] = useState(true);

  const sliderSettings = {
  dots: true,
  infinite: true,
  speed: 800,
  slidesToShow: 2,
  slidesToScroll: 1,
  autoplay: isAutoplaying,
  autoplaySpeed: 3000,
  pauseOnHover: true,
  arrows: false,
  responsive: [
    {
      breakpoint: 1024, // <= 1024px
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};


  /* Newsletter basic handler (client-side only) */
  function handleSubscribe(e) {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^\S+@\S+\.\S+$/.test(trimmed)) {
      setNewsletterState('error');
      return;
    }
    // Simulated success (replace with API call)
    setNewsletterState('success');
    setEmail('');
    setTimeout(() => setNewsletterState('idle'), 2500);
  }

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 ">
      {/* HERO */}
      <Banner />

      {/* CATEGORIES */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.25 }}
            variants={listContainer}
            className="mb-8 text-center"
          >
            <motion.h2 variants={listItem} className="text-2xl md:text-3xl font-extrabold">
              Shop by Category
            </motion.h2>
            <motion.p variants={listItem} className="text-sm md:text-base text-slate-600 max-w-2xl mx-auto mt-2">
              Explore curated categories — from gaming rigs to pro-grade components.
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {categories.map((cat, i) => {
              const Icon = cat.icon;
              return (
                <motion.div
                  key={cat.name}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.3 }}
                  variants={section}
                  custom={i}
                  whileHover={{ y: -6, scale: 1.01 }}
                  className="group"
                >
                  <Link
                    href={cat.link}
                    className="block bg-white rounded-xl p-5 shadow-sm hover:shadow-lg border border-slate-200 transition-all duration-300 h-full"
                    aria-label={`Browse ${cat.name}`}
                  >
                    <div className={`w-14 h-14 rounded-lg ${cat.color} flex items-center justify-center mb-4 shadow`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="font-semibold text-lg">{cat.name}</h3>
                    <p className="text-sm text-slate-500 mt-1">{cat.description}</p>
                    <div className="mt-4 inline-flex items-center text-sm text-blue-600 group-hover:text-blue-700">
                      <span>Shop Now</span>
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FESTIVE OFFERS */}
      {festive.length > 0 && (
        <section className="py-12 bg-gradient-to-r from-yellow-50 to-orange-50">
          <div className="container mx-auto px-4">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={listContainer}
              className="text-center mb-6"
            >
              <motion.div variants={listItem} className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 mx-auto shadow-sm">
                <Sparkles className="w-5 h-5 text-yellow-500" />
                <span className="text-sm font-medium">Festive Picks</span>
              </motion.div>
              <motion.h2 variants={listItem} className="text-2xl md:text-3xl font-bold mt-4">
                Limited-Time Festival Deals
              </motion.h2>
              <motion.p variants={listItem} className="text-slate-600 mt-2 max-w-2xl mx-auto">
                Celebrate & save on top tech — offers end soon.
              </motion.p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {festive.map((p, idx) => (
                <motion.div key={p.id || idx} initial="hidden" whileInView="visible" variants={listItem}>
                  <ProductCard product={p} index={idx} currentTheme={{}} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* SPECIAL / DISCOUNTED */}
      {discounted.length > 0 && (
        <section className="py-14">
          <div className="container mx-auto px-4">
            <motion.div className="flex items-center gap-3 mb-6" initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}>
              <TrendingDown className="w-6 h-6 text-orange-500" />
              <h3 className="text-xl lg:text-3xl font-semibold">Special Offers %</h3>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {discounted.map((p, i) => (
                <motion.div key={p.id} initial="hidden" whileInView="visible" variants={listItem}>
                  <ProductCard product={p} index={i} currentTheme={{}} />
                </motion.div>
              ))}
            </div>

            <div className="text-center mt-8">
              <Link href="/products?discount=true">
                <Button size="lg" className="bg-orange-600 hover:bg-orange-700 text-white shadow">
                  View All Offers <ArrowRight className="w-4 h-4 ml-2 inline" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED SLIDER */}
      <section className="py-14 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Star className="w-6 h-6 text-yellow-500" />
                <h2 className="text-2xl font-bold">Featured Products</h2>
              </div>
              <p className="text-sm text-slate-600 mt-1">Handpicked items for performance and value.</p>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => sliderRef.current?.slickPrev()}
                aria-label="Previous featured"
                className="p-2 ml-2 rounded-md bg-white shadow hover:scale-105 transition"
              >
                <ChevronLeft className="w-5 h-5 text-slate-700" />
              </button>
              <button
                onClick={() => sliderRef.current?.slickNext()}
                aria-label="Next featured"
                className="p-2 rounded-md bg-white shadow hover:scale-105 transition"
              >
                <ChevronRight className="w-5 h-5 text-slate-700" />
              </button>
            </div>
          </div>

          <div className="relative w-full md:w-3/4  mx-auto">
            <Slider ref={sliderRef} {...sliderSettings} className="gap-4 md:gap-8 flex">
              {featured.map((product, index) => (
                <div key={product.id} className="px-2">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                    className="h-full "
                  >
                    <ProductCard product={product} index={index} currentTheme={{}} />
                  </motion.div>
                </div>
              ))}
            </Slider>
          </div>

          <div className="text-center mt-8">
            <Link href="/products">
              <Button size="lg" variant="outline" className="border-slate-300 text-slate-700">
                View All Products <ArrowRight className="w-4 h-4 ml-2 inline" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS GRID */}
      {bestSellers.length > 0 && (
        <section className="py-14">
          <div className="container mx-auto px-4">
            <motion.h3 initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} className="text-2xl font-bold mb-4">
              Best Sellers
            </motion.h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {bestSellers.map((p) => (
                <motion.div key={p.id} initial="hidden" whileInView="visible" variants={listItem}>
                  <ProductCard product={p} index={p.id} currentTheme={{}} />
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIAL / CTA */}
      <section className="py-12 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center gap-6 justify-between">
          <div>
            <h4 className="text-2xl font-bold">Loved by thousands of tech lovers</h4>
            <p className="text-slate-200 mt-2 max-w-xl">
              Trusted reviews & speedy dispatch. Join the community of satisfied builders and gamers.
            </p>
          </div>

          <div className="flex gap-3">
            <Link href="/reviews">
              <Button className="bg-blue-600 hover:bg-blue-700">See Reviews</Button>
            </Link>
            <Link href="/signup">
              <Button className="bg-blue-600 hover:bg-blue-700">Get Started</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* NEWSLETTER */}
      <section className="py-14">
        <div className="container mx-auto px-4">
          <motion.div initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto text-center">
            <h2 className="text-2xl font-semibold">Stay in the loop</h2>
            <p className="text-slate-600 mt-2">Get exclusive offers, early access to drops, and curated tech tips.</p>

            <form onSubmit={handleSubscribe} className="mt-6 flex flex-col sm:flex-row gap-3 items-center justify-center">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@gmail.com"
                aria-label="Email address"
                className="w-full sm:w-auto flex-1 px-4 py-3 rounded-lg border border-slate-800 border-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit" className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg">
                Subscribe
              </Button>
            </form>

            <div className="min-h-[1.5rem] mt-3">
              {newsletterState === 'error' && <p className="text-sm text-red-600">Please enter a valid email address.</p>}
              {newsletterState === 'success' && <p className="text-sm text-green-600">Subscribed — check your inbox!</p>}
            </div>
          </motion.div>
        </div>
      </section>

      {/* small footer spacer */}
      <div className="h-24" />
    </div>
  );
}
