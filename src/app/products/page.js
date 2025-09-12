'use client';
import React, { useState, useEffect, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, X, SlidersHorizontal, ArrowLeft } from 'lucide-react';
import ProductCard from '../../cards/ProductCard';
import { products } from '../../data/product';
import { useTheme } from '@/contexts/ThemeContext';

const categories = [
  { value: '', label: 'All Categories' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'components', label: 'Components' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'commercial', label: 'Commercial' }
];

const subcategories = {
  gaming: ['keyboard', 'mouse', 'headset', 'mousepad'],
  components: ['monitor', 'cooler'],
  accessories: ['docking-station', 'webcam']
};

const sortOptions = [
  { value: 'name-asc', label: 'Name (A-Z)' },
  { value: 'name-desc', label: 'Name (Z-A)' },
  { value: 'price-asc', label: 'Price (Low to High)' },
  { value: 'price-desc', label: 'Price (High to Low)' },
  { value: 'rating-desc', label: 'Highest Rated' },
  { value: 'discount-desc', label: 'Biggest Discount' }
];



const Button = ({ children, onClick, variant = 'primary', className = '' }) => {
  const baseClasses = "px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500";
  const variants = {
    primary: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50",
    link: "text-blue-600 hover:underline"
  };
  return (
    <button onClick={onClick} className={`${baseClasses} ${variants[variant]} ${className}`}>
      {children}
    </button>
  );
};

const useSearchParams = () => {
  const [params, setParams] = useState(new URLSearchParams());

  const setSearchParams = (newParams) => {
    setParams(newParams);
  };

  return [params, setSearchParams];
};

