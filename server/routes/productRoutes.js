// Use 'import' instead of 'require'
import express from 'express';
const router = express.Router();

// Use 'import' and add the .js extension to our local file
import Product from '../models/productModel.js';

/**
 * @route   GET /api/products
 * @desc    Get all products
 */
router.get('/', async (req, res) => {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching products' });
  }
});

/**
 * @route   POST /api/products
 * @desc    Create a new product
 */
router.post('/', async (req, res) => {
  try {
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      imageUrls: req.body.imageUrls,
      category: req.body.category,
      sizes: req.body.sizes,
      colors: req.body.colors,
    });
    const savedProduct = await newProduct.save();
    res.status(201).json(savedProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product' });
  }
});

/**
 * @route   GET /api/products/:id
 * @desc    Get a single product by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      res.status(200).json(product);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error fetching product' });
  }
});

/**
 * @route   PUT /api/products/:id
 * @desc    Update a product
 */
router.put('/:id', async (req, res) => {
  try {
    const { name, description, price, imageUrls, category, sizes, colors } = req.body;
    const product = await Product.findById(req.params.id);

    if (product) {
      product.name = name || product.name;
      product.description = description || product.description;
      product.price = price || product.price;
      product.imageUrls = imageUrls || product.imageUrls;
      product.category = category || product.category;
      product.sizes = sizes || product.sizes;
      product.colors = colors || product.colors;

      const updatedProduct = await product.save();
      res.status(200).json(updatedProduct);
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating product' });
  }
});

/**
 * @route   DELETE /api/products/:id
 * @desc    Delete a product
 */
router.delete('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (product) {
      await product.deleteOne();
      res.status(200).json({ message: 'Product removed' });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error deleting product' });
  }
});

// Use 'export default' instead of 'module.exports'
export default router;