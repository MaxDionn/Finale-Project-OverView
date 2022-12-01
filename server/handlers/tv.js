require("dotenv").config();

const {API_key}= process.env

let start_url = "https://api.themoviedb.org/3";


const request = require("request-promise")

//--- endpoint to GET popular Tv Shows ---//

const getTvPopular = async(req, res)=>{
    let goodUrl = start_url + "/tv/popular" + API_key;
try{
    const popular = await request(goodUrl)
    res.status(200).send(popular)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET topRated Tv Shows ---//

const getTvTopRated = async(req, res)=>{
    let goodUrl = start_url + "/tv/top_rated" + API_key;
try{
    const topRated = await request(goodUrl)
    res.status(200).send(topRated)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET Latest Tv Shows ---//

const getTvLatest = async(req, res)=>{
    let goodUrl = start_url + "/tv/latest" + API_key;
try{
    const latest = await request(goodUrl)
    res.status(200).send(latest)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET a Tv Shows by Id ---//

const getTvById = async(req, res)=>{
        const id = Number(req.params.id)
        let tvById = start_url +`/tv/${id}` + API_key;
    try{
        const tvId = await request(tvById)
    //  const popular = JSON.parse(data)
        res.status(200).send(tvId)
    
    }catch(err){
        res.status(400).json({status: 400 , message: err})
    }
    }

//--- endpoint to GET one specified movie ---//


module.exports={
    getTvPopular,
    getTvById,
    getTvTopRated,
    getTvLatest,
}