import express from "express";



const app=express();
const port=3000;
app.set("view engine", "ejs");


app.get("/", (req, res) => {
    const dataType = "a weekday";
    const advice = "It's time to work hard";
    res.render("index.ejs", { dataType, advice });
});

const today=new Date();
const day = today.getDay();


app.listen(port, ()=>{
    console.log("running on port "+ port);
});

