const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { createApplication, getApplications } = require('../controllers/requestcontroller');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, 
  fileFilter: function (req, file, cb) {
    const filetypes = /pdf|doc|docx/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    if (extname) return cb(null, true);
    cb(new Error('Only PDF, DOC, DOCX files are allowed!'));
  },
});

// Must match frontend <input name="document">
router.post('/', upload.single('document'), createApplication);
// router.get('/', getApplications);

module.exports = router;
