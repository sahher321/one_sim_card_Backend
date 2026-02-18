const { SitemapStream, streamToPromise } = require('sitemap');
const { Readable } = require('stream');
const db = require("../config/db");
const coverageService = require("../services/coverage.service");
const iotSolutionsController = require("../controllers/iotSolutions.controller"); // Reuse logic or query directly? Better query directly to avoid req/res mock

// Helper to get raw data for sitemap
const fetchSitemapDataInternal = async () => {
    // Static Routes
    const staticRoutes = [
        { url: '/', changefreq: 'daily', priority: 1.0, title: 'Home' },
        { url: '/GlobalCoverage', changefreq: 'weekly', priority: 0.8, title: 'Global Coverage' },
        { url: '/EasySIMManagement', changefreq: 'weekly', priority: 0.8, title: 'Easy SIM Management' },
        { url: '/Technology', changefreq: 'monthly', priority: 0.7, title: 'Technology' },
        { url: '/OSCARIoTSIMCardManagementPortal', changefreq: 'monthly', priority: 0.7, title: 'OSCAR Management Portal' },
        { url: '/IoTSolutions', changefreq: 'weekly', priority: 0.9, title: 'IoT Solutions' },
        { url: '/ConsumerIOT', changefreq: 'daily', priority: 0.9, title: 'Consumer IoT' },
        { url: '/SimPlans', changefreq: 'daily', priority: 0.9, title: 'Sim Plans' },
        { url: '/StarterKit', changefreq: 'monthly', priority: 0.6, title: 'Starter Kit' },
        { url: '/CustomQuote', changefreq: 'monthly', priority: 0.6, title: 'Custom Quote' },
        { url: '/WhyOneSimCard', changefreq: 'monthly', priority: 0.6, title: 'Why OneSimCard' },
        { url: '/rates', changefreq: 'weekly', priority: 0.7, title: 'Rates' },
        { url: '/aboutUs', changefreq: 'monthly', priority: 0.5, title: 'About Us' },
        { url: '/pressReleases', changefreq: 'weekly', priority: 0.6, title: 'Press Releases' },
        { url: '/businessOppotunities', changefreq: 'monthly', priority: 0.6, title: 'Business Opportunities' },
        { url: '/m2mDistributorRegistration', changefreq: 'monthly', priority: 0.6, title: 'Distributor Registration' },
        { url: '/BuyNow', changefreq: 'daily', priority: 0.9, title: 'Buy Now' },
        { url: '/blog', changefreq: 'weekly', priority: 0.7, title: 'Blog' },
        { url: '/Faq', changefreq: 'weekly', priority: 0.7, title: 'FAQ' },
        { url: '/M2MSupportForm', changefreq: 'monthly', priority: 0.5, title: 'Support Form' },
    ];

    // Dynamic: IoT Solutions
    const [solutionRows] = await db.query("SELECT title, slug FROM iot_solutions ORDER BY display_order ASC");
    const solutionRoutes = solutionRows.map(row => ({
        url: `/IoTSolutions/${row.slug}`,
        changefreq: 'weekly',
        priority: 0.8,
        title: row.title
    }));

    // Dynamic: IoT Country Pages
    // We already have logic in coverageService to parsing countries. Reuse it.
    const countries = await coverageService.getCountries();
    const countryRoutes = countries.map(c => ({
        url: `/SimPlans?country=${encodeURIComponent(c)}`,
        changefreq: 'weekly',
        priority: 0.7,
        title: `IoT SIM Card for ${c}`
    }));

    return { staticRoutes, solutionRoutes, countryRoutes };
};

exports.getSitemap = async (req, res) => {
    try {
        const { staticRoutes, solutionRoutes, countryRoutes } = await fetchSitemapDataInternal();

        // Combine all links for XML
        const allLinks = [
            ...staticRoutes.map(r => ({ url: r.url, changefreq: r.changefreq, priority: r.priority })),
            ...solutionRoutes.map(r => ({ url: r.url, changefreq: r.changefreq, priority: r.priority })),
            ...countryRoutes.map(r => ({ url: r.url, changefreq: r.changefreq, priority: r.priority }))
        ];

        // Create a stream to write to
        const stream = new SitemapStream({ hostname: 'https://iot.onesimcard.com' });

        // XML sitemap
        const xmlString = await streamToPromise(Readable.from(allLinks).pipe(stream)).then((data) =>
            data.toString()
        );

        res.header('Content-Type', 'application/xml');
        res.send(xmlString);

    } catch (error) {
        console.error("Error generating sitemap XML:", error);
        res.status(500).end();
    }
};

exports.getSitemapData = async (req, res) => {
    try {
        const data = await fetchSitemapDataInternal();
        res.json(data);
    } catch (error) {
        console.error("Error fetching sitemap data:", error);
        res.status(500).json({ message: "Error fetching sitemap data" });
    }
};
