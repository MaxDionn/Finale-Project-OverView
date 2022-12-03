
require("dotenv").config();

const {API_key_x}= process.env

let start_url = "https://api.themoviedb.org/3";

const request = require("request-promise")

//--- endpoint to GET everything ---//

const getSearch = async(req, res)=>{
    const query = req.query.name
    let goodUrl = start_url + "/search/multi" + API_key_x + "&query=" + query;
try{
    const allOfIt = await request(goodUrl)
    res.status(200).send(allOfIt)
}catch(err){
    res.status(400).json({status: 400 , message: err})
}
}

module.exports={
    getSearch,
}
