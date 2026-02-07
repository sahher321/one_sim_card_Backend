require('dotenv').config();
const db = require('../src/config/db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS pricing_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    size VARCHAR(255) NOT NULL,
    price VARCHAR(255) NOT NULL,
    color VARCHAR(50) NOT NULL,
    country VARCHAR(100) NOT NULL
);
`;

const insertDataQuery = `
INSERT INTO pricing_plans (title, image_url, size, price, color, country) VALUES ?
`;

const data = [
    [
        "EU Plan",
        "/images/europe.svg",
        "1200MB",
        "$8.00 Annually",
        "bg-[#2E4A6F]",
        "Austria"
    ],
    [
        "USA/Canada Plan",
        "/images/canada.svg",
        "1200MB",
        "$13.50 Annually",
        "bg-[#FFD700]",
        "Canada"
    ],
    [
        "USA Plan",
        "/images/USA.svg",
        "1200MB",
        "$10.41 Annually",
        "bg-[#2E4A6F]",
        "USA"
    ]
];

async function initDB() {
    try {
        console.log("Creating table...");
        await db.query(createTableQuery);
        console.log("Table created.");

        console.log("Inserting data...");
        await db.query(insertDataQuery, [data]);
        console.log("Data inserted.");

        process.exit();
    } catch (err) {
        console.error("Error initializing DB:", err);
        process.exit(1);
    }
}

initDB();
