const express = require('express');
const mongoose=require('mongoose');
const cors = require('cors');
const path=require('path');
const empRouter=require('./routes/basic');
require('dotenv').config();

const app= express();
app.use(express.static(path.join(__dirname,"frontend","build")));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const mongoUrl=process.env.mongo_url;
mongoose.connect(mongoUrl)
.then(() => {
    console.log("Connected to EmployeeDB");
  })
  .catch((error) => {
    console.error("Error connecting to EmployeeDB:", error);
  });

app.get("/",(req,res)=>{res.sendFile(path.join(__dirname,"frontend","build","index.html"));});
app.use('/emp',empRouter);  

const PORT = process.env.PORT;
app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`);
})