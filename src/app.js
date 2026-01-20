require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
    res.send("one sim backend run successfully");
});

app.get("/api/test-db", async (req, res) => {
    const db = require("./config/db");
    try {
        const [rows] = await db.query("SELECT 1 as test");
        res.json({ message: "Database connection successful", data: rows });
    } catch (error) {
        res.status(500).json({
            message: "Database connection failed",
            error: error.message,
            stack: error.stack,
            config: {
                host: process.env.DB_HOST,
                user: process.env.DB_USER,
                database: process.env.DB_NAME,
                port: process.env.DB_PORT
            }
        });
    }
});

app.use(express.json());

const coverageRoutes = require("./routes/coverage.routes");
app.use("/api/coverage", coverageRoutes);

const faqRoutes = require("./routes/faq.routes");
app.use("/api/faq", faqRoutes);

const quoteRoutes = require("./routes/quote.routes");
app.use("/api/quote", quoteRoutes);

const buyNowRoutes = require("./routes/buyNow.routes");
app.use("/api/buynow", buyNowRoutes);

const m2mSupportRoutes = require("./routes/m2mSupport.routes");
app.use("/api/m2m-support", m2mSupportRoutes);

const contentRoutes = require("./routes/content.routes");
app.use("/api/content", contentRoutes);

const packageGroupRoutes = require("./routes/packageGroup.routes");
app.use("/api/package-group", packageGroupRoutes);

const contentRoute = require('./routes/contentRoutes');
app.use('/api', contentRoute);

const keyFeaturesRoutes = require('./routes/keyFeaturesRoutes');
app.use('/api', keyFeaturesRoutes);



module.exports = app;
