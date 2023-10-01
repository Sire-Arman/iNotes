const mongoose = require('mongoose');
const mongoURI= "mongodb://127.0.0.1:27017/inotes";

const connectToMongo=()=>{
    mongoose.connect(mongoURI);
    console.log("chal gya bhaiya");
}
module.exports = connectToMongo;