const express = require('express');
const app = express();

const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = 3000;

const petRoute = require('./controllers/routes/pet.route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));

app.get('/', ((req, res) => {
    res.json({
        message: 'Welcome!'
    })
}));

app.get('/pets', ((req, res) => {
    petRoute.getPets(req, res);
}));


app.post('/pets', ((req, res) => {
    petRoute.postPet(req, res);
}));

app.get('/pets/:id', (req, res) => {
    petRoute.getPet(req, res);
});

app.put('/pets/:id', (req, res) => {
    petRoute.updatePet(req, res);
});

app.delete('/pets/:id', (req, res) => {
    petRoute.deletePet(req, res);
})

app.listen(port, () => {
    console.log('Connect to ', port);
})

module.exports = app;



