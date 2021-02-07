const Joi = require('joi');
const express = require('express');
const app = express();

// middleware
app.use(express.json());

// data storage
const genres = [
    {id: 1, name: 'Horror'},
    {id: 2, name: 'Action'},
    {id: 3, name: 'Drama'},
    {id: 4, name: 'Comedy'},
    {id: 5, name: 'Fiction'}
];

// get root - used for testing
app.get('/', (req, res) => {
    res.send('VIDLY Home Page');
});

// GET /api/genres/
app.get('/api/genres', (req, res) => {
    // return the list of genres.
    res.send(genres);
});

// GET /api/genres/
app.get('/api/genres/:id', (req, res) => {
   
    // search for the given genre.
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The given genre ID was not found.');

    // return the genre.
    res.send(genre);
}); 

// POST /api/genres/
app.post('/api/genres', (req, res) => {
    
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
app.put('/api/genres/:id', (req, res) => {

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
app.delete('/api/genres/:id', (req, res) => {

    // search
    const genre = genres.find(x => x.id === parseInt(req.params.id));
    if (!genre) return res.status(404).send('The given genre ID was not found.');

    // delete
    const index = genres.indexOf(genre);
    genres.splice(index, 1);

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

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));