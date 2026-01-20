const db = require("../config/db");

exports.getContentById = async (id) => {
  const [rows] = await db.query(
    "SELECT * FROM content WHERE idcontent = ?",
    [id]
  );

  return rows[0]; 
};
