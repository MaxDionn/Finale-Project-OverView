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
const _id = parseInt(req.body._id)
await client.connect();
try {
    const dbName = ("WMT")
    const db = client.db(dbName);
    const addItem = req.body
    addItem.id = id
    //----- add a object in the collection "cart"-----//
    const addCart = await db.collection("users").insertOne(addItem)
    addCart
    ? res.status(200).json({status: 200, data: addCart})
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
    const client_id = req.params.client_id
    console.log(client_id)
    const client = new MongoClient(MONGO_URI, options);
    await client.connect();
    try {
        const dbName = ("WMT")
        const db = client.db(dbName);
        const user = await db.collection("users").findOne({ client_id: client_id })
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
}