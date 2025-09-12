"use client";

import { useState } from "react";

const ProductForm = () => {
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    description: "",
    price: 0,
    originalPrice: 0,
    discount: 0,
    category: "",
    subcategory: "",
    images: "",
    specifications: {},
    inStock: true,
    stockCount: 0,
    rating: 0,
    reviews: 0,
    featured: false,
    componentType: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNumericChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value === "" ? "" : parseFloat(value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      images: formData.images.split(",").map((url) => url.trim()),
    };

    try {
      const response = await fetch("/api/product/add-product", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        alert("Product added successfully!");
        setFormData({
          id: "",
          name: "",
          description: "",
          price: 0,
          originalPrice: 0,
          discount: 0,
          category: "",
          subcategory: "",
          images: "",
          specifications: {},
          inStock: true,
          stockCount: 0,
          rating: 0,
          reviews: 0,
          featured: false,
          componentType: null,
        });
      } else {
        alert("Failed to add product.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred during submission.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
        
        {/* ID Field */}
        <div className="mb-4">
          <label htmlFor="id" className="block text-gray-700 font-bold mb-2">Product ID*</label>
          <input
            type="text"
            id="id"
            name="id"
            value={formData.id}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        
        {/* Name Field */}
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 font-bold mb-2">Name*</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Description Field */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700 font-bold mb-2">Description*</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        
        {/* Price Field */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700 font-bold mb-2">Price*</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleNumericChange}
            required
            step="0.01"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Category Field */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700 font-bold mb-2">Category*</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">Select a category</option>
            <option value="gaming">Gaming</option>
            <option value="commercial">Commercial</option>
            <option value="accessories">Accessories</option>
            <option value="components">Components</option>
          </select>
        </div>

        {/* Images Field */}
        <div className="mb-4">
          <label htmlFor="images" className="block text-gray-700 font-bold mb-2">Image URLs* (comma-separated)</label>
          <input
            type="text"
            id="images"
            name="images"
            value={formData.images}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
            placeholder="e.g., url1,url2,url3"
          />
        </div>

        {/* In Stock Field */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="inStock"
            name="inStock"
            checked={formData.inStock}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="inStock" className="ml-2 text-gray-700 font-bold">In Stock*</label>
        </div>

        {/* Stock Count Field */}
        <div className="mb-4">
          <label htmlFor="stockCount" className="block text-gray-700 font-bold mb-2">Stock Count*</label>
          <input
            type="number"
            id="stockCount"
            name="stockCount"
            value={formData.stockCount}
            onChange={handleNumericChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Rating Field */}
        <div className="mb-4">
          <label htmlFor="rating" className="block text-gray-700 font-bold mb-2">Rating*</label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleNumericChange}
            required
            min="0"
            max="5"
            step="0.1"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>
        
        {/* Reviews Field */}
        <div className="mb-4">
          <label htmlFor="reviews" className="block text-gray-700 font-bold mb-2">Number of Reviews*</label>
          <input
            type="number"
            id="reviews"
            name="reviews"
            value={formData.reviews}
            onChange={handleNumericChange}
            required
            min="0"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          />
        </div>

        {/* Featured Field */}
        <div className="mb-4 flex items-center">
          <input
            type="checkbox"
            id="featured"
            name="featured"
            checked={formData.featured}
            onChange={handleChange}
            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="featured" className="ml-2 text-gray-700 font-bold">Featured</label>
        </div>
        
        {/* Component Type Field */}
        <div className="mb-6">
          <label htmlFor="componentType" className="block text-gray-700 font-bold mb-2">Component Type</label>
          <select
            id="componentType"
            name="componentType"
            value={formData.componentType || ""}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
          >
            <option value="">Select a component type</option>
            <option value="cpu">CPU</option>
            <option value="gpu">GPU</option>
            <option value="ram">RAM</option>
            <option value="storage">Storage</option>
            <option value="motherboard">Motherboard</option>
            <option value="psu">PSU</option>
            <option value="case">Case</option>
            <option value="cooler">Cooler</option>
            <option value="monitor">Monitor</option>
            <option value="keyboard">Keyboard</option>
            <option value="mouse">Mouse</option>
            <option value="accessory">Accessory</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductForm;