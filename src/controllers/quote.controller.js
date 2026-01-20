const quoteService = require("../services/quote.service");

exports.submitQuote = async (req, res) => {
  try {
    const required = [
      "company",
      "firstName",
      "lastName",
      "email",
      "countries",
      "code",
      "phone",
      "sims",
      "dataUse",
    ];

    // Validate required fields
    for (let field of required) {
      if (!req.body[field] || req.body[field].toString().trim() === "") {
        return res.status(400).json({
          success: false,
          message: `${field} is required`,
        });
      }
    }

    // Save to DB
    const result = await quoteService.saveQuote(req.body);

    res.status(201).json({
      success: true,
      message: "Quote submitted successfully",
      id: result.insertId,
    });
  } catch (error) {
    console.log("Error submitting quote:", error);

    res.status(500).json({
      success: false,
      message: "Server error. Could not submit quote.",
      error: error.message,
    });
  }
};

// Get all submitted quotes
exports.getAllQuotes = async (req, res) => {
  try {
    const quotes = await quoteService.getAllQuotes();
    res.json(quotes);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching quotes");
  }
};
