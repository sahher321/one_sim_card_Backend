const partnerService = require("../services/partner.service");

exports.getAllSections = async (req, res) => {
    try {
        const sections = await partnerService.getAllSections();
        res.json({
            success: true,
            data: sections
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching partner sections",
            error: error.message
        });
    }
};

exports.getItemDetails = async (req, res) => {
    try {
        const itemId = req.params.id;
        const details = await partnerService.getItemDetails(itemId);

        if (!details) {
            return res.status(404).json({
                success: false,
                message: "Item details not found"
            });
        }

        res.json({
            success: true,
            data: details
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error fetching item details",
            error: error.message
        });
    }
};
