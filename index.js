import express from "express";  
const app=express();
const port=3000;

app.get("/", (req,res)=>{
    res.send("solution.js");
})

app.listen(3000,()=>{
    console.log("server running on port "+ port);
})