const Product = require('../models/productModel');

// GET all products
const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// CREATE product
const createProduct = async (req, res) => {
  try {
    console.log('createProduct called');

    const { name, price, description, category, countInStock } = req.body;

    const product = new Product({
      name,
      price,
      description,
      category,
      countInStock,
    });

    const savedProduct = await product.save();

    console.log('product saved');

    res.status(201).json(savedProduct);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getProducts,
  createProduct,
};