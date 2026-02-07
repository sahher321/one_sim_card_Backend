const service = require('../services/pricingPlans.service');

exports.getAll = async (req, res) => {
    try {
        const plans = await service.getAll();
        res.json({ plans });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch pricing plans' });
    }
};
