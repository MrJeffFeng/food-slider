const mongoose = require('mongoose')

const UserSchema = mongoose.Schema({
    username: String,
    favorites: Array
}, {
    timestamps: true
});

module.exports = mongoose.model('User', UserSchema);
