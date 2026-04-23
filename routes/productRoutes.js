const express = require('express');
const router = express.Router();

const {getProducts, createProduct} = require('../controllers/productController');
const {protect, admin} = require('../middleware/authMiddleware');

// Public route
router.get('/', getProducts); 

// Protected route (admin only)
router.post('/', protect, createProduct); 

module.exports = router; 