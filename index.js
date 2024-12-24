const express = require('express');
const app = express();
const PORT = 3000;

// Middleware to parse JSON
app.use(express.json());

// In-memory movie data (mock database)
let movies = [
  { id: 1, title: 'Inception', director: 'Christopher Nolan', year: 2010 },
  { id: 2, title: 'The Matrix', director: 'The Wachowskis', year: 1999 },
  { id: 3, title: 'Interstellar', director: 'Christopher Nolan', year: 2014 }
];

// GET: Fetch all movies
app.get('/movies', (req, res) => {
  res.json(movies);
});

// GET: Fetch a movie by ID
app.get('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');
  res.json(movie);
});

// POST: Add a new movie
app.post('/movies', (req, res) => {
  const { title, director, year } = req.body;
  if (!title || !director || !year) return res.status(400).send('Missing fields');

  const newMovie = {
    id: movies.length + 1,
    title,
    director,
    year
  };
  movies.push(newMovie);
  res.status(201).json(newMovie);
});

// PUT: Update a movie by ID
app.put('/movies/:id', (req, res) => {
  const movie = movies.find(m => m.id === parseInt(req.params.id));
  if (!movie) return res.status(404).send('Movie not found');

  const { title, director, year } = req.body;
  if (title) movie.title = title;
  if (director) movie.director = director;
  if (year) movie.year = year;

  res.json(movie);
});

// DELETE: Remove a movie by ID
app.delete('/movies/:id', (req, res) => {
  const movieIndex = movies.findIndex(m => m.id === parseInt(req.params.id));
  if (movieIndex === -1) return res.status(404).send('Movie not found');

  const deletedMovie = movies.splice(movieIndex, 1);
  res.json(deletedMovie);
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});