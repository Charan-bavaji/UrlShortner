const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    longUrl: String,
    shortUrl: String,
    alias: { type: String, unique: true },
    clicks: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
})

module.exports = mongoose.model('Url', UrlSchema);