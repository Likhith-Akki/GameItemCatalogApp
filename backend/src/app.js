const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

//health route
app.get('/',(req, res)=>{
res.send("GameItemCatalogApp API is running");
});

module.exports = app;