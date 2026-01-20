const contentService = require("../services/content.service");

exports.getContentById = async (req, res) => {
  try {
    const id = req.params.id;

    const data = await contentService.getContentById(id);

    if (!data) {
      return res.status(404).json({
        success: false,
        message: "Content not found",
      });
    }

    res.json({
      success: true,
      data,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
};
