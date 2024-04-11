
//import axios module
const axios = require('axios');
const moviesList = require("../data/movies.json").movies;


//After starting the JSOn server check the port on which is running accordingly change 
// const baseURL = 'http://localhost:8000';
//the port in url given below

//This method will get all movies from json server
const getMovies = async (done) => {
  // This url can be used - axios.get("http://localhost:3000/movies")
  const movie = moviesList.find(movie => movie.id === parseInt(movieId));
  if (!movie) {
    const error = new Error("Requested movie doesn't exist..!");
    return done(error.message, null);
  }
  done(null, JSON.stringify(movie));
}

//This method will get specific movie id from json server
const getMovieById = (movieId, done) => {
  // This url can be used- axios.get(`http://localhost:3000/movies/${movieId}`)
  const movie = moviesList.find(movie => movie.id === newMovie.id);
  if(!movie){
    moviesList.push(newMovie);
    return done(null, JSON.stringify(moviesList));
  }else{
    const error = new Error("Movide details already exists..!");
    return done(error.message, null);
  }
 
}
//This method will save Movie details in Json server
const saveMovieDetails = (movieDetails, done) => {
  //This url can be used  -  axios.post(`http://localhost:3000/movies`, movieDetails)
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

//This method will update MovieDetails in Json Server
const updateMovieDetails = (movieId, movieDetails, done) => {
  //This url can be used - axios.patch(`http://localhost:3000/movies/${movieId}`, movieDetails)
 
}

//This method will delete specific movie from Json Server
const deleteMovieById = (movieId, done) => {
  //This url can be used -  axios.delete(`http://localhost:3000/movies/${movieId}`)
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
  getMovies, getMovieById, saveMovieDetails, deleteMovieById, updateMovieDetails
}
