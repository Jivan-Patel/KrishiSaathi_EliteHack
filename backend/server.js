require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const cropRoutes = require('./routes/cropRoutes');
const communityRoutes = require('./routes/communityRoutes');
const transportRoutes = require('./routes/transportRoutes');
const fertilizerRoutes = require('./routes/fertilizerRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/krishisaathi';
mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/crops', cropRoutes);
app.use('/api/community', communityRoutes);
app.use('/api/transport', transportRoutes);
app.use('/api/fertilizers', fertilizerRoutes);
app.use('/api/users', userRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('KrishiSaathi API is running...');
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
