const Product = require('../models/productModel');
const asyncHandler = require('express-async-handler');

// GET all products
const getProducts = asyncHandler(async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// CREATE product
const createProduct = asyncHandler(async (req, res) => {
  const { name, price, description, category, countInStock } = req.body;

  //  basic validation
  if (!name || !price) {
    res.status(400);
    throw new Error('Name and price are required');
  }

  const product = new Product({
    name,
    price,
    description,
    category,
    countInStock,
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

  product.name = req.body.name || product.name;
  product.price = req.body.price || product.price;
  product.description = req.body.description || product.description;
  product.category = req.body.category || product.category;
  product.countInStock =
    req.body.countInStock || product.countInStock;

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