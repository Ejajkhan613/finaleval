const express = require('express')

const { connection } = require('./configs/db');
const { postRoute } = require('./routes/postRoute');
const { userRoute } = require('./routes/userRoute');
const app = express();
require('dotenv').config()

const port = process.env.port;



var cors = require('cors');
app.use(cors());

app.get("/", (req,res)=>{
    res.send({"msg": "Hi"})
})

app.use("/users", userRoute);

app.use("/posts", postRoute);


app.listen(port, async () => {
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log("Error while connecting to DB")
    }
    console.log(`listening to the port ${port}`)
})