const express = require('express');
const { shortner } = require('../controller/urlController')



const router = express.Router();
router.route("/shorturl").post(shortner);

module.exports = router; 