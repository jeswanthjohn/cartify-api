const express = require('express');
const router = express.Router();

const {
  getProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const { protect, admin } = require('../middleware/authMiddleware');


// PUBLIC ROUTES
router.get('/', getProducts); // GET all products
router.get('/:id', getProductById); // GET single product


// ADMIN ROUTES
router.post('/', protect, admin, createProduct); // CREATE
router.put('/:id', protect, admin, updateProduct); // UPDATE
router.delete('/:id', protect, admin, deleteProduct); // DELETE


module.exports = router;