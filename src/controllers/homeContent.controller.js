const db = require("../config/db");

exports.getHomeContent = async (req, res) => {
    try {
        const [sections] = await db.query("SELECT * FROM home_content_sections ORDER BY display_order ASC");
        const [features] = await db.query("SELECT * FROM home_section_features ORDER BY display_order ASC");

        // Parse JSON fields
        features.forEach(f => {
            if (f.extra_data && typeof f.extra_data === 'string') {
                try {
                    f.extra_data = JSON.parse(f.extra_data);
                } catch (e) {
                    console.error("Failed to parse extra_data for feature " + f.id, e);
                    f.extra_data = {};
                }
            }
        });

        const content = {};

        sections.forEach(section => {
            content[section.section_key] = {
                ...section,
                features: features.filter(f => f.section_key === section.section_key)
            };
        });

        res.json(content);
    } catch (error) {
        res.status(500).json({ message: "Error fetching home content", error: error.message });
    }
};
