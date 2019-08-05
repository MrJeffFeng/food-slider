module.exports = (app) => {
    const users = require('../controllers/user.controller.js');

    // Create a new Note
    app.post('/api/v1/users', users.create);

    // Retrieve all Users
    app.get('/api/v1/users', users.findAll);

    // Retrieve a single Note with userId
    app.get('/api/v1/users/:userId', users.findOne);

    // Update a User with userId
    app.put('/api/v1/users/:userId', users.addFavorite);
}
