require("dotenv").config();

const {API_key}= process.env


let start_url = "https://api.themoviedb.org/3";

const request = require("request-promise")

//--- endpoint to GET the Movie moods ---//

const getMoods = async(req, res)=>{
    let goodUrl = start_url + "/genre/movie/list" + API_key;
try{
    const mood = await request(goodUrl)
//  const popular = JSON.parse(data)
    res.status(200).send(mood)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET the TV moods ---//

const getTvMoods = async(req, res)=>{
    let goodUrl = start_url + "/genre/tv/list" + API_key;
try{
    const tvMood = await request(goodUrl)
//  const popular = JSON.parse(data)
    res.status(200).send(tvMood)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET the mood by Id  ---//

const getMoodsById = async(req, res)=>{
    const {id} = req.params.id;
    let goodUrl = start_url + `/genre/${id}` + API_key;
try{
    const moodById = await request(goodUrl)
    res.status(200).send(moodById)

}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

module.exports={
    getMoods,
    getMoodsById,
    getTvMoods,
}