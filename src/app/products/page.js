'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams } from 'next/navigation';
import { Search, Trash, SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import ProductCard from '../../cards/ProductCard';
import { products } from '../../data/product';
import { useTheme } from '@/contexts/ThemeContext';

// --- DATA (Keep this at the top or in a separate file) ---
const CATEGORIES = [
    { value: '', label: 'All Products' },
    { value: 'gaming', label: 'Gaming' },
    { value: 'components', label: 'Components' },
    { value: 'accessories', label: 'Accessories' },
    { value: 'commercial', label: 'Commercial' },
    { value: 'diy-cooling', label: 'DIY Cooling' },
    { value: 'processor', label: 'Processor' },
    { value: 'motherboard', label: 'Motherboard' },
    { value: 'graphics-card', label: 'Graphics Card' },
    { value: 'ram', label: 'RAM' },
    { value: 'storage', label: 'Storage' },
    { value: 'smps', label: 'SMPS' },
    { value: 'cabinet', label: 'Cabinet' },
    { value: 'peripherals', label: 'Peripherals' },
    { value: 'laptop', label: 'Laptop' },
    { value: 'monitor', label: 'Monitor' },
    { value: 'cpu-cooler', label: 'CPU Cooler' }
];
const SUBCATS = {
  gaming: ['keyboard', 'mouse', 'headset', 'mousepad'],
  components: ['monitor', 'cooler'],
  accessories: ['docking-station', 'webcam'],
  "diy-cooling": ["liquid cooling kit", "coolant", "fitting", "tube", "accessory"],
  "processor": [ "intel", "amd" ],
  "motherboard": [ "intel motherboard", "amd motherboard" ],
  "graphics-card": [ "nvidia", "amd" ],
  "ram": [ "ddr4", "ddr5" ],
  "storage": [ "ssd", "hdd" ],
  "smps": [ "650w", "750w", "850w" ],
  "cabinet": [ "atx", "micro atx" ],
  "peripherals": [ "keyboard", "mouse", "headset" ],
  "laptop": [ "gaming laptop", "business laptop" ],
  "monitor": [ "24 inch", "27 inch", "32 inch" ],
  "cpu-cooler": [ "air cooler", "liquid cooler" ]
};
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low → High)' },
  { value: 'price-desc', label: 'Price (High → Low)' },
  { value: 'rating-desc', label: 'Top Rated' },
  { value: 'discount-desc', label: 'Biggest Discount' },
];

// --- REUSABLE UI COMPONENTS ---

