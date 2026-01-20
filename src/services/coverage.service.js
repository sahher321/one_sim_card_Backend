const db = require("../config/db");

exports.getCoverage = async () => {
  const [rows] = await db.query("SELECT * FROM coverage");
  return rows;
};

exports.getCountries = async () => {
  const [rows] = await db.query(`
    SELECT DISTINCT countryName
    FROM coverage
    ORDER BY countryName 
  `);

  // Map to array of names
  const countries = rows.map((row) => row.countryName);
  return countries;
};

exports.getOperatorsByCountry = async (countryName) => {
  const [rows] = await db.query(
    `SELECT id, operatorName, mccMnc, supportedNetworkTypes
     FROM coverage
     WHERE countryName = ?
     ORDER BY operatorName ASC`,
    [countryName]
  );

  return rows; // array of objects
};

exports.getPackagesByCountry = async (countryName) => {
  const query = `
    SELECT p.*, pg.group_title as groupTitle, pg.included_countries, p.activation_cost as price, p.title as name
    FROM package p
    JOIN package_group pg ON p.dpgroupid = pg.iddpgroup
    WHERE p.active = 1
      AND pg.included_countries LIKE ?;
  `;

  const [rows] = await db.query(query, [`%${countryName}%`]);
  return rows;
};
