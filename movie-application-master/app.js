// Import the required dependencies
const http = require('http')
const moviesService = require('./src/moviesService');
const getRequestData = require('./src/utils');


// Define the port at which the application will run
const PORT = process.env.PORT || 5000

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies

  if(req.url === '/api/movies' && req.method === 'GET'){
    res.writeHead(200,{
      'content-type': 'application/json'  
    })
    let movies = moviesService.getMovies()
    res.end(movies);
  }

  // Get a movie with specified id

  else  if(req.url.match (/\/api\/movies\/([0-9]+)/) && req.method === 'GET'){
    id = req.url.split("/")[3];
    moviesService.getMoviesById(id, (error, movie) => {
      if (error) {
        res.writeHead(404, {'Content-Type': 'application/json'});
        res.end();
      } else {
        // Handle movie retrieval
        res.end(movie);
      }
    });
  }

  // Save movie details

  else if (req.url === '/api/movies' && req.method === 'POST') {
    try {
      const movie_body = await getRequestData(req); 
      const savedMovieId = await new Promise((resolve, reject) => {
        moviesService.saveMovie(movie_body, (error, savedMovieId) => {
          if (error) {
            reject(error);
          } else {
            resolve(savedMovieId); 
          }
        });
      });
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ id: savedMovieId }));
    } catch (error) {
      console.error('Error saving movie:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error saving Movie' }));
    }
  }  

  // Update a specific movie

  else  if(req.url.match (/\/api\/movies\/([0-9]+)/) && req.method === 'PUT'){
    try {
    const id = req.url.split("/")[3];
    const movie_body = await getRequestData(req); 
      const updateMovie = await new Promise((resolve, reject) => {
        moviesService.updateMovie(id,movie_body, (error, updateMovie) => {
          if (error) {
            reject(error);
          } else {
            resolve(updateMovie); 
          }
        });
      });
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(updateMovie));

    } catch (error) {
      console.error('Error saving movie:', error);
      res.writeHead(500, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'Error saving movie' }));
    }
  }


  // Delete a specific movie

  else  if(req.url.match (/\/api\/products\/([0-9]+)/) && req.method === 'DELETE'){
    try {
      const id = req.url.split("/")[3];
        const deleteMovie = await new Promise((resolve, reject) => {
          moviesService.deleteMovieById(id, (error, deleteMovie) => {
            if (error) {
              reject(error);
            } else {
              resolve(deleteMovie); 
            }
          });
        });
        res.writeHead(201, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(deleteMovie));
  
      } catch (error) {
        console.error('Error saving movie:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Error saving movie' }));
      }
  }

  // If no route present capture in the else part
  else{
    try {
      console.error('Requested URL not Found', error);
      res.writeHead(400, { 'Content-Type': 'application/json' });
      } catch (error) {
        console.error('Error saving movie:', error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
      }
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
