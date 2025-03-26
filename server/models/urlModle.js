const mongoose = require('mongoose');

const UrlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    createdAt: { type: Date, default: Date.now }
})

module.exports = mongoose.model('Url', UrlSchema);