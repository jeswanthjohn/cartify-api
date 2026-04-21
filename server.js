const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config(); 

const app = express(); 

//middleware
app.use(express.json()); 
app.use(cors()); 

//test routs
app.get('/', (req, res) => {
    res.send('API running'); 
});

const PORT = process.env.PORT || 5000; 

//DB connect + server start
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected'); 
    app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);         
    }); 
})
.catch(err => console.log(err)); 