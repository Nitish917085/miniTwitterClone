const express = require("express");
const app = express();
const mongoose = require("mongoose");
const routes =  require("./routes")
const cors =  require("cors")
const cookieParser = require('cookie-parser');
require("dotenv").config()

const corsOrigin ={
  origin:['http://localhost:5173','https://mini-twitter-clone-sable.vercel.app'], 
  credentials:true,            
  optionSuccessStatus:200
}

app.use(cors(corsOrigin))

main().then(()=>console.log("database connected"))
main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(process.env.MONGO_URL);
}
app.use('/',express.static('uploads'))

app.use(cookieParser());

app.use(express.json())
app.use(express.urlencoded({extended:true}))

app.use("/",routes)


const PORT = process.env.PORT || 5000;

app.listen(PORT, ()=> console.log("server started at ",PORT))