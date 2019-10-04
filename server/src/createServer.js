const express = require('express');

const { addRoutes } = require('./routes/addRoutes.js');

const app = express()

module.exports.createServer = () => addRoutes(app);
