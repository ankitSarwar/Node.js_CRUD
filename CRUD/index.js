// "type": "module", // import operation use after doing this change in package.json

import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv"
import route from "./routes/userRoute.js";



const app = express();
app.use(bodyParser.json());
dotenv.config();
 
// tCBpTgqkCaSvLAYL

// mongodb+srv://crud:<password>@cluster0.hz1w1gj.mongodb.net/?retryWrites=true&w=majority
const PORT = process.env.PORT || 3000
const MONGOURL = process.env.MONGO_URL;

mongoose.connect(MONGOURL).then(()=>{

    console.log("DB connected successfully")

    app.listen(PORT, ()=>{
        console.log(`Server is running on port: ${PORT}`)
    })

}).catch(error => console.log(error));


app.use("/api/user", route)

//  npm install --save-dev nodemon
// npm start