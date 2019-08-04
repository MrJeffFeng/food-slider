const express = require('express');

const app = express();

const PORT = 3000;

let users = {
    1: {
        id: '1',
        username: 'Jeff',
        favorites: []
    },
    2: {
        id: '2',
        username: 'Dexin',
        favorites: []
    }
}


// Users API
app.get('/api/v1/users', (req, res) => {
    return res.status(200).send({
        success: 'true',
        users:Object.values(users)
    })
});

app.get('/api/v1/users/:userId', (req, res) => {
    return res.send(users[req.params.userId]);
});

app.post('/api/v1/users/:userId', (req, res) => {
    return res.send(`Post a liked food to user/${req.params.userId}'s list`)
});

// Foods API
app.get('/api/v1/foods', (req, res) => {
    return res.send('Return a list of foods');
})

app.listen(PORT, () =>
  console.log(`Example app listening on port ${PORT}!`),
);
