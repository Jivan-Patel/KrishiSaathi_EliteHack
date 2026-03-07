const mongoose = require('mongoose');

const TransportRequestSchema = new mongoose.Schema({
    crop: { type: String, required: true },
    quantity: { type: String, required: true },
    pickup: { type: String, required: true },
    destination: { type: String, required: true },
    userRole: { type: String, default: 'farmer' },
    status: { type: String, default: 'Pending' },
    acceptedBy: { type: String, ref: 'User', default: null },
    acceptedAt: { type: Date, default: null },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('TransportRequest', TransportRequestSchema);
