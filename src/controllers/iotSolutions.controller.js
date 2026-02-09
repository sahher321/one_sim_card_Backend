const db = require("../config/db");

exports.getAllSolutions = async (req, res) => {
    try {
        const [rows] = await db.query("SELECT * FROM iot_solutions ORDER BY display_order ASC");
        res.json(rows);
    } catch (error) {
        res.status(500).json({ message: "Error fetching IoT solutions", error: error.message });
    }
};

exports.getSolutionBySlug = async (req, res) => {
    const { slug } = req.params;
    try {
        const [solutions] = await db.query("SELECT * FROM iot_solutions WHERE slug = ?", [slug]);
        if (solutions.length === 0) {
            return res.status(404).json({ message: "Solution not found" });
        }
        const solution = solutions[0];

        const [paragraphs] = await db.query("SELECT * FROM iot_solution_paragraphs WHERE iot_solution_id = ? ORDER BY display_order ASC", [solution.id]);
        const [features] = await db.query("SELECT * FROM iot_solution_features WHERE iot_solution_id = ? ORDER BY display_order ASC", [solution.id]);

        // Transform data to match frontend structure
        const formattedData = {
            ...solution,
            banner: {
                titleFirst: solution.banner_title_first,
                titleLast: solution.banner_title_last,
                breadcrumb: [
                    { label: "IoT Solutions", path: "/IoTSolutions" },
                    { label: solution.title }
                ]
            },
            paragraphs: paragraphs.filter(p => p.section_type === 'main').map(p => p.content),
            extraContent: paragraphs.filter(p => p.section_type === 'extra').map(p => p.content),
            features: features.map(f => ({
                title: f.title,
                description: f.description,
                imageSrc: f.image_src,
                imageAlt: f.image_alt,
                reverse: !!f.reverse,
                btnBgColor: f.btn_bg_color
            }))
        };

        res.json(formattedData);
    } catch (error) {
        res.status(500).json({ message: "Error fetching solution details", error: error.message });
    }
};
