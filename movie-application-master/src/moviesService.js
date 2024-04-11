// Import the axios library
const axios = require('axios')
const moviesList = require("../data/movies.json").movies;

const getMovies = (done) => {
  // get all movies
  return JSON.stringify(moviesList);
}

const getMoviesById = (movieId, done) => {
  // get movie by id
  const movie = moviesList.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    const error = new Error("Requested movie doesn't exist..!");
    return done(error.message, null);
  }
  done(null, JSON.stringify(movie));
}

const saveMovie = function (newMovie, done) {
  // save the details of a movie read from the request body
  const movie = moviesList.find(movie => movie.id === newMovie.id);
  if(!movie){
    moviesList.push(newMovie);
    return done(null, JSON.stringify(moviesList));
  }else{
    const error = new Error("Movide details already exists..!");
    return done(error.message, null);
  }
}

const updateMovie = function (movieId, updateData, done) {
 // update movie details of a specific movie
 const newMovieListArray = [...moviesList];
 const index = newMovieListArray.findIndex(movie => movie.id == movieId);
 if (index !== -1) {
  newMovieListArray[index] = { ...newMovieListArray[index], ...updateData };
   done(null, JSON.stringify(newMovieListArray));
 }else{
   const error = new Error("Requested movie doesn't exist..!");
   return done(error.message, null);
 }
}

const deleteMovieById = function (movieId, done) {
  // delete a specific movie 
  const movieIndex = productsList.findIndex(movie => movie.id === parseInt(movieId));
  if (movieIndex === -1) {
      const error = new Error("Requested movie doesn't exist..!");
      return done(error.message, null);
  }else{
    moviesList.splice(movieIndex, 1);
    done(null, JSON.stringify(moviesList));
  }
}



module.exports = {
  getMovies,
  getMoviesById,
  saveMovie,
  updateMovie,
  deleteMovieById
}