const CollapsibleSection = ({ title, children, defaultOpen = true }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className="border-b py-4">
      <button onClick={() => setIsOpen(!isOpen)} className="flex w-full items-center justify-between text-left">
        <h4 className="font-semibold text-gray-800">{title}</h4>
        <ChevronDown className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0, marginTop: 0 }}
            animate={{ height: 'auto', opacity: 1, marginTop: '1rem' }}
            exit={{ height: 0, opacity: 0, marginTop: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// --- CORE FILTERING UI ---

const FilterContent = ({ filterProps }) => {
  const {
    selectedCategory, setSelectedCategory,
    selectedSubcategory, setSelectedSubcategory,
    priceRange, setPriceRange,
    showDiscounted, setShowDiscounted,
    showInStock, setShowInStock,
  } = filterProps;

  return (
    <>
      <CollapsibleSection title="Category">
        <div className="flex flex-col gap-3">
          {CATEGORIES.map(cat => (
            <label key={cat.value} className="flex items-center gap-2 cursor-pointer text-sm">
              <input type="radio" name="category" checked={selectedCategory === cat.value}
                onChange={() => { setSelectedCategory(cat.value); setSelectedSubcategory(''); }}
                className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-300"
              />
              <span>{cat.label}</span>
            </label>
          ))}
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Price">
        <div className="flex items-center gap-2">
          <input type="number" value={priceRange.min} onChange={(e) => setPriceRange(p => ({ ...p, min: Number(e.target.value || 0) }))} className="w-full px-3 py-2 rounded-md border text-sm" placeholder="Min" />
          <span className="text-gray-400">-</span>
          <input type="number" value={priceRange.max} onChange={(e) => setPriceRange(p => ({ ...p, max: Number(e.target.value || 50000) }))} className="w-full px-3 py-2 rounded-md border text-sm" placeholder="Max" />
        </div>
      </CollapsibleSection>

      <CollapsibleSection title="Availability">
        <div className="space-y-3">
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" checked={showDiscounted} onChange={(e) => setShowDiscounted(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <span>On Sale</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer text-sm">
            <input type="checkbox" checked={showInStock} onChange={(e) => setShowInStock(e.target.checked)} className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer" />
            <span>In Stock</span>
          </label>
        </div>
      </CollapsibleSection>
    </>
  );
};


// --- PAGE-SPECIFIC COMPONENTS ---

const TopBar = ({ searchQuery, setSearchQuery, sortBy, setSortBy, activeFiltersCount, setFiltersOpen }) => (
  <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
    <div className="relative flex-1">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
      <input
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search products, brands, or features..."
        className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
      />
    </div>
    <div className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-2">
        <label htmlFor="sort-by" className="text-sm font-medium text-slate-600 hidden md:block">Sort by:</label>
        <select id="sort-by" value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="px-3 py-2.5 rounded-lg border bg-white border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500" aria-label="Sort products">
          {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
        </select>
      </div>
      <button onClick={() => setFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-lg bg-slate-800 text-white font-semibold shadow-sm">
        <Filter className="w-4 h-4" />
        <span>Filters</span>
        {activeFiltersCount > 0 && <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500 text-white">{activeFiltersCount}</span>}
      </button>
    </div>
  </div>
);

const FilterSidebar = ({ filterProps, clearAll }) => (
  <aside className="hidden lg:block lg:w-72 shrink-0">
    <div className="sticky top-24 p-5 rounded-lg bg-slate-50 border">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-semibold">Filters</h3>
        <button onClick={clearAll} className="text-sm text-red-600 hover:underline inline-flex items-center gap-1.5">
          <Trash className="w-4 h-4" /> Clear All
        </button>
      </div>
      <FilterContent filterProps={filterProps} />
    </div>
  </aside>
);

const MobileFilterDrawer = ({ isOpen, setIsOpen, filterProps, clearAll }) => (
  <AnimatePresence>
    {isOpen && (
      <>
        {/* Overlay: z-index is now 110 */}
        <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }} 
            onClick={() => setIsOpen(false)} 
            // CHANGED: z-index increased to be higher than the header
            className="fixed inset-0 bg-black/50 z-[110] lg:hidden" 
        />
        
        {/* Drawer: z-index is now 120 (highest) */}
        <motion.div
          initial={{ x: '100%' }} 
          animate={{ x: 0 }} 
          exit={{ x: '100%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
          // CHANGED: z-index increased to be higher than the header
          className="fixed top-0 right-0 h-screen w-screen max-w-sm bg-white shadow-lg z-[120] flex flex-col"
        >
          <div className="p-4 border-b flex items-center justify-between shrink-0">
            <h3 className="font-semibold text-lg">Filters</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close filters"><X className="w-6 h-6 text-gray-500" /></button>
          </div>
          <div className="p-4 overflow-y-auto flex-grow"><FilterContent filterProps={filterProps} /></div>
          <div className="p-4 border-t flex gap-2 shrink-0 bg-white">
            <button onClick={() => { clearAll(); setIsOpen(false); }} className="flex-1 px-4 py-3 rounded-md border font-semibold hover:bg-gray-100">Reset</button>
            <button onClick={() => setIsOpen(false)} className="flex-1 px-4 py-3 rounded-md bg-slate-900 text-white font-semibold">Apply</button>
          </div>
        </motion.div>
      </>
    )}
  </AnimatePresence>
);

const ProductGrid = ({ products, currentTheme }) => {
    const containerVariants = { hidden: {}, visible: { transition: { staggerChildren: 0.05 } } };
    const itemVariants = { hidden: { opacity: 0, y: 10 }, visible: { opacity: 1, y: 0 } };

    return products.length === 0 ? (
      <div className="py-20 text-center w-full">
        <div className="inline-flex items-center justify-center w-28 h-28 rounded-full bg-slate-100 shadow-sm mb-4">
          <Search className="w-10 h-10 text-slate-400" />
        </div>
        <h3 className="text-xl font-semibold mb-2">No Products Found</h3>
        <p className="text-sm text-slate-500">Try adjusting your search or filter criteria.</p>
      </div>
    ) : (
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-5">
        {products.map((prod, i) => (
          <motion.div key={prod.id} variants={itemVariants}>
            <ProductCard product={prod} index={i} currentTheme={currentTheme} />
          </motion.div>
        ))}
      </motion.div>
    );
};


// --- MAIN PAGE COMPONENT ---

const Products = () => {
  const searchParams = useSearchParams();
  const { currentTheme } = useTheme();

  // State Management
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get("category") || '');
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 50000 });
  const [showDiscounted, setShowDiscounted] = useState(false);
  const [showInStock, setShowInStock] = useState(false);
  const [sortBy, setSortBy] = useState('name-asc');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    setSelectedCategory(searchParams.get("category") || '');
  }, [searchParams]);

  const filteredAndSorted = useMemo(() => {
    let list = [...products];
    if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        list = list.filter(p => p.name.toLowerCase().includes(q) || p.category?.toLowerCase().includes(q));
    }
    if (selectedCategory) list = list.filter(p => p.category === selectedCategory);
    if (selectedSubcategory) list = list.filter(p => p.subcategory === selectedSubcategory);
    list = list.filter(p => p.price >= (priceRange.min || 0) && p.price <= (priceRange.max || Infinity));
    if (showDiscounted) list = list.filter(p => p.discount && p.discount > 0);
    if (showInStock) list = list.filter(p => p.inStock);
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

  const activeFiltersCount = (searchQuery ? 1 : 0) + (selectedCategory ? 1 : 0) + (selectedSubcategory ? 1 : 0) + (showDiscounted ? 1 : 0) + (showInStock ? 1 : 0) + ((priceRange.min > 0 || priceRange.max < 50000) ? 1 : 0);
  const filterProps = { selectedCategory, setSelectedCategory, selectedSubcategory, setSelectedSubcategory, priceRange, setPriceRange, showDiscounted, setShowDiscounted, showInStock, setShowInStock, clearAll };

  return (
    <div className={`bg-slate-100 text-slate-800 ${currentTheme.font} min-h-screen transition-colors duration-300`}>
      <div className="container mx-auto px-4 py-10">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold">Products</h1>
          <p className="text-sm text-slate-500 mt-1">Find your next piece of tech from our curated collection.</p>
        </div>

        <TopBar {...{ searchQuery, setSearchQuery, sortBy, setSortBy, activeFiltersCount, setFiltersOpen }} />
        
        <div className="mb-4">
          <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-4 px-4">
            {CATEGORIES.map(cat => (
              <button key={cat.value || 'all'} onClick={() => { setSelectedCategory(cat.value); setSelectedSubcategory(''); }}
                className={`whitespace-nowrap px-4 py-2 rounded-full border text-sm font-medium transition ${cat.value === selectedCategory ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-50'}`}
              >{cat.label}</button>
            ))}
          </div>
        </div>
        
        <div className="lg:flex lg:gap-8">
          <FilterSidebar filterProps={filterProps} clearAll={clearAll} />
          <main className="flex-1">
            {selectedCategory && SUBCATS[selectedCategory] && (
              <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
                <button onClick={() => setSelectedSubcategory('')} className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold border ${selectedSubcategory === '' ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}>All {selectedCategory}</button>
                {SUBCATS[selectedCategory].map(sc => (
                  <button key={sc} onClick={() => setSelectedSubcategory(sc)} className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold border capitalize ${selectedSubcategory === sc ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}>{sc.replace('-', ' ')}</button>
                ))}
              </div>
            )}
            <ProductGrid products={filteredAndSorted} currentTheme={currentTheme} />
          </main>
        </div>
      </div>
      <MobileFilterDrawer isOpen={filtersOpen} setIsOpen={setFiltersOpen} filterProps={filterProps} clearAll={clearAll} />
    </div>
  );
};

export default function ProductsPage() {
  return (
    <Suspense fallback={<div className="h-screen w-full flex items-center justify-center"><p>Loading Products...</p></div>}>
      <Products />
    </Suspense>
  );
}