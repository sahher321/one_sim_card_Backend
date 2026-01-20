const db = require("../config/db");

exports.saveBuyNowForm = async (data) => {
  const sql = `
    INSERT INTO buynow_requests (
      mzmDeviceModel, mzmApplication, estimatedQty, company, federalId, hearAboutUs,
      firstName, lastName, email, reEmail, password, rePassword, phone1, phone2,
      address1, address2, city, state, zip, country,
      agreeTerms, signedBy, title, fullName
    )
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  const values = [
    data.mzmDeviceModel,
    data.mzmApplication,
    data.estimatedQty,
    data.company,
    data.federalId,
    data.hearAboutUs,

    data.firstName,
    data.lastName,
    data.email,
    data.reEmail,
    data.password,
    data.rePassword,
    data.phone1,
    data.phone2 || null,

    data.address1 || null,
    data.address2 || null,
    data.city || null,
    data.state || null,
    data.zip || null,
    data.country || null,

    data.agreeTerms ? 1 : 0,
    data.signedBy || null,
    data.title || null,
    data.fullName || null
  ];

  return db.query(sql, values);
};
