'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import {
  ShoppingCart, Star, Heart, Share2, Truck, Shield,
  RotateCcw, ChevronLeft, ChevronRight, Minus, Plus,
  CheckCircle, AlertCircle
} from 'lucide-react';
import Button from '../../../components/Button';
import ProductCard from '../../../cards/ProductCard';
import { products } from '../../../data/product';
import { useCart } from '../../../contexts/CartContext';
import { animate } from 'framer-motion';
import { useTheme } from '@/contexts/ThemeContext';
import Image from 'next/image';

const ProductDetail = () => {
  const { id } = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const { currentTheme, changeTheme } = useTheme();

  const product = products.find(p => p.id === id || p.id === Number(id));

  useEffect(() => {
    if (product?.category) {
      changeTheme(product.category);
    } else {
      changeTheme('');
    }
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [product, changeTheme]);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Product Not Found</h1>
        <Button onClick={() => router.push('/products')}>Back to Products</Button>
      </div>
    );
  }

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + product.images.length) % product.images.length);



  return (
    <div className={`container mx-auto px-4 md:px-8 py-8 md:py-12 lg:py-16 ${currentTheme.bg} ${currentTheme.font}`}>
      {/* Breadcrumb */}
      <nav className={`flex items-center space-x-2 text-sm ${currentTheme.lightText} mb-6 md:mb-8`}>
        <button onClick={() => router.push('/products')} className={`hover:${currentTheme.accent}`}>
          Product
        </button>
        <span>/</span>
        <button
          onClick={() => router.push(`/products?category=${product.category}`)}
          className={`hover:${currentTheme.accent} capitalize`}
        >
          {product.category}
        </button>
        <span>/</span>
        <span className={currentTheme.text}>{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-12 lg:mb-16">
        {/* Product Images */}
        <div className="space-y-4">
          <div className={`relative aspect-square rounded-lg overflow-hidden ${currentTheme.inputBg}`}>
            <Image
              src={product.images[currentImageIndex]}
              alt={product.name}
              width={500}
              height={100}
              className="w-full h-full object-cover"
            />

            {product.images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </>
            )}

            {product.discount !== 0  && (
              <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-lg text-xs md:text-sm font-semibold">
                -{product.discount}% OFF
              </div>
            )}
          </div>

          {/* Thumbnail Images */}
          {product.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={`w-16 h-16 sm:w-20 sm:h-20 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                    currentImageIndex === index ? `${currentTheme.accent.replace('text-', 'border-')}` : currentTheme.inputBorder
                  }`}
                >
                  <Image width={80} height={80} src={image} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className={`text-3xl md:text-4xl font-bold mb-2 md:mb-4 ${currentTheme.text}`}>{product.name}</h1>

            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 sm:w-5 sm:h-5 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : currentTheme.inputBorder
                    }`}
                  />
                ))}
                <span className={`${currentTheme.lightText} ml-2 text-sm sm:text-base`}>({product.reviews} reviews)</span>
              </div>
            </div>

            <div className="flex items-baseline flex-wrap gap-x-4 mb-4 md:mb-6">
              <span className={`text-2xl sm:text-3xl font-bold ${currentTheme.text}`}>
                ₹{product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className={`text-lg sm:text-xl line-through ${currentTheme.lightText}`}>
                  ₹{product.originalPrice.toLocaleString()}
                </span>
              )}
              {product.discount !== 0 && (
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-full text-xs sm:text-sm font-semibold mt-2 sm:mt-0">
                  Save ₹{(product.originalPrice - product.price).toLocaleString()}
                </span>
              )}
            </div>
          </div>

          {/* Stock Status */}
          <div className="flex items-center space-x-2 text-sm sm:text-base">
            {product.inStock ? (
              <>
                <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                <span className="text-green-700 font-medium">In Stock ({product.stockCount} available)</span>
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 text-red-500" />
                <span className="text-red-700 font-medium">Out of Stock</span>
              </>
            )}
          </div>

          <p className={`${currentTheme.lightText} leading-relaxed text-sm sm:text-base`}>{product.description}</p>

          {/* Quantity Selector */}
          <div className="flex items-center space-x-4">
            <span className={`font-medium ${currentTheme.text} text-sm sm:text-base`}>Quantity:</span>
            <div className={`flex items-center border rounded-lg ${currentTheme.inputBorder} ${currentTheme.inputBg}`}>
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className={`p-2 hover:${currentTheme.inputBg} transition-colors`}
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-4 py-2 font-medium text-sm sm:text-base">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stockCount, quantity + 1))}
                className={`p-2 hover:${currentTheme.inputBg} transition-colors`}
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className={`w-full sm:flex-1 ${currentTheme.accent}`}
              size="lg"
            >
              <ShoppingCart className="w-5 h-5 mr-2" />
              Add to Cart
            </Button>
            <div className="flex justify-between sm:justify-start space-x-4">
              <Button variant="outline" size="lg" className="w-1/2 sm:w-auto">
                <Heart className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="lg" className="w-1/2 sm:w-auto">
                <Share2 className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Features */}
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 pt-6 border-t ${currentTheme.inputBorder}`}>
            <div className="flex items-center space-x-2">
              <Truck className={`w-5 h-5 ${currentTheme.accent}`} />
              <div>
                <p className={`font-medium text-sm ${currentTheme.text}`}>{"Free Shipping"}</p>
                <p className={`text-xs ${currentTheme.lightText}`}>{"Orders over ₹1000"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-5 h-5 text-green-600" />
              <div>
                <p className={`font-medium text-sm ${currentTheme.text}`}>{"With Warranty"}</p>
                <p className={`text-xs ${currentTheme.lightText}`}>{"Full coverage"}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <RotateCcw className="w-5 h-5 text-orange-600" />
              <div>
                <p className={`font-medium text-sm ${currentTheme.text}`}>{"30-Day Returns"}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Tabs */}
      <div className="mb-12 md:mb-16">
        <div className={`border-b ${currentTheme.inputBorder}`}></div>
        <nav className="flex space-x-4 md:space-x-8 overflow-x-auto whitespace-nowrap">
          {[
            { id: 'description', label: 'Description' },
            { id: 'specifications', label: 'Specifications' },
            { id: 'reviews', label: 'Reviews' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-4 px-1 border-b-2 font-medium text-sm transition-colors ${currentTheme.font} ${
                activeTab === tab.id
                  ? `${currentTheme.accent.replace('text-', 'border-')} ${currentTheme.accent}`
                  : `border-transparent ${currentTheme.lightText} hover:${currentTheme.text}`
              }`}
            >
              {tab.label}
            </button>
          ))}
        </nav>
        <div className="py-6 md:py-8">
          {activeTab === 'description' && (
            <div className={`prose max-w-none ${currentTheme.text} ${currentTheme.font}`}>
              <p className={`${currentTheme.text} leading-relaxed text-sm sm:text-base`}>{product.description}</p>
            </div>
          )}

          {activeTab === 'specifications' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className={`flex justify-between py-3 border-b ${currentTheme.inputBorder}`}>
                  <span className={`font-medium text-sm sm:text-base ${currentTheme.text}`}>{key}:</span>
                  <span className={`${currentTheme.lightText} text-sm sm:text-base`}>{value}</span>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="space-y-6">
              <div className="text-center py-8">
                <p className={`${currentTheme.lightText} text-sm sm:text-base`}>{"No reviews yet. Be the first to review this product!"}</p>
                <Button className="mt-4">Write a Review</Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className={`text-2xl font-bold mb-6 md:mb-8 ${currentTheme.text}`}>Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct, index) => (
              <ProductCard key={relatedProduct.id} product={relatedProduct} index={index} currentTheme={currentTheme} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
