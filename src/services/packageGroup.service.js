const db = require("../config/db");

exports.getDistinctCountries = async () => {
  const query = `
    SELECT DISTINCT included_countries
    FROM package_group
    WHERE included_countries IS NOT NULL
      AND included_countries != '';
  `;

  const [rows] = await db.query(query);
  return rows;
};

exports.getActivePackagesByCountry = async (country) => {
  const query = `
    SELECT *
    FROM package
    JOIN package_group
      ON iddpgroup = dpgroupid
    WHERE active = 1
      AND included_countries LIKE ?;
  `;

  const [rows] = await db.query(query, [`%${country}%`]);
  return rows;
};
