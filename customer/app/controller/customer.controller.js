const customerModel = require('../database/models/customer.model');

class Customer {
    static register = async (req, res)=> {
        try {
            const data = new customerModel(req.body);
            await data.save();
            res.send({ message: 'user registered', data })
        } catch (err) {
            res.send({ message: err.message, err })
        }
    }
    static login = async (req, res)=> {
        try {
            const customerData = await customerModel.login(req.body.userName, req.body.password);
            const token =await customerData.generateToken();
            res.send({message: 'logged in', data: {customerData, token}});
        } catch (err) {
            res.send({message: err.message, data: err});
        }
    }
    static edit = async (req, res)=> {
        try {
            await customerModel.findByIdAndUpdate(req.params.id, req.body, {runValidators: true});
            res.send({message: 'data Updated'});
        } catch (err) {
            res.send({message: err.message, data: err});
        }
    }
    static profile = async (req, res)=> {
        try {
            const customerData = await customerModel.findById(req.params.id);
            res.send({message: 'your Profile', data: customerData});
        } catch (err) {
            res.send({message: err.message, data: err});
        }
    }
    static logout = async (req, res)=> {
        try {
            const customerData = await customerModel.findById(req.params.id);
            const token = customerData.tokens.find(token => token);
            res.send({message: 'you\' logged out'});
        } catch (err) {
            res.send({message: err.message, data: err});
        }
    }
}

module.exports = Customer;