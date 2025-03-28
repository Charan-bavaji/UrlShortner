const { oauth2client } = require('../utils/googleConfig.js');
const UserModel = require("../models/userModle.js");
const axios = require('axios');
const jwt = require('jsonwebtoken');
const googleLogin = async (req, res) => {
    try {

        const { code } = req.query;
        const googleRes = await oauth2client.getToken(code);
        oauth2client.setCredentials(googleRes.tokens);

        const userRes = await axios.get(`https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`)
        const { email, name, picture } = userRes.data;
        let user = await UserModel.findOne({ email });

        if (!user) {
            user = await UserModel.create({
                name, email
            })
        }
        const { _id } = user;
        const token = jwt.sign({ _id, email },
            process.env.JWT_SECRET,
            {
                expiresIn: process.env.JWT_TIMEOUT
            });
        return res.status(200).json({
            message: "Success",
            token,
            user
        })

    } catch (error) {
        res.status(500).json({
            message: "internal server error"
        })
    }
}

module.exports = {
    googleLogin
}