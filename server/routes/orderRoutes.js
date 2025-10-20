import express from 'express';
import Order from '../models/orderModel.js';
// 1. Import BOTH middleware guards
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// --- ADMIN ROUTES (Must be at the top) ---

/**
 * @route   GET /api/orders
 * @desc    Get all orders (Admin Only)
 * @access  Private/Admin
 */
router.get('/', protect, admin, async (req, res) => {
  try {
    // Find all orders and also populate the 'user' field with just their name
    const orders = await Order.find({}).populate('user', 'name');
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @route   PUT /api/orders/:id/deliver
 * @desc    Mark an order as delivered (Admin Only)
 * @access  Private/Admin
 */
router.put('/:id/deliver', protect, admin, async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();

      const updatedOrder = await order.save();
      res.status(200).json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


// --- USER ROUTES (Must be below admin routes) ---

/**
 * @route   POST /api/orders
 * @desc    Create a new order
 * @access  Private
 */
router.post('/', protect, async (req, res) => {
  // ... (Your existing 'create order' code - NO CHANGES)
  try {
    const { orderItems, shippingAddress, totalPrice } = req.body;

    if (!orderItems || orderItems.length === 0) {
      res.status(400).json({ message: 'No order items' });
      return;
    }

    const order = new Order({
      user: req.user._id,
      orderItems: orderItems.map(item => ({
        name: item.name,
        qty: 1,
        image: item.imageUrls[0],
        price: item.price,
        product: item._id,
        size: item.selectedSize,
        color: item.selectedColor,
      })),
      shippingAddress,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    console.error('SERVER ERROR (placeOrder):', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @route   GET /api/orders/myorders
 * @desc    Get all orders for the logged-in user
 * @access  Private
 */
router.get('/myorders', protect, async (req, res) => {
  // ... (Your existing 'myorders' code - NO CHANGES)
  try {
    const orders = await Order.find({ user: req.user._id });
    res.status(200).json(orders);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

/**
 * @route   GET /api/orders/:id
 * @desc    Get a single order by its ID
 * @access  Private
 */
router.get('/:id', protect, async (req, res) => {
  // ... (Your existing 'get order by id' code - NO CHANGES)
  try {
    const order = await Order.findById(req.params.id)
      .populate('user', 'name email');

    if (order) {
      if (order.user._id.toString() !== req.user._id.toString() && !req.user.isAdmin) {
        return res.status(401).json({ message: 'Not authorized to view this order' });
      }
      res.status(200).json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


export default router;