const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM pricing_plans ORDER BY id ASC');
    return rows;
};
