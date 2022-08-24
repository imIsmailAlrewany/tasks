const express = require('express');
require('./database/connection');
const customerRoute = require('./routes/customer.route');

const app = express ();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use('/api', customerRoute);

module.exports = app;