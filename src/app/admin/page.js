'use client';
import React, { useState } from 'react';

const App = () => {
  
  const [currentPage, setCurrentPage] = useState('add-product');

  
  const Navbar = () => (
    <nav className="bg-gray-800 text-white p-4 rounded-md shadow-lg">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold font-inter">Admin Dashboard</h1>
        <div className="space-x-4 flex">
          <button
            onClick={() => setCurrentPage('add-product')}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ease-in-out font-inter ${
              currentPage === 'add-product' ? 'bg-indigo-600' : 'hover:bg-gray-700'
            }`}
          >
            Add Product
          </button>
          <button
            onClick={() => setCurrentPage('orders')}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ease-in-out font-inter ${
              currentPage === 'orders' ? 'bg-indigo-600' : 'hover:bg-gray-700'
            }`}
          >
            Check Orders
          </button>
          <button
            onClick={() => setCurrentPage('stock')}
            className={`px-3 py-2 rounded-lg transition-all duration-200 ease-in-out font-inter ${
              currentPage === 'stock' ? 'bg-indigo-600' : 'hover:bg-gray-700'
            }`}
          >
            Stock
          </button>
        </div>
      </div>
    </nav>
  );

  
  const AddProductPage = () => {
    
    const [productData, setProductData] = useState({
      name: '',
      description: '',
      price: '',
      stock: ''
    });

    
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductData(prevData => ({
        ...prevData,
        [name]: value
      }));
    };

    
    const handleSubmit = (e) => {
      e.preventDefault();

      fetch('/api/admin/addproduct')
        .then(response => response.json())
        .then(data => {
          console.log('Response from server:', data);
        })
        .catch(error => {
          // Handle error if needed
          console.error('Error fetching data:', error);
        });
      
      console.log('Product to be added:', productData);
      
      setProductData({ name: '', description: '', price: '', stock: '' });
      alert('Product added successfully!');
    };

    return (
      <div className="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl max-w-2xl font-inter">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Add New Product</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Product Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={productData.name}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
            <textarea
              name="description"
              id="description"
              rows="3"
              value={productData.description}
              onChange={handleChange}
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-gray-700">Price ($)</label>
              <input
                type="number"
                name="price"
                id="price"
                value={productData.price}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
              />
            </div>
            <div>
              <label htmlFor="stock" className="block text-sm font-medium text-gray-700">Stock Quantity</label>
              <input
                type="number"
                name="stock"
                id="stock"
                value={productData.stock}
                onChange={handleChange}
                required
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-3 border"
              />
            </div>
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200"
            >
              Add Product
            </button>
          </div>
        </form>
      </div>
    );
  };


  const OrdersPage = () => (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl max-w-2xl font-inter text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Check Orders</h2>
      <p className="text-gray-600">This is a placeholder for the orders management page.</p>
    </div>
  );

  const StockPage = () => (
    <div className="container mx-auto mt-8 p-6 bg-white rounded-xl shadow-2xl max-w-2xl font-inter text-center">
      <h2 className="text-3xl font-bold mb-4 text-gray-800">Stock Management</h2>
      <p className="text-gray-600">This is a placeholder for the stock management page.</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <Navbar />
      <div className="mt-8">
        {currentPage === 'add-product' && <AddProductPage />}
        {currentPage === 'orders' && <OrdersPage />}
        {currentPage === 'stock' && <StockPage />}
      </div>
    </div>
  );
};

export default App;

