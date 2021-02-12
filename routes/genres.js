const Joi = require('Joi');
const express = require('express');
const routes = express.Router();

// Data
// data storage
const genres = [
    {id: 1, name: 'Horror'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Drama'},
    {id: 4, name: 'Comedy'},
    {id: 5, name: 'Fiction'}
];

// GET /api/genres/
routes.get('/', (req, res) => {
    // return the list of genres.
    res.send(genres);
});

// POST /api/genres/
routes.post('/', (req, res) => {
    
    // validation.
    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const genre = {
        id: genres.length + 1,
        name: req.body.name
    };

    genres.push(genre);
    res.send(genre);

});

// PUT /api/genres
routes.put('/:id', (req, res) => {

    // search for the given genre.
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The given genre ID was not found.');

    const { error } = validateGenre(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // update
    genre.name = req.body.name;
    res.send(genre);
});

// DELETE /api/genre
routes.delete('/:id', (req, res) => {

    // search
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The given genre ID was not found.');

    // delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

    res.send(genre);
});

// GET /api/genres/
routes.get('/:id', (req, res) => {
   
    // search for the given genre.
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The given genre ID was not found.');

    // return the genre.
    res.send(genre);
}); 

// Validation logic.
function validateGenre(genre) {
 
    // schema definition.
    const schema = {
        name: Joi.string().min(3).required()
    };

    // validate
    return Joi.validate(genre, schema);
}

module.exports = routes;