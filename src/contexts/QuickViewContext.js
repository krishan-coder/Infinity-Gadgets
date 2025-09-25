// contexts/QuickViewContext.jsx
"use client";
import { createContext, useContext, useState } from 'react';

const QuickViewContext = createContext();

export function QuickViewProvider({ children }) {
  const [product, setProduct] = useState(null);

  const openQuickView = (productData) => {
    setProduct(productData);
  };

  const closeQuickView = () => {
    setProduct(null);
  };

  return (
    <QuickViewContext.Provider value={{ product, openQuickView, closeQuickView }}>
      {children}
    </QuickViewContext.Provider>
  );
}

export const useQuickView = () => useContext(QuickViewContext);