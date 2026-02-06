const db = require('../config/db');

exports.getAll = async () => {
    const [rows] = await db.query('SELECT * FROM why_onesim_cards ORDER BY id ASC');
    return rows;
};
