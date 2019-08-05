const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json())

const PORT = 3000;


const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
	useNewUrlParser: true
}).then(() => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

require('./app/routes/user.routes.js')(app);
require('./app/routes/food.routes.js')(app);

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
