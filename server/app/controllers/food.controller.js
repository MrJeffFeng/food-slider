const Food = require('../models/food.model.js');

exports.findAll = (req, res) => {
    Food.find()
    .then(foods => {
        res.send(foods);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving foods."
        });
    });
};
