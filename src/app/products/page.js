'use client';
import React, { useState, useEffect, useMemo, use } from 'react';
import { motion } from 'framer-motion';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Search,
  Trash,
  SlidersHorizontal,
  ArrowLeft,
  X,
  ShoppingCart,
  Eye
} from 'lucide-react';
import ProductCard from '../../cards/ProductCard';
import { products } from '../../data/product';
import { useTheme } from '@/contexts/ThemeContext';

/* ---------------------------
 *  Redesigned Products Page
 *  - Category Bar (scrollable)
 *  - Subcategory chips
 *  - Sidebar filters -> collapsible drawer on small screens
 *  - Responsive product grid + hover quick-actions
 * ---------------------------- */

const CATEGORIES = [
  { value: '', label: 'All' },
{ value: 'gaming', label: 'Gaming' },
{ value: 'components', label: 'Components' },
{ value: 'accessories', label: 'Accessories' },
{ value: 'commercial', label: 'Commercial' }
];

const SUBCATS = {
  gaming: ['keyboard', 'mouse', 'headset', 'mousepad'],
  components: ['monitor', 'cooler'],
  accessories: ['docking-station', 'webcam'],
};

const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' },
  { value: 'rating-desc', label: 'Top Rated' },
{ value: 'discount-desc', label: 'Biggest Discount' },
];

const FilterIconButton = ({ onClick, children, label }) => (
  <button
  onClick={onClick}
  aria-label={label}
  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-white/60 backdrop-blur-sm border border-slate-200 shadow-sm hover:scale-102 active:scale-98 transition"
  >
  {children}
  </button>
);

