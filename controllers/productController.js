const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// 🔧 Helper function (reusable sanitization)
const sanitizeString = (value) =>
  typeof value === 'string' ? value.trim() : '';

// GET all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// CREATE product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, countInStock } = req.body;

  const product = new Product({
    name: sanitizeString(name),
    price,
    description: sanitizeString(description),
    category: sanitizeString(category),
    countInStock: countInStock ?? 0,
  });

  const savedProduct = await product.save();

  res.status(201).json(savedProduct);
});

// GET single product
const getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  res.json(product);
});

// UPDATE product
const updateProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  //  SAFE + CONSISTENT SANITIZATION
  if (req.body.name !== undefined) {
    product.name = sanitizeString(req.body.name) || product.name;
  }

  if (req.body.price !== undefined) {
    product.price = req.body.price;
  }

  if (req.body.description !== undefined) {
    product.description = sanitizeString(req.body.description);
  }

  if (req.body.category !== undefined) {
    product.category = sanitizeString(req.body.category);
  }

  if (req.body.countInStock !== undefined) {
    product.countInStock = req.body.countInStock;
  }

  const updatedProduct = await product.save();

  res.json(updatedProduct);
});

// DELETE product
const deleteProduct = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    res.status(404);
    throw new Error('Product not found');
  }

  await product.deleteOne();

  res.json({ message: 'Product removed' });
});

module.exports = {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};