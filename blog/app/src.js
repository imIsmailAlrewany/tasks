const express = require('express');
const path = require('path');
const hbs = require('hbs');
const userRoutes = require('../route/user.route');

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, '../public/static')));
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '../public/views'));
hbs.registerPartials(path.join(__dirname, '../public/layouts'));
app.use(userRoutes);


app.all('*', (req, res) => {
    res.render('err404', {
        pageTitle: 'Error page',
        pageContent: 'Error 404 page not found!'
    })
});

module.exports = app;