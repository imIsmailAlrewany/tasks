const blogModel = require('../database/models/blog.model');

class Blog {
    static index = async(req, res) => {
        try {
            const data = await blogModel.find();
            res.send({apiStatus: true, message: 'all blogs fetched', data: data});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static add = async(req, res) => {
        try {
            const blogData = new blogModel(req.body);
            await blogData.save();
            res.send({ apiStatus: true, message: 'blog added', data: blogData })
        } catch (err) {
            res.send({ apiStatus: false, message: err.message, data: err })
        }
    }
    static single = async(req, res) => {
        try {
            const blogData = await blogModel.findById(req.params.id);
            res.send({apiStatus: true, message: 'blog fetched', data: blogData});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delete = async(req, res) => {
        try {
            await blogModel.findByIdAndDelete(req.params.id);
            res.send({apiStatus: true, message: 'blog deleted'});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static edit = async(req, res) => {
        try {
            const blogData = await blogModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
            const data = await req.body;
            res.send({apiStatus: true, message: 'blog Updated', data});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
}

module.exports = Blog;