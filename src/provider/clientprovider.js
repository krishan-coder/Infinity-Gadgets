'use client';
import { AuthProvider } from '../contexts/AuthContext';
import { CartProvider } from "../contexts/CartContext";
import { OrderProvider } from "../contexts/OrderContext";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from '@/contexts/ThemeContext';
import { WishListProvider } from '@/contexts/WishListContext';
import { QuickViewProvider } from '@/contexts/QuickViewContext';
import QuickViewModal from '@/components/QuickView';

export default function ClientProvider({ children }) {
  return (
    <ThemeProvider>
      <SessionProvider>
        <AuthProvider>
          <QuickViewProvider>
            <WishListProvider>
              <CartProvider>
                <OrderProvider>
                  {children}
                  <QuickViewModal />
                </OrderProvider>
              </CartProvider>
            </WishListProvider>
          </QuickViewProvider>
        </AuthProvider>
      </SessionProvider>
    </ThemeProvider>

  );
}

