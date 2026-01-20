const db = require("../config/db");

// Endpoint 1: fetch all groups
exports.getFaqGroups = async () => {
  const [rows] = await db.query(`
    SELECT idgroup, groupname
    FROM faq_groups
    ORDER BY groupname ASC
  `);
  return rows;
};

// Endpoint 2: fetch FAQs by group id
exports.getFaqsByGroup = async (groupId) => {
  const [rows] = await db.query(
    `
    SELECT f.idfaq, f.question, f.answer
    FROM faq f
    JOIN fg_relations r ON f.idfaq = r.faqid
    WHERE r.groupid = ?
    ORDER BY r.ord ASC
  `,
    [groupId]
  );

  return rows;
};

// Endpoint 3: search FAQs
exports.searchFaq = async (query) => {
  const search = `%${query}%`;

  const [rows] = await db.query(
    `
    SELECT idfaq, question, answer
    FROM faq
    WHERE question LIKE ? 
    OR answer LIKE ?
    ORDER BY idfaq ASC
    `,
    [search, search]
  );

  return rows;
};
