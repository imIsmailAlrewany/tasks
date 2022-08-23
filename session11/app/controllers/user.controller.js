const userModel = require('../database/models/user.model');
// const {ObjectId} = require('mongodb')

class User {
    static index = async(req, res) => {
        try {
            const data = await userModel.find();
            res.send({apiStatus: true, message: 'all users fetched', data: data});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static create = async(req, res) => {
        try {
            const userData = new userModel(req.body);
            await userData.save();
            res.send({ apiStatus: true, message: 'user registered', data: userData })
        } catch (err) {
            res.send({ apiStatus: false, message: err.message, data: err })
        }
    }
    static single = async(req, res) => {
        try {
            const userData = await userModel.findById(req.params.id);
            res.send({apiStatus: true, message: 'user fetched', data: userData});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static delete = async(req, res) => {
        try {
            // const userId = req.params.id;
            // await userModel.deleteOne({_id: new ObjectId(userId)});
            await userModel.findByIdAndDelete(req.params.id);
            res.send({apiStatus: true, message: 'user deleted'});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
    static edit = async(req, res) => {
        try {
            const userData = await userModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
            res.send({apiStatus: true, message: 'user Updated', data: userData});
        } catch (err) {
            res.send({apiStatus: false, message: err.message, data: err});
        }
    }
}

module.exports = User;