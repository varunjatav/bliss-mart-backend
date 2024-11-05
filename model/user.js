const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    mobileNumber: { type: Number, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], default: 'user' }
});

module.exports = mongoose.model('User',userSchema);