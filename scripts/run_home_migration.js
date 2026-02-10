const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');
require('dotenv').config({ path: path.join(__dirname, '../.env') });

async function runMigration() {
    const sqlPath = path.join(__dirname, '../../one-sim-card/scripts/migrate_home_content.sql');
    console.log(`Reading SQL from ${sqlPath}`);
    const sql = fs.readFileSync(sqlPath, 'utf8');

    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        multipleStatements: true
    });

    console.log('Connected to database.');

    try {
        await connection.query(sql);
        console.log('Migration completed successfully.');
    } catch (err) {
        console.error('Migration failed:', err);
    } finally {
        await connection.end();
    }
}

runMigration();
