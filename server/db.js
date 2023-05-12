const mongoose = require("mongoose")
require("dotenv").config();

const MONGO_URL = process.env.MONGO_URL

const connectToMongo = async()=>{
   try {
    await mongoose.connect(MONGO_URL)
    console.log("Mongo Connected")
   } catch (error) {
    console.log(`mongo error ${error}`)

   }
}

    module.exports = connectToMongo