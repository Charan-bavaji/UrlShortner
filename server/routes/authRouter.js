const express = require('express');
const { googleLogin } = require('../controller/authController');
const router = express.Router();

router.route('/test').get((req, res) => {
    res.send("'test pass");
})




router.get('/google', googleLogin);

module.exports = router; 