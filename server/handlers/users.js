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

//--- endpoint to GET favorite fo user by Id ---//

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

//--- endpoint add a favorite movie to the user ---//

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

//--- endpoint add a favorite ACTOR to the user ---//

const addActorFavById = async(req, res)=>{
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
            const addFav = await db.collection("users").insertOne({id: id, actorId: [addItem.id]})
            res.status(200).json({ status: 200, data: addFav})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$push:{ actorId:addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint add a favorite TvShow to the user ---//

const addTvShowFavById = async(req, res)=>{
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
            const addFav = await db.collection("users").insertOne({id: id, tvShowId: [addItem.id]})
            res.status(200).json({ status: 200, data: addFav})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$push:{ tvShowId:addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint to delete a favorite movie from user by Id ---//

const deleteFavById = async(req, res)=>{
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
            res.status(400).json({ status: 400, message: "did not find the user"})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$pull:{movieId: addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint to delete a favorite actor from user by Id ---//

const deleteActorFavById = async(req, res)=>{
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
            res.status(400).json({ status: 400, message: "did not find the user"})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$pull:{actorId: addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
        }
    }
    catch (err) {
        return res.status(500).json({ status: 500, message: err.message });
    } 
    client.close();
}

//--- endpoint to delete a favorite actor from user by Id ---//

const deleteTvShowFavById = async(req, res)=>{
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
            res.status(400).json({ status: 400, message: "did not find the user"})
        }else{
            const updFav = await db.collection("users").updateOne(query, {$pull:{tvShowId: addItem.id}})
            res.status(200).json({ status: 200, data: updFav})
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
    getMovFav,
    addFavById,
    addActorFavById,
    addTvShowFavById,
    deleteFavById,
    deleteActorFavById,
    deleteTvShowFavById,
}