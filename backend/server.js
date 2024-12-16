const express = require('express')
const app = express();
const port = 9000;
const cors = require('cors')
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose')
require('dotenv').config();


app.use(cors());
app.use(express.json());
app.use(cookieparser())


const connection = async(req,res)=> {
    try {
        await mongoose.connect(process.env.MONGODB);
        console.log('database is connected...')
    } catch (error) {
        console.log(error);
    }
}
connection();
app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})