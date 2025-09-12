const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    originalPrice: { type: Number },
    discount: { type: Number },
    category: {
      type: String,
      enum: ["gaming", "commercial", "accessories", "components"],
      required: true,
    },
    subcategory: { type: String },
    images: { type: [String], required: true },
    specifications: { type: Map, of: String, default: {} },
    inStock: { type: Boolean, required: true },
    stockCount: { type: Number, required: true },
    rating: { type: Number, required: true },
    reviews: { type: Number, required: true },
    featured: { type: Boolean, default: false },
    componentType: {
        type: String,
        enum: ["cpu","gpu","ram","storage","motherboard","psu","case","cooler","monitor","keyboard","mouse","accessory", null],
        default: null
    }
  },
  { timestamps: true }
);

//module.exports = mongoose.models.Product || mongoose.model("Product", ProductSchema);
