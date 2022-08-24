const jwt = require('jsonwebtoken');
const customerModel = require('../database/models/customer.model');

const auth = async (req, res, next) =>{
    try {
        const token = req.header('Authorization');
        const decoded = jwt.verify(token, process.env.JWTKEY);
        const customer = await customerModel.findOne({_id: decoded._id, 'tokens.token':token});
        if(!customer) throw new Error('unauth');
        req.customer = customer;
        req.token = token;
        next ();
    } catch (err) {
        res.send ({data:err, message: err.message});
    }
}

module.exports = auth;