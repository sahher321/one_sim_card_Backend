const db = require("../config/db");

exports.saveQuote = async (data) => {
  const sql = `
    INSERT INTO custom_quotes 
    (company, firstName, lastName, email, countries, code, phone, sims, dataUse, comments)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.company,
    data.firstName,
    data.lastName,
    data.email,
    data.countries,
    data.code,
    data.phone,
    data.sims,
    data.dataUse,
    data.comments,
  ];

  const [result] = await db.query(sql, values);
  return result;
};

exports.getAllQuotes = async () => {
  const [rows] = await db.query(
    "SELECT * FROM custom_quotes ORDER BY created_at DESC"
  );
  return rows;
};
