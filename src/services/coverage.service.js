const db = require("../config/db");

// Restricted countries list to filter out
const RESTRICTED_COUNTRIES = [
  "Cuba",
  "Iran",
  "North Korea",
  "Syria",
  // "Russia", // Removed: User confirmed Russia should work.
];

// Helper to parse included_countries string (e.g. "Country A, Country B")
const parseCountries = (rows) => {
  const countrySet = new Set();
  const delimiters = /[;|\n,]+/; // Split by semicolon, pipe, newline, or comma

  rows.forEach((row) => {
    if (row.included_countries) {
      // additional cleanup for hidden chars if needed, but trim() handles whitespace
      const split = row.included_countries.split(delimiters).map((c) => c.trim());
      split.forEach((c) => {
        // Filter out empty strings, restricted countries, and potential garbage (too short)
        if (c && c.length > 2 && !RESTRICTED_COUNTRIES.includes(c)) {
          countrySet.add(c);
        }
      });
    }
  });
  return Array.from(countrySet).sort();
};

exports.getCoverage = async () => {
  const [rows] = await db.query("SELECT * FROM coverage");
  return rows;
};

exports.getCountries = async () => {
  // Switch to package_group as requested
  const [rows] = await db.query(`
    SELECT included_countries
    FROM package_group
    WHERE included_countries IS NOT NULL
      AND included_countries != ''
  `);

  const countries = parseCountries(rows);
  return countries;
};

exports.getOperatorsByCountry = async (countryName) => {
  // Needed for "coverage" check (SimPlans uses getOperatorsAndPlans which uses this logic inside controller?)
  // Wait, the controller calls `getOperatorsByCountry` AND `getPackagesByCountry`.
  // `getOperatorsByCountry` queries `coverage` table.
  // If we only want to fix the *Plans* loading, we might leave this, BUT if the user strictly wants to show valid countries for plans,
  // we should be careful.
  // The User said "load country list from package_group".
  // If I select a country that exists in package_group but NOT in coverage, `getOperatorsByCountry` returns empty. That's fine.

  const [rows] = await db.query(
    `SELECT id, operatorName, mccMnc, supportedNetworkTypes
     FROM coverage
     WHERE countryName = ?
     ORDER BY operatorName ASC`,
    [countryName]
  );

  return rows;
};

exports.getPackagesByCountry = async (countryName) => {
  // Fetch all active packages with their groups
  // We do in-memory filtering because SQL `LIKE` is too loose (e.g. "Niger" matches "Nigeria")
  const query = `
    SELECT p.*, pg.group_title as groupTitle, pg.included_countries, p.activation_cost as price, p.title as name
    FROM package p
    JOIN package_group pg ON p.dpgroupid = pg.iddpgroup
    WHERE p.active = 1
  `;

  const [rows] = await db.query(query);

  const delimiters = /[;|\n,]+/; // Same regex as parseCountries

  // Strict filter: Check if countryName exists in the list
  const filtered = rows.filter((row) => {
    if (!row.included_countries) return false;
    const countries = row.included_countries.split(delimiters).map(c => c.trim());
    return countries.includes(countryName);
  });

  return filtered;
};
