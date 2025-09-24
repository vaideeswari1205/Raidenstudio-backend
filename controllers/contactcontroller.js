const Contact = require('../models/contactschema');

exports.createContact = async (req, res) => {
  try {
    console.log("reqqq",req.body)
    const contact = new Contact(req.body);
    await contact.save();
    res.status(201).json({ message: 'Contact submitted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
