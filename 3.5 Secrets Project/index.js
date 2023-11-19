//To see how the final website should work, run "node solution.js".
//Make sure you have installed all the dependencies with "npm i".
//The password is ILoveProgramming
import bodyParser from "body-parser";
import { Express } from "express";
import {__dirname, dirname} from "path";
import { fileURLToPath } from "url";
const __dirname=dirname(fileURLToPath(import.meta.url));



const app=express();
const port=3000;
app.use(bodyParser.urlencoded({extended: true}));
var userIsAuthorised=false;

function passwordCheck(){
    const password=req.body["password"];
    if(password=="ILoveProgramming"){
        userIsAuthorised=True;
    }
        next();

    

}
app.use(passwordCheck);
app.get("/",(res,req)=>{
    res.sendFile(__dirname+"\public\index.html")

})
app.post("/check", (res,req)=>{

    if (userIsAuthorised){
        res.sendFile(__dirname + "\public\secret.html");
    }
    else{
        res.sendFile(__dirname+"\public\index.html")
    }

    })

app.listen(port,()=>{
    console.log("port is running on "+port);
})