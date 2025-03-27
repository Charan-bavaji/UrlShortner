const URL = require('../models/urlModle.js');
const shortid = require('shortid');


exports.shortner = async (req, res) => {
    const { longUrl, customAlias } = req.body;
    let alias = customAlias || nanoid(6);
    try {
        const existingUrl = await URL.findOne({ alias });
        if (existingUrl) return res.status(400).json({ error: 'Alias already taken' });

        const shortUrl = `${req.protocol}://${req.get('host')}/api/${alias}`;
        const newUrl = new URL({ longUrl, shortUrl, alias });
        await newUrl.save();
        return res.json({ shortUrl, createdAt: newUrl.createdAt });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}
exports.redirect = async (req, res) => {
    try {
        const url = await URL.findOneAndUpdate(
            { alias: req.params.alias },
            { $inc: { clicks: 1 } },
            { new: true }
        );

        if (url) {
            return res.redirect(url.longUrl);
        } else {
            return res.status(404).json({ error: 'URL not found' });
        }
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
};

exports.clicks = async (req, res) => {
    try {
        const url = await URL.findOne({ alias: req.params.alias });
        if (!url) return res.status(404).json({ error: 'URL not found' });

        return res.json({ alias: url.alias, clicks: url.clicks });
    } catch (err) {
        return res.status(500).json({ error: 'Server error' });
    }
}