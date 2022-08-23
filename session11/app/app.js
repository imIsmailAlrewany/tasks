const express = require('express');
require('./database/connection');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const userRoute = require('./routes/user.route')
const blogRoute = require('./routes/blog.route')
app.use('/user', userRoute)
app.use('/blog', blogRoute)

module.exports = app;