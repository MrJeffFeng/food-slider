module.exports = (app) => {
    const foods = require('../controllers/food.controller.js');

    // Retrieve all Foods
    app.get('/api/v1/foods', foods.findAll);
}
