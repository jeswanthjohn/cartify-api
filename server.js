const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// routes
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');

// middleware (ONLY if used here)
const { protect, admin } = require('./middleware/authMiddleware');

dotenv.config();

const app = express();

// global middleware
app.use(express.json());
app.use(cors());

// routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

// test routes
app.get('/', (req, res) => {
  res.send('THIS IS MY SERVER');
});

app.get('/api/protected', protect, (req, res) => {
  res.json({ message: 'You are authorized', user: req.user });
});

app.get('/api/admin', protect, admin, (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

const PORT = process.env.PORT || 5000;

// DB + server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch(err => console.log(err));