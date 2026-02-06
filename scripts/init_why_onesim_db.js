require('dotenv').config();
const db = require('../src/config/db');

const createTableQuery = `
CREATE TABLE IF NOT EXISTS why_onesim_cards (
    id INT AUTO_INCREMENT PRIMARY KEY,
    icon VARCHAR(255) NOT NULL,
    label VARCHAR(255) NOT NULL,
    description TEXT NOT NULL
);
`;

const insertDataQuery = `
INSERT INTO why_onesim_cards (icon, label, description) VALUES ?
`;

const data = [
    [
        "/images/midsize.svg",
        "Focus on Small and Mid-Sized Companies",
        "OneSimCard IoT understands the challenges faced by small and mid-sized companies when they search for a quality IoT service provider at a reasonable price for their application. OneSimCard IoT’s mission is to be the premier M2M / IoT provider for this segment."
    ],
    [
        "/images/partnership.svg",
        "True Interest in Partnership Building",
        "OneSimCard IoT evaluates each opportunity on its own merits without any minimum IoT SIM card requirements or activation fees. Our focus is on building a long-term partnership with all our customers."
    ],
    [
        "/images/intelligent.svg",
        "Intelligent Pricing by Application",
        "OneSimCard IoT understands that many IoT applications require only small amounts of data & SMS usage each month. We are determined to work with all customers to create pricing which considers application data & SMS usage."
    ],
    [
        "/images/customerSupport.svg",
        "Outstanding Customer Support",
        "All OneSimCard IoT customers are assigned a dedicated Account Executive who will be responsible for managing the partnership. OneSimCard IoT also features highly qualified technical support 24/7."
    ],
    [
        "/images/network.svg",
        "2G Network Options",
        "OneSimCard IoT will continue to offer 2G network support in 2017 and beyond. In addition, OneSimCard IoT offers cost-effective migration options and outstanding migration bonuses for those companies wishing to upgrade from 2G."
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
