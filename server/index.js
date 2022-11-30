const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 3000;

//-- all endpoints for users -- //
const { 
    addUserInfo,
    getUserById,
    getUser,
} = require("./handlers/users");

//-- all endpoints for actors -- //
    const { 
        getActors,
        getActorsById,
        getActorsByIdMovCred,
    } = require("./handlers/actors");

//-- all endpoints for different collections of movies -- //
    const {
    } = require("./handlers/collections");

//-- all endpoints for different kind of genres -- //
    const {
        getMoods,
        getMoodsById,
    } = require("./handlers/moods");

//-- all endpoints for movies -- //
    const {
        getMoviePopular,
        getMovieById,
        getCreditMovieById,
        getSimilarMovieById,
    } = require("./handlers/movies");

//-- all endpoints for studios -- //
    const {
        getProviders,
        getProvidersById,
    } = require("./handlers/providers");

//-- all endpoints for tv shows -- //
    const {
        getTvPopular,
        getTvById,
    } = require("./handlers/tv");

express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))


          ////////////////////
         // REST endpoints //
        ////////////////////

    //-- all REST for Users -- //
    .post("/add-userInfos", addUserInfo)
    .get("/get-user/:client_id", getUserById)
    .get("/get-user", getUser)

    //-- all REST for actors -- //
    .get("/get-actors" , getActors)
    .get("/get-actorById/:id", getActorsById)
    .get("/get-actorById/:id/movie_credits", getActorsByIdMovCred)

    //-- all REST for different kind of Moods -- //
    .get("/get-moods", getMoods)
    .get("/get-moods/:id", getMoodsById)

    //-- all REST for movies -- //
    .get("/get-movie-popular" , getMoviePopular)
    .get("/get-movieById/:id", getMovieById)
    .get("/get-movieById/:id/credits", getCreditMovieById)
    .get("/get-movieById/:id/similar", getSimilarMovieById)

    //-- all REST for providers -- //
    .get("/get-providers", getProviders)
    .get("/get-providersById/:id", getProvidersById)
    
    //-- all REST for tv shows -- //
    .get("/get-tv-popular" , getTvPopular)
    .get("/get-tvById/:id", getTvById)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });