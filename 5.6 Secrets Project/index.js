// HINTS:
// 1. Import express and axios
import express from "express";
import axios from "axios";

// 2. Create an express app and set the port number.

const app=express();
const port=3000;

// 3. Use the public folder for static files.
app.user(express.static("public"));

const API_URL = "https://secrets-api.appbrewery.com/";
const config = {
  headers: { Authorization: "" },
};

// 4. When the user goes to the home page it should render the index.ejs file.

app.get("/", (req,res)=>{
    res.render("index.ejs");
});

// 5. Use axios to get a random secret and pass it to index.ejs to display the
// secret and the username of the secret.

app.get("/secrets", async (req, res) => {
    try {
      const result = await axios.get(API_URL + "/secrets/random", config);
      const randomSecret = result.data; // Assuming the API returns the random secret in "result.data"
  
      res.render("secrets", { secret: randomSecret.secret, username: randomSecret.username });
    } catch (error) {
      res.render("error", { content: JSON.stringify(error.response.data) });
    }
  });
  
  

// 6. Listen on your predefined port and start the server.
app.listen(port,()=>{
    console.log("port is running on "+ port);
});
