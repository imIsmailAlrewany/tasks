const connection = require('../database/connect');
const {ObjectId} = require('mongodb');

class User {
    static all = (req, res) => {
        connection.myConnection((err, db) => {
            db.collection('blog').find().toArray((err, blogs) => {
                if (err) return res.redirect('/err404');
                res.render('all', {
                    pageTitle: 'Home page',
                    activeOne: 'active',
                    blogs
                });
            });
        });
    }
    static add = (req, res) => {
        res.render('add', {
            pageTitle: 'Add a blog',
            activeTwo: 'active'
        })
    }
    static addLogic = (req, res) => {
        let error = {};
        let hasError = false;
        if (!req.body.title) {
            hasError = true;
            error.title = 'please add blog title';
        }
        if (!req.body.content) {
            hasError = true;
            error.content = 'please add blog content';
        }
        if (hasError) return res.render('add', {
            data: req.body,
            pageTitle: 'Add a blog',
            activeTwo: 'active',
            error
        });
        connection.myConnection((err, db) => {
            if (err) return res.redirect('/err404');
            db.collection('blog').insertOne(req.body)
            .then(()=> res.redirect('/'))
            .catch(err=>res.send(err.message))
        });
    }
    static edit = (req, res) => {
        const blogId = req.params.id;
        connection.myConnection((err, db) => {
            if (err) return res.send(err.message);
            db.collection('blog').findOne({_id: new ObjectId(blogId)})
            .then ((blog) => res.render('edit', {
                pageTitle: 'Edit the blog',
                blog
            })).catch (err => res.redirect('/err404'));
        });
    }
    static editLogic = (req, res) => {
        let error = {};
        let hasError = false;
        if (!req.body.title) {
            hasError = true;
            error.title = 'please add blog title';
        }
        if (!req.body.content) {
            hasError = true;
            error.content = 'please add blog content';
        }
        if (hasError) return res.render('add', {
            data: req.body,
            pageTitle: 'Edit the blog',
            error
        });
        const blogId = req.params.id;
        connection.myConnection((err, db) => {
            if (err) return res.redirect('/err404');
            db.collection('blog').updateOne({_id: new ObjectId(blogId)}, {$set: req.body})
            .then(()=> res.redirect('/'))
            .catch(err=>res.send(err.message))
        });
    }
    static delete = (req, res) => {
        const blogId = req.params.id;
        connection.myConnection((err,db) => {
            if (err) return res.send(err.message);
            db.collection('blog').deleteOne({_id: new ObjectId(blogId)})
            .then (() => res.redirect('/'))
            .catch (err => res.redirect('/err404'))
        });
    }
    static single = (req, res) => {
        const blogId = req.params.id;
        connection.myConnection((err,db) => {
            if (err) return res.send(err.message);
            db.collection('blog').findOne({_id: new ObjectId(blogId)})
            .then ((blog) => res.render('single', {
                pageTitle: 'Show this blog',
                blog
            }))
            .catch (err => res.redirect('/err404'))
        });
    }
    static comment = (req, res) => {
        const blogId = req.params.id;
        connection.myComment((err, db) => {
            if (err) return res.redirect('/err404');
            db.collection('comment').insertOne(req.body)
            .then(()=> res.redirect(`/single/${new ObjectId(blogId)}`))
            .catch(err=>res.send(err.message))
        });
    }
    // static addComment = (req, res) => {
    //     connection.myComment((err, db) => {
    //         db.collection('comment').find().toArray((err, comments) => {
    //             if (err) return res.redirect('/err404');
    //             res.render('single', {
    //                 comments
    //             });
    //         });
    //     });
    // }
    // db.collection("blogs").updateOne({_id:new ObjectId(blogId)},{$push:{"comments":{id:Date.now(),...req.body}}})
}

module.exports = User;