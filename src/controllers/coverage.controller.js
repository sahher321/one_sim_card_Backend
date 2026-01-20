const coverageService = require("../services/coverage.service");

exports.getCoverage = async (req, res) => {
  try {
    const data = await coverageService.getCoverage();
    res.json(data);
  } catch (error) {
    console.error("Error in getCoverage:", error);
    res.status(500).json({ message: "Error fetching coverage data" });
  }
};

exports.getCountries = async (req, res) => {
  try {
    const data = await coverageService.getCountries();
    res.json(data);
  } catch (error) {
    console.error("Error in getCountries:", error);
    res.status(500).json({ message: "Error fetching countries" });
  }
};

exports.getOperatorsByCountry = async (req, res) => {
  try {
    const country = req.query.country;

    if (!country) {
      return res
        .status(400)
        .json({ message: "Country query parameter is required" });
    }

    const operators = await coverageService.getOperatorsByCountry(country);
    const plans = await coverageService.getPackagesByCountry(country);

    res.json({
      operators,
      plans,
    });
  } catch (error) {
    console.error("Error in getOperatorsByCountry:", error);
    res.status(500).json({ message: "Error fetching coverage and plans" });
  }
};
