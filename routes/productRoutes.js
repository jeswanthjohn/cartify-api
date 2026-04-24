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
const validateProduct = require('../middleware/validateProduct');

// PUBLIC ROUTES
router.get('/', getProducts);
router.get('/:id', getProductById);

// ADMIN ROUTES
router.post('/', protect, admin, validateProduct, createProduct);
router.put('/:id', protect, admin, validateProduct, updateProduct);
router.delete('/:id', protect, admin, deleteProduct);

module.exports = router;