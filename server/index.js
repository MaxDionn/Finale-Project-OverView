const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const port = 3000;

//-- all endpoints for users -- //
const { 
    addUserInfo,
    getUserById,
    getUser,
    getMovFav,
    addFavById,
    addActorFavById,
    addTvShowFavById,
    deleteFavById,
    deleteActorFavById,
    deleteTvShowFavById,
} = require("./handlers/users");

//-- all endpoints for actors -- //
    const { 
        getActors,
        getActorsById,
        getActorsByIdMovCred,
    } = require("./handlers/actors");

//-- all endpoints for different kind of genres -- //
    const {
        getMoods,
        getTvMoods,
    } = require("./handlers/moods");

//-- all endpoints for movies -- //
    const {
        getMoviePopular,
        getMovieTopRated,
        getMovielatest,
        getMovieUpcoming,
        getMovieNowPlaying,
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
        getTvLatest,
        getTvTopRated,
        getTvCreditById,
        getSimilarTvById,
    } = require("./handlers/tv");

//-- endpoint for SearchBar--//
    const {
        getSearch,
    }=require("./handlers/searchBar")

express()

    .use(express.json())
    .use(helmet())
    .use(morgan('tiny'))


          ////////////////////
         // REST endpoints //
        ////////////////////

    //-- all REST for Users -- //
    .post("/add-userInfos", addUserInfo)
    .get("/get-user/:id", getUserById)
    .get("/get-user", getUser)
    .get("/get-movfav/:id", getMovFav)
    .post("/add-favorite/:id", addFavById)
    .post("/add-actorFavorite/:id", addActorFavById)
    .post("/add-tvShowFavorite/:id", addTvShowFavById)
    .delete("/delete-favorite/:id", deleteFavById)
    .delete("/delete-actorFavorite/:id", deleteActorFavById)
    .delete("/delete-tvShowFavorite/:id", deleteTvShowFavById)

    //-- all REST for actors -- //
    .get("/get-actors" , getActors)
    .get("/get-actorById/:id", getActorsById)
    .get("/get-actorById/:id/movie_credits", getActorsByIdMovCred)

    //-- all REST for different kind of Genres -- //
    .get("/get-moods", getMoods)
    .get("/get-Tvmoods", getTvMoods)

    //-- all REST for movies -- //
    .get("/get-movie-popular" , getMoviePopular)
    .get("/get-movie-topRated" , getMovieTopRated)
    .get("/get-movie-latest" , getMovielatest)
    .get("/get-movie-upcoming" , getMovieUpcoming)
    .get("/get-movie-nowPlaying" , getMovieNowPlaying)
    .get("/get-movieById/:id", getMovieById)
    .get("/get-movieById/:id/credits", getCreditMovieById)
    .get("/get-movieById/:id/similar", getSimilarMovieById)

    //-- all REST for providers -- //
    .get("/get-providers", getProviders)
    .get("/get-network/:id", getProvidersById)
    
    //-- all REST for tv-shows -- //
    .get("/get-tv-popular" , getTvPopular)
    .get("/get-tv-topRated" , getTvTopRated)
    .get("/get-tv-latest" , getTvLatest)
    .get("/get-tvById/:id", getTvById)
    .get("/get-tvById/:id/aggregate_credits", getTvCreditById)
    .get("/get-tvById/:id/similar", getSimilarTvById)

    //-- REST for searchBar --//
    .get("/get-searchBar", getSearch)

    .listen(port, () => {
        console.log(`Example app listening on port ${port}`)
    });