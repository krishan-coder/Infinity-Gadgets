import mongoose from "mongoose";

const AddressSchema = new mongoose.Schema({
  street: { type: String, required: true },
  city:   { type: String, required: true },
  state:  { type: String, required: true },
  zipCode:{ type: String, required: true },
  country:{ type: String, required: true }
});


const OrderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [{
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
    quantity: { type: Number, required: true },
    priceAtPurchase: { type: Number, required: true } // snapshot of price
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending"
  },
  shippingAddress: { type: AddressSchema, required: true },
  createdAt: { type: Date, default: Date.now }
}, { timestamps: true });

//export default mongoose.models.Order || mongoose.model("Order", OrderSchema);
