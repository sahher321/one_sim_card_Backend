require('dotenv').config();
const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
    res.send("one sim backend run successfully");
});

app.get("/api/test-db", async (req, res) => {
    const config = {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        database: process.env.DB_NAME,
        port: process.env.DB_PORT,
        hasPassword: !!process.env.DB_PASSWORD
    };

    const db = require("./config/db");
    try {
        const [rows] = await db.query("SELECT 1 as test");
        res.json({
            message: "Database connection successful",
            env_status: config,
            data: rows
        });
    } catch (error) {
        res.status(500).json({
            message: "Database connection failed",
            error: error.message,
            env_status: config,
            advice: "If host is 127.0.0.1, your environment variables are NOT being loaded. Make sure you set them in the Vercel Dashboard (Settings > Environment Variables)."
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

const partnerRoutes = require("./routes/partner.routes");
app.use("/api/partners", partnerRoutes);

const keyFeaturesRoutes = require("./routes/keyFeatures.routes");
app.use("/api/key-features", keyFeaturesRoutes);

const whyOneSimRoutes = require("./routes/whyOneSim.routes");
app.use("/api/why-onesim", whyOneSimRoutes);

const pricingPlansRoutes = require("./routes/pricingPlans.routes");
app.use("/api/pricing-plans", pricingPlansRoutes);

const iotSolutionsRoutes = require("./routes/iotSolutions.routes");
app.use("/api/iot-solutions", iotSolutionsRoutes);



module.exports = app;
