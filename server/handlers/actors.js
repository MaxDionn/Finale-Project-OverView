require("dotenv").config();

const {API_key}= process.env

let start_url = "https://api.themoviedb.org/3";

const request = require("request-promise")

//--- endpoint to GET popular actors ---//

const getActors = async(req, res)=>{
    let goodUrl = start_url + "/person/popular" + API_key;
try{
    const popular = await request(goodUrl)
    res.status(200).send(popular)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET a specified actor ---//

const getActorsById = async(req, res)=>{
    const id = Number(req.params.id)
    let goodUrl = start_url + `/person/${id}` + API_key;
try{
    const actorById = await request(goodUrl)
    res.status(200).send(actorById)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

module.exports={
    getActors,
    getActorsById,
}