const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { translateData } = require('../utils/dataTranslations');

const cropDataPath = path.join(__dirname, '../../cropData.json');

const getCrops = () => {
    const data = fs.readFileSync(cropDataPath, 'utf8');
    return JSON.parse(data);
};

// GET all crops
router.get('/', (req, res) => {
    try {
        const crops = getCrops();
        const { lang } = req.query;
        res.json(translateData(crops, lang));
    } catch (err) {
        res.status(500).json({ message: 'Error reading crop data' });
    }
});

// GET crop by ID
router.get('/:id', (req, res) => {
    try {
        const crops = getCrops();
        const crop = crops.find(c => c.id == req.params.id);
        const { lang } = req.query;
        if (crop) {
            res.json(translateData(crop, lang));
        } else {
            res.status(404).json({ message: 'Crop not found' });
        }
    } catch (err) {
        res.status(500).json({ message: 'Error reading crop data' });
    }
});

// GET recommendations
router.get('/recommendations/filter', (req, res) => {
    try {
        const { soil, season, water } = req.query;
        let crops = getCrops();

        const filteredCrops = crops.filter(crop => {
            const matchSoil = !soil || crop.soilTypes.some(s => s.toLowerCase() === soil.toLowerCase());
            const matchSeason = !season || crop.season.toLowerCase() === season.toLowerCase();
            const matchWater = !water || crop.waterRequirement.toLowerCase() === water.toLowerCase();
            return matchSoil && matchSeason && matchWater;
        });
        const { lang } = req.query;
        res.json(translateData(filteredCrops, lang));
    } catch (err) {
        res.status(500).json({ message: 'Error filtering recommendations' });
    }
});

module.exports = router;
