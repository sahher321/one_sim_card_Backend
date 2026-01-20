const express = require("express");
const app = express();
const cors = require("cors");
app.use(cors());

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
