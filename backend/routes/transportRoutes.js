const express = require('express');
const router = express.Router();
const TransportRequest = require('../models/TransportRequest');

// GET all unassigned transport requests
router.get('/', async (req, res) => {
    try {
        const requests = await TransportRequest.find({ acceptedBy: null }).sort({ createdAt: -1 });
        res.json(requests);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET my jobs
router.get('/my-jobs/:userId', async (req, res) => {
    try {
        const jobs = await TransportRequest.find({ acceptedBy: req.params.userId }).sort({ acceptedAt: -1 });
        res.json(jobs);
    } catch (err) {
        console.error('Error in /my-jobs:', err);
        res.status(500).json({ message: err.message });
    }
});

// POST transport request
router.post('/', async (req, res) => {
    const transportRequest = new TransportRequest({
        crop: req.body.crop,
        quantity: req.body.quantity,
        pickup: req.body.pickup,
        destination: req.body.destination,
        userRole: req.body.userRole || 'farmer'
    });
    try {
        const newRequest = await transportRequest.save();
        res.status(201).json({ message: 'Request submitted successfully', data: newRequest });
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT accept job
router.put('/accept/:id', async (req, res) => {
    try {
        const job = await TransportRequest.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });
        if (job.acceptedBy) return res.status(400).json({ message: 'Job already accepted' });

        job.acceptedBy = req.body.userId;
        job.acceptedAt = new Date();
        job.status = 'Pending';
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT update status
router.put('/status/:id', async (req, res) => {
    try {
        const job = await TransportRequest.findById(req.params.id);
        if (!job) return res.status(404).json({ message: 'Job not found' });

        job.status = req.body.status;
        await job.save();
        res.json(job);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

module.exports = router;
