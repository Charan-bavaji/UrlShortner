require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');


const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log("MongoDB is connected"))
    .catch(e => console.error(e));


const Urls = require('./routes/urlRouter');
app.use("/api/v1", Urls);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));