'use client';
import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { Search, Trash, SlidersHorizontal, X, ChevronDown, Filter } from 'lucide-react';
import ProductCard from '../../cards/ProductCard';
import { products } from '../../data/product';
import { useTheme } from '@/contexts/ThemeContext';

// --- DATA (Keep this at the top or in a separate file) ---
const CATEGORIES = [
{ value: 'all', label: 'All Products' },
{ value: 'gaming', label: 'Gaming' },
{ value: 'components', label: 'Components' },
{ value: 'accessories', label: 'Accessories' },
{ value: 'commercial', label: 'Commercial' },
];
const TYPES = [
{value: 'all', label: 'All Types'},
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
]
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

const FilterContent = ({ filters, updateFilter, dynamicOptions }) => {
    return (
      <>
        <CollapsibleSection title="Category">
          <div className="flex flex-col gap-3">
            {CATEGORIES.map(cat => (
              <label key={cat.value} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="category"
                  // FIX: Use a default empty string to prevent 'undefined' issues.
                  checked={(filters.category || '') === cat.value}
                  onChange={() => updateFilter("category", cat.value)}
                  className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-300"
                />
                <span>{cat.label}</span>
              </label>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Brand">
          <div className="flex flex-col gap-3">
            {dynamicOptions.brands.map(brand => (
              <label key={brand} className="flex items-center gap-2 cursor-pointer text-sm">
                <input
                  type="radio"
                  name="brand"
                  checked={filters.brand === brand}
                  // UX IMPROVEMENT: Allow deselecting by clicking the same radio button again.
                  onChange={() => updateFilter("brand", filters.brand === brand ? '' : brand)}
                  className="h-4 w-4 shrink-0 cursor-pointer appearance-none rounded-full border-2 border-gray-400 checked:border-blue-600 checked:bg-blue-600 checked:ring-2 checked:ring-blue-300"
                />
                <span className="capitalize">{brand}</span>
              </label>
            ))}
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Price">
          <div className="flex items-center gap-2">
            <input
              type="number"
              value={filters.priceMin || ''}
              onChange={(e) => updateFilter("priceMin", e.target.value)}
              className="w-full px-3 py-2 rounded-md border text-sm"
              placeholder="Min"
            />
            <span className="text-gray-400">-</span>
            <input
              type="number"
              value={filters.priceMax || ''}
              onChange={(e) => updateFilter("priceMax", e.target.value)}
              className="w-full px-3 py-2 rounded-md border text-sm"
              placeholder="Max"
            />
          </div>
        </CollapsibleSection>

        <CollapsibleSection title="Availability">
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={filters.onSale === 'true'}
                onChange={(e) => updateFilter("onSale", e.target.checked ? 'true' : '')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>On Sale</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="checkbox"
                checked={filters.inStock === 'true'}
                onChange={(e) => updateFilter("inStock", e.target.checked ? 'true' : '')}
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span>In Stock</span>
            </label>
          </div>
        </CollapsibleSection>
      </>
    );
};


// --- PAGE-SPECIFIC COMPONENTS ---

const TopBar = ({ filters, updateFilter, activeFiltersCount, setFiltersOpen }) => (
    <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-6">
        <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
                value={filters.q || ''}
                onChange={(e) => updateFilter('q', e.target.value)}
                placeholder="Search products, brands..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border bg-white border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
        </div>
        <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-2">
                <label htmlFor="sort-by" className="text-sm font-medium text-slate-600 hidden md:block">Sort by:</label>
                <select
                    id="sort-by"
                    value={filters.sortBy || 'name-asc'}
                    onChange={(e) => updateFilter('sortBy', e.target.value)}
                    className="px-2 py-2 md:px-3 md:py-2.5 rounded-lg border bg-white border-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                    aria-label="Sort products"
                >
                    {SORT_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
                </select>
            </div>
            <button onClick={() => setFiltersOpen(true)} className="lg:hidden flex items-center gap-2 px-2 py-2 rounded-lg bg-slate-800 text-white font-semibold shadow-sm">
                <Filter className="md:w-4 md:h-4" />
                <span>Filters</span>
                {activeFiltersCount > 0 && <span className="ml-1 inline-flex items-center justify-center w-5 h-5 text-xs rounded-full bg-red-500 text-white">{activeFiltersCount}</span>}
            </button>
        </div>
    </div>
);
const FilterSidebar = ({ filters, updateFilter, clearAll, dynamicOptions }) => (
    <aside className="hidden lg:block lg:w-72 shrink-0">
        <div className="sticky top-24 p-5 rounded-lg bg-slate-50 border">
            <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button onClick={clearAll} className="text-sm text-red-600 hover:underline inline-flex items-center gap-1.5">
                    <Trash className="w-4 h-4" /> Clear All
                </button>
            </div>
            <FilterContent filters={filters} updateFilter={updateFilter} dynamicOptions={dynamicOptions} />
        </div>
    </aside>
);
const MobileFilterDrawer = ({ isOpen, setIsOpen, filters, clearAll, dynamicOptions, updateFilter }) => (
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
      <div className="p-4 overflow-y-auto flex-grow"><FilterContent filters={filters} dynamicOptions={dynamicOptions} updateFilter={updateFilter} /></div>  
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
    const router = useRouter();
    const pathname = usePathname();

    const { currentTheme } = useTheme();

    const [filtersOpen, setFiltersOpen] = useState(false);

    useEffect(() => {
        const category = searchParams.get('category');
        if (!category) {
            const params = new URLSearchParams(searchParams.toString());
            params.set('category', 'all');
            router.replace(`${pathname}?${params.toString()}`, { scroll: false });
        }
    }, [searchParams]); // Run only once on mount

    // Derive filter state directly from URL search parameters
    const filters = useMemo(() => {
        return Object.fromEntries(searchParams.entries());
    }, [searchParams]);

    // Create a single function to update the URL
    const updateFilter = (key, value) => {
      const newFilters = new URLSearchParams();
      if (value) {
        newFilters.set(key, value);
      }
      router.push(`${pathname}?${newFilters.toString()}`, { scroll: false });
    };

    const clearAll = () => {
        router.push(pathname, { scroll: false });
    };
    
    // Generate dynamic options for filters like 'brand'
    const dynamicOptions = useMemo(() => {
        const brands = new Set(products.map(p => p.brand).filter(Boolean));
        return {
            brands: Array.from(brands).sort(),
        };
    }, [products]);
    

    // Apply filtering and sorting based on the 'filters' object from the URL
    const filteredAndSorted = useMemo(() => {
        let list = [...products];
        const { q, category, type, brand, device, devicetype, storage, size, series, resolution, priceMin, priceMax, onSale, inStock, sortBy } = filters;

        if (q) list = list.filter(p => p.name.toLowerCase().includes(q.toLowerCase()));
        if (category) list = list.filter(p => (p.category === category || category === 'all') );
        if (type) list = list.filter(p => (p.type === type || type === 'all') );
        if (brand) list = list.filter(p => p.brand === brand);
        if (priceMin) list = list.filter(p => p.price >= Number(priceMin));
        if (priceMax) list = list.filter(p => p.price <= Number(priceMax));
        if (onSale === 'true') list = list.filter(p => p.discount && p.discount > 0);
        if (inStock === 'true') list = list.filter(p => p.inStock);
        if (device) list = list.filter(p => p.device === device);
        if (devicetype) list = list.filter(p => p.devicetype === devicetype);
        if (storage) list = list.filter(p => p.storage === storage);
        if (size) list = list.filter(p => p.size === size);
        if (resolution) list = list.filter(p => p.resolution === resolution);
        if (series) list = list.filter(p => p.series === series);

        list.sort((a, b) => {
            switch (sortBy) {
                case 'name-desc': return b.name.localeCompare(a.name);
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'rating-desc': return (b.rating || 0) - (a.rating || 0);
                case 'discount-desc': return (b.discount || 0) - (a.discount || 0);
                default: return a.name.localeCompare(b.name); // 'name-asc' is default
            }
        });
        return list;
    }, [products, filters]);
    
    // Calculate active filters, excluding sortBy for the badge count
    const activeFiltersCount = useMemo(() => {
        const tempFilters = { ...filters };
        delete tempFilters.sortBy;
        return Object.values(tempFilters).filter(Boolean).length;
    }, [filters]);

return (
<div className={`bg-slate-200 text-slate-800 ${currentTheme.font} min-h-screen transition-colors duration-300`}>
            <div className="container mx-auto px-4 py-10">
                <div className="mb-6">
                    <h1 className="text-3xl md:text-4xl -mt-6 md:mt-0 font-bold">Products</h1>
                    <p className="text-sm text-slate-500 mt-1">Find your next piece of tech from our curated collection.</p>
                </div>

                <TopBar {...{ filters, updateFilter, activeFiltersCount, setFiltersOpen }} />

                <div className="mb-4">
      <div className="flex gap-2 lg:gap-2.5 overflow-x-auto pb-3 -mx-4 px-4">  
        {CATEGORIES.map(cat => (  
          <button key={cat.value} onClick={() => { updateFilter('category', cat.value);  }}  
            className={`whitespace-nowrap px-2 lg:px-4 py-2 rounded-full border text-xs md:text-sm font-medium transition ${cat.value === filters.category ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-50'}`}  
          >{cat.label}</button>  
        ))}  
      </div>  
    </div>  
    <div className="mb-4">  
      <div className="flex gap-2.5 overflow-x-auto pb-3 -mx-4 px-4">  
        {TYPES.map(cat => (  
          <button key={cat.value || 'all'} onClick={() => { updateFilter('type', cat.value);  }}  
            className={`whitespace-nowrap px-2 lg:px-4 py-2 rounded-full border text-xs md:text-sm font-medium transition ${cat.value === filters.type ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-slate-700 hover:bg-slate-50'}`}  
          >{cat.label}</button>  
        ))}  
      </div>  
    </div>  
      
    <div className="lg:flex lg:gap-8">  
      <FilterSidebar {...{ filters, updateFilter, clearAll, dynamicOptions }} />  
      <main className="flex-1">  
        {false && SUBCATS[filters.type] && (
    <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
      {/* "All" button clears the subcategory from the URL */}
      <button
        onClick={() => updateFilter('subcategory', '')}
        className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold border ${
          !filters.subcategory ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
        }`}
      >
        All {filters.category}
      </button>

      {/* Each button sets the specific subcategory in the URL */}
      {SUBCATS[filters.type].map(sc => (
        <button
          key={sc}
          onClick={() => updateFilter('type', sc)}
          className={`whitespace-nowrap px-3 py-1.5 rounded-md text-xs font-semibold border capitalize ${
            filters.type === sc ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'
          }`}
        >
          {sc.replace('-', ' ')}
        </button>
      ))}
    </div>
  )} 
        <ProductGrid products={filteredAndSorted} currentTheme={currentTheme} />
      </main>  
    </div>  
  </div>  
  <MobileFilterDrawer {...{ isOpen: filtersOpen, setIsOpen: setFiltersOpen, filters, updateFilter, clearAll, dynamicOptions }} />
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