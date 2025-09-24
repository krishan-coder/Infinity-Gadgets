// components/QuickViewModal.jsx
"use client";
import { useQuickView } from '@/contexts/QuickViewContext';
import Image from 'next/image';
import { ShoppingCart, Star } from 'lucide-react';

export default function QuickViewModal() {
  const { product, closeQuickView } = useQuickView();

  if (!product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-2xl overflow-hidden max-w-4xl w-11/12 mx-4">
        <div className="relative flex flex-col md:flex-row">
          <button
            onClick={closeQuickView}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-900 z-10"
            aria-label="Close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          
          <div className="md:w-1/2">
            <Image
              src={product.images[0]}
              alt={product.name}
              width={500}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          <div className="p-8 md:w-1/2">
            <h2 className="text-3xl font-bold text-gray-900">{product.name}</h2>
            <div className="mt-2 flex items-center text-gray-600">
              <span className="text-yellow-400">{'★'.repeat(Math.round(product.rating))}</span>
              <span className="ml-2">{product.rating} ({product.reviews} reviews)</span>
            </div>
            
            <p className="mt-4 text-gray-700">{product.description}</p>
            
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-800">Specifications</h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-gray-600">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {value}
                  </li>
                ))}
              </ul>
            </div>
            
            <p className="mt-6 text-4xl font-extrabold text-gray-900">${product.price}</p>
            
            <div className="mt-8 flex gap-4">
              <button className="flex-1 py-3 px-6 bg-black text-white font-medium rounded-md hover:bg-gray-800 transition-colors">
                Add to Cart
              </button>
              <button className="flex-1 py-3 px-6 bg-white text-gray-900 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
                View Full Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}