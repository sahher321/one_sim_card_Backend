const contentService = require('../services/contentService');

async function getContent(req, res) {
    try {
        const data = await contentService.getAllContent();
        res.json({ iot_content: data });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
}

module.exports = { getContent };
