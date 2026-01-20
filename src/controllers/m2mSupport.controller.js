const SupportService = require("../services/m2mSupport.service");

exports.submitForm = async (req, res) => {
  try {
    const result = await SupportService.createForm(req.body);

    return res.status(201).json({
      success: true,
      message: "Form submitted successfully",
      data: result,
    });
  } catch (error) {
    console.error("Controller Error:", error);
    return res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
