require("dotenv").config();

const {API_key}= process.env

let start_url = "https://api.themoviedb.org/3";

const request = require("request-promise")

//--- endpoint to GET all the Providers ---//

const getProviders = async(req, res)=>{
    let goodUrl = start_url + "/watch/providers/tv" + API_key;

try{
    const providers = await request(goodUrl)
    res.status(200).send(providers)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

//--- endpoint to GET a provider by Id ---//

const getProvidersById = async(req, res)=>{
    let providerById = start_url + `/providers/tv` + API_key;
try{
    const providerId = await request(providerById)
    res.status(200).send(providerId)

}catch(err){
    console.log(err)
    res.status(400).json({status: 400 , message: err})
}
}

module.exports={
    getProviders,
    getProvidersById,
}