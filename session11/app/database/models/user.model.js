const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true, unique: true },
    age: { type: Number, min: 21, max: 60, default: 21 },
    password: { type: String, required: true, trim: true, },
    status: { type: Boolean, default: false }
}, {timeStamps: true}); //time of creation and updates...without feeding it

const User = mongoose.model('User', userSchema);
module.exports = User;