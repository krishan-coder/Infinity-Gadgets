'use client';
import React, { useState, useCallback, useMemo } from 'react';



// --- Configuration Data ---

// 1. UPDATED PRODUCT TYPES
const PRODUCT_TYPES = [
  { value: '', label: 'Select Product Type' },
  { value: 'graphic-card', label: 'Graphic Card' },
  { value: 'peripherals', label: 'Peripherals' },
  { value: 'processor', label: 'Processor' },
  { value: 'storage', label: 'Storage' },
  { value: 'ram', label: 'RAM' },
  { value: 'motherboard', label: 'Motherboard' },
  { value: 'desktop', label: 'Desktop' },
  { value: 'monitor', label: 'Monitor' },
  { value: 'chair', label: 'Chair' },
  { value: 'docking-station', label: 'Docking Station' },
  { value: 'cpu-cooler', label: 'CPU Cooler' },
  { value: 'gamepad', label: 'Gamepad' },
  { value: 'cabinet', label: 'Cabinet' },
  { value: 'gpu', label: 'GPU (Alias)' },
];

// 2. UPDATED PRODUCT CATEGORIES
const PRODUCT_CATEGORIES = [
  { value: '', label: 'Select Category' },
  { value: 'gaming', label: 'Gaming' },
  { value: 'commercial', label: 'Commercial' },
  { value: 'accessories', label: 'Accessories' },
  { value: 'components', label: 'Components' },
];

// Placeholder options for common dropdowns
const SERIES_OPTIONS = [
    { value: '', label: 'Select Series' },
    { value: 'A', label: 'Series A' },
    { value: 'B', label: 'Series B' },
    { value: 'C', label: 'Series C' },
];

const DEVICE_OPTIONS = [
    { value: '', label: 'Select Device Type' },
    { value: 'input', label: 'Input Device' },
    { value: 'output', label: 'Output Device' },
    { value: 'ergonomic', label: 'Ergonomic' },
];

const MAX_IMAGES = 5;

// Initial state for the product details
const initialProductState = {
  // Core Details
  id: crypto.randomUUID(),
  name: '',
  description: '',
  specifications: '',
  rating: 0,
  reviews: 0,
  
  // Pricing
  price: 0,
  originalPrice: 0,
  
  // Categorization & Inventory
  type: '',
  category: '',
  brand: '',
  instock: true,
  stockCount: 1,
  featured: false,
  
  // Type-Specific Options
  options: {},
};

// --- Component Helper: Input Field ---
const InputField = ({ label, type = 'text', name, value, onChange, placeholder, required = true, min, readOnly = false, step, max }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label} {required && !readOnly && <span className="text-red-500">*</span>}
    </label>
    <input
      type={type}
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required && !readOnly}
      min={min}
      max={max}
      step={step}
      readOnly={readOnly}
      className={`p-3 border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out w-full ${readOnly ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : ''}`}
    />
  </div>
);

// --- Component Helper: Dropdown Select ---
const SelectField = ({ label, name, value, onChange, options, required = true }) => (
  <div className="flex flex-col space-y-1">
    <label htmlFor={name} className="text-sm font-medium text-gray-700">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <select
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      required={required}
      className="p-3 border border-gray-300 bg-white rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out appearance-none w-full"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20' fill='none'%3e%3cpath d='M7 7l3 3 3-3m0 6l-3-3-3 3' stroke='%239CA3AF' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/%3e%3c/svg%3e")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 0.75rem center',
        backgroundSize: '1.5em 1.5em',
      }}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value} disabled={option.value === ''}>
          {option.label}
        </option>
      ))}
    </select>
  </div>
);

// --- Component Helper: Checkbox Toggle ---
const CheckboxToggle = ({ label, name, checked, onChange }) => (
    // Explicitly using w-full ensures it takes up the available grid space when stacked on mobile
    <div className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg bg-white shadow-sm w-full">
        <label htmlFor={name} className="text-sm font-medium text-gray-700 flex-grow">
            {label}
        </label>
        <input
            type="checkbox"
            id={name}
            name={name}
            checked={checked}
            onChange={onChange}
            className="w-5 h-5 text-sky-600 bg-gray-100 border-gray-300 rounded focus:ring-sky-500"
        />
    </div>
);


