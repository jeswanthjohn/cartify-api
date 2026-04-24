const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// middleware
const { protect, admin } = require('./middleware/authMiddleware');
const { notFound, errorHandler } = require('./middleware/errorMiddleware');

dotenv.config();

console.log('NODE_ENV:', process.env.NODE_ENV); 

const app = express();

// 🔹 GLOBAL MIDDLEWARE
app.use(express.json());
app.use(cors());

// 🔹 ROUTES
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// 🔹 TEST ROUTES
app.get('/', (req, res) => {
  res.send('THIS IS MY SERVER');
});

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

app.get('/api/admin', protect, admin, (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// 🚨 🔥 ERROR MIDDLEWARE (MUST BE LAST)
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

// 🔹 DB + SERVER START
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

startServer();