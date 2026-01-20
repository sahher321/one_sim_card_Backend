const packageGroupService = require("../services/packageGroup.service");

exports.getCountries = async (req, res) => {
  try {
    const countries = await packageGroupService.getDistinctCountries();
    res.json(countries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching countries" });
  }
};

exports.getPackagesByCountry = async (req, res) => {
  try {
    const { country } = req.params;

    if (!country) {
      return res.status(400).json({ message: "Country is required" });
    }

    const packages = await packageGroupService.getActivePackagesByCountry(
      country
    );

    res.json(packages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching packages" });
  }
};
