const mongoose = require('mongoose')

const FoodSchema = mongoose.Schema({
    name: String
}, {
    timestamps: true
});

module.exports = mongoose.model('Food', FoodSchema);
