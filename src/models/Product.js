import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    originalPrice: {
      type: Number,
      default: null,
    },

    discount: {
      type: Number,
      default: 0,
    },

    category: {
      type: String,
      enum: ["gaming", "components", "commercial", "accessories"],
      required: true,
    },

    type: {
      type: String, // processor, ram, monitor, mouse, keyboard, etc.
      required: true,
    },

    device: {
      type: String,
      default: null, // mouse, keyboard, combo etc.
    },

    devicetype: {
      type: String,
      default: null, // wireless, wired, mechanical, etc.
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      default: null,
    },

    series: {
      type: String,
      default: null,
    },

    generation: {
      type: String,
      default: null,
    },

    images: {
      type: [String],
      required: true,
    },

    specifications: {
      type: mongoose.Schema.Types.Mixed, // allows any key-value pairs
      required: true,
    },

    inStock: {
      type: Boolean,
      default: true,
    },

    stockCount: {
      type: Number,
      default: 0,
    },

    rating: {
      type: Number,
      min: 1,
      max: 5,
      default: 0,
    },

    reviews: {
      type: Number,
      default: 0,
    },

    featured: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Product = mongoose.models.Product || mongoose.model("Product", productSchema);

export default  Product;
