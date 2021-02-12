const express = require('express');
const app = express();
const genres = require('./routes/genres');

// middleware
app.use(express.json());
app.use('/api/genres', genres);

// get root - used for testing
app.get('/', (req, res) => {
    res.send('VIDLY Home Page');
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}`));