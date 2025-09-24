const express = require("express");
const router = express.Router();

// Temporary static data — replace with DB query later
router.get("/", (req, res) => {
  res.json([
    { _id: 1, title: "Blog One", summary: "This is the first blog." },
    { _id: 2, title: "Blog Two", summary: "This is the second blog." }
  ]);
});

module.exports = router;