const SubcategoryFilter = ({ selectedCategory, selectedSubcategory, setSubcategory, subcategoriesData, currentTheme }) => {
  if (!selectedCategory || !subcategoriesData[selectedCategory] || subcategoriesData[selectedCategory].length === 0) {
    return null;
  }

  return (
    <div className="mb-6 border-t border-gray-200 pt-4">
      <h4 className={`font-medium ${currentTheme.text} ${currentTheme.font} mb-3 capitalize`}>{selectedCategory} Subcategory</h4>
      <div className="space-y-2">
        <label className="flex items-center">
          <input
            type="radio"
            name="subcategory"
            value=""
            checked={selectedSubcategory === ''}
            onChange={() => setSubcategory('')}
            className="mr-2"
          />        <span className={`text-sm ${currentTheme.text} ${currentTheme.font}`}>All {selectedCategory}</span>
        </label>
        {subcategoriesData[selectedCategory].map(subcat => (
          <label key={subcat} className="flex items-center">
            <input
              type="radio"
              name="subcategory"
              value={subcat}
              checked={selectedSubcategory === subcat}
              onChange={() => setSubcategory(subcat)}
              className="mr-2"
            />
            <span className={`text-sm ${currentTheme.text} ${currentTheme.font} capitalize`}>{subcat.replace('-', ' ')}</span>
          </label>
        ))}
      </div>
    </div>
  );
};

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });
  const [showDiscounted, setShowDiscounted] = useState(searchParams.get('discount') === 'true');
  const [sortBy, setSortBy] = useState('name-asc');
  const [showInStock, setShowInStock] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState('');
  const { currentTheme, changeTheme } = useTheme();

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchQuery) params.set('search', searchQuery);
    if (selectedCategory) params.set('category', selectedCategory);
    if (showDiscounted) params.set('discount', 'true');
    if (selectedSubcategory) params.set('subcategory', selectedSubcategory);
    setSearchParams(params);
    changeTheme(selectedCategory);
  }, [searchQuery, selectedCategory, selectedSubcategory, showDiscounted, changeTheme]);

  const handleBackToCategory = () => {
    setSelectedProductId(null);
  };

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = [...products];

    if (selectedProductId) {
      return filtered.filter(product => product.id === selectedProductId);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }
    if (selectedSubcategory) {
      filtered = filtered.filter(product => product.subcategory === selectedSubcategory);
    }

    filtered = filtered.filter(product =>
      product.price >= priceRange.min && product.price <= priceRange.max
    );

    if (showDiscounted) {
      filtered = filtered.filter(product => product.discount && product.discount > 0);
    }

    if (showInStock) {
      filtered = filtered.filter(product => product.inStock);
    }

    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name-asc':
          return a.name.localeCompare(b.name);
        case 'name-desc':
          return b.name.localeCompare(a.name);
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating-desc':
          return b.rating - a.rating;
        case 'discount-desc':
          return (b.discount || 0) - (a.discount || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, priceRange, showDiscounted, sortBy, showInStock, selectedProductId, selectedSubcategory]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange({ min: 0, max: 2000 });
    setShowDiscounted(false);
    setShowInStock(false);
    setSortBy('name-asc');
    setSelectedProductId(null);
    setSelectedSubcategory('');
  };

  const activeFiltersCount =
    (searchQuery ? 1 : 0) +
    (selectedCategory ? 1 : 0) +
    (selectedSubcategory ? 1 : 0) +
    (showDiscounted ? 1 : 0) +
    (showInStock ? 1 : 0) +
    (priceRange.min > 0 || priceRange.max < 2000 ? 1 : 0);

  

  

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };
  
  return (
    <div className={`${currentTheme.bg} ${currentTheme.text} ${currentTheme.font} min-h-screen antialiased transition-colors duration-500`}>
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className={`text-3xl md:text-4xl font-bold mb-4 ${currentTheme.text}`}>
            Products
          </h1>
          <p className={`${currentTheme.lightText}`}>
            {"Discover our complete range of computer accessories, gaming gear, and professional equipment"}
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 ${currentTheme.lightText}`} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.inputBorder} transition-colors duration-500`}
            />
          </div>

          <div className="flex gap-2">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className={`px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.inputBorder} transition-colors duration-500`}
            >
              {sortOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <Button
              variant="outline"
              onClick={() => setShowFilters(!showFilters)}
              className={`relative ${currentTheme.inputBg} border ${currentTheme.inputBorder} transition-colors duration-500`}
            >
              <SlidersHorizontal className={`w-5 h-5 mr-2 ${currentTheme.text}`} />
              <span className={currentTheme.text}>{(showFilters===false)?"Filters":"hide"}</span>
              {activeFiltersCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </Button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <motion.div
            initial={false}
            animate={{
              width: showFilters ? 'auto' : 0,
              opacity: showFilters ? 1 : 0
            }}
            className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'} space-y-6`}
          >
            <motion.div 
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-6 rounded-lg shadow-md transition-colors duration-500 ${currentTheme.inputBg}`}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className={`text-lg font-semibold ${currentTheme.text}`}>Filters</h3>
                {activeFiltersCount > 0 && (
                  <button
                    onClick={clearFilters}
                    className={`hover:text-red-700 text-sm flex items-center ${currentTheme.accent}`}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Clear All
                  </button>
                )}
              </div>

              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Category</h4>
                <div className="space-y-2">
                  {categories.map(category => (
                    <label key={category.value} className="flex items-center">
                      <input
                        type="radio"
                        name="category"
                        value={category.value}
                        checked={selectedCategory === category.value}
                        onChange={(e) => {
                          setSelectedCategory(e.target.value);
                          setSelectedSubcategory('');
                          setSelectedProductId(null);
                        }}
                        className="mr-2"
                      />
                      <span className={`text-sm ${currentTheme.text}`}>{category.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <SubcategoryFilter
                selectedCategory={selectedCategory}
                selectedSubcategory={selectedSubcategory}
                setSubcategory={setSelectedSubcategory}
                subcategoriesData={subcategories}
                currentTheme={currentTheme}
              />

              <div className="mb-6">
                <h4 className={`font-medium mb-3 ${currentTheme.text}`}>Price Range</h4>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <input
                      type="number"
                      placeholder="Min"
                      value={priceRange.min}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, min: Number(e.target.value) }))}
                      className={`w-full px-3 py-2 border rounded text-sm ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.inputBorder} transition-colors duration-500`}
                    />
                    <input
                      type="number"
                      placeholder="Max"
                      value={priceRange.max}
                      onChange={(e) => setPriceRange(prev => ({ ...prev, max: Number(e.target.value) }))}
                      className={`w-full px-3 py-2 border rounded text-sm ${currentTheme.inputBg} ${currentTheme.text} ${currentTheme.inputBorder} transition-colors duration-500`}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showDiscounted}
                    onChange={(e) => setShowDiscounted(e.target.checked)}
                    className="mr-2"
                  />
                  <span className={`text-sm ${currentTheme.text}`}>Show Discounted Only</span>
                </label>

                <label className="flex items-center">
                  <input
                    type="checkbox"
                    checked={showInStock}
                    onChange={(e) => setShowInStock(e.target.checked)}
                    className="mr-2"
                  />
                  <span className={`text-sm ${currentTheme.text}`}>In Stock Only</span>
                </label>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="flex-1"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className={`mb-4 flex flex-col sm:flex-row items-center justify-between`}>
              <p className={currentTheme.lightText}>
                {selectedProductId ? (
                  `1 product selected`
                ) : (
                  `${filteredAndSortedProducts.length} product${filteredAndSortedProducts.length !== 1 ? 's' : ''} found`
                )}
              </p>
              {selectedProductId && (
                <Button variant="link" onClick={handleBackToCategory} className={`mt-2 sm:mt-0 ${currentTheme.accent}`}>
                  <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Products
                </Button>
              )}
            </div>

            {filteredAndSortedProducts.length === 0 ? (
              <div className={`text-center py-16 ${currentTheme.text}`}>
                <div className={`w-24 h-24 mx-auto mb-4 rounded-full flex items-center justify-center ${currentTheme.inputBg}`}>
                  <Search className={`w-12 h-12 ${currentTheme.lightText}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className={`${currentTheme.lightText} mb-6`}>
                  {"Try adjusting your filters or search terms to find what you're looking for."}
                </p>
                <Button onClick={clearFilters}>Clear All Filters</Button>
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {filteredAndSortedProducts.map((product, index) => (
                  <motion.div key={product.id} variants={itemVariants}>
                    <ProductCard product={product} index={index} currentTheme={currentTheme} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Products;


