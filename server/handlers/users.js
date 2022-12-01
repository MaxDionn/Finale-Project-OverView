const { MongoClient, ObjectId } = require("mongodb");
require("dotenv").config();
const { MONGO_URI } = process.env;
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
const { v4: uuidv4 } = require("uuid");

// -- function to POST new users to the db -- // 

const addUserInfo = async (req, res) => {
    const client = new MongoClient(MONGO_URI, options);
const id = uuidv4();
await client.connect();
try {
    const dbName = ("WMT")
    const db = client.db(dbName);
    const addItem = req.body
    addItem.id = id
    //----- add a object in the collection "users"-----//
    
    const addUser = await db.collection("users").insertOne(addItem)
    addUser
    ? res.status(200).json({status: 200, data: addUser})
    : res.status(404).json({status: 404, message: "error"})

}
catch (err) {
    return res.status(500).json({ status: 500, message: err.message });
} 
client.close();
}

//--- endpoint to GET all user ---//

const getUser = async(req, res)=>{
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("WMT")
        const db = client.db(dbName);
        const user = await db.collection("users").find().toArray()
        if (!user){
            res.status(404).json({ status: 404, message: "invalid search"})
        } 
        else {
            res.status(200).json({ status: 200, data: user})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint to GET a user by Id ---//

const getUserById = async(req, res)=>{
    const id = req.params.id
    
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("WMT")
        const db = client.db(dbName);
        const user = await db.collection("users").findOne({ id: id })
        if (!user){
            res.status(404).json({ status: 404, message: "invalid search"})
        } 
        else {
            res.status(200).json({ status: 200, data: user})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint to GET a user by Id ---//

const addFavById = async(req, res)=>{
    const id = req.params.id
    
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("WMT")
        const db = client.db(dbName);
        const addItem = req.body
        const query = {id: id}
        const user = await db.collection("users").findOne({ id: id })
        if(!user){
            const addFav = await db.collection("users").insertOne({id: id, movieId: [addItem.id]})
            res.status(200).json({ status: 200, data: addFav})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$push:{ movieId:addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

const getMovFav = async(req, res)=>{
    const id = req.params.id
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("WMT")
        const db = client.db(dbName);
        const user = await db.collection("users").findOne({ id: id })
        if (!user){
            res.status(404).json({ status: 404, message: "invalid search"})
        } 
        else {
            res.status(200).json({ status: 200, data: user})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

module.exports = {
    addUserInfo,
    getUserById,
    getUser,
    addFavById,
    getMovFav,
}