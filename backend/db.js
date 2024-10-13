// import { connect } from 'mongoose';
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const uri = process.env.MONGO_URI;
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  } 
});
const connectToMongo=()=>{
    // mongoose.connect(mongoURI);
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to MongoDB');})
    // client.connect(uri);
    console.log("chal gya bhaiya");
}
module.exports = connectToMongo;