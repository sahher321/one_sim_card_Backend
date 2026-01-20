const buyNowService = require("../services/buyNow.service");

exports.submitBuyNow = async (req, res) => {
  try {
    const data = req.body;

    const required = [
      "mzmDeviceModel", "mzmApplication", "estimatedQty",
      "company", "federalId", "hearAboutUs",
      "firstName", "lastName", "email", "reEmail",
      "password", "rePassword", "phone1"
    ];

    for (let field of required) {
      if (!data[field] || data[field].toString().trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${field} is required`
        });
      }
    }

    if (!data.agreeTerms) {
      return res.status(400).json({
        success: false,
        message: "Please agree to the terms and conditions"
      });
    }

    await buyNowService.saveBuyNowForm(data);

    res.status(200).json({
      success: true,
      message: "Buy Now form submitted successfully"
    });

  } catch (err) {
    console.error("BuyNow Error:", err);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: err.message
    });
  }
};
