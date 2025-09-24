const Request = require('../models/requestschema');

exports.createApplication = async (req, res) => {
  console.log("req.body:", req.body);
  console.log("req.file:", req.file);

  try {
    if (!req.body) return res.status(400).json({ message: "No form data found" });

    const { name, email, phoneNumber, country, projectDescription } = req.body;
    const documentUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newApplication = new Request({
      name,
      email,
      phoneNumber,
      country,
      projectDescription,
      documentUrl
    });

    await newApplication.save();
    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (err) {
    console.error("❌ Error in createApplication:", err);
    res.status(500).json({ message: 'Server Error' });
  }
};
