require("dotenv").config();

const {API_key}= process.env

let start_url = "https://api.themoviedb.org/3";

const request = require("request-promise")

//--- endpoint to GET popular movies ---//

const getMoviePopular = async(req, res)=>{
    let goodUrl = start_url + "/movie/popular" + API_key;
try{
    const popular = await request(goodUrl)
//  const popular = JSON.parse(data)
    res.status(200).send(popular)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET a movie by Id ---//

const getMovieById = async(req, res)=>{
        const id = Number(req.params.id)
        let movieById = start_url + `/movie/${id}` + API_key;
    try{
        const movieId = await request(movieById)
        res.status(200).send(movieId)
    
    }catch(err){
        console.log(err)
        res.status(400).json({status: 400 , message: err})
    }
    }

    //--- endpoint to GET the credits of a movie by Id ---//

const getCreditMovieById = async(req, res)=>{
    const id = Number(req.params.id)
    let movieById = start_url + `/movie/${id}/credits` + API_key;
try{
    const movieId = await request(movieById)
    res.status(200).send(movieId)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

    //--- endpoint to GET similar movies by Id ---//

    const getSimilarMovieById = async(req, res)=>{
        const id = Number(req.params.id)
        let movieById = start_url + `/movie/${id}/similar` + API_key;
    try{
        const movieId = await request(movieById)
        res.status(200).send(movieId)
    
    }catch(err){
        console.log(err)
        res.status(400).json({status: 400 , message: err})
    }
    }



module.exports={
    getMoviePopular,
    getMovieById,
    getCreditMovieById,
    getSimilarMovieById,
}