const Products = () => {
  // filter/search state
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(useSearchParams().get('category') || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');

  // UI state
  const [filtersOpen, setFiltersOpen] = useState(false); // mobile drawer
  const { currentTheme, changeTheme } = useTheme();

  // derive lists from products
  const derived = useMemo(() => {
    const featured = products.filter(p => p.featured);
    const bestSellers = products.filter(p => p.bestSeller);
    return { featured, bestSellers };
  }, []);

  // update theme when category changes (same as your previous logic)
  useEffect(() => {
    changeTheme(selectedCategory);
  }, [selectedCategory, changeTheme]);

  // filtered & sorted results
  const filteredAndSorted = useMemo(() => {
    let list = [...products];

    // basic search
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.description && p.description.toLowerCase().includes(q)) ||
      (p.category && p.category.toLowerCase().includes(q))
      );
    }

    // category / subcategory
    if (selectedCategory) {
      list = list.filter(p => p.category === selectedCategory);
    }
    if (selectedSubcategory) {
      list = list.filter(p => p.subcategory === selectedSubcategory);
    }

    // price range
    list = list.filter(p => (p.price >= (priceRange.min || 0) && p.price <= (priceRange.max || Infinity)));

    // discounted / inStock
    if (showDiscounted) list = list.filter(p => p.discount && p.discount > 0);
    if (showInStock) list = list.filter(p => p.inStock);

    // sorting
    list.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc': return a.name.localeCompare(b.name);
        case 'name-desc': return b.name.localeCompare(a.name);
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating-desc': return (b.rating || 0) - (a.rating || 0);
        case 'discount-desc': return (b.discount || 0) - (a.discount || 0);
        default: return 0;
      }
    });

    return list;
  }, [searchQuery, selectedCategory, selectedSubcategory, priceRange, showDiscounted, showInStock, sortBy]);

  const clearAll = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedSubcategory('');
    setPriceRange({ min: 0, max: 50000 });
    setShowDiscounted(false);
    setShowInStock(false);
    setSortBy('name-asc');
  };

  // animations
  const containerVariants = {
    hidden: { opacity: 0, y: 6 },
    visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  // helpers for UI
  const activeFiltersCount =
  (searchQuery ? 1 : 0) +
  (selectedCategory ? 1 : 0) +
  (selectedSubcategory ? 1 : 0) +
  (showDiscounted ? 1 : 0) +
  (showInStock ? 1 : 0) +
  ((priceRange.min > 0 || priceRange.max < 50000) ? 1 : 0);

  return (
    <div className={`${currentTheme.bg} ${currentTheme.text} ${currentTheme.font} min-h-screen transition-colors duration-300`}>
    <div className="container mx-auto px-4 py-10">

    {/* Header */}
    <div className="mb-6">
    <h1 className="text-3xl md:text-4xl font-bold">Products</h1>
    <p className="text-sm text-slate-500 mt-1">Explore curated gear — quick filters make discovery easy.</p>
    </div>

    {/* Top controls: search + small actions */}
    <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
    <div className="relative flex-1">
    <Search className={`absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 ${currentTheme.lightText}`} />
    <input
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search products, categories or features..."
    className={`w-full pl-10 pr-4 py-3 rounded-lg border ${currentTheme.inputBorder} ${currentTheme.inputBg} focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
    />
    </div>

    <div className="flex items-center gap-2">
    {/* desktop filter summary button */}
    <div className="hidden sm:flex items-center gap-2">
    <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className={`px-3 py-2 rounded-lg border ${currentTheme.inputBorder} ${currentTheme.inputBg} focus:outline-none`}
    aria-label="Sort products"
    >
    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    </div>

    {/* mobile: open filters drawer */}
    <div className="flex items-center gap-2">
    <FilterIconButton onClick={() => setFiltersOpen(true)} label="Open filters">
    <SlidersHorizontal className="w-4 h-4" />
    <span className="hidden sm:inline text-sm">Filters</span>
    {activeFiltersCount > 0 && (
      <span className="ml-2 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500 text-white">{activeFiltersCount}</span>
    )}
    </FilterIconButton>
    </div>
    </div>
    </div>

    {/* Category Bar */}
    <div className="mb-4">
    <div className="flex gap-3 overflow-x-auto pb-2">
    {CATEGORIES.map(cat => {
      const active = cat.value === selectedCategory;
      return (
        <button
        key={cat.value || 'all'}
        onClick={() => {
          setSelectedCategory(cat.value);
          setSelectedSubcategory('');
        }}
        className={`whitespace-nowrap px-4 py-2 rounded-full border ${active ? 'bg-blue-600 text-white' : 'bg-white text-slate-700'} hover:scale-102 transition`}
        aria-pressed={active}
        >
        {cat.label}
        </button>
      );
    })}
    </div>

    {/* Subcategory chips (when category selected and subcats exist) */}
    {selectedCategory && SUBCATS[selectedCategory] && (
  <div className="mt-3">
    <div className="flex gap-2 overflow-x-auto pb-2">
      <button
        onClick={() => setSelectedSubcategory('')}
        className={`whitespace-nowrap px-3 py-1 rounded-md text-sm border ${
          selectedSubcategory === ''
            ? 'bg-slate-900 text-white'
            : 'bg-white text-slate-700'
        }`}
      >
        All {selectedCategory}
      </button>
      {SUBCATS[selectedCategory].map((sc) => (
        <button
          key={sc}
          onClick={() => setSelectedSubcategory(sc)}
          className={`whitespace-nowrap px-3 py-1 rounded-md text-sm border ${
            selectedSubcategory === sc
              ? 'bg-slate-900 text-white'
              : 'bg-white text-slate-700'
          } capitalize`}
        >
          {sc.replace('-', ' ')}
        </button>
      ))}
    </div>
  </div>
)}
    </div>

    <div className="lg:flex lg:gap-8">
    {/* Sidebar (desktop) */}
    <aside className="hidden lg:block lg:w-72">
    <div className="p-5 rounded-lg shadow-sm bg-white">
    <div className="flex items-center justify-between mb-4">
    <h3 className="font-semibold">Filters</h3>
    <button onClick={clearAll} className="text-sm text-red-600 inline-flex items-center gap-2">
    <Trash className="w-4 h-4" /> Clear
    </button>
    </div>

    {/* Category list (kept for accessibility but secondary) */}
    <div className="mb-4">
    <h4 className="text-sm font-medium mb-2">Category</h4>
    <div className="flex flex-col gap-2">
    {CATEGORIES.map(cat => (
      <label key={cat.value} className="flex items-center gap-2 text-sm">
      <input
      type="radio"
      checked={selectedCategory === cat.value}
      onChange={() => {
        setSelectedCategory(cat.value);
        setSelectedSubcategory('');
      }}
      className="mr-2"
      />
      <span>{cat.label}</span>
      </label>
    ))}
    </div>
    </div>

    {/* Price */}
    <div className="mb-4">
    <h4 className="text-sm font-medium mb-2">Price</h4>
    <div className="flex gap-2">
    <input
    type="number"
    value={priceRange.min}
    onChange={(e) => setPriceRange(p => ({ ...p, min: Number(e.target.value || 0) }))}
    className="px-2 py-2 rounded-md border w-1/2"
    placeholder="Min"
    />
    <input
    type="number"
    value={priceRange.max}
    onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value || 50000) }))}
    className="px-2 py-2 rounded-md border w-1/2"
    placeholder="Max"
    />
    </div>
    </div>

    {/* toggles */}
    <div className="space-y-2">
    <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={showDiscounted} onChange={(e) => setShowDiscounted(e.target.checked)} />
    <span>Discounted only</span>
    </label>
    <label className="flex items-center gap-2 text-sm">
    <input type="checkbox" checked={showInStock} onChange={(e) => setShowInStock(e.target.checked)} />
    <span>In stock only</span>
    </label>
    </div>
    </div>
    </aside>

    {/* Main column */}
    <main className="flex-1">
    {/* summary row */}
    <div className="flex items-center justify-between mb-4">
    <p className="text-sm text-slate-600">
    {filteredAndSorted.length} product{filteredAndSorted.length !== 1 ? 's' : ''} found
    </p>

    <div className="flex items-center gap-3">
    <div className="hidden sm:block">
    <select
    value={sortBy}
    onChange={(e) => setSortBy(e.target.value)}
    className="px-3 py-2 rounded-md border"
    aria-label="Sort"
    >
    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
    </select>
    </div>

    <button
    onClick={clearAll}
    className="px-3 py-2 rounded-md border bg-white text-sm"
    >
    Reset
    </button>
    </div>
    </div>

    {/* Product grid */}
    {filteredAndSorted.length === 0 ? (
      <div className="py-20 text-center">
      <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-white shadow mb-4">
      <Search className="w-10 h-10 text-slate-400" />
      </div>
      <h3 className="text-xl font-semibold mb-2">No products found</h3>
      <p className="text-sm text-slate-500">Try different keywords or clear filters.</p>
      </div>
    ) : (
      <motion.div
      className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      >
      {filteredAndSorted.map((prod, i) => (
        <motion.div key={prod.id} variants={itemVariants} whileHover={{ y: -6 }} className="relative">
        {/* wrapper to add quick actions overlay */}
        <div className="relative rounded-lg overflow-hidden">
        <ProductCard product={prod} index={i} currentTheme={currentTheme} />
        {/* overlay shown on hover (tailwind group-hover would need group parent; we use absolute + opacity transition) */}
        <div className="absolute inset-0 flex items-end justify-center p-3 pointer-events-none">
        <div className="opacity-0 hover:opacity-100 pointer-events-auto transition-opacity duration-200 transform translate-y-2 hover:translate-y-0">
        <div className="flex gap-2">
        <button
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white shadow text-sm"
        aria-label={`View ${prod.name}`}
        onClick={() => {
          // prefer navigating to product detail route — placeholder
          window.location.href = `/products/${prod.slug || prod.id}`;
        }}
        >
        <Eye className="w-4 h-4" /> View
        </button>
        <button
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-blue-600 text-white shadow text-sm"
        aria-label={`Add ${prod.name} to cart`}
        onClick={() => {
          // placeholder add to cart action
          alert(`${prod.name} added to cart (demo)`);
        }}
        >
        <ShoppingCart className="w-4 h-4" /> Add
        </button>
        </div>
        </div>
        </div>
        </div>
        </motion.div>
      ))}
      </motion.div>
    )}
    </main>
    </div>
    </div>

    {/* Mobile Filters Drawer */}
    <motion.div
    initial={{ x: '100%' }}
    animate={filtersOpen ? { x: 0 } : { x: '100%' }}
    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
    className={`fixed top-0 right-0 bottom-0 w-full max-w-[420px] bg-white shadow-lg z-50 lg:hidden`}
    style={{ display: filtersOpen ? undefined : undefined }}
    aria-hidden={!filtersOpen}
    >
    <div className="p-4 border-b flex items-center justify-between">
    <h3 className="font-semibold">Filters</h3>
    <button onClick={() => setFiltersOpen(false)} aria-label="Close filters">
    <X className="w-5 h-5" />
    </button>
    </div>

    <div className="p-4 space-y-4 overflow-y-auto h-[calc(100vh-64px)]">
    <div className="space-y-2">
    <h4 className="text-sm font-medium">Category</h4>
    <div className="flex flex-col gap-2">
    {CATEGORIES.map(cat => (
      <label key={cat.value} className="flex items-center gap-2">
      <input
      type="radio"
      checked={selectedCategory === cat.value}
      onChange={() => {
        setSelectedCategory(cat.value);
        setSelectedSubcategory('');
      }}
      className="mr-2"
      />
      <span>{cat.label}</span>
      </label>
    ))}
    </div>
    </div>

    {/* subcategories in drawer */}
    {selectedCategory && SUBCATS[selectedCategory] && (
      <div className="space-y-2">
      <h4 className="text-sm font-medium">Subcategory</h4>
      <div className="flex flex-wrap gap-2">
      <button onClick={() => setSelectedSubcategory('')} className={`px-3 py-1 rounded-md text-sm border ${selectedSubcategory === '' ? 'bg-slate-900 text-white' : 'bg-white'}`}>All</button>
      {SUBCATS[selectedCategory].map(sc => (
        <button key={sc} onClick={() => setSelectedSubcategory(sc)} className={`px-3 py-1 rounded-md text-sm border ${selectedSubcategory === sc ? 'bg-slate-900 text-white' : 'bg-white'}`}>{sc.replace('-', ' ')}</button>
      ))}
      </div>
      </div>
    )}

    {/* price */}
    <div>
    <h4 className="text-sm font-medium mb-2">Price</h4>
    <div className="flex gap-2">
    <input type="number" value={priceRange.min} onChange={(e) => setPriceRange(p => ({ ...p, min: Number(e.target.value || 0) }))} className="w-1/2 px-2 py-2 rounded-md border" placeholder="Min" />
    <input type="number" value={priceRange.max} onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value || 50000) }))} className="w-1/2 px-2 py-2 rounded-md border" placeholder="Max" />
    </div>
    </div>

    <div className="space-y-2">
    <label className="flex items-center gap-2"><input type="checkbox" checked={showDiscounted} onChange={(e) => setShowDiscounted(e.target.checked)} /> Discounted only</label>
    <label className="flex items-center gap-2"><input type="checkbox" checked={showInStock} onChange={(e) => setShowInStock(e.target.checked)} /> In stock only</label>
    </div>

    <div className="flex gap-2">
    <button onClick={() => { clearAll(); setFiltersOpen(false); }} className="flex-1 px-4 py-2 rounded-md border">Reset</button>
    <button onClick={() => setFiltersOpen(false)} className="flex-1 px-4 py-2 rounded-md bg-blue-600 text-white">Apply</button>
    </div>
    </div>
    </motion.div>

    {/* overlay behind drawer */}
    {filtersOpen && (
      <div onClick={() => setFiltersOpen(false)} className="fixed inset-0 bg-black/30 z-40 lg:hidden" />
    )}
    </div>
  );
};

export default Products;
