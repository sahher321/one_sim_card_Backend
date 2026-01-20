const faqService = require("../services/faq.service");

// Get all FAQ groups
exports.getFaqGroups = async (req, res) => {
  try {
    const groups = await faqService.getFaqGroups();
    res.json(groups);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching FAQ groups");
  }
};

// Get FAQs by group id
exports.getFaqsByGroup = async (req, res) => {
  try {
    const groupId = req.params.groupId;
    const faqs = await faqService.getFaqsByGroup(groupId);
    res.json(faqs);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error fetching FAQs");
  }
};

exports.searchFaq = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ message: "Search query 'q' is required" });
    }

    const results = await faqService.searchFaq(query);
    res.json(results);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error searching FAQs");
  }
};
