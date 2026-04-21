const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// middleware
const { protect, isAdmin } = require('./middleware/authMiddleware');

// routes
const authRoutes = require('./routes/authRoutes');

dotenv.config(); 

const app = express(); 

// middleware
app.use(express.json()); 
app.use(cors()); 

app.use('/api/auth', authRoutes);

// test routes
app.get('/', (req, res) => {
    res.send('THIS IS MY SERVER');
});

app.get('/api/protected', protect, (req, res) => {
  res.json({
    message: 'You are authorized',
    user: req.user,
  });
});

app.get('/api/admin', protect, isAdmin, (req, res) => {
  res.json({
    message: 'Welcome Admin',
  });
});

const PORT = process.env.PORT || 5000; 

// DB connect + server start
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected'); 
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);         
    }); 
})
.catch(err => console.log(err));