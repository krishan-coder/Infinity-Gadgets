'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useAuth } from './AuthContext';



const OrderContext = createContext(undefined);

export const useOrders = () => {
  const context = useContext(OrderContext);
  if (context === undefined) {
    throw new Error('useOrders must be used within an OrderProvider');
  }
  return context;
};



export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();

  const placeOrder = async (items, shippingAddress) => {
    if (!user) throw new Error('User must be logged in to place order');

    const orderId = Date.now().toString();
    const total = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

    const newOrder = {
      id: orderId,
      userId: user.id,
      items,
      total,
      status: 'pending',
      createdAt: new Date().toISOString(),
      shippingAddress
    };

    setOrders(prev => [...prev, newOrder]);

    // Save to localStorage for persistence
    const savedOrders = localStorage.getItem('orders');
    const existingOrders = savedOrders ? JSON.parse(savedOrders) : [];
    localStorage.setItem('orders', JSON.stringify([...existingOrders, newOrder]));

    return orderId;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders(prev =>
      prev.map(order =>
        order.id === orderId ? { ...order, status } : order
      )
    );

    // Update localStorage
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      const orders = JSON.parse(savedOrders);
      const updatedOrders = orders.map((order) =>
        order.id === orderId ? { ...order, status } : order
      );
      localStorage.setItem('orders', JSON.stringify(updatedOrders));
    }
  };

  const getUserOrders = (userId) => {
    const savedOrders = localStorage.getItem('orders');
    const allOrders = savedOrders ? JSON.parse(savedOrders) : orders;
    return allOrders.filter((order) => order.userId === userId);
  };

  const getAllOrders = () => {
    const savedOrders = localStorage.getItem('orders');
    return savedOrders ? JSON.parse(savedOrders) : orders;
  };

  const value = {
    orders,
    placeOrder,
    updateOrderStatus,
    getUserOrders,
    getAllOrders
  };

  return <OrderContext.Provider value={value}>{children}</OrderContext.Provider>;
};