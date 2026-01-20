const db = require("../config/db");

exports.createForm = async (data) => {
  const { topic, company, message, name, email, phone } = data;

  const sql = `
    INSERT INTO m2m_support_forms (topic, company, message, name, email, phone)
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [topic, company, message, name, email, phone || null];

  const [result] = await db.query(sql, values);
  return result;
};
