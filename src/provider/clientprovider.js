'use client';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from "../contexts/CartContext";
import { OrderProvider } from "../contexts/OrderContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/contexts/ThemeContext';

export default function ClientProvider({ children }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AuthProvider>
          <CartProvider>
            <OrderProvider>
              {children}
            </OrderProvider>
          </CartProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>
    
  );
}