// --- Main App Component ---
export default function App() {
  const [productDetails, setProductDetails] = useState(initialProductState);
  const [productImages, setProductImages] = useState([]);
  const [submissionResult, setSubmissionResult] = useState(null);

  // --- Derived State (Discount Calculation) ---
  const discountPercentage = useMemo(() => {
    const { price, originalPrice } = productDetails;
    if (originalPrice > price && originalPrice > 0) {
        return Math.round(((originalPrice - price) / originalPrice) * 100);
    }
    return 0;
  }, [productDetails.price, productDetails.originalPrice]);

  // --- Handlers ---

  const handleDetailsChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    setProductDetails(prev => ({
      ...prev,
      [name]: 
        type === 'number' ? parseFloat(value) || 0 : 
        type === 'checkbox' ? checked : 
        value,
    }));
  }, []);

  const handleOptionChange = useCallback((e) => {
    const { name, value, type } = e.target;
    setProductDetails(prev => ({
      ...prev,
      options: {
        ...prev.options,
        [name]: type === 'number' ? parseFloat(value) || 0 : value,
      },
    }));
  }, []);

  const handleTypeChange = useCallback((e) => {
    const newType = e.target.value;
    setProductDetails(prev => ({
      ...prev,
      type: newType,
      options: {}, // Reset specific options when type changes
    }));
  }, []);

  const handleImageChange = useCallback((e) => {
    const files = Array.from(e.target.files);
    const currentCount = productImages.length;
    const availableSlots = MAX_IMAGES - currentCount;

    if (files.length === 0 || availableSlots <= 0) return;
    const filesToAdd = files.slice(0, availableSlots);

    const newImages = filesToAdd.map(file => ({
      file,
      url: URL.createObjectURL(file)
    }));

    setProductImages(prevImages => [...prevImages, ...newImages]);
    e.target.value = null; 
  }, [productImages]);

  const handleRemoveImage = useCallback((indexToRemove) => {
    const image = productImages[indexToRemove];
    if (image && image.url) {
      URL.revokeObjectURL(image.url); // Clean up blob URL memory
    }
    setProductImages(prevImages => prevImages.filter((_, index) => index !== indexToRemove));
  }, [productImages]);

  const handleSubmit = async (e) => {
  e.preventDefault();

  if (productImages.length === 0) {
    console.error("Error: Minimum 1 image is required.");
    return;
  }

  const finalProductData = {
    ...productDetails,
    discount: discountPercentage,
    imageFiles: productImages.map(({ file }) => ({
      name: file.name,
      size: file.size,
      type: file.type,
    })),
    timestamp: new Date().toISOString(),
  };

  console.log('--- Product Data Submitted ---');
  console.log(JSON.stringify(finalProductData, null, 2));

  // Prepare formData
  const formData = new FormData();

  // Append all text fields
  Object.keys(finalProductData).forEach((key) => {
    formData.append(key, typeof finalProductData[key] === "object"
      ? JSON.stringify(finalProductData[key])
      : finalProductData[key]
    );
  });

  // Append image files
  productImages.forEach((img) => {
    formData.append("images", img.file);
  });

  try {
    const res = await fetch("/api/admin/addproduct", {
      method: "POST",
      body: formData, // IMPORTANT: Do NOT set headers manually
    });

    const data = await res.json();
    console.log("Response:", data);

    if (!res.ok) {
      console.error("Upload failed:", data);
      return;
    }

    // Reset state
    initialProductState.id = crypto.randomUUID();
    setSubmissionResult(finalProductData);

    productImages.forEach((image) => URL.revokeObjectURL(image.url));

    setTimeout(() => {
      setProductDetails(initialProductState);
      setProductImages([]);
      setSubmissionResult(null);
    }, 5000);

  } catch (err) {
    console.error("Fetch error:", err);
  }
};


  // --- Conditional Rendering Logic (Type-Specific Options) ---
  const renderTypeSpecificOptions = useMemo(() => {
    const { type, options } = productDetails;
    const { 
        series, generation, 
        device, devicetype, model, 
        ramtype, usage, kit, 
        storage, interface: storageInterface, form, gen,
        resolution, size, matz
    } = options;

    const OptionSection = ({ title, children }) => (
      <div className="mt-6 pt-4 border-t border-sky-100">
        <h3 className="text-lg font-semibold text-sky-600 mb-4">{title}</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {children}
        </div>
      </div>
    );

    switch (type) {
      case 'graphic-card':
        return (
          <OptionSection title="Graphic Card Options">
            <SelectField
              label="Series"
              name="series"
              value={series || ''}
              onChange={handleOptionChange}
              options={SERIES_OPTIONS}
            />
          </OptionSection>
        );
      
      case 'processor':
        return (
            <OptionSection title="Processor Options">
              <SelectField
                label="Series"
                name="series"
                value={series || ''}
                onChange={handleOptionChange}
                options={SERIES_OPTIONS}
              />
              <InputField
                label="Generation"
                name="generation"
                value={generation || ''}
                onChange={handleOptionChange}
                placeholder="e.g., 14th Gen"
              />
            </OptionSection>
        );

      case 'peripherals':
        return (
            <OptionSection title="Peripherals Options">
              <SelectField
                label="Device"
                name="device"
                value={device || ''}
                onChange={handleOptionChange}
                options={DEVICE_OPTIONS}
              />
              <InputField
                label="Device Type"
                name="devicetype"
                value={devicetype || ''}
                onChange={handleOptionChange}
                placeholder="e.g., Mechanical Keyboard"
              />
              <InputField
                label="Model"
                name="model"
                value={model || ''}
                onChange={handleOptionChange}
                placeholder="e.g., TKL Pro"
              />
            </OptionSection>
        );
      
      case 'ram':
        return (
            <OptionSection title="RAM Options">
              <InputField
                label="RAM Type"
                name="ramtype"
                value={ramtype || ''}
                onChange={handleOptionChange}
                placeholder="e.g., DDR5"
              />
              <InputField
                label="Usage"
                name="usage"
                value={usage || ''}
                onChange={handleOptionChange}
                placeholder="e.g., Desktop, Laptop"
              />
              <InputField
                label="Kit (Sticks)"
                type="number"
                name="kit"
                value={kit || 1}
                onChange={handleOptionChange}
                min="1"
              />
            </OptionSection>
        );

      case 'storage':
        return (
            <OptionSection title="Storage Options">
              <InputField
                label="Storage Capacity (GB/TB)"
                name="storage"
                value={storage || ''}
                onChange={handleOptionChange}
                placeholder="e.g., 2TB"
              />
              <InputField
                label="Interface"
                name="interface"
                value={storageInterface || ''}
                onChange={handleOptionChange}
                placeholder="e.g., NVMe, SATA"
              />
              <InputField
                label="Form Factor"
                name="form"
                value={form || ''}
                onChange={handleOptionChange}
                placeholder="e.g., M.2 2280, 3.5 Inch"
              />
              <InputField
                label="Generation"
                name="gen"
                value={gen || ''}
                onChange={handleOptionChange}
                placeholder="e.g., Gen4, Gen3"
              />
            </OptionSection>
        );

      case 'desktop':
        return (
            <OptionSection title="Desktop Options">
              <InputField
                label="Resolution"
                name="resolution"
                value={resolution || ''}
                onChange={handleOptionChange}
                placeholder="e.g., 4K, 1080p"
              />
              <InputField
                label="Size (Form Factor)"
                name="size"
                value={size || ''}
                onChange={handleOptionChange}
                placeholder="e.g., Mid-Tower, Mini-PC"
              />
            </OptionSection>
        );

      case 'monitor':
        return (
            <OptionSection title="Monitor Options">
              <InputField
                label="Resolution"
                name="resolution"
                value={resolution || ''}
                onChange={handleOptionChange}
                placeholder="e.g., 2560x1440"
              />
              <InputField
                label="Size (Inches)"
                name="size"
                type="number"
                value={size || 0}
                onChange={handleOptionChange}
                placeholder="e.g., 27"
                min="15"
                step="0.1"
              />
              <SelectField
                label="Series"
                name="series"
                value={series || ''}
                onChange={handleOptionChange}
                options={SERIES_OPTIONS}
              />
            </OptionSection>
        );

      case 'chair':
        return (
            <OptionSection title="Chair Options">
              <SelectField
                label="Device (Usage)"
                name="device"
                value={device || ''}
                onChange={handleOptionChange}
                options={[{ value: '', label: 'Select Usage' }, { value: 'gaming', label: 'Gaming Chair' }, { value: 'office', label: 'Office Chair' }]}
              />
            </OptionSection>
        );
      
      case 'gamepad':
        return (
            <OptionSection title="Gamepad Options">
              <SelectField
                label="Device (Platform)"
                name="device"
                value={device || ''}
                onChange={handleOptionChange}
                options={[{ value: '', label: 'Select Platform' }, { value: 'pc', label: 'PC' }, { value: 'console', label: 'Console' }, { value: 'mobile', label: 'Mobile' }]}
              />
              <InputField
                label="Matz (Connectivity)"
                name="matz"
                value={matz || ''}
                onChange={handleOptionChange}
                placeholder="e.g., Wireless, USB-C"
              />
              <InputField
                label="Model"
                name="model"
                value={model || ''}
                onChange={handleOptionChange}
                placeholder="e.g., X-Wing Pro"
              />
            </OptionSection>
        );

      // Cabinet and GPU (Alias) share the same options as requested
      case 'cabinet':
      case 'gpu':
        return (
            <OptionSection title={`${type === 'cabinet' ? 'Cabinet' : 'GPU (Alias)'} Options`}>
              <SelectField
                label="Device (Form Factor)"
                name="device"
                value={device || ''}
                onChange={handleOptionChange}
                options={[{ value: '', label: 'Select Form Factor' }, { value: 'atx', label: 'ATX' }, { value: 'micro-atx', label: 'Micro-ATX' }]}
              />
              <InputField
                label="Model"
                name="model"
                value={model || ''}
                onChange={handleOptionChange}
                placeholder="e.g., H510 Flow"
              />
            </OptionSection>
        );

      // Other new simple types (motherboard, docking-station, cpu-cooler) do not require specific options yet,
      // but they are available in the main Type dropdown.

      default:
        return null;
    }
  }, [productDetails, handleOptionChange]);

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-8 flex justify-center items-start">
      {/* Increased max-w-5xl for better horizontal space utilization on desktop */}
      <div className="w-full max-w-5xl bg-white shadow-2xl rounded-xl p-6 sm:p-10">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-6 border-b pb-2">
          Specialized Product Entry (PC/Tech)
        </h1>
        <p className="text-sm text-gray-500 mb-8">
          Complete the product metadata. Selecting a product type below will reveal relevant technical fields.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          
          {/* --- Section 1: Product Identification & Pricing --- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Identification & Pricing</h2>
            
            {/* Grid structure remains responsive (1 on mobile, 3 on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Product ID (Auto-Generated)"
                name="id"
                value={productDetails.id}
                readOnly={true}
                required={false}
              />
              <InputField
                label="Product Name"
                name="name"
                value={productDetails.name}
                onChange={handleDetailsChange}
                placeholder="e.g., RZ-5 7600X CPU"
              />
              
            </div>
            
            {/* Pricing/Brand Grid (2 on mobile, 4 on desktop) */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                <InputField
                  label="Original Price ($)"
                  type="number"
                  name="originalPrice"
                  value={productDetails.originalPrice}
                  onChange={handleDetailsChange}
                  placeholder="e.g., 299.99"
                  min="0.00"
                  step="0.01"
                  required
                />
                <InputField
                  label="Selling Price ($)"
                  type="number"
                  name="price"
                  value={productDetails.price}
                  onChange={handleDetailsChange}
                  placeholder="e.g., 249.99"
                  min="0.01"
                  step="0.01"
                  required
                />
                <InputField
                  label="Discount (%)"
                  name="discount"
                  value={`${discountPercentage}%`}
                  readOnly={true}
                  required={false}
                />
                <InputField
                  label="Brand"
                  name="brand"
                  value={productDetails.brand}
                  onChange={handleDetailsChange}
                  placeholder="e.g., AMD, NVidia, Logitech"
                />
            </div>
          </div>


          {/* --- Section 2: Description & Metadata --- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Categorization & Ratings</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <SelectField
                    label="Product Type"
                    name="type"
                    value={productDetails.type}
                    onChange={handleTypeChange}
                    options={PRODUCT_TYPES}
                />
                <SelectField
                    label="Product Category"
                    name="category"
                    value={productDetails.category}
                    onChange={handleDetailsChange}
                    options={PRODUCT_CATEGORIES}
                />
                 {/* Rating/Reviews group */}
                 <div className="flex items-end space-x-2">
                    <InputField
                      label="Rating (0-5)"
                      type="number"
                      name="rating"
                      value={productDetails.rating}
                      onChange={handleDetailsChange}
                      placeholder="e.g., 4.5"
                      min="0"
                      max="5"
                      step="0.1"
                      required={false}
                    />
                    <InputField
                      label="Reviews Count"
                      type="number"
                      name="reviews"
                      value={productDetails.reviews}
                      onChange={handleDetailsChange}
                      placeholder="e.g., 120"
                      min="0"
                      required={false}
                    />
                </div>
            </div>

            <div className="mt-4">
              <label htmlFor="description" className="text-sm font-medium text-gray-700">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                id="description"
                name="description"
                value={productDetails.description}
                onChange={handleDetailsChange}
                placeholder="A detailed description of the product features."
                rows="3"
                required
                className="p-3 w-full border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out"
              />
            </div>
            <div className="mt-4">
              <label htmlFor="specifications" className="text-sm font-medium text-gray-700">
                Specifications (Key Tech Specs)
              </label>
              <textarea
                id="specifications"
                name="specifications"
                value={productDetails.specifications}
                onChange={handleDetailsChange}
                placeholder="List key technical specifications (e.g., Socket: AM5, PCIe: 5.0, Max Resolution: 7680x4320)."
                rows="2"
                className="p-3 w-full border border-gray-300 rounded-lg focus:ring-sky-500 focus:border-sky-500 transition duration-150 ease-in-out"
              />
            </div>
          </div>

          {/* --- Section 4: Type-Specific Options (Conditionally Rendered) --- */}
          {/* This section dynamically changes based on the 'Product Type' selected above */}
          {productDetails.type && renderTypeSpecificOptions}


          {/* --- Section 3: Inventory & Features --- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Inventory & Features</h2>
            {/* Grid structure remains responsive (1 on mobile, 3 on desktop) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <InputField
                label="Stock Count"
                type="number"
                name="stockCount"
                value={productDetails.stockCount}
                onChange={handleDetailsChange}
                min="0"
              />
              <CheckboxToggle
                label="Product is Currently In Stock"
                name="instock"
                checked={productDetails.instock}
                onChange={handleDetailsChange}
              />
              <CheckboxToggle
                label="Mark as Featured Product"
                name="featured"
                checked={productDetails.featured}
                onChange={handleDetailsChange}
              />
            </div>
          </div>


          {/* --- Section 5: Product Images --- */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h2 className="text-xl font-bold text-gray-800 mb-4">Product Images ({productImages.length || 0} / {MAX_IMAGES})</h2>
            <div className="flex flex-col space-y-4">
              {/* Image Input */}
              <div className="w-full">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Upload Images (You can add {MAX_IMAGES - productImages.length} more)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  multiple 
                  onChange={handleImageChange}
                  disabled={productImages.length >= MAX_IMAGES}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-full file:border-0
                    file:text-sm file:font-semibold
                    file:bg-sky-50 file:text-sky-700
                    hover:file:bg-sky-100 disabled:opacity-50 disabled:cursor-not-allowed"
                />
              </div>

              {/* Image Preview Grid */}
              <div className="flex flex-wrap gap-4 pt-4">
                {productImages.map((image, index) => (
                    <div
                        key={image.url}
                        className="relative border border-sky-300 p-1 rounded-lg shadow-md w-28 h-28 flex items-center justify-center bg-gray-50 group"
                    >
                        <img
                            src={image.url}
                            alt={`Product Image ${index + 1}`}
                            className="max-h-full max-w-full object-contain rounded-md"
                        />
                        {/* Remove Button */}
                        <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 shadow-lg"
                            aria-label={`Remove image ${index + 1}`}
                        >
                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
                        </button>
                    </div>
                ))}

                {/* Placeholder/Prompt for adding more images */}
                {productImages.length < MAX_IMAGES && (
                    <div className="border-2 border-dashed border-sky-300 p-4 rounded-xl w-28 h-28 flex flex-col items-center justify-center text-sky-400 bg-sky-50/50 cursor-default">
                        <svg className="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>
                        <span className="text-xs text-center mt-1">Add Image {productImages.length + 1}</span>
                    </div>
                )}
              </div>
              
              {/* Error/Requirement message */}
              {productImages.length === 0 && (
                  <p className="text-sm text-red-500 mt-2">
                      <span className="font-semibold">Minimum 1 image required.</span>
                  </p>
              )}
            </div>
          </div>

          {/* --- Submission Button --- */}
          <div className="pt-8 flex justify-end">
            <button
              type="submit"
              className="px-8 py-3 bg-sky-600 text-white font-semibold rounded-full shadow-lg hover:bg-sky-700 transition duration-300 ease-in-out transform hover:scale-105 disabled:opacity-50"
              disabled={!productDetails.name || productDetails.price <= 0 || !productDetails.type || productImages.length === 0}
            >
              Create Product Listing
            </button>
          </div>
        </form>

        {/* --- Submission Confirmation/Modal --- */}
        {submissionResult && (
          <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="bg-white p-6 sm:p-10 rounded-xl shadow-2xl max-w-lg w-full transform transition-all duration-300 scale-100">
              <h2 className="text-2xl font-bold text-green-600 mb-4">
                <svg className="w-6 h-6 inline mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                Product Created Successfully!
              </h2>
              <p className="text-gray-600 mb-4">
                The specialized product data has been successfully created and logged to the console:
              </p>
              <pre className="bg-gray-100 p-4 rounded-lg text-sm overflow-x-auto border border-gray-200">
                {JSON.stringify({ 
                    ...submissionResult, 
                    imageFiles: submissionResult.imageFiles.map(f => f.name) 
                }, null, 2)}
              </pre>
              <p className="text-sm text-gray-500 mt-4">
                The form will automatically reset shortly.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}