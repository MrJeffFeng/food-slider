module.exports = (app) => {
    const foods = require('../controllers/food.controller.js');

    // Create a new Food
    app.post('/api/v1/foods', foods.create);

    // Retrieve all Foods
    app.get('/api/v1/foods', foods.findAll);
}
