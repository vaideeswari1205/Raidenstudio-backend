const express = require('express');
const router = express.Router();
const freeQuoteController=require('../controllers/freeQuoteController')
router.post('/',freeQuoteController.saveMessage)
router.get('/',freeQuoteController.getMessages)
module.exports = router;