const service = require('../services/keyFeaturesService');

exports.getKeyFeatures = async (req, res) => {
    try {
        const features = await service.getAll();
        res.json({ keyFeatures: features });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch key features' });
    }
};
