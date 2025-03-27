const express = require('express');
const { shortner, redirect, clicks } = require('../controller/urlController')



const router = express.Router();
router.route("/shorten").post(shortner);
router.route("/:alias").get(redirect);
router.route("/clicks/:alias").get(clicks);

module.exports = router; 