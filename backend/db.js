// import { connect } from 'mongoose';
const mongoose = require('mongoose');
const { MongoClient, ServerApiVersion } = require('mongodb');
""
const uri = "mongodb+srv://Arman:mongodbatlas@cluster0.ybxuraw.mongodb.net/inotes?retryWrites=true&w=majority&appName=Cluster0";
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  } 
});
// const mongoURI= "mongodb://127.0.0.1:27017/inotes";

const connectToMongo=()=>{
    // mongoose.connect(mongoURI);
    mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
        console.log('Connected to MongoDB');})
    // client.connect(uri);
    console.log("chal gya bhaiya");
}
module.exports = connectToMongo;