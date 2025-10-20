import mongoose from 'mongoose';

// This is the schema for a *single item* inside the main order
const orderItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  qty: { type: Number, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  // This is the link to the Product collection
  product: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Product', // Links this to the 'Product' model
  },
  // We also store the selected size and color for this item
  size: { type: String, required: true },
  color: { type: String, required: true },
});

// This is the main order schema
const orderSchema = new mongoose.Schema(
  {
    // This is the link to the User collection
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User', // Links this to the 'User' model
    },
    // An order is just an array of the 'orderItem' objects we defined above
    orderItems: [orderItemSchema],
    
    // We'll store the shipping address as an object
    shippingAddress: {
      address: { type: String, required: true },
      city: { type: String, required: true },
      postalCode: { type: String, required: true },
      country: { type: String, required: true },
    },
    
    // We'll store the total price
    totalPrice: {
      type: Number,
      required: true,
      default: 0.0,
    },
    
    // Payment status (we'll update this later with a payment gateway)
    isPaid: {
      type: Boolean,
      required: true,
      default: false,
    },
    paidAt: {
      type: Date,
    },
    
    // Delivery status (for the admin panel)
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  }
);

const Order = mongoose.model('Order', orderSchema);

export default Order;