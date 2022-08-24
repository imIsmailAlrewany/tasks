const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');


const customerSchema = mongoose.Schema({
    name: {
        type: String, required: true, trim: true
    },
    userName: {
        type: String, required: true, trim: true
    },
    password: {
        type: String, required: true, trim: true
    },
    balance: {
        type: Number, required: true
    },
    address: [
        {type: {type: String, trim: true}, details: {type: String, trim: true}}
    ],
    tokens: [
        {token: {type: String, required: true}}
    ]
}, {timestamps: true});

customerSchema.methods.toJSON = function() {
    const deleted = ['__v', 'password', 'tokens'];
    const customerData = this.toObject();
    deleted.forEach(d => delete customerData[d]);
    return customerData;
}

customerSchema.pre('save', async function () {
    if (this.isModified('password'))
    this.password = await bcryptjs.hash(this.password, 10);
});

customerSchema.statics.login = async (userName, password) => {
    const customerData = await Customer.findOne({userName});
    if(!customerData) throw new Error('invalid email');
    const matched = await bcryptjs.compare(password, customerData.password);
    if(!matched) throw new Error('invalid password');
    return customerData;
};

customerSchema.methods.generateToken = async function() {
    const token = jwt.sign({_id:this._id}, process.env.JWTKEY);
    this.tokens = this.tokens.concat({token});
    await this.save();
    return token;
};

const Customer = mongoose.model('Customer', customerSchema);
module.exports = Customer;