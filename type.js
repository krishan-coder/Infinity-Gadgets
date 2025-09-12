export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: 'gaming' | 'commercial' | 'accessories' | 'components';
  subcategory?: string;
  images: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PCBuildComponent {
  type: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler' | 'monitor' | 'keyboard' | 'mouse' | 'accessory';
  product?: Product;
  required: boolean;
}

export interface PCBuild {
  components: PCBuildComponent[];
  totalPrice: number;
  compatibility: boolean;
}export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  discount?: number;
  category: 'gaming' | 'commercial' | 'accessories' | 'components';
  subcategory?: string;
  images: string[];
  specifications: { [key: string]: string };
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviews: number;
  featured?: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

export interface PCBuildComponent {
  type: 'cpu' | 'gpu' | 'ram' | 'storage' | 'motherboard' | 'psu' | 'case' | 'cooler' | 'monitor' | 'keyboard' | 'mouse' | 'accessory';
  product?: Product;
  required: boolean;
}

export interface PCBuild {
  components: PCBuildComponent[];
  totalPrice: number;
  compatibility: boolean;
}