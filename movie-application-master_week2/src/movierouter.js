//import all the modules required 
const { Router } =  require('express')
const express = require('express')
const router = express.Router();
const movieController = require('./moviecontroller')

/**
 * API to get the details of all movies
 * EFFECTIVE URL: GET /api/v1/movies
 */
router.get("/", (req, res) => {
  try {
    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.getMovies((err, results) => {
      if(err){
        return res.status(400).send(err)
      }
      return res.status(200).send({STATUS:"OK",data:results})
    })
    console.log("req",req.url)
  } catch (err) {
    return res.status(500).send('Try After some Time!!')
  }
});
/**
 * API to get the details of specific movie
 * EFFECTIVE URL: GET /api/v1/movie/:movieId
 */
//
router.get("/:movieId", (req, res) => {
  try {
    //retreive moviedId from req.params
    const movieId = req.params.movieId;

    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.getMovieById(movieId, (err, results) => {
      if(err){
        return res.status(400).send(err)
      }
      return res.status(200).send({STATUS:"OK",data:results})
    });

  } catch (err) {
    return res.status(500).send('Unexpected error. Try After some Time!!')
  }
});

/**
 * API to save new movie
 * EFFECTIVE URL: POST /api/v1/movies
 */
router.post("/", (req, res) => {
  try {
    //retreive movieDetails from req.body
    const movieDetails = {
      "id":  req.body.id,
      "movieName":  req.body.movieName,
      "director": req.body.director,
      "rating":  req.body.rating,
    }
     //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.saveMovieDetails(movieDetails, (err, results) => {
      if(err){
        return res.status(400).send(err)
      }
      return res.status(201).send({STATUS:"OK",data:results})
    });

  } catch (err) {
    return res.status(500).send('Unexpected error. Try After some Time!!')
  }
});

/**
 * API to edit movie detail
 * EFFECTIVE URL: PATCH /api/v1/movies/:movieId
 */
router.patch("/:movieId", (req, res) => {
  try {
     //retreive moviedId from req.params
     const movieId = req.params.movieId;
    //retreive movieDetails from req.body
    const movieDetails =  req.body;
    //calling controller method and passing the parameters 
    //return the response as per error or result coming from controller
    movieController.updateMovieDetails(movieId, movieDetails, (err, results) => {
      if(err){
        return res.status(400).send(err)
      }
      else{
        return res.status(200).send({STATUS:"OK",data:results})
      }
    });

  } catch (err) {
    return res.status(500).send('Unexpected error. Try After some Time!!')
  }
});

/**
 * API to delete movie
 * EFFECTIVE URL: DELETE /api/v1/movies/:movieId
 */
router.delete("/:movieId", (req, res) => {
  try {
     //retreive moviedId from req.params
     const movieId = req.params.movieId;
       //calling controller method and passing the parameters 
      //return the response as per error or result coming from controller
    movieController.deleteMovieById(movieId, (err, results) => {
      if(err){
        return res.status(400).send(err)
      }
      else{
        return res.status(200).send({STATUS:"OK",data:results})
      }
    })
     

  } catch (err) {
    return res.status(500).send('Unexpected error. Try After some Time!!')
  }
});

module.exports = router;
