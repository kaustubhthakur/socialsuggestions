const express = require('express')
const app = express();
const port = 9000;
const cors = require('cors')
const cookieparser = require('cookie-parser');
const mongoose = require('mongoose')
require('dotenv').config();
const  authrouter = require('./routes/auth')
const queryrouter = require('./routes/query')

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
app.use('/auth',authrouter)
app.use('/query',queryrouter);
app.listen(port,() => {
    console.log(`server is running on port ${port}`)
})