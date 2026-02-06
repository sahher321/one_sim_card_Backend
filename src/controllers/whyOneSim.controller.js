const service = require('../services/whyOneSim.service');

exports.getAll = async (req, res) => {
    try {
        const cards = await service.getAll();
        res.json({ cards });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch cards' });
    }
};
