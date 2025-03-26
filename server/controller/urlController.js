const Url = require('../models/urlModle.js');
const shortid = require('shortid');


exports.shortner = async (req, res) => {
    const { originalUrl } = req.body;

    if (!originalUrl) {
        return res.status(400).json({ error: "invalid URL" });
    }

    try {
        const shortUrl = shortid.generate();
        const newUrl = new Url({ originalUrl, shortUrl });
        await newUrl.save();
        res.json({ shortUrl, originalUrl });
    } catch (error) {
        res.status(500).json({ error: "server error" });
    }
};