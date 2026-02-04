const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query(`
        SELECT
            title,
            subtitle,
            description,
            image_src,
            image_alt,
            reverse_layout,
            subtitle_color,
            aos_type,
            aos_delay,
            aos_duration,
            btn_bg_color
        FROM key_features
        ORDER BY feature_id ASC
    `);

    // 🔥 React-ready response
    return rows.map(row => ({
        title: row.title,
        subtitle: row.subtitle,
        description: row.description,
        imageSrc: row.image_src,
        imageAlt: row.image_alt,
        reverse: Boolean(row.reverse_layout),
        subtitleColor: row.subtitle_color,
        aos: {
            type: row.aos_type,
            delay: row.aos_delay,
            duration: row.aos_duration
        },
        btnBgColor: row.btn_bg_color
    }));
};
