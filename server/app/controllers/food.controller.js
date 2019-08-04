const Food = require('../models/food.model.js');

exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "Food content can not be empty"
        });
    }

    // Create a Food
    const food = new Food({
        name: req.body.name
    });

    // Save Food in the database
    food.save()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Food."
        });
    });
};

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
