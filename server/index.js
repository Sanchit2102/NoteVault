const express = require('express')
const cors = require('cors') 
require("dotenv").config();
const connectToMongo = require("./db")

connectToMongo();
const app = express();

app.use(cors())
app.use(express.json())

app.use("/api/v1/user",require("./routes/user"))
app.use("/api/v1/note",require("./routes/notes"))


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`NoteVault app listening on port ${PORT}`)
  })