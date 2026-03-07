const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { translateData } = require('../utils/dataTranslations');

// Load fertilizer data once at server start for performance
const fertilizerDataPath = path.join(__dirname, '../../fertilizerData.json');
let fertilizerData = [];

try {
    const data = fs.readFileSync(fertilizerDataPath, 'utf8');
    fertilizerData = JSON.parse(data);
    console.log('Fertilizer data loaded successfully');
} catch (err) {
    console.error('Error loading fertilizer data:', err);
}

// GET all fertilizers
router.get('/', (req, res) => {
    try {
        const { crop, crops, lang } = req.query;

        if (crops) {
            // Multi-crop safe parsing: comma-separated, trim, lowercase, remove duplicates
            const cropList = Array.from(new Set(
                crops.split(',')
                    .map(c => c.trim().toLowerCase())
                    .filter(c => c.length > 0)
            ));

            const filtered = fertilizerData.filter(f =>
                f.suitableCrops.some(sc => cropList.includes(sc.toLowerCase()))
            );
            return res.json(translateData(filtered, lang));
        }

        if (crop) {
            const normalizedCrop = crop.trim().toLowerCase();
            const filtered = fertilizerData.filter(f =>
                f.suitableCrops.some(sc => sc.toLowerCase() === normalizedCrop)
            );
            return res.json(translateData(filtered, lang));
        }

        res.json(translateData(fertilizerData, lang));
    } catch (err) {
        res.status(500).json({ message: 'Error processing fertilizer request' });
    }
});

module.exports = router;
