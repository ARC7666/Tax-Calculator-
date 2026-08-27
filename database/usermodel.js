const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type : String,
        required : true,
        unique : true
    },
    mobile: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    },
    password: {
        type: String,
        required: false
    },
    googleId: {
        type: String,
        required: false,
        unique: true,
        sparse: true
    }
},
{
    timestamps: true
});

const users = mongoose.model('user', userSchema);

module.exports = users;
